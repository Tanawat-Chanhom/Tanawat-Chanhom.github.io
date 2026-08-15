---
title: 'Atlas Analytics'
description: 'แดชบอร์ดวิเคราะห์ข้อมูลแบบเรียลไทม์ที่เรนเดอร์อีเวนต์หลักล้านรายการได้โดยไม่มีอาการกระตุก'
category: 'WEB APP'
date: '2026-05-12'
link: 'https://example.com'
cover: '/images/projects/atlas-analytics.svg'
coverAlt: 'หน้าแดชบอร์ด Atlas Analytics แสดงกราฟ time-series ที่มีข้อมูลหนาแน่น'
featured: true
tags: ['Next.js', 'TypeScript', 'WebSocket', 'D3']
---

<!-- TODO: แทนที่เนื้อหา placeholder นี้ด้วย case study จริง -->

Atlas คือหน้าจอวิเคราะห์ข้อมูลสำหรับทีมที่ใช้สเปรดชีตไม่ไหวแล้ว โจทย์ตรงไปตรงมา
คือแสดงอีเวนต์เป็นล้านรายการโดยหน้าเว็บต้องไม่กระตุก

## ปัญหา

แดชบอร์ดเดิมเรนเดอร์ chart tree ใหม่ทั้งชุดทุกครั้งที่มีข้อความเข้ามาทาง websocket
พอเจอปริมาณข้อมูลจริงกลายเป็นรีเรนเดอร์ราว 40 ครั้งต่อวินาที และ main thread
ไม่ได้พักเลย

## สิ่งที่ทำ

- ย้าย hot path ออกจาก React ไปใช้ canvas renderer ที่ขับด้วย `requestAnimationFrame` ลูปเดียว
- รวบข้อความจาก socket เป็นชุดในหน้าต่างเวลา 250ms ก่อนแตะ state
- ทำตารางแบบ virtualized เพื่อให้จำนวนแถวไม่ไปกำหนดขนาดของ DOM

## ผลลัพธ์

Time-to-interactive ลดจาก 6.2 วินาทีเหลือ 1.1 วินาที และแดชบอร์ดรักษาระดับ 60fps
ได้แม้ปริมาณอีเวนต์จะมากกว่าเดิมสิบเท่า
