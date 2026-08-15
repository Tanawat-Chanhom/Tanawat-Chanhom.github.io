import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExperienceRow } from '@/components/ui/ExperienceRow';
import { getDictionary, type Locale } from '@/i18n';
import { experience } from '@/data/site';

/** Work history as a ruled grid: period / role + company / location. */
export function Experience({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="py-(--spacing-section)"
    >
      <Container>
        <SectionHeading eyebrow={t.experience.eyebrow} id="experience-heading">
          {t.experience.heading}
        </SectionHeading>

        <ul className="border-rule border-b">
          {experience.map((item) => (
            <ExperienceRow
              key={`${item.company}-${item.start}`}
              item={item}
              locale={locale}
              presentLabel={t.experience.present}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
