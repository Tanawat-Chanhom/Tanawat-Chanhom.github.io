import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ExperienceRow } from '@/components/ui/ExperienceRow';
import { getDictionary, type Locale } from '@/i18n';
import { education } from '@/data/site';

/** Schooling, in the same ruled grid as Experience. */
export function Education({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="education" aria-labelledby="education-heading" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow={t.education.eyebrow} id="education-heading">
          {t.education.heading}
        </SectionHeading>

        <ul className="border-rule border-b">
          {education.map((item) => (
            <ExperienceRow
              key={`${item.org}-${item.start}`}
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
