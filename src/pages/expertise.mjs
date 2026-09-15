import { html, t } from "../lib/html.mjs";
import { areas } from "../lib/expertise.mjs";
import { pagePath } from "../lib/routes.mjs";
import { contractNote, ctaBlock, disciplineLabel, ui } from "../lib/ui.mjs";

const copy = {
  en: {
    title: "Software Development, Tech Leads & Architects | Bigger Boat",
    description:
      "Senior developers to build, lead, strengthen, rescue or review your software. Frontend, backend, architecture and technical leadership from one network.",
    h1: "Senior expertise for serious software problems",
    lead: "One specialist or a whole crew, for building something new, leading a team, reinforcing it, getting a project back on track or getting an honest second opinion.",
    jump: "Jump to",
    typical: "Typical work",
    people: "People in the network",
    disciplinesTitle: "Disciplines in the network",
    disciplinesText: "Every name below links to a real profile. Most people cover more than one discipline.",
    techTitle: "Technology isn't the pitch",
    techText: "But since you're wondering: these are the technologies our members list on their profiles, most used first.",
    ask: "Not sure what you need? That's what the first conversation is for.",
    talk: "Talk to us",
  },
  nl: {
    title: "Software development, technical lead & architectuur | Bigger Boat",
    description:
      "Senior developers om je software te bouwen, te leiden, te versterken, recht te trekken of te reviewen. Frontend, backend, architectuur en technisch leiderschap.",
    h1: "Senior expertise voor serieuze softwarevraagstukken",
    lead: "Eén specialist of een hele crew: om iets nieuws te bouwen, een team te leiden of te versterken, een project weer op koers te krijgen of een eerlijke second opinion te geven.",
    jump: "Ga naar",
    typical: "Typisch werk",
    people: "Mensen in het netwerk",
    disciplinesTitle: "Disciplines in het netwerk",
    disciplinesText: "Achter elke naam zit een echt profiel. De meeste mensen beslaan meer dan één discipline.",
    techTitle: "Technologie is niet de pitch",
    techText: "Maar voor wie het wil weten: dit zijn de technologieën die onze leden op hun profiel noemen, meest gebruikt eerst.",
    ask: "Weet je nog niet precies wat je nodig hebt? Daar is het eerste gesprek voor.",
    talk: "Even sparren?",
  },
};

const membersFor = (ctx, keys) => ctx.team.filter((member) => member.disciplines.some((key) => keys.includes(key)));

const personLinks = (members, lang) =>
  html`<ul class="people">${members.map((member) => html`<li><a href="${pagePath("member", lang, member.slug)}">${member.name}</a></li>`)}</ul>`;

export const technologyCounts = (team) => {
  const counts = new Map();
  for (const member of team) {
    for (const tech of new Set(member.technologies)) counts.set(tech, (counts.get(tech) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([name]) => name);
};

export const render = (lang, ctx) => {
  const c = copy[lang];

  return {
    title: c.title,
    description: c.description,
    breadcrumbs: [
      { name: ui[lang].home, path: pagePath("home", lang) },
      { name: ui[lang].nav.expertise, path: pagePath("expertise", lang) },
    ],
    body: html`
    <header class="page-head">
      <div class="container">
        <h1 class="page-head__title">${c.h1}</h1>
        <p class="page-head__lead">${c.lead}</p>
        <nav class="jump" aria-label="${c.jump}">
          <ul>${areas.map((area) => html`<li><a href="#${area.id}">${t(area.title, lang)}</a></li>`)}</ul>
        </nav>
      </div>
    </header>

    ${areas.map(
      (area, i) => html`<section id="${area.id}" class="section expertise${i % 2 ? " section--tint" : ""}" aria-labelledby="${area.id}-title">
        <div class="container expertise__grid">
          <div>
            <p class="expertise__number" aria-hidden="true">0${i + 1}</p>
            <h2 id="${area.id}-title" class="section__title">${t(area.heading, lang)}</h2>
            ${t(area.intro, lang).map((text) => html`<p>${text}</p>`)}
          </div>
          <div>
            <h3 class="expertise__subtitle">${c.typical}</h3>
            <ul class="checklist">${t(area.examples, lang).map((item) => html`<li>${item}</li>`)}</ul>
            ${area.id !== "strengthen"
              ? html`<h3 class="expertise__subtitle">${c.people}</h3>${personLinks(membersFor(ctx, area.disciplines), lang)}`
              : ""}
          </div>
        </div>
      </section>`,
    )}

    <section class="section section--sea" aria-labelledby="disciplines-title">
      <div class="container">
        <div class="section__head">
          <h2 id="disciplines-title" class="section__title section__title--large">${c.disciplinesTitle}</h2>
          <p class="section__lead">${c.disciplinesText}</p>
        </div>
        <dl class="disciplines">
          ${ctx.usedDisciplines.map(
            (key) => html`<div id="discipline-${key}" class="disciplines__item">
              <dt>${disciplineLabel(key, lang)}</dt>
              <dd>${personLinks(membersFor(ctx, [key]), lang)}</dd>
            </div>`,
          )}
        </dl>
      </div>
    </section>

    <section class="section" aria-labelledby="tech-title">
      <div class="container">
        <div class="section__head">
          <h2 id="tech-title" class="section__title">${c.techTitle}</h2>
          <p class="section__lead">${c.techText}</p>
        </div>
        <ul class="tags tags--large">${technologyCounts(ctx.team).map((tech) => html`<li>${tech}</li>`)}</ul>
        ${contractNote(lang)}
      </div>
    </section>

    ${ctaBlock(lang)}
    `,
  };
};
