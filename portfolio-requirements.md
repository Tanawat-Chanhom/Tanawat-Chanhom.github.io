# Portfolio Website — Requirements Summary

## ภาพรวมโปรเจกต์

สร้างเว็บไซต์ Portfolio ส่วนตัว สำหรับ host บน GitHub Pages (`Tanawat-Chanhom.github.io`)

## หมวดผลงาน

- Software / Web Development

## Tech Stack

- **ICON SET:** @phosphor-icons/react
- **package manager:** pnpm
- **language:** TypeScript
- **formatter:** Prettier
- **linting:** ESLint
- **Framework:** Next.js
- **Styling:** Tailwind CSS
  - **CSS-in-JS:** ใช้ Tailwind + `@tailwindcss/typography` สำหรับจัดการ typography
  - **Layout:** Support responsive design (mobile-first)
- **Output:** Static export (`next export` / `output: 'export'`) → HTML/CSS/JS ล้วน
- **Hosting:** GitHub Pages แบบเว็บหลัก (`Tanawat-Chanhom.github.io`)
- **Deploy:** GitHub Actions — build อัตโนมัติทุกครั้งที่ push code ขึ้น repo (ไม่ต้อง build มือ)

## Style / Design Direction

อ้างอิงจาก [nelsonbalaban.com](https://nelsonbalaban.com)

- **Dark theme เท่านั้น** — พื้นหลังดำสนิท ตัวอักษรขาว ไม่ต้องมี light/dark toggle
- **Minimal, ขาว-ดำเป็นหลัก**
- **Typography เป็นพระเอกของหน้าเว็บ** โดยเฉพาะหน้า Projects — ใช้ font sans-serif หนา ตัวใหญ่มาก แบบ headline แทนการใช้การ์ดรูปภาพ
- **Layout แบบ list** เรียงผลงานเป็นแถวต่อกัน แต่ละแถวมี category label เล็กๆ (เช่น BRANDING, CAMPAIGN) อยู่ด้านซ้าย คั่นด้วยเส้นบางๆ ระหว่างแถว
- **Header แบบ fixed + blur effect** ลอยด้านบนตลอดการ scroll
- **Navigation เรียบง่าย** ไม่กี่ลิงก์ (About, Contact) + ลิงก์ social แยกฝั่ง (เช่น GitHub, LinkedIn)
- Section อื่น (About, Skills, Experience) — ยังไม่ตัดสินใจว่าจะใช้ typography-driven list แบบเดียวกันทั้งหมด หรือจัดวางแบบปกติกว่านี้ **(รอ confirm เพิ่มเติมตอนเริ่มออกแบบจริง)**

## Site Structure (Sections)

1. **Hero** — headline ใหญ่ (เช่น "SELECTED WORK") + eyebrow label + role/tagline สั้นๆ
2. **About Me** — ข้อความ statement ตัวใหญ่ (ไม่ใช่ paragraph ปกติ) เน้นเป็นจุดเด่นของหน้า
3. **Skills / Tech Stack** — แสดงเป็น tag/pill เรียงต่อกัน (border, rounded-full, ตัวอักษร mono เล็กๆ)
4. **Projects / ผลงาน** — layout แบบ **typography list** (ยืนยันแล้ว ไม่ใช้ grid/card): แต่ละแถวมี category label ซ้าย + ชื่อโปรเจกต์ตัวใหญ่ตรงกลาง + ปีขวา คั่นด้วยเส้นบางๆ ระหว่างแถว
   - **Hover interaction:** เมื่อ hover แถวผลงาน ให้ thumbnail ของผลงานนั้น fade-in + slide เข้ามาจากด้านขวา (ซ่อนอยู่ปกติ ไม่โชว์ตลอดเวลา) รูป thumbnail ใช้ฟิลเตอร์ grayscale ให้เข้ากับธีมขาว-ดำ พื้นหลังแถวเปลี่ยนสีอ่อนขึ้นเล็กน้อยตอน hover ด้วย
5. **Experience / ประวัติการทำงาน** — layout แบบ grid แถว: ช่วงเวลา (mono font) / ตำแหน่ง+บริษัท / สถานที่
6. **Contact** — headline ใหญ่แบบเดียวกับ Hero + ใช้ลิงก์ `mailto:` + social links เท่านั้น (ไม่ทำฟอร์มส่งอีเมล เพราะ static site ส่งตรงไม่ได้)
7. **Blog** — **ไม่ทำในรอบแรก** ทำเฉพาะโครงหลักก่อน (แต่ให้เผื่อโครงสร้างไว้รองรับในอนาคต เพราะจะใช้ content format เดียวกับ Projects)

### Design Tokens (จาก mockup ที่ยืนยันแล้ว)

- **สี:** พื้นหลัง `#0a0a0a` (เกือบดำสนิท), พื้นหลัง raised/hover `#111111`, ตัวอักษรหลัก `#f2f2f0`, ตัวอักษรรอง (dim) `#8a8a86`, เส้นคั่น `#262624`
- **ฟอนต์:** Display/heading ใช้ font sans-serif น้ำหนักหนา (700–900) เช่น Archivo; ใช้ monospace (เช่น JetBrains Mono) สำหรับ label, category tag, eyebrow text, และตัวอักษรขนาดเล็กทั้งหมด เพื่อสร้าง contrast กับ heading ตัวใหญ่
- **Header:** fixed/sticky ด้านบน มี backdrop blur และพื้นหลังโปร่งแสง

## Content Management (สำคัญ)

ต้องการให้เพิ่มผลงานใหม่ในอนาคตได้ง่าย โดยไม่ต้องแก้โค้ด:

- **Format:** Markdown + YAML frontmatter
- **โครงสร้างไฟล์:** แยก 1 ไฟล์ต่อ 1 ผลงาน เก็บไว้ที่ `content/projects/*.md`
- **Workflow:** สร้างไฟล์ `.md` ใหม่ → commit → push → GitHub Actions build ให้อัตโนมัติ

ตัวอย่างไฟล์ `content/projects/pipefy.md`:

```markdown
---
title: 'Pipefy'
description: 'A workflow management platform that helps teams automate and streamline their processes.'
category: 'BRANDING'
date: '2026-08-01'
link: 'https://example.com'
cover: '/images/pipefy-cover.jpg'
---

รายละเอียดผลงาน เขียนบรรยายยาวๆ ได้ตรงนี้...
```

แนะนำใช้ library `gray-matter` ใน Next.js สำหรับ parse ไฟล์เหล่านี้ตอน build

## เนื้อหาปัจจุบัน

- ยังไม่มีเนื้อหาจริง (resume, รายชื่อผลงาน, รูปโปรไฟล์)
- ต้องการ template / placeholder content ไปก่อน เพื่อให้เห็นโครงหน้าเว็บ แล้วค่อยใส่ข้อมูลจริงทีหลัง

## สิ่งที่ยังไม่ตัดสินใจ / รอ confirm เพิ่มเติม

- ชื่อ font จริงที่จะใช้ (mockup ใช้ Archivo + JetBrains Mono เป็นตัวอย่าง ยังไม่ final)
- Repo name / GitHub username สำหรับตั้งค่า deploy
- รูปภาพ thumbnail จริงของแต่ละผลงาน (mockup ใช้ placeholder จาก picsum.photos ไปก่อน)

## เพิ่มเติม

- ต้องการให้รองรับ **i18n** (ไทย/อังกฤษ)
- อะไรที่เป็น component หน้าเหมือนๆกัน เช่น Header, Footer, Project List Item, Social Links, Contact Section — ให้ทำเป็น reusable component เพื่อใช้ซ้ำได้
- Components ทั้งหมดตเอาไปใส่ใน Storybook เพื่อให้สามารถ preview และ test ได้ง่าย
- Target lighthouse score 100 ที่ performance และ accessibility (เน้น semantic HTML + alt text สำหรับรูปภาพ + aria-labels สำหรับ interactive elements)
- เขียน Readme.md ให้ชัดเจน — อธิบายวิธี run dev server, build, deploy, และวิธีเพิ่มผลงานใหม่
