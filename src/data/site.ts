import type { Locale } from '@/i18n/config';

/**
 * Non-markdown site content. Markdown is reserved for long-form work
 * (projects, and later blog posts); short structured content lives here.
 *
 * TODO: replace the placeholder values below with real details.
 */

export const site = {
  name: 'Tanawat Chanhom',
  email: 'tanawatchanhom27@gmail.com',
  github: 'https://github.com/Tanawat-Chanhom',
  // TODO: add the real LinkedIn URL, or delete this entry to hide the link.
  linkedin: '',
};

export type SocialLink = {
  label: string;
  href: string;
  /** Phosphor icon name, resolved in the SocialLinks component. */
  icon: 'github' | 'linkedin' | 'envelope';
};

export const socialLinks: SocialLink[] = [
  { label: 'GitHub', href: site.github, icon: 'github' },
  ...(site.linkedin ? [{ label: 'LinkedIn', href: site.linkedin, icon: 'linkedin' as const }] : []),
  { label: 'Email', href: `mailto:${site.email}`, icon: 'envelope' },
];

/**
 * Skills are rendered as mono pills. Names are proper nouns, so they are not
 * translated — only the section heading is.
 */
export const skills: string[] = [
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Tailwind CSS',
  'GraphQL',
  'PostgreSQL',
  'Storybook',
  'Vitest',
  'Playwright',
  'Docker',
  'AWS',
  'Figma',
  'Git',
];

export type ExperienceItem = {
  /** Machine-readable start, used for sorting and <time datetime>. */
  start: string;
  /** null means "currently here" — rendered as the localized "Present". */
  end: string | null;
  role: Record<Locale, string>;
  company: string;
  location: Record<Locale, string>;
};

/** TODO: replace with real roles. Newest first. */
export const experience: ExperienceItem[] = [
  {
    start: '2024',
    end: null,
    role: { en: 'Senior Software Engineer', th: 'วิศวกรซอฟต์แวร์อาวุโส' },
    company: 'Acme Technology',
    location: { en: 'Bangkok, Thailand', th: 'กรุงเทพฯ ประเทศไทย' },
  },
  {
    start: '2022',
    end: '2024',
    role: { en: 'Software Engineer', th: 'วิศวกรซอฟต์แวร์' },
    company: 'Northwind Labs',
    location: { en: 'Bangkok, Thailand', th: 'กรุงเทพฯ ประเทศไทย' },
  },
  {
    start: '2020',
    end: '2022',
    role: { en: 'Frontend Developer', th: 'นักพัฒนา Frontend' },
    company: 'Harbor Studio',
    location: { en: 'Remote', th: 'ทำงานทางไกล' },
  },
];
