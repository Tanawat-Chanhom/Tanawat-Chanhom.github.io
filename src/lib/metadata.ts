import type { Metadata } from 'next';
import { getDictionary, localeMeta, localeUrl, locales, SITE_URL, type Locale } from '@/i18n';

/**
 * Builds per-page metadata including hreflang alternates.
 *
 * Every page declares both language versions plus `x-default`, so crawlers
 * serve the right one instead of guessing — which matters here because the
 * default locale lives at the root with no `/en` prefix to signal it.
 */
export function buildMetadata({
  locale,
  path = '/',
  title,
  description,
}: {
  locale: Locale;
  path?: string;
  title?: string;
  description?: string;
}): Metadata {
  const t = getDictionary(locale);
  const resolvedTitle = title ?? t.meta.title;
  const resolvedDescription = description ?? t.meta.description;
  const canonical = localeUrl(path, locale);

  const languages = Object.fromEntries(
    locales.map((l) => [localeMeta[l].htmlLang, localeUrl(path, l)]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description: resolvedDescription,
    alternates: {
      canonical,
      languages: {
        ...languages,
        'x-default': localeUrl(path, 'en'),
      },
    },
    openGraph: {
      type: 'website',
      url: canonical,
      title: resolvedTitle,
      description: resolvedDescription,
      locale: localeMeta[locale].ogLocale,
      siteName: t.meta.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description: resolvedDescription,
    },
  };
}
