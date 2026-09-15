import { html, t } from "../lib/html.mjs";
import { areas } from "../lib/expertise.mjs";
import { pagePath } from "../lib/routes.mjs";
import { contractNote, ctaBlock, memberCard, statsBar, ui } from "../lib/ui.mjs";

const copy = {
  en: {
    title: "Senior Software Developers & Development Teams | Bigger Boat",
    description: (n) =>
      `${n} senior independent developers, engineers and tech leads from the Netherlands. Hire one specialist or a whole senior team, without the agency overhead.`,
    eyebrow: "Independent senior developers · Netherlands",
    h1: (n) => [`${n} senior developers.`, "One Bigger Boat."],
    lead: "Bigger Boat is a collective of highly experienced independent developers, engineers and technical leads. Hire one specialist or assemble an entire senior team, without the agency overhead.",
    primary: "Tell us what you're building",
    why: {
      title: "Agency-level expertise. Freelancer-level flexibility. Without the agency layer.",
      text: "You don't have to vet twenty freelancers to find the right combination of people. Bigger Boat is that network already.",
      points: [
        ["Senior by default", "No juniors disguised as seniors. Everyone in the network is an experienced independent professional with a long track record, and you notice it in how they approach your problem."],
        ["One developer or a whole crew", "Need one specialist today and three more next month? Put together the team that fits the problem, not the team that happens to be available."],
        ["No agency telephone game", "You talk directly to the people doing the work. No account managers translating conversations between you and your developers."],
        ["A network behind every developer", "Hiring one Bigger Boat member doesn't mean hiring an isolated freelancer. If they don't know the answer, chances are someone in the network does."],
      ],
    },
    problems: {
      title: "Got a technical problem?",
      items: [
        "Your project is getting too complicated for the team you have.",
        "Your team needs experienced reinforcement, fast.",
        "You need a technical lead, not another pair of hands.",
        "Your architecture isn't keeping up with your growth.",
        "A project is already going off the rails.",
        "You need several senior developers at once.",
        "You need someone who can challenge your current approach.",
        "Your agency needs extra technical firepower.",
      ],
      closing: ["Sounds familiar?", "You're gonna need a bigger boat."],
      cta: "Let's figure it out",
    },
    expertise: {
      title: "Complex is kind of our thing.",
      text: "Clients don't hire a framework. They hire experience and the ability to solve problems. So that's how we organise what we do.",
      more: "All expertise",
    },
    crew: {
      title: "Meet the crew",
      text: "For now, the people are the proof. Real names, real track records, and you can contact every one of them directly.",
      all: "The whole crew",
    },
    how: {
      title: "How it works",
      steps: [
        ["Tell us what's going on", "Send an email or contact someone from the crew directly. A rough idea, a stuck project or a job description: all fine."],
        ["We bring the right people together", "We look at who in the network fits the problem, whether that's one specialist or a small team."],
        ["Work directly together", "You agree on the work and the contract directly with the independent professionals involved. No agency in between."],
      ],
    },
    testimonials: "What clients say",
  },
  nl: {
    title: "Senior developers & developmentteams inhuren | Bigger Boat",
    description: (n) =>
      `${n} senior zelfstandige developers, engineers en tech leads. Huur één specialist of een compleet senior team in, rechtstreeks en zonder bureaulaag.`,
    eyebrow: "Zelfstandige senior developers · Nederland",
    h1: (n) => [`${n} senior developers.`, "Eén Bigger Boat."],
    lead: "Bigger Boat is een collectief van zeer ervaren zelfstandige developers, engineers en technical leads. Van één specialist tot een compleet senior team, zonder bureaulaag ertussen.",
    primary: "Vertel waar je mee bezig bent",
    why: {
      title: "De slagkracht van een bureau. De flexibiliteit van freelancers. Zonder de bureaulaag ertussen.",
      text: "Je hoeft niet zelf twintig freelancers af te gaan om de juiste combinatie van mensen te vinden. Bigger Boat is dat netwerk al.",
      points: [
        ["Standaard senior", "Geen junioren die zich als senior verkopen. Iedereen in het netwerk is een ervaren zelfstandige professional met een lange staat van dienst, en dat merk je aan hoe ze jouw probleem aanpakken."],
        ["Eén developer of een hele crew", "Vandaag één specialist nodig en volgende maand nog drie? Stel het team samen dat bij het probleem past, niet het team dat toevallig beschikbaar is."],
        ["Geen doorgeefluik", "Je praat rechtstreeks met de mensen die het werk doen. Geen accountmanagers die jouw gesprekken met je developers vertalen."],
        ["Een netwerk achter elke developer", "Wie één Bigger Boat-lid inhuurt, huurt geen losse freelancer in. Weet diegene iets niet, dan is de kans groot dat iemand anders in het netwerk het wel weet."],
      ],
    },
    problems: {
      title: "Technisch probleem?",
      items: [
        "Je project wordt te complex voor het team dat je hebt.",
        "Je team kan snel ervaren versterking gebruiken.",
        "Je hebt een technical lead nodig, geen extra paar handen.",
        "Je architectuur groeit niet mee met je organisatie.",
        "Een project dreigt al te ontsporen.",
        "Je hebt in één keer meerdere senior developers nodig.",
        "Je zoekt iemand die jullie huidige aanpak durft uit te dagen.",
        "Je bureau kan extra technische slagkracht gebruiken.",
      ],
      closing: ["Herkenbaar?", "Dan heb je een Bigger Boat nodig."],
      cta: "Laten we eens kijken",
    },
    expertise: {
      title: "Complex is een beetje ons ding.",
      text: "Klanten huren geen framework in. Ze huren ervaring en probleemoplossend vermogen in. Daarom delen we ons werk zo in.",
      more: "Alle expertise",
    },
    crew: {
      title: "Maak kennis met de crew",
      text: "Voorlopig zijn de mensen het bewijs. Echte namen, een echte staat van dienst, en je kunt iedereen rechtstreeks benaderen.",
      all: "De hele crew",
    },
    how: {
      title: "Zo werkt het",
      steps: [
        ["Vertel wat er speelt", "Stuur een mail of benader direct iemand uit de crew. Een ruw idee, een vastgelopen project of een functieomschrijving: alles is goed."],
        ["Wij brengen de juiste mensen bij elkaar", "We kijken wie in het netwerk bij het probleem past, of dat nu één specialist is of een klein team."],
        ["Rechtstreeks samenwerken", "Je maakt afspraken en contracten rechtstreeks met de zelfstandige professionals die het werk doen. Zonder bureau ertussen."],
      ],
    },
    testimonials: "Wat klanten zeggen",
  },
};

export const illustration = (name, width, height, alt = "", className = "") =>
  html`<picture class="${className}">
    <source type="image/avif" srcset="/images/${name}.avif">
    <source type="image/webp" srcset="/images/${name}.webp">
    <img src="/images/${name}.png" alt="${alt}" width="${width}" height="${height}" decoding="async">
  </picture>`;

const testimonialsSection = (lang, ctx, title) =>
  ctx.testimonials.length
    ? html`<section class="section" aria-labelledby="testimonials-title">
        <div class="container">
          <h2 id="testimonials-title" class="section__title">${title}</h2>
          <div class="quotes">
            ${ctx.testimonials.map(
              (item) => html`<figure class="quote">
                <blockquote><p>${t(item.quote, lang)}</p></blockquote>
                <figcaption><strong>${item.author}</strong>, ${t(item.role, lang)}${item.organisation ? `, ${item.organisation}` : ""}</figcaption>
              </figure>`,
            )}
          </div>
        </div>
      </section>`
    : "";

export const render = (lang, ctx) => {
  const c = copy[lang];
  const n = ctx.stats.members;
  const [h1a, h1b] = c.h1(n);

  return {
    title: c.title,
    description: c.description(n),
    body: html`
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__inner">
        <p class="eyebrow">${c.eyebrow}</p>
        <h1 id="hero-title" class="hero__title">${h1a}<br> <span>${h1b}</span></h1>
        <p class="hero__lead">${c.lead}</p>
        <div class="actions">
          <a class="button button--primary" href="${pagePath("contact", lang)}" data-event="CTA: contact">${c.primary}</a>
          <a class="button button--ghost" href="#crew" data-event="CTA: crew">${ui[lang].meetCrew}</a>
        </div>
      </div>
      <div class="sea" aria-hidden="true">
        ${illustration("boat", 479, 326, "", "sea__boat")}
        <div class="sea__wave sea__wave--back"></div>
        <div class="sea__wave sea__wave--front"></div>
      </div>
    </section>

    <section class="band band--sea" aria-label="${ui[lang].stats.label}">
      <div class="container">${statsBar(ctx.stats, lang)}</div>
    </section>

    <section class="section" aria-labelledby="why-title">
      <div class="container">
        <div class="section__head">
          <h2 id="why-title" class="section__title section__title--large">${c.why.title}</h2>
          <p class="section__lead">${c.why.text}</p>
        </div>
        <ol class="points">
          ${c.why.points.map(([title, text]) => html`<li class="point"><h3 class="point__title">${title}</h3><p>${text}</p></li>`)}
        </ol>
      </div>
    </section>

    <section class="section section--deep" aria-labelledby="problems-title">
      <div class="container problems">
        <h2 id="problems-title" class="section__title section__title--large">${c.problems.title}</h2>
        <ul class="problems__list">
          ${c.problems.items.map((item) => html`<li>${item}</li>`)}
        </ul>
        <div class="problems__closing">
          <p class="problems__punchline">${c.problems.closing[0]} <span>${c.problems.closing[1]}</span></p>
          <a class="button button--primary" href="${pagePath("contact", lang)}" data-event="CTA: contact">${c.problems.cta}</a>
        </div>
        ${illustration("shark", 217, 104, "", "problems__shark")}
      </div>
    </section>

    <section class="section" aria-labelledby="expertise-title">
      <div class="container">
        <div class="section__head">
          <h2 id="expertise-title" class="section__title section__title--large">${c.expertise.title}</h2>
          <p class="section__lead">${c.expertise.text}</p>
        </div>
        <ul class="areas">
          ${areas.map(
            (area) => html`<li class="area">
              <h3 class="area__title"><a href="${pagePath("expertise", lang)}#${area.id}">${t(area.title, lang)}</a></h3>
              <p>${t(area.short, lang)}</p>
            </li>`,
          )}
        </ul>
        <p class="section__more"><a class="link-arrow" href="${pagePath("expertise", lang)}">${c.expertise.more}</a></p>
      </div>
    </section>

    <section id="crew" class="section section--sea" aria-labelledby="crew-title">
      <div class="container">
        <div class="section__head">
          <h2 id="crew-title" class="section__title section__title--large">${c.crew.title}</h2>
          <p class="section__lead">${c.crew.text}</p>
        </div>
        <div class="crew-grid" data-shuffle>
          ${ctx.team.map((member) => memberCard(member, lang))}
        </div>
        <p class="section__more"><a class="link-arrow" href="${pagePath("team", lang)}">${c.crew.all}</a></p>
      </div>
    </section>

    <section class="section" aria-labelledby="how-title">
      <div class="container">
        <h2 id="how-title" class="section__title section__title--large">${c.how.title}</h2>
        <ol class="steps">
          ${c.how.steps.map(([title, text]) => html`<li class="step"><h3 class="step__title">${title}</h3><p>${text}</p></li>`)}
        </ol>
        ${contractNote(lang)}
      </div>
    </section>

    ${testimonialsSection(lang, ctx, c.testimonials)}

    ${ctaBlock(lang)}
    `,
  };
};
