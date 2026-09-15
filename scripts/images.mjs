// Turns team photos into small, responsive images: content/team/photos/{slug}.jpg becomes
// static/images/team/{slug}-{320,640}.{jpg,webp,avif}, cropped to 4:5 from the centre.
// Needs ffmpeg, cwebp and avifenc locally (brew install ffmpeg webp libavif). The results are committed.
// After adding a photo, set "photo": true in the member's JSON file.

import { execFileSync } from "node:child_process";
import { mkdir, readdir } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const source = join(root, "content/team/photos");
const out = join(root, "static/images/team");

await mkdir(out, { recursive: true });
const photos = (await readdir(source).catch(() => [])).filter((file) => /\.(jpe?g|png)$/i.test(file));

for (const file of photos) {
  const slug = file.replace(/\.\w+$/, "");
  for (const width of [320, 640]) {
    const height = (width * 5) / 4;
    const jpg = join(out, `${slug}-${width}.jpg`);
    const run = (command, args) => execFileSync(command, args, { stdio: "ignore" });
    run("ffmpeg", ["-y", "-i", join(source, file), "-vf", `crop='min(iw,ih*4/5)':'min(ih,iw*5/4)',scale=${width}:${height}`, "-q:v", "3", jpg]);
    run("cwebp", ["-quiet", "-q", "80", jpg, "-o", join(out, `${slug}-${width}.webp`)]);
    run("avifenc", ["-q", "60", "-s", "4", jpg, join(out, `${slug}-${width}.avif`)]);
  }
  console.log(`  ${slug}`);
}

if (!photos.length) console.log("No photos found in content/team/photos/");
