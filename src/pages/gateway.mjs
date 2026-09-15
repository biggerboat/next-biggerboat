// The root URL. Sends visitors to /nl/ or /en/ based on an earlier choice or their browser language, and doubles as
// the x-default page for search engines. Without JavaScript it is a plain language chooser.

import { site } from "../config.mjs";
import { html, raw } from "../lib/html.mjs";

const redirect = `(function () {
  var choice;
  try { choice = localStorage.getItem("lang"); } catch (e) {}
  var preferred = (navigator.languages || [navigator.language || ""]).map(function (l) { return l.slice(0, 2).toLowerCase(); });
  var lang = choice || preferred.filter(function (l) { return l === "nl" || l === "en"; })[0] || "en";
  location.replace("/" + lang + "/" + (location.hash === "#crew" ? "team/" : ""));
})();`;

export const render = (ctx) => `<!doctype html>
${html`<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bigger Boat | Senior developers · Kies je taal / Choose your language</title>
  <meta name="description" content="Bigger Boat: a collective of senior independent developers from the Netherlands. Een collectief van senior zelfstandige developers.">
  <link rel="canonical" href="${site.url}/">
  <link rel="alternate" hreflang="nl" href="${site.url}/nl/">
  <link rel="alternate" hreflang="en" href="${site.url}/en/">
  <link rel="alternate" hreflang="x-default" href="${site.url}/">
  <meta property="og:title" content="Bigger Boat | Senior developers">
  <meta property="og:url" content="${site.url}/">
  <meta property="og:image" content="${site.url}/images/og/home-en.png">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script>${raw(redirect)}</script>
  <style>${raw(ctx.css)}</style>
</head>
<body>
  <main class="gateway">
    <img src="/images/logo.png" alt="Bigger Boat" width="279" height="107">
    <ul class="gateway__choices">
      <li lang="nl"><a class="button button--primary" href="/nl/" hreflang="nl" data-lang="nl">Nederlands</a></li>
      <li lang="en"><a class="button button--primary" href="/en/" hreflang="en" data-lang="en">English</a></li>
    </ul>
  </main>
  <script src="/js/site.js" defer></script>
</body>
</html>`}
`;
