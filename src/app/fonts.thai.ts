import { Anuphan } from 'next/font/google';

/**
 * Thai font — applied only by the (th) root layout.
 *
 * `preload: false` is load-bearing, not a stylistic choice. Next emits a
 * single shared font stylesheet, and every `<link rel="preload">` in it is
 * emitted on *every* page. With preloading on, English pages eagerly
 * downloaded 56KB of Thai glyph coverage they can never render.
 *
 * With it off, the @font-face rules still ship, so Thai pages get Anuphan the
 * moment layout references it — one same-origin request, covered by
 * `display: 'swap'` — while English pages fetch nothing. English never even
 * names the family: `--font-anuphan` is undefined there, so the font stack in
 * globals.css falls through to its `sans-serif` fallback.
 */
export const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  variable: '--font-anuphan',
  display: 'swap',
  preload: false,
  weight: ['400', '500', '600', '700'],
});
