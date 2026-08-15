import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { LocaleSwitch } from './LocaleSwitch';
import { getDictionary, localePath, type Locale } from '@/i18n';
import { site } from '@/data/site';

type HeaderProps = {
  locale: Locale;
  /** Path within the locale, forwarded to the language switcher. */
  path?: string;
};

/**
 * Fixed, blurred site header.
 *
 * Deliberately has no mobile menu: with three links plus a language switch,
 * everything fits on a small screen, and skipping the disclosure pattern keeps
 * the page free of client-side JavaScript entirely.
 */
export function Header({ locale, path = '/' }: HeaderProps) {
  const t = getDictionary(locale);
  const home = localePath('/', locale);

  const navItems = [
    { href: `${home === '/' ? '' : home}/#work`, label: t.nav.work },
    { href: `${home === '/' ? '' : home}/#about`, label: t.nav.about },
    { href: `${home === '/' ? '' : home}/#contact`, label: t.nav.contact },
  ];

  return (
    <header className="border-rule bg-bg/70 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href={home}
            className="text-label hover:text-dim shrink-0 font-bold transition-colors duration-200"
          >
            {site.name}
          </Link>

          <div className="flex items-center gap-5 md:gap-8">
            <nav aria-label={t.nav.primaryLabel}>
              <ul className="flex items-center gap-4 md:gap-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-label text-dim hover:text-fg transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <span className="bg-rule hidden h-4 w-px sm:block" aria-hidden="true" />

            <SocialLinks label={t.nav.socialLabel} className="hidden sm:flex" />

            <LocaleSwitch currentLocale={locale} path={path} label={t.nav.languageLabel} />
          </div>
        </div>
      </Container>
    </header>
  );
}
