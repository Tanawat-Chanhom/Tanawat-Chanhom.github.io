import type { Locale } from '@/i18n/config';

/**
 * Non-markdown site content. Markdown is reserved for long-form work
 * (projects, and later blog posts); short structured content lives here.
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
  'JavaScript',
  'Go',
  'Python',
  'React',
  'Next.js',
  'React Native',
  'HTML & CSS',
  'Material UI',
  'Node.js',
  'Express.js',
  'MongoDB',
  'Firebase',
  'LINE API',
  'Docker',
  'Git',
  'Adobe XD',
];

export type ExperienceItem = {
  /** Machine-readable start, used for sorting and <time datetime>. */
  start: string;
  /**
   * null means "currently here" — rendered as the localized "Present".
   * Equal to `start` for something that began and ended in the same year.
   */
  end: string | null;
  role: Record<Locale, string>;
  /** Company, event, or school. A proper noun, so not translated. */
  org: string;
  /** Short label in the right-hand column: employment type, result, etc. */
  note?: Record<Locale, string>;
  /** One or two sentences on what the work actually was. */
  summary?: Record<Locale, string>;
  /** External write-up, demo, or repo. Opens in a new tab. */
  link?: { href: string; label: Record<Locale, string> };
};

/** Newest first. */
export const experience: ExperienceItem[] = [
  {
    start: '2021',
    end: '2021',
    role: { en: 'Competitor', th: 'ผู้เข้าแข่งขัน' },
    org: 'Shopee Code League 2021',
    note: { en: 'Competition', th: 'การแข่งขัน' },
  },
  {
    start: '2020',
    end: '2020',
    role: { en: 'Front-end Developer', th: 'นักพัฒนา Front-end' },
    org: 'LINE Hackathon 2020',
    note: { en: 'Top 20 finalist', th: 'เข้ารอบ 20 ทีมสุดท้าย' },
    summary: {
      en: 'Built the web pages, Flex Messages and LIFF apps for a LINE-based tool that makes everyday school life smoother for students and teachers.',
      th: 'สร้างหน้าเว็บ Flex Message และ LIFF สำหรับเครื่องมือบน LINE ที่ช่วยให้นักเรียนและครูใช้ LINE ในชีวิตประจำวันได้มีประสิทธิภาพมากขึ้น',
    },
  },
  {
    start: '2020',
    end: '2020',
    role: { en: 'Participant', th: 'ผู้เข้าร่วม' },
    org: 'LINE Chatbot Workshop 2020',
    note: { en: 'Workshop', th: 'เวิร์กช็อป' },
  },
  {
    start: '2020',
    end: '2020',
    role: { en: 'Front-end Developer', th: 'นักพัฒนา Front-end' },
    org: 'CPF Hackathon 2020',
    note: { en: '2nd runner-up', th: 'รองชนะเลิศอันดับสอง' },
    summary: {
      en: 'Built a real-time dashboard for tracking and managing product shipments, so deliveries could be dispatched as efficiently as possible.',
      th: 'สร้างหน้าเว็บ dashboard แสดงข้อมูลการขนส่งสินค้าแบบ real-time เพื่อให้จัดการการส่งสินค้าได้อย่างมีประสิทธิภาพสูงสุด',
    },
    link: {
      href: 'https://www.it.kmitl.ac.th/th/posts/%E0%B9%80%E0%B8%94%E0%B9%87%E0%B8%81%E0%B9%84%E0%B8%AD%E0%B8%97%E0%B8%B5%E0%B8%A5%E0%B8%B2%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9A%E0%B8%B1%E0%B8%87%E0%B8%84%E0%B8%A7%E0%B9%89%E0%B8%B2-2',
      label: { en: 'Read the article (Thai)', th: 'อ่านบทความ' },
    },
  },
  {
    start: '2019',
    end: '2019',
    role: { en: 'Back-end Developer', th: 'นักพัฒนา Back-end' },
    org: 'KMITL Open House 2019',
    note: { en: 'University event', th: 'งานของมหาวิทยาลัย' },
    summary: {
      en: 'Built the authentication API for the event system.',
      th: 'สร้าง API สำหรับยืนยันตัวตน (auth) ของระบบงาน',
    },
  },
  {
    start: '2019',
    end: '2019',
    role: { en: 'Back-end Developer', th: 'นักพัฒนา Back-end' },
    org: 'IT Freshy 2019',
    note: { en: 'University event', th: 'งานของมหาวิทยาลัย' },
    summary: {
      en: 'Built the authentication API, including Facebook login, that attendees used to sign in to the event system.',
      th: 'สร้าง API สำหรับยืนยันตัวตน รวมถึงการเข้าสู่ระบบด้วย Facebook เพื่อให้ผู้เข้าร่วมใช้เข้าระบบของงาน',
    },
  },
  {
    start: '2018',
    end: '2019',
    role: { en: 'Back-end Developer', th: 'นักพัฒนา Back-end' },
    org: 'Lattesoft Thailand',
    note: { en: 'Internship', th: 'ฝึกงาน' },
    summary: {
      en: 'Worked on the back office for UTNai and Krutransform: wrote the APIs and designed the databases to meet client requirements.',
      th: 'ทำระบบหลังบ้านของ UTNai และ Krutransform โดยเขียน API และออกแบบฐานข้อมูลให้ตรงกับความต้องการของลูกค้า',
    },
  },
];

/** Same shape as `experience`; `role` holds the programme. Newest first. */
export const education: ExperienceItem[] = [
  {
    start: '2018',
    end: '2022',
    role: {
      en: 'Information Technology, Software Engineering major',
      th: 'เทคโนโลยีสารสนเทศ เอกวิศวกรรมซอฟต์แวร์',
    },
    org: "King Mongkut's Institute of Technology Ladkrabang",
    note: { en: 'Faculty of IT', th: 'คณะเทคโนโลยีสารสนเทศ' },
  },
  {
    start: '2012',
    end: '2018',
    role: { en: 'Secondary school, Math–English program', th: 'มัธยมศึกษา แผนการเรียนคณิต-อังกฤษ' },
    org: 'Saipanya Rangsit School',
  },
];
