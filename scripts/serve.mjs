// Local preview: builds the site, serves dist/ on http://localhost:8000 and rebuilds when src/, content/ or static/ change.

import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = new URL("../", import.meta.url).pathname;
const dist = join(root, "dist");
const port = Number(process.env.PORT) || 8000;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

let building = null;
const build = () => {
  building ??= new Promise((resolve) => {
    spawn("node", [join(root, "src/build.mjs")], { stdio: "inherit" }).on("exit", () => {
      building = null;
      resolve();
    });
  });
  return building;
};

await build();

let timer;
for (const dir of ["src", "content", "static"]) {
  watch(join(root, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(build, 100);
  });
}

// Behaves like GitHub Pages: directories serve index.html, redirect to a trailing slash, unknown paths get 404.html.
createServer(async (req, res) => {
  await building;
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = normalize(join(dist, pathname));
  if (!file.startsWith(dist)) return res.writeHead(403).end();

  try {
    if ((await stat(file)).isDirectory()) {
      if (!pathname.endsWith("/")) return res.writeHead(301, { Location: `${pathname}/` }).end();
      file = join(file, "index.html");
    }
    res.writeHead(200, { "Content-Type": types[extname(file)] ?? "application/octet-stream" });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { "Content-Type": types[".html"] });
    res.end(await readFile(join(dist, "404.html")).catch(() => "Not found"));
  }
}).listen(port, () => console.log(`Serving on http://localhost:${port}`));
