import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/content';
import { localeMeta, localeUrl, locales } from '@/i18n';

/** Required by `output: 'export'` — metadata routes must be statically emitted. */
export const dynamic = 'force-static';

/**
 * Emits `out/sitemap.xml` at build time.
 *
 * Every entry carries `alternates.languages` so crawlers can pair the English
 * and Thai versions of each page rather than treating them as duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...getAllSlugs('projects').map((slug) => `/projects/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: localeUrl(path, locale),
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [localeMeta[l].htmlLang, localeUrl(path, l)]),
        ),
      },
    })),
  );
}
