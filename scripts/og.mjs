// Renders the Open Graph images (1200×630) and the apple touch icon with headless Chrome.
// Run `npm run og` after adding or changing a team member, the images are committed in static/images/og/.
// Set CHROME_PATH if Chrome is not in the default macOS location.

import { execFileSync } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { loadContent } from "../src/lib/content.mjs";
import { escape, t } from "../src/lib/html.mjs";

const root = new URL("../", import.meta.url).pathname;
const chrome = process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const tmp = join(root, ".og-tmp");
const out = join(root, "static/images/og");

const page = ({ kicker, title, text }) => `<!doctype html>
<html><head><meta charset="utf-8"><style>
  @font-face { font-family: Slab; src: url("file://${root}static/fonts/roboto-slab.woff2"); font-weight: 100 900; }
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; position: relative; background: #f6f1e6; color: #141414; font-family: system-ui, sans-serif; }
  .logo { position: absolute; top: 56px; left: 72px; width: 180px; }
  .kicker { position: absolute; top: 76px; right: 72px; font-weight: 700; font-size: 22px; letter-spacing: .08em; text-transform: uppercase; color: #45413a; }
  .content { position: absolute; left: 72px; top: 190px; width: 1000px; }
  h1 { font-family: Slab; font-weight: 900; font-size: ${title.length > 38 ? 64 : 80}px; line-height: 1; letter-spacing: -.02em; }
  p { margin-top: 22px; max-width: 760px; font-size: 30px; line-height: 1.35; color: #45413a; }
  .sea { position: absolute; left: 0; right: 0; bottom: 0; height: 70px; background: #45c6a0; border-top: 4px solid #141414; }
  .boat { position: absolute; right: 64px; bottom: 50px; width: 300px; }
</style></head><body>
  <img class="logo" src="file://${root}static/images/logo.png">
  <div class="kicker">${escape(kicker)}</div>
  <div class="content"><h1>${escape(title)}</h1><p>${escape(text)}</p></div>
  <img class="boat" src="file://${root}static/images/boat.png">
  <div class="sea"></div>
</body></html>`;

const shoot = async (name, html, size = "1200,630") => {
  const file = join(tmp, `${name.replaceAll("/", "_")}.html`);
  await writeFile(file, html);
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--virtual-time-budget=2000",
    `--window-size=${size}`,
    `--screenshot=${join(out, `${name}.png`)}`,
    `file://${file}`,
  ], { stdio: "ignore" });
  console.log(`  ${name}.png`);
};

const { team, stats } = await loadContent();
await mkdir(tmp, { recursive: true });
await mkdir(join(out, "team"), { recursive: true });

await shoot("home-en", page({
  kicker: "Independent senior developers",
  title: `${stats.members} senior developers. One Bigger Boat.`,
  text: "Hire one specialist or a whole senior team, without the agency overhead.",
}));
await shoot("home-nl", page({
  kicker: "Zelfstandige senior developers",
  title: `${stats.members} senior developers. Eén Bigger Boat.`,
  text: "Van één specialist tot een compleet senior team, zonder bureaulaag ertussen.",
}));

for (const member of team) {
  for (const lang of ["en", "nl"]) {
    await shoot(`team/${member.slug}-${lang}`, page({
      kicker: lang === "en" ? "Bigger Boat crew" : "Bigger Boat crew",
      title: member.name,
      text: t(member.role, lang),
    }));
  }
}

// Apple touch icon, from the SVG favicon.
await writeFile(join(tmp, "icon.html"), `<body style="margin:0"><img src="file://${root}static/favicon.svg" width="180" height="180" style="display:block"></body>`);
execFileSync(chrome, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--window-size=180,180", `--screenshot=${join(root, "static/apple-touch-icon.png")}`, `file://${join(tmp, "icon.html")}`], { stdio: "ignore" });
console.log("  apple-touch-icon.png");

await rm(tmp, { recursive: true, force: true });
