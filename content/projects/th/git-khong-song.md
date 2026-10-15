---
title: 'git-khong-song'
description: 'Git forge แบบ self-hosted ที่รองรับหลายผู้ใช้ มี repository ส่วนตัว pull request และ pipeline CI/CD ที่วาดได้ในเบราว์เซอร์ ทำงานจาก git hook ฝั่งเซิร์ฟเวอร์จริง'
category: 'DEV PLATFORM'
date: '2026-10-15'
link: 'https://git.tanawat-personal.tech'
cover: '/images/projects/git-khong-song.webp'
coverAlt: 'หน้า admin monitor ของ git-khong-song สไตล์เทอร์มินัล แสดงจำนวนผู้ใช้ การ push และ pipeline สถานะระบบ แถบพื้นที่จัดเก็บ กราฟแท่งทราฟฟิกรายชั่วโมง บันทึกเหตุการณ์ และตาราง pipeline run'
featured: true
tags: ['Go', 'Next.js', 'TypeScript', 'MongoDB', 'Docker', 'OpenAPI', 'React Flow', 'MUI X Charts']
---

git-khong-song คือ git server ที่รันอยู่บน VPS ส่วนตัว เริ่มต้นจากหน้าดู repository
แบบอ่านอย่างเดียวในสไตล์ [stagit](https://git.suckless.org/) สำหรับ repository
ไม่กี่ตัว แล้วภายในหนึ่งสัปดาห์ก็โตขึ้นเป็น forge ขนาดเล็ก ใครก็สมัครใช้งานได้
push ผ่าน SSH เปิด pull request และรัน pipeline CI/CD ได้ โดยมีแดชบอร์ดของแอดมิน
คอยดูภาพรวมทั้งหมด

## เป้าหมาย

อยากได้วงจรหลักแบบ GitHub (push, review, merge, build) บนโครงสร้างพื้นฐานของตัวเอง
โดยไม่ต้องรันระบบที่หนักอย่าง GitLab ซึ่งหมายถึง:

- บัญชีผู้ใช้ที่ผูกกับ SSH key และ repository ที่เป็นของเจ้าของจริง ๆ
- Pull request ที่ merge ได้แบบเดียวกับ GitHub
- CI/CD ที่ถูกทริกเกอร์จาก git hook ฝั่งเซิร์ฟเวอร์จริง ไม่ใช่การ polling
- หน้าแอดมินที่ดูได้ทุกอย่าง แต่ไม่แก้ไขอะไรเลย

## สิ่งที่สร้าง

| ส่วน         | ทำอะไรได้                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| บัญชีผู้ใช้  | สมัครด้วยชื่อผู้ใช้ รหัสผ่าน และ SSH public key โดยจำกัดอัตราการสมัครและการล็อกอิน                                                       |
| Repository   | เป็นส่วนตัวของเจ้าของ ทั้งบนเว็บและผ่าน SSH คนอื่นจะได้ 404                                                                              |
| ดูโค้ด       | Log, ไฟล์, ref, README และ diff ของ commit เรนเดอร์สดจาก git push แล้วเห็นผลทันที                                                        |
| Pull request | เปรียบเทียบ branch พูดคุย ตรวจ conflict และ merge ด้วย merge commit จริง                                                                 |
| Pipeline     | วาดเป็นกราฟด้วย React Flow ทริกเกอร์จาก hook pre-receive, update, post-receive หรือ post-update และรันใน Docker container แบบใช้แล้วทิ้ง |
| Monitoring   | ผู้ใช้ repository ทราฟฟิก เหตุการณ์ pipeline run และสถานะระบบ ในแดชบอร์ดสไตล์เทอร์มินัลพร้อมกราฟจาก MUI X Charts                         |

## การทำงาน

- **SSH ต้องผ่านด่านที่เขียนเอง** ทุก key ใน `authorized_keys` ถูกผูกกับ forced
  command ชื่อ `gks-shell` ซึ่งเป็น Go binary แบบ static ขนาดเล็ก รับเฉพาะคำสั่ง git
  สามตัว ถาม API ว่าเจ้าของ key อ่านหรือ push ได้หรือไม่ แล้วจึงส่งต่อให้ git
  คำสั่งอื่นทั้งหมดรวมถึง shell จะถูกปฏิเสธ
- **Git hook กลายเป็นเหตุการณ์** hook ของแต่ละ repository เป็นสคริปต์บรรทัดเดียว
  ที่เรียก `gks-shell hook <name>` เพื่อรายงาน ref ที่ถูก push ไปยัง internal API
  ซึ่งฟังเฉพาะบน loopback ทุกการ push จะถูกบันทึกลง event log และเริ่ม pipeline ได้
- **Pipeline ปฏิเสธการ push ได้** pipeline บน pre-receive หรือ update จะบล็อก
  การ push ไว้ hook จะรอผลการรัน ส่งสถานะของ job กลับไปให้คนที่ push เห็นเป็นบรรทัด
  `remote:` และปฏิเสธการ push ถ้ามี job ล้มเหลว ส่วน job รันโดยยกระดับสิทธิ์ไม่ได้
  ถูกจำกัด CPU หน่วยความจำ และจำนวน process อยู่บน network ของตัวเอง และเข้าถึง
  Docker socket ฐานข้อมูล หรือ internal API ไม่ได้
- **Merge ปลอดภัยจาก race condition** ตรวจ conflict ด้วย `git merge-tree`
  สร้าง merge commit ด้วย `commit-tree` แล้วอัปเดตผ่าน `update-ref` แบบ
  compare-and-swap ถ้ามีการ push เข้ามาระหว่าง merge การ merge จะล้มเหลว
  แทนที่จะเขียนทับงานนั้น
- **Spec เดียวใช้ได้ทั้งสองภาษา** OpenAPI spec ไฟล์เดียวสร้างทั้ง interface ของ
  เซิร์ฟเวอร์ฝั่ง Go และ type ของ client ฝั่ง TypeScript มีเทสต์ที่อ่าน spec
  เพื่อตรวจว่าทุก operation ของแอดมินเป็นแบบอ่านอย่างเดียว และทุก endpoint
  ที่แตะ repository ต้องมี session
- **ความเป็นส่วนตัวมีด่านเดียว** request ใดที่มี `{owner}` ใน path จะได้ 404
  ถ้าผู้เรียกไม่ใช่เจ้าของ repository ส่วนตัวจึงดูเหมือน repository ที่ไม่มีอยู่จริง
  ทุกประการ

## Stack

Backend เป็น Go แบ่งชั้นแบบ clean architecture (domain, use case, adapter)
ฝั่งเว็บเป็น Next.js 16 กับ React Server Components และ Tailwind CSS ใช้ MongoDB
เป็นฐานข้อมูล มีสี่ service รันด้วย Docker Compose (ฐานข้อมูล, API, pipeline runner
และเว็บ) อยู่หลัง Caddy ทั้งเว็บทำงานภายใต้ Content Security Policy แบบ nonce
ที่เข้มงวด ซึ่งเป็นตัวกำหนดวิธีสร้าง pipeline canvas และกราฟ คือทั้งคู่เรนเดอร์
ในเบราว์เซอร์เท่านั้น

## ผลลัพธ์

- สร้างและ deploy เสร็จในราวหนึ่งสัปดาห์ ตั้งแต่ commit แรกวันที่ 8 ตุลาคม 2569
  จนถึงแดชบอร์ด monitoring วันที่ 15 ตุลาคม
- Go ราว 10,500 บรรทัด และ TypeScript 4,400 บรรทัด พร้อมเทสต์ Go มากกว่า 90 ตัว
- 52 API operation ที่สร้างจาก spec เดียวทั้งหมด
- โฮสต์ซอร์สโค้ดของตัวเอง: repository ของโปรเจกต์นี้อยู่บนระบบนี้ และ pipeline
  ของมันรันทุกครั้งที่ push
