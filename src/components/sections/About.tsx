import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProfileCard } from '@/components/ui/ProfileCard';
import { getDictionary, localePath, type Locale } from '@/i18n';
import { site } from '@/data/site';

/**
 * About: a large statement line, a supporting paragraph, and a profile card.
 *
 * The statement stays at display size but the body copy stays at normal
 * reading width — Projects is still meant to be the loudest section on the
 * page. The card sits beside the text on wide screens and above it on narrow
 * ones, where a portrait-ratio card next to a paragraph would leave both
 * cramped.
 */
export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="about" aria-labelledby="about-heading" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow={t.about.eyebrow} id="about-heading">
          {t.about.statement}
        </SectionHeading>

        <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-16">
          <div className="mx-auto w-full max-w-[320px] md:col-span-5 md:mx-0">
            <ProfileCard
              avatarUrl="/images/profile-mockup.svg"
              name={site.name}
              title={t.hero.eyebrow}
              handle="Tanawat-Chanhom"
              status={t.hero.availability}
              contactLabel={t.nav.contact}
              contactHref={`${localePath('/', locale) === '/' ? '' : localePath('/', locale)}/#contact`}
            />
          </div>

          <div className="md:col-span-7">
            <p className="text-dim text-base leading-relaxed md:text-lg">{t.about.body}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
