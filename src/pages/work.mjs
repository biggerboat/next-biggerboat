// Work overview and case pages. Only built once content/work/ has a published case, see content/work/README.md.

import { html, t } from "../lib/html.mjs";
import { pagePath } from "../lib/routes.mjs";
import { breadcrumbNav, contractNote, ctaBlock, paragraphs, tags, ui } from "../lib/ui.mjs";

const copy = {
  en: {
    title: "Work: Projects by Senior Developers | Bigger Boat",
    description: "Projects Bigger Boat members worked on: the problem, the approach, the people involved and the result.",
    h1: "Work",
    lead: "What happens when a project gets a bigger boat.",
    read: "Read the case",
    context: "Context",
    problem: "The problem",
    approach: "The approach",
    result: "The result",
    people: "Who worked on it",
    technology: "Technology",
  },
  nl: {
    title: "Werk: projecten van senior developers | Bigger Boat",
    description: "Projecten waar leden van Bigger Boat aan werkten: het probleem, de aanpak, de mensen en het resultaat.",
    h1: "Werk",
    lead: "Wat er gebeurt als een project een grotere boot krijgt.",
    read: "Lees de case",
    context: "Context",
    problem: "Het probleem",
    approach: "De aanpak",
    result: "Het resultaat",
    people: "Wie eraan werkten",
    technology: "Technologie",
  },
};

const crumbs = (lang, item) => [
  { name: ui[lang].home, path: pagePath("home", lang) },
  { name: ui[lang].nav.work, path: pagePath("work", lang) },
  ...(item ? [{ name: t(item.title, lang), path: pagePath("case", lang, item.slug) }] : []),
];

export const render = (lang, ctx) => {
  const c = copy[lang];

  return {
    title: c.title,
    description: c.description,
    breadcrumbs: crumbs(lang),
    body: html`
    <header class="page-head">
      <div class="container">
        <h1 class="page-head__title">${c.h1}</h1>
        <p class="page-head__lead">${c.lead}</p>
      </div>
    </header>
    <section class="section section--flush-top">
      <div class="container">
        <h2 class="sr-only">${c.h1}</h2>
        <ul class="cases">
          ${ctx.cases.map(
            (item) => html`<li class="case-card">
              <p class="case-card__client">${item.client}</p>
              <h3 class="case-card__title"><a href="${pagePath("case", lang, item.slug)}">${t(item.title, lang)}</a></h3>
              <p>${t(item.summary, lang)}</p>
              ${tags(item.technologies ?? [])}
            </li>`,
          )}
        </ul>
      </div>
    </section>
    ${ctaBlock(lang)}
    `,
  };
};

export const renderCase = (lang, ctx, item) => {
  const c = copy[lang];
  const people = ctx.team.filter((member) => (item.members ?? []).includes(member.slug));
  const chapter = (title, content) => (t(content, lang)?.length ? html`<h2>${title}</h2>${paragraphs(content, lang)}` : "");

  return {
    title: `${t(item.title, lang)} | Bigger Boat`,
    description: t(item.summary, lang),
    ogType: "article",
    breadcrumbs: crumbs(lang, item),
    body: html`
    <article>
      <header class="page-head">
        <div class="container">
          ${breadcrumbNav(crumbs(lang, item), lang)}
          <p class="eyebrow">${item.client}</p>
          <h1 class="page-head__title">${t(item.title, lang)}</h1>
          <p class="page-head__lead">${t(item.summary, lang)}</p>
        </div>
      </header>

      ${item.metrics?.length
        ? html`<div class="band band--sea"><div class="container"><dl class="stats">${item.metrics.map(
            (metric) => html`<div class="stats__item"><dt>${t(metric.label, lang)}</dt><dd>${metric.value}</dd></div>`,
          )}</dl></div></div>`
        : ""}

      <div class="section">
        <div class="container narrow prose">
          ${chapter(c.context, item.context)}
          ${chapter(c.problem, item.problem)}
          ${chapter(c.approach, item.approach)}
          ${(item.images ?? []).map(
            (image) => html`<figure><img src="${image.src}" alt="${t(image.alt, lang)}" width="${image.width}" height="${image.height}" loading="lazy" decoding="async"></figure>`,
          )}
          ${chapter(c.result, item.result)}
          ${item.quote
            ? html`<figure class="quote"><blockquote><p>${t(item.quote.text, lang)}</p></blockquote><figcaption><strong>${item.quote.author}</strong>, ${t(item.quote.role, lang)}</figcaption></figure>`
            : ""}
          ${people.length
            ? html`<h2>${c.people}</h2><ul class="people">${people.map((member) => html`<li><a href="${pagePath("member", lang, member.slug)}">${member.name}</a></li>`)}</ul>`
            : ""}
          ${item.technologies?.length ? html`<h2>${c.technology}</h2>${tags(item.technologies)}` : ""}
          ${contractNote(lang)}
        </div>
      </div>
    </article>
    ${ctaBlock(lang)}
    `,
  };
};
