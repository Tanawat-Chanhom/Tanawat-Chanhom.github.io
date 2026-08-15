import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getDictionary, type Locale } from '@/i18n';

/**
 * About: a large statement line plus a smaller supporting paragraph.
 *
 * The statement is set at display size, but the body stays at normal reading
 * size and constrained width — Projects is meant to be the loudest section.
 */
export function About({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="about" aria-labelledby="about-heading" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow={t.about.eyebrow} id="about-heading">
          {t.about.statement}
        </SectionHeading>

        <p className="text-dim max-w-2xl text-base leading-relaxed md:ml-auto md:text-lg">
          {t.about.body}
        </p>
      </Container>
    </section>
  );
}
