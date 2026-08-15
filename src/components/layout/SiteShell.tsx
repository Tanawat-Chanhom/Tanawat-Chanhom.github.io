import { getDictionary, localeMeta, type Locale } from '@/i18n';
import { SkipLink } from './SkipLink';
import { cn } from '@/lib/cn';
import '@/app/globals.css';

/**
 * Renders <html> and <body> for a locale.
 *
 * Next allows one root layout per top-level route group, so `(en)` and `(th)`
 * each have their own — that is what lets <html lang> be correct per locale,
 * which a single shared root layout cannot do (a server layout cannot read the
 * current path). Both delegate here so the markup stays in one place.
 *
 * Font variables arrive as a prop rather than being imported here: next/font
 * preloads every loader reachable from a route's module graph, so importing
 * the Thai font in this shared file would make English pages download it too.
 */
export function SiteShell({
  locale,
  fontVariables,
  children,
}: {
  locale: Locale;
  /** Space-separated next/font `.variable` class names for this locale. */
  fontVariables: string;
  children: React.ReactNode;
}) {
  const t = getDictionary(locale);

  return (
    <html lang={localeMeta[locale].htmlLang} className={cn(fontVariables)}>
      <body className="bg-bg text-fg min-h-dvh antialiased">
        <SkipLink label={t.nav.skipToContent} />
        {children}
      </body>
    </html>
  );
}
