// Loads everything in content/ and derives the numbers shown on the site. Nothing on the site is typed in by hand
// when it can be counted: add a JSON file and every page, stat, sitemap entry and structured data block follows.

import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = new URL("../../content/", import.meta.url).pathname;

export const disciplines = {
  frontend: { en: "Frontend development", nl: "Frontend development" },
  backend: { en: "Backend development", nl: "Backend development" },
  architecture: { en: "Software architecture", nl: "Software-architectuur" },
  leadership: { en: "Technical leadership", nl: "Technisch leiderschap" },
  product: { en: "Product & strategy", nl: "Product & strategie" },
  creative: { en: "Creative development", nl: "Creative development" },
  games: { en: "Games & realtime 3D", nl: "Games & realtime 3D" },
  ai: { en: "AI development", nl: "AI-ontwikkeling" },
  mobile: { en: "Mobile apps", nl: "Mobiele apps" },
  ux: { en: "UX & interaction design", nl: "UX & interaction design" },
  engineering: { en: "Testing, CI/CD & clean code", nl: "Testen, CI/CD & clean code" },
  coaching: { en: "Coaching & training", nl: "Coaching & training" },
};

const readJsonDir = async (dir) => {
  let files;
  try {
    files = (await readdir(join(root, dir))).filter((file) => file.endsWith(".json")).sort();
  } catch {
    return [];
  }
  return Promise.all(
    files.map(async (file) => {
      const data = JSON.parse(await readFile(join(root, dir, file), "utf8"));
      return { slug: file.replace(/\.json$/, ""), ...data };
    }),
  );
};

const fail = (message) => {
  throw new Error(`content: ${message}`);
};

const validateMember = (member) => {
  for (const field of ["name", "role", "shortBio", "bio"]) {
    if (!member[field]) fail(`team/${member.slug}.json is missing "${field}"`);
  }
  for (const lang of ["nl", "en"]) {
    for (const field of ["role", "shortBio", "bio"]) {
      if (!member[field][lang]) fail(`team/${member.slug}.json is missing "${field}.${lang}"`);
    }
  }
  for (const discipline of member.disciplines ?? []) {
    if (!disciplines[discipline]) fail(`team/${member.slug}.json has unknown discipline "${discipline}"`);
  }
};

const currentYear = new Date().getFullYear();

export const loadContent = async () => {
  const everyone = await readJsonDir("team");
  everyone.forEach(validateMember);

  const team = everyone
    .filter((member) => member.available !== false)
    .map((member) => ({
      ...member,
      disciplines: member.disciplines ?? [],
      technologies: member.technologies ?? [],
      expertise: member.expertise ?? [],
      // A career start year stays correct over time, a fixed number of years is the fallback.
      experience: member.careerStartYear ? currentYear - member.careerStartYear : (member.experienceYears ?? null),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "nl"));

  // Cases and testimonials only exist on the site once there is at least one real, published entry.
  const cases = (await readJsonDir("work")).filter((item) => item.published === true);
  const testimonials = (await readJsonDir("testimonials")).filter((item) => item.published === true);

  const usedDisciplines = Object.keys(disciplines).filter((key) => team.some((member) => member.disciplines.includes(key)));
  const withExperience = team.filter((member) => member.experience);
  const everyoneHasExperience = team.length > 0 && withExperience.length === team.length;
  const combinedExperience = withExperience.reduce((sum, member) => sum + member.experience, 0);

  const stats = {
    members: team.length,
    disciplines: usedDisciplines.length,
    // Only published when every member has filled in their experience, a partial sum would undersell the crew
    // and an estimate would be made up.
    combinedExperience: everyoneHasExperience ? combinedExperience : null,
    averageExperience: everyoneHasExperience ? Math.floor(combinedExperience / team.length) : null,
    missingExperience: team.filter((member) => !member.experience).map((member) => member.name),
  };

  return { team, cases, testimonials, stats, usedDisciplines };
};
