// The five ways to work with Bigger Boat. Used on the homepage (short) and the expertise page (full).

export const areas = [
  {
    id: "build",
    title: { en: "Build", nl: "Bouwen" },
    heading: { en: "Build: websites, applications and digital products", nl: "Bouwen: websites, applicaties en digitale producten" },
    short: {
      en: "Websites, web applications, SaaS platforms and digital products, built by people who have shipped plenty of them.",
      nl: "Websites, webapplicaties, SaaS-platforms en digitale producten, gebouwd door mensen die er al veel hebben opgeleverd.",
    },
    intro: {
      en: [
        "From a complex website to a SaaS platform: we build software that still makes sense a few years from now. With one senior developer, or a small team that covers frontend, backend and everything in between.",
        "Proof-of-concept first? Also fine. A prototype that answers the right question beats a roadmap that answers none.",
      ],
      nl: [
        "Van een complexe website tot een SaaS-platform: we bouwen software die over een paar jaar nog steeds logisch in elkaar zit. Met één senior developer, of met een klein team dat frontend, backend en alles daartussen afdekt.",
        "Eerst een proof-of-concept? Ook prima. Een prototype dat de juiste vraag beantwoordt, is meer waard dan een roadmap die er geen enkele beantwoordt.",
      ],
    },
    examples: {
      en: [
        "Complex websites and web applications",
        "SaaS platforms and digital products",
        "Proof-of-concepts and prototypes",
        "Creative development, animation, WebGL and realtime 3D",
        "Mobile apps",
        "AI features that need to work outside the demo",
      ],
      nl: [
        "Complexe websites en webapplicaties",
        "SaaS-platforms en digitale producten",
        "Proof-of-concepts en prototypes",
        "Creative development, animatie, WebGL en realtime 3D",
        "Mobiele apps",
        "AI-functionaliteit die ook buiten de demo werkt",
      ],
    },
    disciplines: ["frontend", "backend", "creative", "games", "ai", "mobile"],
  },
  {
    id: "lead",
    title: { en: "Lead", nl: "Leiden" },
    heading: { en: "Lead: technical leadership and architecture", nl: "Leiden: technisch leiderschap en architectuur" },
    short: {
      en: "Technical leadership, software architecture and engineering direction for teams that need a steady hand.",
      nl: "Technisch leiderschap, software-architectuur en richting voor teams die een ervaren hand nodig hebben.",
    },
    intro: {
      en: [
        "Good teams stall without direction. A senior technical lead or architect makes the calls that keep a product moving: what to build, what not to build, and how to keep it maintainable.",
        "Interim, part-time or for the length of a project. Hands on keyboard where it helps.",
      ],
      nl: [
        "Goede teams lopen vast zonder richting. Een senior technical lead of architect neemt de beslissingen die een product in beweging houden: wat je bouwt, wat je juist niet bouwt en hoe het onderhoudbaar blijft.",
        "Interim, parttime of voor de duur van een project. En waar het helpt ook gewoon zelf aan de code.",
      ],
    },
    examples: {
      en: [
        "Technical lead or interim tech lead",
        "Software architecture and system design",
        "Engineering practices: testing, CI/CD and code quality",
        "Product and technology strategy, up to CTO and CPO level",
        "Leading and growing (international) development teams",
      ],
      nl: [
        "Technical lead of interim tech lead",
        "Software-architectuur en systeemontwerp",
        "Engineering practices: testen, CI/CD en codekwaliteit",
        "Product- en technologiestrategie, tot op CTO- en CPO-niveau",
        "(Internationale) developmentteams leiden en laten groeien",
      ],
    },
    disciplines: ["leadership", "architecture", "product", "engineering"],
  },
  {
    id: "strengthen",
    title: { en: "Strengthen", nl: "Versterken" },
    heading: { en: "Strengthen: senior developers for your team", nl: "Versterken: senior developers voor je team" },
    short: {
      en: "Add senior developers to your existing team, for a sprint, a quarter or a whole product.",
      nl: "Voeg senior developers toe aan je bestaande team, voor een sprint, een kwartaal of een heel product.",
    },
    intro: {
      en: [
        "Need more hands? Get better brains instead. Senior developers need little onboarding, raise the level of the people around them and don't need someone checking their work.",
        "Need one developer today and three more next month? The network makes that possible without starting a new search every time.",
      ],
      nl: [
        "Meer handen nodig? Neem liever betere breinen. Senior developers hebben weinig inwerktijd nodig, tillen de mensen om zich heen naar een hoger niveau en hebben niemand nodig die hun werk controleert.",
        "Vandaag één developer nodig en volgende maand nog drie? Het netwerk maakt dat mogelijk, zonder dat je elke keer opnieuw hoeft te zoeken.",
      ],
    },
    examples: {
      en: [
        "One senior developer to reinforce your team",
        "Several developers at once, who know how to work together",
        "Frontend, backend or full-stack capacity",
        "Extra technical firepower for agencies",
        "Coaching and mentoring for your own developers",
      ],
      nl: [
        "Eén senior developer om je team te versterken",
        "Meerdere developers tegelijk, die weten hoe ze moeten samenwerken",
        "Frontend-, backend- of full-stackcapaciteit",
        "Extra technische slagkracht voor bureaus",
        "Coaching en begeleiding van je eigen developers",
      ],
    },
    disciplines: ["frontend", "backend", "coaching"],
  },
  {
    id: "rescue",
    title: { en: "Rescue", nl: "Rechttrekken" },
    heading: { en: "Rescue: projects that have gone off course", nl: "Rechttrekken: projecten die uit koers zijn" },
    short: {
      en: "Untangle technical debt, broken architecture and projects that have gone off course.",
      nl: "Technische schuld, vastgelopen architectuur en ontspoorde projecten weer op koers brengen.",
    },
    intro: {
      en: [
        "Every release takes longer, every fix breaks something else, and nobody dares touch that one part of the codebase. We've seen it before. More than once.",
        "First we find out what's actually wrong. Then we fix what matters most, without stopping everything for a big rewrite nobody asked for.",
      ],
      nl: [
        "Elke release duurt langer, elke fix maakt iets anders stuk en niemand durft dat ene deel van de code nog aan te raken. Dat hebben we eerder gezien. Vaker dan eens.",
        "Eerst zoeken we uit wat er echt mis is. Daarna lossen we op wat het meest oplevert, zonder alles stil te leggen voor een grote rewrite waar niemand om vroeg.",
      ],
    },
    examples: {
      en: [
        "Legacy modernisation",
        "Performance problems",
        "Technical debt that slows down every release",
        "Projects that have stalled or gone off the rails",
        "Architecture that doesn't scale with the business",
      ],
      nl: [
        "Legacy moderniseren",
        "Performanceproblemen",
        "Technische schuld die elke release vertraagt",
        "Projecten die zijn vastgelopen of ontspoord",
        "Architectuur die niet meegroeit met de organisatie",
      ],
    },
    disciplines: ["architecture", "engineering", "leadership"],
  },
  {
    id: "advise",
    title: { en: "Advise", nl: "Adviseren" },
    heading: { en: "Advise: reviews, audits and second opinions", nl: "Adviseren: reviews, audits en second opinions" },
    short: {
      en: "Code reviews, architecture reviews, audits, technical strategy and honest second opinions.",
      nl: "Code reviews, architectuurreviews, audits, technische strategie en eerlijke second opinions.",
    },
    intro: {
      en: [
        "Sometimes you don't need more developers. You need someone who has seen enough projects to tell you whether you're on the right track, and who has no reason to sell you anything else.",
        "Clear findings, clear priorities, in language your whole team understands.",
      ],
      nl: [
        "Soms heb je geen extra developers nodig, maar iemand die genoeg projecten heeft gezien om te vertellen of je op de goede weg bent. En die geen reden heeft om je iets anders te verkopen.",
        "Heldere bevindingen en heldere prioriteiten, in taal die je hele team begrijpt.",
      ],
    },
    examples: {
      en: [
        "Code reviews",
        "Architecture reviews",
        "Technical audits",
        "Second opinions on plans, quotes and approaches",
        "Technical strategy",
        "Performance and accessibility reviews",
      ],
      nl: [
        "Code reviews",
        "Architectuurreviews",
        "Technische audits",
        "Second opinions op plannen, offertes en aanpak",
        "Technische strategie",
        "Performance- en toegankelijkheidsreviews",
      ],
    },
    disciplines: ["architecture", "leadership", "product", "ux"],
  },
];
