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
    statement: 'I build web software end to end, from the API to the interface.',
    body: 'I studied Information Technology at KMITL, majoring in software engineering, and I have worked on both sides of the stack. As an intern at Lattesoft I wrote APIs and designed databases for client back offices. At hackathons I built a real-time logistics dashboard that took second runner-up at CPF Hackathon 2020, and LINE LIFF apps that reached the final 20 at LINE Hackathon 2020. Lately I have been building git-khong-song, a self-hosted git forge in Go and Next.js.',
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
    heading: 'Work & activities',
    present: 'Present',
  },
  education: {
    eyebrow: 'Education',
    heading: 'Where I studied',
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
