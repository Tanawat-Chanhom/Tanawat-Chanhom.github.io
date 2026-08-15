import type { Dictionary } from './en';

/**
 * Thai dictionary. Typed as `Dictionary`, so it will not compile until every
 * key present in the English source has a Thai counterpart.
 */
export const th: Dictionary = {
  meta: {
    title: 'ธนวัฒน์ จันทร์หอม — Software Engineer',
    description:
      'ผลงานของธนวัฒน์ จันทร์หอม วิศวกรซอฟต์แวร์ผู้สร้างเว็บอินเทอร์เฟซที่เร็วและเข้าถึงได้',
    projectsTitle: 'ผลงาน',
  },
  nav: {
    skipToContent: 'ข้ามไปยังเนื้อหา',
    home: 'หน้าแรก',
    about: 'เกี่ยวกับ',
    work: 'ผลงาน',
    contact: 'ติดต่อ',
    primaryLabel: 'เมนูหลัก',
    socialLabel: 'โซเชียล',
    languageLabel: 'ภาษา',
    switchToThai: 'อ่านภาษาไทย',
    switchToEnglish: 'Read in English',
  },
  hero: {
    eyebrow: 'Software Engineer',
    headline: 'ผลงานที่คัดสรร',
    tagline: 'ผมออกแบบและพัฒนาอินเทอร์เฟซบนเว็บที่เร็วและเข้าถึงได้',
    location: 'กรุงเทพฯ ประเทศไทย',
    availability: 'เปิดรับโอกาสใหม่',
  },
  about: {
    eyebrow: 'เกี่ยวกับ',
    statement: 'ผมสร้างเว็บอินเทอร์เฟซที่เร็ว เข้าถึงได้ และไม่ขวางทางผู้ใช้',
    body: 'วิศวกรสาย frontend ที่เน้นการส่งงานจริง ให้ความสำคัญกับ performance budget, semantic markup และ design system ที่ใช้งานได้จริงกับทีม งานส่วนใหญ่ของผมอยู่ตรงรอยต่อระหว่างงานออกแบบกับงานวิศวกรรม',
  },
  skills: {
    eyebrow: 'ทักษะ',
    heading: 'เทคโนโลยีที่ใช้',
  },
  projects: {
    eyebrow: 'ผลงาน',
    heading: 'โปรเจกต์',
    viewProject: 'ดูผลงาน',
    empty: 'ยังไม่มีผลงานที่เผยแพร่',
    columnCategory: 'หมวดหมู่',
    columnProject: 'โปรเจกต์',
    columnYear: 'ปี',
  },
  projectDetail: {
    backToWork: 'กลับไปหน้าผลงาน',
    viewLive: 'ดูเว็บจริง',
    overview: 'ภาพรวม',
    published: 'เผยแพร่เมื่อ',
  },
  experience: {
    eyebrow: 'ประสบการณ์',
    heading: 'ประวัติการทำงาน',
    present: 'ปัจจุบัน',
  },
  contact: {
    eyebrow: 'ติดต่อ',
    heading: 'คุยกันได้',
    body: 'ช่องทางที่เร็วที่สุดคืออีเมล ผมอ่านทุกฉบับ',
    emailLabel: 'อีเมล',
  },
  footer: {
    builtWith: 'สร้างด้วย Next.js และ Tailwind CSS',
    rights: 'สงวนลิขสิทธิ์',
    backToTop: 'กลับขึ้นด้านบน',
  },
  notFound: {
    title: 'ไม่พบหน้านี้',
    body: 'หน้าที่คุณเปิดไม่มีอยู่ อาจถูกย้ายไปแล้วหรือไม่เคยมีมาก่อน',
    cta: 'กลับหน้าแรก',
  },
};
