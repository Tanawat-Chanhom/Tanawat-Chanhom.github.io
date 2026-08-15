---
title: 'Atlas Analytics'
description: 'A real-time analytics dashboard that renders millions of events without dropping a frame.'
category: 'WEB APP'
date: '2026-05-12'
link: 'https://example.com'
cover: '/images/projects/atlas-analytics.svg'
coverAlt: 'Atlas Analytics dashboard showing a dense time-series chart'
featured: true
tags: ['Next.js', 'TypeScript', 'WebSocket', 'D3']
---

<!-- TODO: replace this placeholder with the real case study. -->

Atlas is an analytics surface for teams that outgrew their spreadsheet. The
brief was blunt: show a million events without the page stuttering.

## The problem

The previous dashboard re-rendered the entire chart tree on every websocket
message. At production volume that meant roughly 40 re-renders per second and
a main thread that never got a break.

## What I did

- Moved the hot path off React and into a canvas renderer driven by a single
  `requestAnimationFrame` loop
- Batched incoming socket messages into 250ms windows before touching state
- Introduced a virtualized table so row count stopped driving DOM size

## Result

Time-to-interactive dropped from 6.2s to 1.1s, and the dashboard now holds a
steady 60fps at ten times the original event volume.
