import { Container } from '@/components/ui/Container';
import { getDictionary, type Locale } from '@/i18n';

/**
 * Opening statement: eyebrow, oversized headline, tagline.
 *
 * Carries the page's only <h1>, and the headline is the LCP element — it is
 * plain text with a self-hosted font, so there is no image to wait on.
 */
export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section aria-labelledby="hero-heading" className="pt-32 pb-(--spacing-section) md:pt-44">
      <Container>
        <p className="text-label text-dim mb-6">{t.hero.eyebrow}</p>

        <h1 id="hero-heading" className="text-display text-display-lg">
          {t.hero.headline}
        </h1>

        <div className="border-rule mt-10 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
          <p className="text-dim max-w-xl text-lg leading-relaxed md:text-xl">{t.hero.tagline}</p>
          <p className="text-label text-dim shrink-0">
            {t.hero.location}
            <span className="text-rule mx-2" aria-hidden="true">
              /
            </span>
            {t.hero.availability}
          </p>
        </div>
      </Container>
    </section>
  );
}
