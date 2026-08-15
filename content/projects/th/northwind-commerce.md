---
title: 'Northwind Commerce'
description: 'ร้านค้าออนไลน์แบบ headless ที่สร้างใหม่เพื่อความเร็ว การเข้าถึง และ checkout ที่เปลี่ยนเป็นยอดขายได้จริง'
category: 'E-COMMERCE'
date: '2026-02-03'
link: 'https://example.com'
cover: '/images/projects/northwind-commerce.svg'
coverAlt: 'หน้ารายการสินค้าของ Northwind Commerce บนจอเดสก์ท็อปและมือถือ'
tags: ['Next.js', 'Stripe', 'Tailwind CSS']
---

<!-- TODO: แทนที่เนื้อหา placeholder นี้ด้วย case study จริง -->

โปรเจกต์รื้อร้านค้าออนไลน์ขนาดกลางที่สะสมปลั๊กอินมาแปดปีและไม่เคยมี performance
budget

## ข้อจำกัด

อันดับบนหน้าค้นหาห้ามตก ทุก URL เดิมจึงต้องรอดจากการย้ายระบบ และ Core Web Vitals
ต้องดีขึ้นตั้งแต่วันแรก

## แนวทาง

ใช้ static generation กับหน้าแค็ตตาล็อก ใส่ client island เฉพาะจุดที่ตะกร้าสินค้า
ต้องโต้ตอบจริงๆ และเขียนขั้นตอน checkout ใหม่โดยทดสอบกับคีย์บอร์ดและ screen reader
จริง ไม่ใช่เดาเอา

## ผลลัพธ์

คะแนน Lighthouse performance ขึ้นจาก 41 เป็น 98 และอัตราการทำ checkout สำเร็จ
เพิ่มขึ้น 12% ในไตรมาสแรกหลังเปิดใช้
