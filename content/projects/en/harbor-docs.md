---
title: 'Harbor Docs'
description: 'Documentation platform with instant search and versioned content across six products.'
category: 'PLATFORM'
date: '2025-07-08'
link: 'https://example.com'
cover: '/images/projects/harbor-docs.svg'
coverAlt: 'Harbor Docs search overlay with keyboard shortcuts visible'
tags: ['Next.js', 'MDX', 'Search']
---

<!-- TODO: replace this placeholder with the real case study. -->

Harbor consolidated six separate documentation sites into one platform without
breaking any existing links.

## The hard part

Versioning. Each product shipped on its own cadence, so the content model had
to express "this page, for this product, at this version" without duplicating
every file.

## Approach

An MDX pipeline with a content graph built at compile time, and a client-side
search index small enough to ship without a search backend.

## Result

Median search-to-answer time fell from 48 seconds to 9, and the six legacy
sites were fully retired.
