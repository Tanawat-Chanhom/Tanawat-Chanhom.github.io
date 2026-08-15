import type { Metadata, Viewport } from 'next';
import { SiteShell } from '@/components/layout/SiteShell';
import { latinFontVariables } from '@/app/fonts';
import { anuphan } from '@/app/fonts.thai';
import { buildMetadata } from '@/lib/metadata';

/**
 * Root layout for Thai, served from `/th`.
 *
 * Separate from the English root layout so <html lang="th"> is correct and so
 * the Anuphan font is loaded only where Thai text actually appears.
 */

export const metadata: Metadata = buildMetadata({ locale: 'th', path: '/' });

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function ThaiRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteShell locale="th" fontVariables={`${latinFontVariables} ${anuphan.variable}`}>
      {children}
    </SiteShell>
  );
}
