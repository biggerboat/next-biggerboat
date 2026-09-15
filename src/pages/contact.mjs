import { site } from "../config.mjs";
import { html, t } from "../lib/html.mjs";
import { absolute, organizationId, pagePath } from "../lib/routes.mjs";
import { contractNote, emailLink, ui } from "../lib/ui.mjs";
import { illustration } from "./home.mjs";

const copy = {
  en: {
    title: "Contact: Talk to Senior Developers Directly | Bigger Boat",
    description:
      "Tell us what you're building or what's broken. No brief, budget or forms needed: email Bigger Boat or contact one of our senior developers directly.",
    h1: "Got a problem? Let's talk.",
    lead: "You don't need a complete brief. Tell us what you're trying to build, or what's currently broken.",
    mailTitle: "Email the crew",
    mailText: "A few sentences is plenty. If it helps, mention:",
    mailHints: ["What you're building, or what's going wrong", "Roughly when you need help", "Whether you already have a team"],
    directTitle: "Or talk to someone directly",
    directText: "Already know who you need? Every member can be contacted directly. No gatekeepers.",
    email: "Email",
    phone: "Phone",
    faqTitle: "Good to know",
    faq: [
      ["Do I need a budget or a full brief?", "No. A first conversation is about understanding the problem. Plans and estimates come later."],
      ["Who do I sign a contract with?", "With the independent professionals doing the work. Bigger Boat brings the right people together, it doesn't sit in between as an agency."],
      ["Is my question too small?", "A code review or a second opinion is a perfectly good reason to get in touch."],
      ["Do you work in English?", "Yes. We work in Dutch and English."],
    ],
  },
  nl: {
    title: "Contact: praat direct met senior developers | Bigger Boat",
    description:
      "Vertel wat je wilt bouwen of wat er misgaat. Geen plan, budget of formulier nodig: mail Bigger Boat of bel direct een van onze senior developers.",
    h1: "Even sparren?",
    lead: "Je hoeft nog geen compleet plan te hebben. Vertel wat je wilt bouwen, of wat er nu misgaat.",
    mailTitle: "Mail de crew",
    mailText: "Een paar zinnen is genoeg. Noem eventueel:",
    mailHints: ["Wat je wilt bouwen, of wat er misgaat", "Wanneer je ongeveer hulp nodig hebt", "Of je al een team hebt"],
    directTitle: "Of praat direct met iemand",
    directText: "Weet je al wie je nodig hebt? Iedereen is rechtstreeks bereikbaar. Geen poortwachters.",
    email: "Mail",
    phone: "Telefoon",
    faqTitle: "Goed om te weten",
    faq: [
      ["Moet ik al een budget of compleet plan hebben?", "Nee. Een eerste gesprek gaat over het begrijpen van het probleem. Plannen en schattingen komen later."],
      ["Met wie sluit ik een contract?", "Met de zelfstandige professionals die het werk doen. Bigger Boat brengt de juiste mensen bij elkaar, maar zit er niet als bureau tussen."],
      ["Is mijn vraag niet te klein?", "Een code review of een second opinion is een prima reden om contact op te nemen."],
      ["Werken jullie ook in het Engels?", "Ja. We werken in het Nederlands en het Engels."],
    ],
  },
};

export const render = (lang, ctx) => {
  const c = copy[lang];
  const url = absolute(pagePath("contact", lang));

  return {
    title: c.title,
    description: c.description,
    breadcrumbs: [
      { name: ui[lang].home, path: pagePath("home", lang) },
      { name: ui[lang].nav.contact, path: pagePath("contact", lang) },
    ],
    schema: [{ "@type": "ContactPage", "@id": url, url, name: c.title, inLanguage: lang, about: { "@id": organizationId } }],
    body: html`
    <header class="page-head page-head--contact">
      <div class="container contact-head">
        <div>
          <h1 class="page-head__title">${c.h1}</h1>
          <p class="page-head__lead">${c.lead}</p>
        </div>
        ${illustration("lighthouse", 763, 683, "", "contact-head__lighthouse")}
      </div>
    </header>

    <section class="section section--flush-top" aria-labelledby="mail-title">
      <div class="container">
        <div class="mail-card">
          <h2 id="mail-title" class="section__title">${c.mailTitle}</h2>
          <p><a class="mail-card__address" href="mailto:${site.email}" data-event="Email click">${site.email}</a></p>
          <p>${c.mailText}</p>
          <ul class="checklist">${c.mailHints.map((hint) => html`<li>${hint}</li>`)}</ul>
          <div class="actions">${emailLink(lang)}</div>
        </div>
      </div>
    </section>

    <section class="section section--sea" aria-labelledby="direct-title">
      <div class="container">
        <div class="section__head">
          <h2 id="direct-title" class="section__title section__title--large">${c.directTitle}</h2>
          <p class="section__lead">${c.directText}</p>
        </div>
        <ul class="directory">
          ${ctx.team.map(
            (member) => html`<li class="directory__item">
              <div class="directory__who">
                <h3 class="directory__name"><a href="${pagePath("member", lang, member.slug)}" data-event="Team profile">${member.name}</a></h3>
                <p class="directory__role">${t(member.role, lang)}</p>
              </div>
              <ul class="directory__links">
                ${member.email ? html`<li><a href="mailto:${member.email}" data-event="Email click: member"><span class="sr-only">${c.email} ${member.name}: </span>${member.email}</a></li>` : ""}
                ${member.phone ? html`<li><a href="tel:${member.phone}" data-event="Phone click: member"><span class="sr-only">${c.phone} ${member.name}: </span>${member.phoneDisplay ?? member.phone}</a></li>` : ""}
                ${member.linkedin ? html`<li><a href="${member.linkedin}" rel="noopener" data-event="Outbound: LinkedIn">LinkedIn<span class="sr-only"> ${member.name}</span></a></li>` : ""}
              </ul>
            </li>`,
          )}
        </ul>
      </div>
    </section>

    <section class="section" aria-labelledby="faq-title">
      <div class="container narrow">
        <h2 id="faq-title" class="section__title section__title--large">${c.faqTitle}</h2>
        <dl class="faq">
          ${c.faq.map(([question, answer]) => html`<div class="faq__item"><dt>${question}</dt><dd>${answer}</dd></div>`)}
        </dl>
        ${contractNote(lang)}
      </div>
    </section>
    `,
  };
};
