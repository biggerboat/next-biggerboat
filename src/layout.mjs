import { locales, site } from "./config.mjs";
import { html, jsonLd, raw } from "./lib/html.mjs";
import { absolute, organizationId, pagePath, personId, websiteId } from "./lib/routes.mjs";
import { ui } from "./lib/ui.mjs";

const description = {
  en: "A collective of senior independent developers, engineers and technical leads from the Netherlands.",
  nl: "Een collectief van senior zelfstandige developers, engineers en technical leads uit Nederland.",
};

const siteSchema = (lang, ctx) => [
  {
    "@type": "Organization",
    "@id": organizationId,
    name: site.name,
    url: `${site.url}/`,
    logo: absolute("/images/logo.png"),
    email: site.email,
    description: description[lang],
    ...(site.linkedin ? { sameAs: [site.linkedin] } : {}),
    member: ctx.team.map((member) => ({ "@id": personId(member.slug) })),
  },
  {
    "@type": "WebSite",
    "@id": websiteId,
    name: site.name,
    url: `${site.url}/`,
    inLanguage: ["nl", "en"],
    publisher: { "@id": organizationId },
  },
];

const breadcrumbSchema = (crumbs) => ({
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: crumb.name,
    item: absolute(crumb.path),
  })),
});

const header = (lang, id, alternates, ctx) => {
  const s = ui[lang];
  const other = lang === "nl" ? "en" : "nl";
  const current = (pageId) => (id === pageId || (pageId === "team" && id === "member") ? raw(' aria-current="page"') : "");
  const items = ["expertise", "team", "about", ...(ctx.cases.length ? ["work"] : [])];

  return html`<header class="site-header">
    <div class="container site-header__inner">
      <a class="site-logo" href="${pagePath("home", lang)}" aria-label="${s.logoLabel}">
        <img src="/images/logo.png" alt="" width="279" height="107">
      </a>
      <nav class="site-nav" aria-label="${s.navLabel}">
        <ul>
          ${items.map((item) => html`<li><a href="${pagePath(item, lang)}"${current(item)}>${s.nav[item]}</a></li>`)}
        </ul>
      </nav>
      <div class="site-header__actions">
        <a class="lang-switch" href="${alternates[other]}" hreflang="${other}" lang="${other}" data-event="Language switch" data-lang="${other}"><span class="sr-only">${s.otherLanguage}: </span>${locales[other].short}</a>
        <a class="button button--small" href="${pagePath("contact", lang)}"${current("contact")} data-event="CTA: contact">${s.talk}</a>
      </div>
    </div>
  </header>`;
};

const footer = (lang, alternates, ctx) => {
  const s = ui[lang];
  const pages = ["expertise", "team", "about", ...(ctx.cases.length ? ["work"] : []), "contact"];

  return html`<footer class="site-footer">
    <div class="container site-footer__grid">
      <div class="site-footer__cta">
        <p class="site-footer__shout">${s.footerCta.map((line) => html`<span>${line}</span>`)}</p>
        <a class="button button--primary" href="${pagePath("contact", lang)}" data-event="CTA: contact">${s.talk}</a>
      </div>
      <div>
        <img class="site-footer__logo" src="/images/logo-white.png" alt="${site.name}" width="279" height="107" loading="lazy">
        <p>${s.footerTagline}</p>
      </div>
      <nav aria-label="${s.footerPages}">
        <h2 class="site-footer__heading">${s.footerPages}</h2>
        <ul>
          ${pages.map((page) => html`<li><a href="${pagePath(page, lang)}">${s.nav[page]}</a></li>`)}
          <li><a href="${pagePath("privacy", lang)}">${s.privacy}</a></li>
        </ul>
      </nav>
      <div>
        <h2 class="site-footer__heading">${s.footerContact}</h2>
        <ul>
          <li><a href="mailto:${site.email}" data-event="Email click">${site.email}</a></li>
          ${site.linkedin ? html`<li><a href="${site.linkedin}" rel="noopener">LinkedIn</a></li>` : ""}
        </ul>
        <h2 class="site-footer__heading">${s.footerLanguage}</h2>
        <ul class="site-footer__languages">
          ${["nl", "en"].map((code) =>
            code === lang
              ? html`<li><span aria-current="true">${locales[code].label}</span></li>`
              : html`<li><a href="${alternates[code]}" hreflang="${code}" lang="${code}" data-event="Language switch" data-lang="${code}">${locales[code].label}</a></li>`,
          )}
        </ul>
      </div>
    </div>
    <div class="container site-footer__bottom">
      <p>© ${new Date().getFullYear()} ${site.name}</p>
    </div>
  </footer>`;
};

const analytics = () =>
  site.analytics
    ? html`<script defer data-domain="${site.analytics.domain}" src="${site.analytics.script}"></script>`
    : "";

/**
 * @param page {{ lang, id, path, alternates: { nl, en }, title, description, body, breadcrumbs?, schema?, ogImage?, ogType?, noindex? }}
 */
export const layout = (page, ctx) => {
  const { lang, id, path, alternates } = page;
  const url = absolute(path);
  const ogImage = absolute(page.ogImage ?? `/images/og/home-${lang}.png`);
  const crumbs = page.breadcrumbs ?? [];
  const graph = [
    ...siteSchema(lang, ctx),
    ...(crumbs.length > 1 ? [breadcrumbSchema(crumbs)] : []),
    ...(page.schema ?? []),
  ];

  return `<!doctype html>
${html`<html lang="${locales[lang].htmlLang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${page.title}</title>
  <meta name="description" content="${page.description}">
  ${page.noindex
    ? raw('<meta name="robots" content="noindex">')
    : html`<link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="nl" href="${absolute(alternates.nl)}">
  <link rel="alternate" hreflang="en" href="${absolute(alternates.en)}">
  <link rel="alternate" hreflang="x-default" href="${site.url}/">`}
  <meta property="og:type" content="${page.ogType ?? "website"}">
  <meta property="og:site_name" content="${site.name}">
  <meta property="og:locale" content="${locales[lang].ogLocale}">
  <meta property="og:locale:alternate" content="${locales[lang === "nl" ? "en" : "nl"].ogLocale}">
  <meta property="og:url" content="${url}">
  <meta property="og:title" content="${page.ogTitle ?? page.title}">
  <meta property="og:description" content="${page.description}">
  <meta property="og:image" content="${ogImage}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${page.ogTitle ?? page.title}">
  <meta name="twitter:description" content="${page.description}">
  <meta name="twitter:image" content="${ogImage}">
  <meta name="theme-color" content="#f6f1e6">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preload" href="/fonts/roboto-slab.woff2" as="font" type="font/woff2" crossorigin>
  <style>${raw(ctx.css)}</style>
  <script src="/js/site.js" defer></script>
  ${analytics()}
  ${jsonLd({ "@context": "https://schema.org", "@graph": graph })}
</head>
<body class="page-${id}">
  <a class="skip-link" href="#main">${ui[lang].skip}</a>
  ${header(lang, id, alternates, ctx)}
  <main id="main" tabindex="-1">
    ${page.body}
  </main>
  ${footer(lang, alternates, ctx)}
</body>
</html>`}
`;
};
