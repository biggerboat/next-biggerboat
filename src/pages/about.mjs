import { html } from "../lib/html.mjs";
import { pagePath } from "../lib/routes.mjs";
import { contractNote, ctaBlock, statsBar, ui } from "../lib/ui.mjs";

const copy = {
  en: {
    title: "Why Bigger Boat Exists: A Senior Developer Collective | Bigger Boat",
    description:
      "Bigger Boat is a network of senior independent developers who know and trust each other. You work and contract directly with the people doing the work.",
    h1: "Some projects just need a bigger boat",
    lead: "Bigger Boat is a network of experienced independent developers, engineers and technical leads who know each other, trust each other and like solving hard problems together.",
    why: {
      title: "Why we exist",
      text: [
        "Hiring one senior developer is hard. Hiring several who work well together is harder.",
        "Agencies solve that, but put account managers, sales and handovers between you and the people doing the work. Freelance platforms remove that layer, but leave you to vet, combine and manage everyone yourself.",
        "Bigger Boat sits in between: a network of experienced independent professionals who can quickly put together the right combination of people for your problem. Agency-level expertise, freelancer-level flexibility, without the agency layer.",
      ],
    },
    how: {
      title: "How the collective works",
      items: [
        ["Independent professionals", "Every member runs their own business and has a long track record. Bigger Boat is the network that connects them."],
        ["You contract directly", "You agree on the work and sign the contract directly with the professionals involved. There is no agency acting as the main contractor in between."],
        ["The right combination", "Need one person? You talk to one person. Need a team? Members bring in people from the network they know and trust, so you don't have to."],
        ["No agency layer", "No account managers, no sales team and no handovers. The person you talk to is the person who does the work."],
      ],
    },
    tested: {
      title: "We've seen frameworks come and go",
      text: [
        "Browser wars. Flash. jQuery. Responsive design. Single-page apps. Cloud migrations. Several generations of JavaScript frameworks.",
        "We're still here.",
        "That's not nostalgia. It means we've seen which technical decisions age well and which ones come back to haunt a team two years later. That's usually what clients are really hiring.",
      ],
    },
    not: {
      title: "What we're not",
      items: [
        "Not a recruitment agency.",
        "Not an outsourcing company.",
        "Not a marketplace of random freelancers.",
        "Not a traditional agency with a sales department.",
      ],
      closing: "Just a group of very experienced people you can talk to directly.",
    },
  },
  nl: {
    title: "Over Bigger Boat: een collectief van senior developers | Bigger Boat",
    description:
      "Bigger Boat is een netwerk van senior zelfstandige developers die elkaar kennen en vertrouwen. Je werkt en contracteert rechtstreeks met wie het werk doet.",
    h1: "Sommige projecten hebben gewoon een grotere boot nodig",
    lead: "Bigger Boat is een netwerk van ervaren zelfstandige developers, engineers en technical leads die elkaar kennen, elkaar vertrouwen en graag samen lastige problemen oplossen.",
    why: {
      title: "Waarom we bestaan",
      text: [
        "Eén senior developer vinden is lastig. Meerdere vinden die ook nog goed samenwerken is nog lastiger.",
        "Een bureau lost dat op, maar zet accountmanagers, sales en overdrachtsmomenten tussen jou en de mensen die het werk doen. Freelanceplatforms halen die laag weg, maar laten het selecteren, combineren en aansturen aan jou over.",
        "Bigger Boat zit daartussen: een netwerk van ervaren zelfstandige professionals dat snel de juiste combinatie van mensen voor jouw probleem samenstelt. De slagkracht van een bureau, de flexibiliteit van freelancers, zonder de bureaulaag ertussen.",
      ],
    },
    how: {
      title: "Zo werkt het collectief",
      items: [
        ["Zelfstandige professionals", "Elk lid heeft een eigen bedrijf en een lange staat van dienst. Bigger Boat is het netwerk dat ze verbindt."],
        ["Je contracteert rechtstreeks", "Je maakt afspraken en sluit contracten rechtstreeks met de professionals die het werk doen. Er zit geen bureau als hoofdaannemer tussen."],
        ["De juiste combinatie", "Eén persoon nodig? Dan praat je met één persoon. Een team nodig? Leden halen mensen uit het netwerk erbij die ze kennen en vertrouwen, zodat jij dat niet hoeft te doen."],
        ["Geen bureaulaag", "Geen accountmanagers, geen salesteam en geen overdrachten. De persoon met wie je praat, is de persoon die het werk doet."],
      ],
    },
    tested: {
      title: "We hebben frameworks zien komen en gaan",
      text: [
        "Browseroorlogen. Flash. jQuery. Responsive design. Single-page apps. Cloudmigraties. Meerdere generaties JavaScript-frameworks.",
        "We zijn er nog.",
        "Dat is geen nostalgie. Het betekent dat we hebben gezien welke technische keuzes goed ouder worden, en welke een team twee jaar later opbreken. Dat is meestal precies waarvoor klanten ons inhuren.",
      ],
    },
    not: {
      title: "Wat we niet zijn",
      items: [
        "Geen recruitmentbureau.",
        "Geen outsourcingbedrijf.",
        "Geen marktplaats van willekeurige freelancers.",
        "Geen traditioneel bureau met een salesafdeling.",
      ],
      closing: "Gewoon een groep zeer ervaren mensen met wie je rechtstreeks praat.",
    },
  },
};

export const render = (lang, ctx) => {
  const c = copy[lang];

  return {
    title: c.title,
    description: c.description,
    breadcrumbs: [
      { name: ui[lang].home, path: pagePath("home", lang) },
      { name: ui[lang].nav.about, path: pagePath("about", lang) },
    ],
    body: html`
    <header class="page-head">
      <div class="container">
        <h1 class="page-head__title">${c.h1}</h1>
        <p class="page-head__lead">${c.lead}</p>
      </div>
    </header>

    <section class="band band--sea" aria-label="${ui[lang].stats.label}">
      <div class="container">${statsBar(ctx.stats, lang)}</div>
    </section>

    <section class="section" aria-labelledby="why-title">
      <div class="container narrow">
        <h2 id="why-title" class="section__title section__title--large">${c.why.title}</h2>
        <div class="prose section__lead">${c.why.text.map((text) => html`<p>${text}</p>`)}</div>
      </div>
    </section>

    <section class="section section--tint" aria-labelledby="how-title">
      <div class="container">
        <h2 id="how-title" class="section__title section__title--large">${c.how.title}</h2>
        <ol class="points">
          ${c.how.items.map(([title, text]) => html`<li class="point"><h3 class="point__title">${title}</h3><p>${text}</p></li>`)}
        </ol>
        ${contractNote(lang)}
      </div>
    </section>

    <section class="section section--deep" aria-labelledby="tested-title">
      <div class="container narrow tested">
        <h2 id="tested-title" class="section__title section__title--large">${c.tested.title}</h2>
        <p class="tested__list">${c.tested.text[0]}</p>
        <p class="tested__punchline">${c.tested.text[1]}</p>
        <p>${c.tested.text[2]}</p>
      </div>
    </section>

    <section class="section" aria-labelledby="not-title">
      <div class="container narrow">
        <h2 id="not-title" class="section__title section__title--large">${c.not.title}</h2>
        <ul class="strike-list">${c.not.items.map((item) => html`<li>${item}</li>`)}</ul>
        <p class="section__lead">${c.not.closing}</p>
        <p class="section__more"><a class="link-arrow" href="${pagePath("team", lang)}">${ui[lang].meetCrew}</a></p>
      </div>
    </section>

    ${ctaBlock(lang)}
    `,
  };
};
