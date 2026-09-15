import { site } from "../config.mjs";

// URL structure, the same slugs in both languages: /nl/team/ and /en/team/.
const paths = {
  home: "",
  expertise: "expertise/",
  team: "team/",
  member: "team/{slug}/",
  about: "about/",
  work: "work/",
  case: "work/{slug}/",
  contact: "contact/",
  privacy: "privacy/",
};

export const pagePath = (id, lang, slug) => {
  if (!(id in paths)) throw new Error(`Unknown page "${id}"`);
  return `/${lang}/${paths[id].replace("{slug}", slug)}`;
};

export const absolute = (path) => `${site.url}${path}`;

export const personId = (slug) => `${absolute(pagePath("member", "en", slug))}#person`;
export const organizationId = `${site.url}/#organization`;
export const websiteId = `${site.url}/#website`;
