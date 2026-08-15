import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Contact } from '@/components/sections/Contact';
import { getCollection } from '@/lib/content';
import type { Locale } from '@/i18n';

/**
 * The home page, shared by both locales.
 *
 * `src/app/(en)/page.tsx` and `src/app/(th)/th/page.tsx` are thin wrappers
 * around this, so the page exists once regardless of how many locales ship.
 */
export async function HomePage({ locale }: { locale: Locale }) {
  const projects = await getCollection('projects', locale);

  return (
    <>
      <Header locale={locale} path="/" />
      <main id="main">
        <span id="top" />
        <Hero locale={locale} />
        <Projects locale={locale} projects={projects} />
        <About locale={locale} />
        <Skills locale={locale} />
        <Experience locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
