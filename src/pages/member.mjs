import { site } from "../config.mjs";
import { html, t } from "../lib/html.mjs";
import { absolute, organizationId, pagePath, personId } from "../lib/routes.mjs";
import { breadcrumbNav, contractNote, ctaBlock, disciplineLabel, memberCard, paragraphs, photo, tags, ui } from "../lib/ui.mjs";

const copy = {
  en: {
    description: (member, lang) => `${t(member.shortBio, lang)} Contact ${member.name.split(" ")[0]} directly.`,
    contact: "Get in touch",
    email: "Email",
    phone: "Call",
    website: "Website",
    disciplines: "Disciplines",
    skills: "Technologies & expertise",
    about: (first) => `About ${first}`,
    related: "Often a good match with",
    network: (first) =>
      `${first} is part of Bigger Boat, a network of senior independent developers. Need more than one person? ${first} can bring in the right people from the crew.`,
  },
  nl: {
    description: (member, lang) => `${t(member.shortBio, lang)} Neem rechtstreeks contact op met ${member.name.split(" ")[0]}.`,
    contact: "Neem contact op",
    email: "Mail",
    phone: "Bel",
    website: "Website",
    disciplines: "Disciplines",
    skills: "Technologieën & expertise",
    about: (first) => `Over ${first}`,
    related: "Werkt vaak goed samen met",
    network: (first) =>
      `${first} is onderdeel van Bigger Boat, een netwerk van senior zelfstandige developers. Meer dan één persoon nodig? ${first} haalt de juiste mensen uit de crew erbij.`,
  },
};

// The members that share the most disciplines, for internal links that actually make sense.
const related = (member, team) =>
  team
    .filter((other) => other.slug !== member.slug)
    .map((other) => ({ other, score: other.disciplines.filter((key) => member.disciplines.includes(key)).length }))
    .sort((a, b) => b.score - a.score || a.other.name.localeCompare(b.other.name))
    .slice(0, 3)
    .map(({ other }) => other);

const schema = (member, lang, url) => {
  const sameAs = [member.linkedin, member.website, member.x].filter(Boolean);
  return [
    {
      "@type": "ProfilePage",
      "@id": url,
      url,
      name: `${member.name} | ${site.name}`,
      inLanguage: lang,
      mainEntity: { "@id": personId(member.slug) },
    },
    {
      "@type": "Person",
      "@id": personId(member.slug),
      name: member.name,
      jobTitle: t(member.role, lang),
      description: t(member.shortBio, lang),
      url,
      ...(member.photo ? { image: absolute(`/images/team/${member.slug}-640.jpg`) } : {}),
      ...(sameAs.length ? { sameAs } : {}),
      ...(member.location ? { homeLocation: { "@type": "Place", name: member.location } } : {}),
      knowsAbout: [...member.disciplines.map((key) => disciplineLabel(key, lang)), ...member.technologies, ...member.expertise],
      memberOf: { "@id": organizationId },
    },
  ];
};

export const render = (lang, ctx, member) => {
  const c = copy[lang];
  const first = member.name.split(" ")[0];
  const role = t(member.role, lang);
  const path = pagePath("member", lang, member.slug);
  const crumbs = [
    { name: ui[lang].home, path: pagePath("home", lang) },
    { name: ui[lang].nav.team, path: pagePath("team", lang) },
    { name: member.name, path },
  ];
  const links = [
    member.linkedin && { href: member.linkedin, label: "LinkedIn", event: "Outbound: LinkedIn" },
    member.website && { href: member.website, label: c.website, event: "Outbound: website" },
    member.x && { href: member.x, label: "X", event: "Outbound: X" },
  ].filter(Boolean);

  // Long roles ("…, owner of Studio Zoetekauw") are shortened until the title fits in search results.
  const title = [role, role.split(", ")[0], role.split(/, | & /)[0]]
    .map((part) => `${member.name}, ${part} | ${site.name}`)
    .find((candidate) => candidate.length <= 65) ?? `${member.name} | ${site.name}`;

  return {
    title,
    ogTitle: `${member.name}, ${role}`,
    description: c.description(member, lang),
    ogType: "profile",
    ogImage: `/images/og/team/${member.slug}-${lang}.png`,
    breadcrumbs: crumbs,
    schema: schema(member, lang, absolute(path)),
    body: html`
    <article class="profile">
      <header class="page-head page-head--profile">
        <div class="container">
          ${breadcrumbNav(crumbs, lang)}
          <div class="profile__head">
            ${photo(member, { sizes: "(min-width: 48rem) 16rem, 40vw", eager: true })}
            <div>
              <h1 class="page-head__title">${member.name}</h1>
              <p class="profile__role">${role}</p>
              ${member.experience || member.location
                ? html`<p class="profile__meta">${[member.experience && ui[lang].years(member.experience), member.location].filter(Boolean).join(" · ")}</p>`
                : ""}
              <p class="page-head__lead">${t(member.shortBio, lang)}</p>
            </div>
          </div>
        </div>
      </header>

      <div class="section section--flush-top">
        <div class="container profile__grid">
          <div class="profile__main">
            <section aria-labelledby="about-title">
              <h2 id="about-title" class="section__title">${c.about(first)}</h2>
              <div class="prose">${paragraphs(member.bio, lang)}</div>
            </section>

            ${member.disciplines.length
              ? html`<section aria-labelledby="disciplines-title">
                  <h2 id="disciplines-title" class="profile__subtitle">${c.disciplines}</h2>
                  <ul class="people">${member.disciplines.map(
                    (key) => html`<li><a href="${pagePath("expertise", lang)}#discipline-${key}">${disciplineLabel(key, lang)}</a></li>`,
                  )}</ul>
                </section>`
              : ""}

            ${member.technologies.length || member.expertise.length
              ? html`<section aria-labelledby="skills-title">
                  <h2 id="skills-title" class="profile__subtitle">${c.skills}</h2>
                  ${tags([...member.technologies, ...member.expertise])}
                </section>`
              : ""}
          </div>

          <aside class="profile__contact" aria-labelledby="contact-title">
            <h2 id="contact-title" class="profile__subtitle">${c.contact}</h2>
            <ul class="contact-list">
              ${member.email
                ? html`<li><span>${c.email}</span><a href="mailto:${member.email}" data-event="Email click: member">${member.email}</a></li>`
                : ""}
              ${member.phone
                ? html`<li><span>${c.phone}</span><a href="tel:${member.phone}" data-event="Phone click: member">${member.phoneDisplay ?? member.phone}</a></li>`
                : ""}
              ${links.map((link) => html`<li><span>${link.label}</span><a href="${link.href}" rel="noopener" data-event="${link.event}">${link.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}</a></li>`)}
            </ul>
            <p class="small-print">${c.network(first)}</p>
          </aside>
        </div>
      </div>
    </article>

    <section class="section section--sea" aria-labelledby="related-title">
      <div class="container">
        <h2 id="related-title" class="section__title">${c.related}</h2>
        <div class="crew-grid crew-grid--three">
          ${related(member, ctx.team).map((other) => memberCard(other, lang))}
        </div>
        ${contractNote(lang)}
      </div>
    </section>

    ${ctaBlock(lang)}
    `,
  };
};
