import { site } from "../config.mjs";
import { html, md } from "../lib/html.mjs";
import { pagePath } from "../lib/routes.mjs";
import { ui } from "../lib/ui.mjs";

// TODO: if Bigger Boat is (or becomes) a registered legal entity, add its name, address and KvK number here and in the footer.

const updated = { en: "15 September 2026", nl: "15 september 2026" };
const githubPrivacy = "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement";

const copy = {
  en: {
    title: "Privacy | Bigger Boat",
    description: "How the Bigger Boat website handles your data: no cookies, no forms, no tracking across the web.",
    h1: "Privacy",
    lead: "The short version: this website doesn't set cookies, doesn't track you across the web and has no forms that collect your data.",
    sections: [
      ["Hosting", [`This website is hosted on GitHub Pages. Like any web server, GitHub processes technical data such as your IP address to deliver the pages and keep the service secure. Read more in [GitHub's privacy statement](${githubPrivacy}).`]],
      [
        "Analytics",
        [
          site.analytics
            ? `We use ${site.analytics.name ?? "privacy-friendly analytics"} without cookies to count visits and clicks on contact links, so we know whether the site does its job. It doesn't collect personal data and doesn't build profiles.`
            : "We don't use analytics or any other tracking on this website.",
        ],
      ],
      ["Fonts and other files", ["All fonts, images and scripts are served from this domain. There are no third-party embeds, ads or social media widgets."]],
      [
        "When you contact us",
        [
          `If you email ${site.email} or contact a member directly, your message and contact details are only used to reply and to discuss your question. We don't add you to mailing lists and don't share your details with anyone outside the conversation.`,
          "Bigger Boat members are independent professionals. When you work with a member, that member is responsible for how your data is handled within that work.",
        ],
      ],
      ["Questions", [`Questions about privacy? Email [${site.email}](mailto:${site.email}).`]],
    ],
    updated: `Last updated: ${updated.en}`,
  },
  nl: {
    title: "Privacy | Bigger Boat",
    description: "Hoe de website van Bigger Boat met je gegevens omgaat: geen cookies, geen formulieren, geen tracking over het web.",
    h1: "Privacy",
    lead: "De korte versie: deze website plaatst geen cookies, volgt je niet over het web en heeft geen formulieren die je gegevens verzamelen.",
    sections: [
      ["Hosting", [`Deze website draait op GitHub Pages. Zoals elke webserver verwerkt GitHub technische gegevens, zoals je IP-adres, om de pagina's te leveren en de dienst veilig te houden. Lees meer in de [privacyverklaring van GitHub](${githubPrivacy}).`]],
      [
        "Analytics",
        [
          site.analytics
            ? `We gebruiken ${site.analytics.name ?? "privacyvriendelijke analytics"} zonder cookies om bezoeken en klikken op contactlinks te tellen, zodat we weten of de site zijn werk doet. Er worden geen persoonsgegevens verzameld en geen profielen opgebouwd.`
            : "We gebruiken geen analytics of andere tracking op deze website.",
        ],
      ],
      ["Lettertypen en andere bestanden", ["Alle lettertypen, afbeeldingen en scripts komen van dit domein. Er zijn geen embeds van derden, advertenties of social media-widgets."]],
      [
        "Als je contact opneemt",
        [
          `Mail je naar ${site.email} of neem je direct contact op met een lid, dan gebruiken we je bericht en contactgegevens alleen om te reageren en je vraag te bespreken. We zetten je niet op mailinglijsten en delen je gegevens met niemand buiten het gesprek.`,
          "Leden van Bigger Boat zijn zelfstandige professionals. Werk je samen met een lid, dan is dat lid verantwoordelijk voor hoe er binnen dat werk met je gegevens wordt omgegaan.",
        ],
      ],
      ["Vragen", [`Vragen over privacy? Mail naar [${site.email}](mailto:${site.email}).`]],
    ],
    updated: `Laatst bijgewerkt: ${updated.nl}`,
  },
};

export const render = (lang) => {
  const c = copy[lang];

  return {
    title: c.title,
    description: c.description,
    breadcrumbs: [
      { name: ui[lang].home, path: pagePath("home", lang) },
      { name: ui[lang].privacy, path: pagePath("privacy", lang) },
    ],
    body: html`
    <header class="page-head">
      <div class="container narrow">
        <h1 class="page-head__title">${c.h1}</h1>
        <p class="page-head__lead">${c.lead}</p>
      </div>
    </header>
    <div class="section section--flush-top">
      <div class="container narrow prose">
        ${c.sections.map(([title, texts]) => html`<h2>${title}</h2>${texts.map((text) => html`<p>${md(text)}</p>`)}`)}
        <p class="small-print">${c.updated}</p>
      </div>
    </div>
    `,
  };
};
