import { Archivo, JetBrains_Mono } from 'next/font/google';

/**
 * Latin fonts, used by every locale.
 *
 * next/font downloads and self-hosts these at build time — zero runtime
 * requests to fonts.googleapis.com, which matters for both LCP and privacy.
 *
 * Thai lives in `./fonts.thai` as a *separate module* on purpose: next/font
 * preloads every font loader reachable from a route's module graph, whether or
 * not the CSS variable is actually applied. Exporting Anuphan from this file
 * would make English pages eagerly download Thai glyph coverage they can
 * never use.
 */

/**
 * Display / headings. Latin only — Archivo has no Thai glyphs.
 *
 * `swap` rather than `optional`: both measured identically in Lighthouse
 * (LCP is bounded by the framework JS, not by this font), and `optional` risks
 * a first-time visitor never seeing Archivo at all — unacceptable for a design
 * whose whole premise is the typography.
 */
export const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

/**
 * Labels, eyebrows, categories, years. Latin only.
 *
 * Kept preloaded. Dropping its preload was measured and made things worse:
 * FCP 0.8s -> 1.1s and CLS 0 -> 0.045, because the mono eyebrow sits directly
 * above the hero headline and swapping it late shifts the LCP element.
 */
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  weight: ['400', '500', '700'],
});

/** Font variables shared by every locale. */
export const latinFontVariables = `${archivo.variable} ${jetbrainsMono.variable}`;
