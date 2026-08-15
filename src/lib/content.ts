import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { projectSchema, type ProjectFrontmatter } from './schema';
import { renderMarkdown } from './markdown';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

/**
 * Registry of content collections. Adding a blog later means adding one entry
 * here plus a `content/blog/<locale>/` directory — no changes to the loader.
 */
const collections = {
  projects: { dir: 'projects', schema: projectSchema },
} as const;

export type CollectionName = keyof typeof collections;

export type ProjectEntry = ProjectFrontmatter & {
  slug: string;
  /** The locale actually used — may differ from the requested one via fallback. */
  resolvedLocale: Locale;
  /** True when the requested locale had no file and English was used instead. */
  isFallback: boolean;
  /** Year shown in the right-hand column of each row. */
  year: string;
  body: string;
};

function collectionDir(collection: CollectionName, locale: Locale): string {
  return path.join(CONTENT_ROOT, collections[collection].dir, locale);
}

function readSlugsIn(collection: CollectionName, locale: Locale): string[] {
  const dir = collectionDir(collection, locale);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

/**
 * Locates the file backing a slug, falling back to the default locale.
 *
 * Without this, adding a project in English and forgetting the Thai
 * translation would 404 on `/th/projects/<slug>` and drop the row from the
 * Thai list entirely. Falling back keeps both languages complete.
 */
function resolveFile(
  collection: CollectionName,
  slug: string,
  locale: Locale,
): { filePath: string; resolvedLocale: Locale } | null {
  const preferred = path.join(collectionDir(collection, locale), `${slug}.md`);
  if (fs.existsSync(preferred)) {
    return { filePath: preferred, resolvedLocale: locale };
  }

  const fallback = path.join(collectionDir(collection, defaultLocale), `${slug}.md`);
  if (fs.existsSync(fallback)) {
    return { filePath: fallback, resolvedLocale: defaultLocale };
  }

  return null;
}

/** Union of slugs across every locale — the set of pages each locale must build. */
export function getAllSlugs(collection: CollectionName): string[] {
  const slugs = new Set<string>();
  for (const locale of locales) {
    for (const slug of readSlugsIn(collection, locale)) {
      slugs.add(slug);
    }
  }
  return [...slugs];
}

/**
 * Loads and validates a single entry. Returns null when the slug does not
 * exist in any locale; throws when the file exists but its frontmatter is
 * invalid, so authoring mistakes fail the build loudly.
 */
export async function getEntry(
  collection: CollectionName,
  slug: string,
  locale: Locale,
): Promise<ProjectEntry | null> {
  const resolved = resolveFile(collection, slug, locale);
  if (!resolved) return null;

  const raw = fs.readFileSync(resolved.filePath, 'utf8');
  const { data, content } = matter(raw);

  const parsed = collections[collection].schema.safeParse(data);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
      .join('\n');

    throw new Error(
      `Invalid frontmatter in ${path.relative(process.cwd(), resolved.filePath)}:\n${issues}`,
    );
  }

  const frontmatter = parsed.data;

  return {
    ...frontmatter,
    slug,
    resolvedLocale: resolved.resolvedLocale,
    isFallback: resolved.resolvedLocale !== locale,
    year: frontmatter.date.slice(0, 4),
    body: await renderMarkdown(content),
  };
}

/**
 * All published entries for a locale, featured first and newest first within
 * each group. Drafts are excluded.
 */
export async function getCollection(
  collection: CollectionName,
  locale: Locale,
): Promise<ProjectEntry[]> {
  const entries = await Promise.all(
    getAllSlugs(collection).map((slug) => getEntry(collection, slug, locale)),
  );

  return entries
    .filter((entry): entry is ProjectEntry => entry !== null && !entry.draft)
    .sort((a, b) => {
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return b.date.localeCompare(a.date);
    });
}
