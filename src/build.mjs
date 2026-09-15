// Builds the whole site into dist/. No dependencies, run with `npm run build`.

import { cp, mkdir, readFile, rm, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { site } from "./config.mjs";
import { layout } from "./layout.mjs";
import { loadContent } from "./lib/content.mjs";
import { absolute, pagePath } from "./lib/routes.mjs";
import * as about from "./pages/about.mjs";
import * as contact from "./pages/contact.mjs";
import * as expertise from "./pages/expertise.mjs";
import * as gateway from "./pages/gateway.mjs";
import * as home from "./pages/home.mjs";
import * as member from "./pages/member.mjs";
import * as notFound from "./pages/not-found.mjs";
import * as privacy from "./pages/privacy.mjs";
import * as team from "./pages/team.mjs";
import * as work from "./pages/work.mjs";

const root = new URL("../", import.meta.url).pathname;
const dist = join(root, "dist");
const exists = (path) => access(path).then(() => true, () => false);

// Removes comments and indentation, the CSS is inlined into every page so it pays to keep it small.
const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    // No whitespace is removed before a colon: `.section :focus-visible` and `.section:focus-visible` differ.
    .replace(/\s*([{};,>])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();

const write = async (path, content) => {
  const file = join(dist, path.endsWith("/") ? `${path}index.html` : path);
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, content);
};

const build = async () => {
  const content = await loadContent();
  const css = minifyCss(await readFile(join(root, "src/styles/site.css"), "utf8"));
  const ctx = { ...content, css };

  await rm(dist, { recursive: true, force: true });
  await cp(join(root, "static"), dist, { recursive: true });

  // Every page in both languages: [id, module, slug?]
  const pages = [
    ["home", home],
    ["expertise", expertise],
    ["team", team],
    ["about", about],
    ["contact", contact],
    ["privacy", privacy],
    ...content.team.map((person) => ["member", member, person]),
    ...(content.cases.length ? [["work", work]] : []),
    ...content.cases.map((item) => ["case", work, item]),
  ];

  const warnings = [];
  const sitemap = [];

  for (const [id, module, item] of pages) {
    const alternates = { nl: pagePath(id, "nl", item?.slug), en: pagePath(id, "en", item?.slug) };

    for (const lang of site.languages) {
      const rendered = (id === "case" ? module.renderCase : module.render)(lang, ctx, item);
      const page = { lang, id, path: alternates[lang], alternates, ...rendered };

      if (page.ogImage && !(await exists(join(dist, page.ogImage)))) {
        warnings.push(`missing ${page.ogImage}, run \`npm run og\``);
        delete page.ogImage;
      }
      await write(page.path, layout(page, ctx));
    }
    sitemap.push(alternates);
  }

  await write("index.html", gateway.render(ctx));
  await write("404.html", notFound.render(ctx));

  await write(
    "sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap
  .flatMap((alternates) =>
    site.languages.map(
      (lang) => `  <url>
    <loc>${absolute(alternates[lang])}</loc>
${site.languages.map((code) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${absolute(alternates[code])}"/>`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}/"/>
  </url>`,
    ),
  )
  .join("\n")}
</urlset>
`,
  );

  await write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

  if (content.stats.missingExperience.length) {
    warnings.push(
      `experience stats are hidden until every member has "careerStartYear" or "experienceYears", missing: ${content.stats.missingExperience.join(", ")}`,
    );
  }

  console.log(`Built ${pages.length * site.languages.length + 2} pages into dist/`);
  for (const warning of [...new Set(warnings)]) console.warn(`  ! ${warning}`);
};

await build();
