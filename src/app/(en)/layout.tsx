import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { latinFontVariables } from '@/app/fonts';
import { buildMetadata } from '@/lib/metadata';

/**
 * Root layout for English, served from `/`.
 *
 * `(en)` is a route group, so it contributes nothing to the URL — it exists
 * purely to give English its own root layout (and therefore its own
 * <html lang>). See SiteShell for why this is split per locale.
 */

export const metadata: Metadata = buildMetadata({ locale: 'en', path: '/' });

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  // Latin fonts only — Anuphan is deliberately never imported on this route.
  return (
    <SiteShell locale="en" fontVariables={latinFontVariables}>
      {children}
    </SiteShell>
  );
}
