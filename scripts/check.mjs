// Checks the built site in dist/ for the things that quietly break SEO and accessibility:
// headings, metadata, canonicals, hreflang, structured data, internal links, images and the sitemap.
// Exits with an error when something is wrong, so CI refuses to deploy it.

import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { site } from "../src/config.mjs";

const dist = new URL("../dist/", import.meta.url).pathname;
const errors = [];
const warnings = [];

const walk = async (dir) =>
  (await readdir(dir, { withFileTypes: true })).flatMap((entry) => (entry.isDirectory() ? [] : [join(dir, entry.name)])).concat(
    ...(await Promise.all((await readdir(dir, { withFileTypes: true })).filter((e) => e.isDirectory()).map((e) => walk(join(dir, e.name))))),
  );

const files = (await walk(dist)).filter((file) => file.endsWith(".html"));
const urlFor = (file) => `${site.url}/${relative(dist, file).replace(/index\.html$/, "")}`;
const pages = new Map();

for (const file of files) {
  const source = await readFile(file, "utf8");
  const meta = (pattern) => source.match(pattern)?.[1];
  pages.set(urlFor(file), {
    file,
    source,
    title: meta(/<title>([^<]*)<\/title>/),
    description: meta(/<meta name="description" content="([^"]*)"/),
    canonical: meta(/<link rel="canonical" href="([^"]*)"/),
    noindex: /<meta name="robots" content="noindex"/.test(source),
    alternates: Object.fromEntries([...source.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]])),
    ids: new Set([...source.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  });
}

const titles = new Map();
const descriptions = new Map();

for (const [url, page] of pages) {
  const where = relative(dist, page.file);
  const error = (message) => errors.push(`${where}: ${message}`);
  const warn = (message) => warnings.push(`${where}: ${message}`);
  const isGateway = where === "index.html";

  if (!/<html lang="(nl|en)">/.test(page.source)) error("missing or unexpected <html lang>");
  if (!page.title) error("missing <title>");
  if (!page.description) error("missing meta description");

  const h1s = page.source.match(/<h1[\s>]/g)?.length ?? 0;
  if (!isGateway && h1s !== 1) error(`expected exactly one <h1>, found ${h1s}`);

  if (!page.noindex) {
    if (page.canonical !== url) error(`canonical ${page.canonical} should be ${url}`);
    for (const lang of ["nl", "en", "x-default"]) {
      if (!page.alternates[lang]) error(`missing hreflang="${lang}"`);
    }
    // hreflang has to be reciprocal: the alternate page must point back to this one.
    for (const lang of ["nl", "en"]) {
      const target = pages.get(page.alternates[lang]);
      if (!target) error(`hreflang="${lang}" points to a page that doesn't exist: ${page.alternates[lang]}`);
      else if (!isGateway && !Object.values(target.alternates).includes(url)) error(`hreflang="${lang}" target doesn't link back`);
    }
    if (!isGateway) {
      const decode = (value) => value.replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      const title = decode(page.title);
      const description = decode(page.description);
      // Duplicates only matter within a language, a name is the same in Dutch and English.
      const lang = where.slice(0, 2);
      if (title.length > 70) warn(`title is ${title.length} characters: ${title}`);
      if (description.length > 160 || description.length < 70) warn(`description is ${description.length} characters`);
      if (titles.has(lang + title)) error(`duplicate title with ${titles.get(lang + title)}`);
      if (descriptions.has(lang + description)) error(`duplicate description with ${descriptions.get(lang + description)}`);
      titles.set(lang + title, where);
      descriptions.set(lang + description, where);
      for (const property of ["og:title", "og:description", "og:image", "og:url", "twitter:card"]) {
        if (!page.source.includes(`"${property}"`)) error(`missing ${property}`);
      }
    }
  }

  for (const [, json] of page.source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(json);
      const types = (data["@graph"] ?? [data]).map((node) => node["@type"]);
      if (types.some((type) => ["Review", "AggregateRating"].includes(type))) error("review or rating structured data without real reviews");
    } catch {
      error("invalid JSON-LD");
    }
  }

  for (const [tag] of page.source.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(tag)) error(`image without alt: ${tag}`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag)) error(`image without width/height: ${tag}`);
  }

  for (const [, href] of page.source.matchAll(/\shref="([^"]+)"/g)) {
    if (href.startsWith("#")) {
      if (href.length > 1 && !page.ids.has(href.slice(1))) error(`broken anchor ${href}`);
      continue;
    }
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const [path, hash] = href.split("#");
    const target = [...pages.values()].find((p) => urlFor(p.file) === `${site.url}${path}`);
    if (!target) {
      const asset = join(dist, path);
      try {
        await readFile(asset);
      } catch {
        error(`broken link ${href}`);
      }
    } else if (hash && !target.ids.has(hash)) {
      error(`broken anchor ${href}`);
    }
  }

  const text = page.source.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]+>/g, " ");
  if (/\b(TODO|lorem ipsum|placeholder)\b/i.test(text)) error("visible placeholder text");
}

const sitemap = await readFile(join(dist, "sitemap.xml"), "utf8");
const listed = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
for (const [url, page] of pages) {
  const where = relative(dist, page.file);
  if (where === "index.html" || page.noindex) continue;
  if (!listed.has(url)) errors.push(`sitemap.xml is missing ${url}`);
}
for (const url of listed) {
  if (!pages.has(url)) errors.push(`sitemap.xml lists ${url}, which doesn't exist`);
}

const robots = await readFile(join(dist, "robots.txt"), "utf8");
if (!robots.includes(`Sitemap: ${site.url}/sitemap.xml`)) errors.push("robots.txt doesn't reference the sitemap");

for (const warning of warnings) console.warn(`  ! ${warning}`);
for (const error of errors) console.error(`  ✗ ${error}`);
console.log(`Checked ${pages.size} pages: ${errors.length} errors, ${warnings.length} warnings`);
if (errors.length) process.exit(1);
