import Link from 'next/link';
import { localeMeta, locales, localePath, type Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';

type LocaleSwitchProps = {
  currentLocale: Locale;
  /** Path *within* the locale, e.g. "/" or "/projects/atlas-analytics". */
  path?: string;
  /** Accessible name for the group of language links. */
  label: string;
  className?: string;
};

/**
 * Language switcher.
 *
 * Plain links, not a client-side toggle: each locale is a real URL, so this
 * ships no JavaScript and the choice is shareable and indexable.
 *
 * hrefLang tells crawlers (and screen readers) that the target is in another
 * language, and each label is written in its own language.
 */
export function LocaleSwitch({ currentLocale, path = '/', label, className }: LocaleSwitchProps) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn('text-label flex items-center gap-1', className)}
    >
      {locales.map((locale, index) => {
        const isCurrent = locale === currentLocale;

        return (
          <span key={locale} className="flex items-center gap-1">
            {index > 0 ? (
              <span className="text-rule" aria-hidden="true">
                /
              </span>
            ) : null}
            {isCurrent ? (
              <span className="text-fg" aria-current="true">
                {localeMeta[locale].label}
              </span>
            ) : (
              <Link
                href={localePath(path, locale)}
                hrefLang={localeMeta[locale].htmlLang}
                lang={localeMeta[locale].htmlLang}
                className="text-dim hover:text-fg transition-colors duration-200"
              >
                {localeMeta[locale].label}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
