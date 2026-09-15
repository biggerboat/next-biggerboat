import { html } from "../lib/html.mjs";
import { pagePath } from "../lib/routes.mjs";
import { contractNote, ctaBlock, disciplineLabel, memberCard, ui } from "../lib/ui.mjs";

const copy = {
  en: {
    title: "Senior Developers & Tech Leads: Meet the Crew | Bigger Boat",
    description: (n) =>
      `Meet the ${n} independent senior developers, engineers and tech leads of Bigger Boat. Real profiles, and you can contact every one of them directly.`,
    h1: "Meet the crew",
    lead: (n) =>
      `${n} independent senior developers, engineers and tech leads. Real people with real track records, and you can contact each of them directly.`,
    order: "Shown in random order. Nobody gets to be first in line forever.",
    indexTitle: "Looking for something specific?",
    indexText: "Find people by discipline. Not sure who you need? Email us and we'll point you to the right person.",
  },
  nl: {
    title: "Het team: senior developers en tech leads | Bigger Boat",
    description: (n) =>
      `Maak kennis met de ${n} zelfstandige senior developers, engineers en tech leads van Bigger Boat. Echte profielen, en iedereen is rechtstreeks bereikbaar.`,
    h1: "Maak kennis met de crew",
    lead: (n) =>
      `${n} zelfstandige senior developers, engineers en tech leads. Echte mensen met een echte staat van dienst, en je kunt iedereen rechtstreeks benaderen.`,
    order: "In willekeurige volgorde. Niemand staat voor altijd vooraan.",
    indexTitle: "Op zoek naar iets specifieks?",
    indexText: "Vind mensen per discipline. Weet je niet wie je nodig hebt? Mail ons, dan wijzen we je de juiste persoon.",
  },
};

export const render = (lang, ctx) => {
  const c = copy[lang];
  const n = ctx.stats.members;

  return {
    title: c.title,
    description: c.description(n),
    breadcrumbs: [
      { name: ui[lang].home, path: pagePath("home", lang) },
      { name: ui[lang].nav.team, path: pagePath("team", lang) },
    ],
    body: html`
    <header class="page-head">
      <div class="container">
        <h1 class="page-head__title">${c.h1}</h1>
        <p class="page-head__lead">${c.lead(n)}</p>
      </div>
    </header>

    <section class="section section--sea section--flush-top" aria-labelledby="team-heading">
      <div class="container">
        <h2 id="team-heading" class="sr-only">${c.h1}</h2>
        <p class="small-print">${c.order}</p>
        <div class="crew-grid" data-shuffle>
          ${ctx.team.map((member) => memberCard(member, lang))}
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="index-title">
      <div class="container">
        <div class="section__head">
          <h2 id="index-title" class="section__title">${c.indexTitle}</h2>
          <p class="section__lead">${c.indexText}</p>
        </div>
        <dl class="disciplines">
          ${ctx.usedDisciplines.map(
            (key) => html`<div class="disciplines__item">
              <dt>${disciplineLabel(key, lang)}</dt>
              <dd><ul class="people">${ctx.team
                .filter((member) => member.disciplines.includes(key))
                .map((member) => html`<li><a href="${pagePath("member", lang, member.slug)}">${member.name}</a></li>`)}</ul></dd>
            </div>`,
          )}
        </dl>
        ${contractNote(lang)}
      </div>
    </section>

    ${ctaBlock(lang)}
    `,
  };
};
