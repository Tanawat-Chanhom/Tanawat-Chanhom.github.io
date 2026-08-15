---
title: 'Kite Mobile'
description: 'Offline-first field reporting app for inspectors working without reliable signal.'
category: 'MOBILE'
date: '2025-03-15'
cover: '/images/projects/kite-mobile.svg'
coverAlt: 'Kite Mobile inspection form shown on a phone screen'
tags: ['React Native', 'SQLite', 'Sync']
---

<!-- TODO: replace this placeholder with the real case study. -->

Kite is used by inspectors in places where connectivity is a rumour. Everything
had to work fully offline and reconcile later without losing edits.

## The core problem

Two inspectors editing the same record on different devices, both offline, for
a day. Whatever synced first could not simply overwrite the other.

## Approach

A local-first data layer on SQLite with an append-only change log, plus
field-level merge rules so conflicting edits to different fields resolve
automatically and only true conflicts surface to a human.

## Result

Sync-related data loss reports went to zero, and inspectors stopped keeping a
paper backup.
