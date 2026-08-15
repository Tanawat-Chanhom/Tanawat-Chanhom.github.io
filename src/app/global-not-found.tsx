import type { Metadata } from 'next';
import Link from 'next/link';
import { latinFontVariables } from './fonts';
import { getDictionary } from '@/i18n';
import './globals.css';

/**
 * Global 404.
 *
 * With two root layouts (one per locale route group) there is no shared layout
 * for a plain `not-found.tsx` to render inside, so this file renders its own
 * <html>/<body>. It is English-only because an unmatched URL carries no
 * reliable locale signal.
 */

export const metadata: Metadata = {
  title: 'Page not found — Tanawat Chanhom',
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  const t = getDictionary('en');

  return (
    <html lang="en" className={latinFontVariables}>
      <body className="bg-bg text-fg grid min-h-dvh place-items-center px-6 antialiased">
        <main className="max-w-lg text-center">
          <p className="text-label text-dim">404</p>
          <h1 className="text-display text-display-sm mt-5">{t.notFound.title}</h1>
          <p className="text-dim mt-5 leading-relaxed">{t.notFound.body}</p>
          <Link
            href="/"
            className="text-label border-rule hover:border-fg mt-9 inline-block rounded-full border px-6 py-3 transition-colors duration-200"
          >
            {t.notFound.cta}
          </Link>
        </main>
      </body>
    </html>
  );
}
