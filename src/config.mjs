// Site-wide settings. Everything that is the same on every page lives here.

export const site = {
  name: "Bigger Boat",
  url: "https://biggerboat.nl",
  languages: ["nl", "en"],
  defaultLanguage: "nl",
  email: "hello@biggerboat.nl",

  // TODO: add the Bigger Boat company page once it exists, it shows up in the footer and structured data.
  linkedin: null,

  // Privacy friendly analytics, off until configured. Plausible (or a self-hosted, compatible script) works
  // out of the box, the site sends custom events for contact clicks, CTAs, language switches and outbound links.
  // Example: { script: "https://plausible.io/js/script.tagged-events.outbound-links.js", domain: "biggerboat.nl" }
  analytics: null,
};

export const locales = {
  nl: { htmlLang: "nl", ogLocale: "nl_NL", label: "Nederlands", short: "NL" },
  en: { htmlLang: "en", ogLocale: "en_GB", label: "English", short: "EN" },
};
