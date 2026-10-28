import type { Dictionary } from './en';

/**
 * Thai dictionary. Typed as `Dictionary`, so it will not compile until every
 * key present in the English source has a Thai counterpart.
 */
export const th: Dictionary = {
  meta: {
    title: 'ธนวัตน์ จันทร์หอม — Software Engineer',
    description:
      'ผลงานของธนวัตน์ จันทร์หอม วิศวกรซอฟต์แวร์ผู้สร้างเว็บอินเทอร์เฟซที่เร็วและเข้าถึงได้',
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
    statement: 'ผมสร้างซอฟต์แวร์บนเว็บได้ครบทั้งระบบ ตั้งแต่ API จนถึงหน้าจอ',
    body: 'ผมเรียนเทคโนโลยีสารสนเทศที่ สจล. เอกวิศวกรรมซอฟต์แวร์ และทำงานมาทั้งฝั่ง back-end และ front-end ตอนฝึกงานที่ Lattesoft ผมเขียน API และออกแบบฐานข้อมูลให้ระบบหลังบ้านของลูกค้า ส่วนในงานแฮกกาธอน ผมทำ dashboard ติดตามการขนส่งแบบ real-time ที่ได้รองชนะเลิศอันดับสองใน CPF Hackathon 2020 และแอป LINE LIFF ที่เข้ารอบ 20 ทีมสุดท้ายใน LINE Hackathon 2020 ช่วงนี้ผมกำลังสร้าง git-khong-song ซึ่งเป็น git forge แบบ self-hosted ที่เขียนด้วย Go และ Next.js',
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
    heading: 'การทำงานและกิจกรรม',
    present: 'ปัจจุบัน',
  },
  education: {
    eyebrow: 'การศึกษา',
    heading: 'ประวัติการศึกษา',
  },
  contact: {
    eyebrow: 'ติดต่อ',
    heading: 'คุยกันได้',
    body: 'ช่องทางที่เร็วที่สุดคืออีเมล ผมอ่านทุกฉบับ',
    emailLabel: 'อีเมล',
  },
  footer: {
    builtWith: 'สร้างด้วย Next.js และ Tailwind CSS',
    craftedWith: 'สร้างสรรค์ร่วมกับ Claude',
    rights: 'สงวนลิขสิทธิ์',
    backToTop: 'กลับขึ้นด้านบน',
  },
  notFound: {
    title: 'ไม่พบหน้านี้',
    body: 'หน้าที่คุณเปิดไม่มีอยู่ อาจถูกย้ายไปแล้วหรือไม่เคยมีมาก่อน',
    cta: 'กลับหน้าแรก',
  },
};
