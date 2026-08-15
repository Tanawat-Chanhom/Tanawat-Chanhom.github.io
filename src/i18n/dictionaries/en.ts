/**
 * English dictionary — the source of truth for the shape of all translations.
 * `Dictionary` is derived from this object, so adding a key here makes every
 * other locale fail typecheck until it is translated too.
 */
export const en = {
  meta: {
    title: 'Tanawat Chanhom — Software Engineer',
    description:
      'Portfolio of Tanawat Chanhom, a software engineer building fast, accessible web interfaces.',
    projectsTitle: 'Projects',
  },
  nav: {
    skipToContent: 'Skip to content',
    home: 'Home',
    about: 'About',
    work: 'Work',
    contact: 'Contact',
    primaryLabel: 'Primary',
    socialLabel: 'Social profiles',
    languageLabel: 'Language',
    switchToThai: 'อ่านภาษาไทย',
    switchToEnglish: 'Read in English',
  },
  hero: {
    eyebrow: 'Software Engineer',
    headline: 'Selected Work',
    tagline: 'I design and build fast, accessible interfaces for the web.',
    location: 'Bangkok, Thailand',
    availability: 'Open to opportunities',
  },
  about: {
    eyebrow: 'About',
    statement: 'I build fast, accessible web interfaces that get out of the way.',
    body: 'Frontend-focused engineer with a bias for shipping. I care about performance budgets, semantic markup, and design systems that survive contact with a real team. Most of my work lives at the seam between design and engineering.',
  },
  skills: {
    eyebrow: 'Skills',
    heading: 'Tech Stack',
  },
  projects: {
    eyebrow: 'Work',
    heading: 'Projects',
    viewProject: 'View project',
    empty: 'No projects published yet.',
    columnCategory: 'Category',
    columnProject: 'Project',
    columnYear: 'Year',
  },
  projectDetail: {
    backToWork: 'Back to work',
    viewLive: 'View live',
    overview: 'Overview',
    published: 'Published',
  },
  experience: {
    eyebrow: 'Experience',
    heading: 'Where I have worked',
    present: 'Present',
  },
  contact: {
    eyebrow: 'Contact',
    heading: "Let's talk",
    body: 'The fastest way to reach me is email. I read everything.',
    emailLabel: 'Email',
  },
  footer: {
    builtWith: 'Built with Next.js and Tailwind CSS.',
    rights: 'All rights reserved.',
    backToTop: 'Back to top',
  },
  notFound: {
    title: 'Page not found',
    body: 'That page does not exist — it may have moved or never existed at all.',
    cta: 'Go home',
  },
};

/**
 * Deliberately no `as const`: values must widen to `string` so other locales
 * are checked for *shape*, not for matching the English text verbatim.
 */
export type Dictionary = typeof en;
