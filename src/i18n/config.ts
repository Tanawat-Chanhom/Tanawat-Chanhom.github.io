export const locales = ['en', 'th'] as const;

export type Locale = (typeof locales)[number];

/**
 * English is served from the site root (`/`), Thai from `/th`.
 *
 * A static export cannot issue server redirects, so there is no `/en` prefix
 * to redirect away from — the default locale simply *is* the root.
 */
export const defaultLocale: Locale = 'en';

export const SITE_URL = 'https://tanawat-chanhom.github.io';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Builds an href for a path within a locale.
 *
 * `localePath('/projects/foo', 'en')` -> `/projects/foo`
 * `localePath('/projects/foo', 'th')` -> `/th/projects/foo`
 */
export function localePath(path: string, locale: Locale): string {
  const normalized = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;

  if (locale === defaultLocale) {
    return normalized === '' ? '/' : normalized;
  }

  return `/${locale}${normalized}` || `/${locale}`;
}

/** Absolute URL for a path in a locale — used for canonical + hreflang tags. */
export function localeUrl(path: string, locale: Locale): string {
  return new URL(localePath(path, locale), SITE_URL).toString();
}

/** BCP 47 tags for <html lang> and OpenGraph locale metadata. */
export const localeMeta: Record<Locale, { htmlLang: string; ogLocale: string; label: string }> = {
  en: { htmlLang: 'en', ogLocale: 'en_US', label: 'EN' },
  th: { htmlLang: 'th', ogLocale: 'th_TH', label: 'TH' },
};
