# Tanawat Chanhom — Portfolio

Personal portfolio at **[tanawat-chanhom.github.io](https://tanawat-chanhom.github.io)**.
Static site, dark theme, typography-driven, bilingual (English / ไทย).

Built with Next.js 16 (App Router, static export), Tailwind CSS v4, and TypeScript.
Every page is prerendered to plain HTML at build time — there is no server in production.

---

## Quick start

Requires **Node ≥ 20.9** (Next 16's floor) and **pnpm 10**.

```bash
nvm use            # picks up .nvmrc -> Node 22
pnpm install
pnpm dev           # http://localhost:3000
```

> **On pnpm versions:** there is deliberately no `packageManager` field in
> `package.json`. That field routes every `pnpm` call through Corepack, and a
> stale Corepack fails with `ERR_VM_DYNAMIC_IMPORT_CALLBACK_MISSING` when it
> tries to load a newer pnpm's ESM entry point. The CI workflow pins pnpm 10
> explicitly instead. If you add the field back, make sure your Corepack is
> current (`corepack --version`) on every machine that builds this.

| Command                | What it does                                      |
| ---------------------- | ------------------------------------------------- |
| `pnpm dev`             | Dev server with hot reload                        |
| `pnpm build`           | Static export to `out/`                           |
| `pnpm serve`           | Serve `out/` — use this for Lighthouse, not `dev` |
| `pnpm lint`            | ESLint                                            |
| `pnpm typecheck`       | `tsc --noEmit`                                    |
| `pnpm format`          | Prettier write                                    |
| `pnpm storybook`       | Component workshop at :6006                       |
| `pnpm build-storybook` | Static Storybook to `storybook-static/`           |

---

## Adding a new project

**No code changes required.** Add a markdown file, push, and the site rebuilds itself.

1. Create `content/projects/en/<slug>.md`. The filename becomes the URL:
   `my-project.md` → `/projects/my-project`.

2. Fill in the frontmatter:

   ```markdown
   ---
   title: 'My Project'
   description: 'One sentence shown under the title on the detail page.'
   category: 'WEB APP'
   date: '2026-08-01'
   link: 'https://example.com'
   cover: '/images/projects/my-project.svg'
   coverAlt: 'Describe what the image shows'
   featured: false
   draft: false
   tags: ['Next.js', 'TypeScript']
   ---

   Long-form case study goes here. Markdown, including tables and lists.
   ```

3. _(Optional)_ Add `content/projects/th/<slug>.md` with the **same filename** for
   a Thai version. If you skip it, the Thai site falls back to the English file —
   the project still appears at `/th`, it is simply not translated yet.
   (`signal-status` is intentionally left untranslated as a working example.)

4. Drop the cover image in `public/images/projects/`.

5. `git commit && git push` → GitHub Actions builds and deploys.

### Frontmatter reference

| Field         | Required | Notes                                                            |
| ------------- | -------- | ---------------------------------------------------------------- |
| `title`       | ✅       | Shown in the list and as the `<h1>`                              |
| `description` | ✅       | Also used as the page meta description                           |
| `category`    | ✅       | Small mono label at the left of the row                          |
| `date`        | ✅       | `YYYY-MM-DD`. Sorts the list; the year shows in the right column |
| `link`        | —        | External URL → "View live" button                                |
| `cover`       | —        | Absolute path under `/public`. Revealed on row hover             |
| `coverAlt`    | ⚠️       | **Required whenever `cover` is set** — build fails otherwise     |
| `featured`    | —        | Pins to the top regardless of date                               |
| `draft`       | —        | `true` keeps the file in the repo but off the site               |
| `tags`        | —        | Rendered as pills on the detail page                             |

Frontmatter is validated with zod at build time. A typo fails the build with the
offending file and field named, rather than silently publishing an empty row.

---

## Architecture notes

Things that are the way they are for a reason:

**Two root layouts, not one.** `src/app/(en)/` and `src/app/(th)/` are route groups
that each own a root layout. A single shared layout cannot vary `<html lang>` per
locale, because a server layout cannot read the current path. English is served from
`/` and Thai from `/th`; there is no `/en`, since a static export cannot redirect.

**Translations are plain objects, not a library.** `src/i18n/dictionaries/` holds one
typed object per locale, read from Server Components. Strings are baked into the HTML
at build time and no translation runtime reaches the browser. `en.ts` is the source of
truth — its type is derived without `as const`, so adding an English key fails the
typecheck until Thai has it too.

**Thai needs its own font.** Archivo and JetBrains Mono have no Thai glyphs, so Thai
text would fall back to a system font and the design would break. Anuphan covers Thai
and is applied only on `/th`. It is loaded with `preload: false` on purpose: Next emits
one shared font stylesheet, and preloads in it apply to _every_ page — with preloading
on, English pages downloaded 56KB of Thai glyphs they can never render.

**Content loading is generic over collections.** `src/lib/content.ts` is written
around a `collections` registry rather than hardcoding "projects", so a blog can be
added later with one registry entry plus a `content/blog/<locale>/` directory.

**The hover thumbnail is pure CSS.** No JavaScript, no state, no client component. It
is gated behind `@media (hover: hover) and (pointer: fine)` so it cannot get stuck
visible on a touch device, and it drops the slide under `prefers-reduced-motion`.

---

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints, typechecks,
builds, and publishes `out/` to GitHub Pages.

### One-time setup

In the repo: **Settings → Pages → Source → "GitHub Actions"**.
Without this the workflow succeeds but nothing is published.

### Notes

- This is a GitHub _user_ site, served from the domain root, so there is no
  `basePath`. A project-site repo would need `basePath` _and_ `assetPrefix`.
- `public/.nojekyll` stops Jekyll stripping the `_next/` directory. The current
  workflow bypasses Jekyll anyway, but it matters if you ever deploy from a branch.
- `trailingSlash: true` makes routes emit `out/projects/<slug>/index.html`, which
  static hosts resolve without extension guessing.

---

## Project structure

```
content/projects/{en,th}/   Markdown — one file per project per locale
public/images/projects/     Cover images (SVG placeholders for now)
src/app/(en)/               English routes  ->  /
src/app/(th)/               Thai routes     ->  /th
src/components/
  layout/                   Header, Footer, SiteShell, SkipLink, LocaleSwitch
  sections/                 Hero, About, Skills, Projects, Experience, Contact
  ui/                       Reusable primitives + their stories
  pages/                    HomePage, ProjectDetailPage — shared by both locales
src/data/site.ts            Name, email, socials, skills, experience
src/i18n/                   Locale config + dictionaries
src/lib/                    content, schema, markdown, metadata helpers
```

---

## Placeholder content

The site currently ships placeholder content so the structure is visible. Search for
`TODO` to find everything that needs replacing:

- `src/data/site.ts` — name, experience entries, and the empty LinkedIn URL
- `src/i18n/dictionaries/{en,th}.ts` — hero, about, and contact copy
- `content/projects/**` — six invented projects
- `public/images/projects/*.svg` — generated placeholder artwork
