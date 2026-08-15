import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Pill } from '@/components/ui/Pill';
import { getDictionary, type Locale } from '@/i18n';
import { skills } from '@/data/site';

/**
 * Tech stack as a wrapped row of mono pills.
 *
 * Marked up as a real <ul> so assistive tech announces the count, rather than
 * as a run of visually-separated <span>s.
 */
export function Skills({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow={t.skills.eyebrow} id="skills-heading">
          {t.skills.heading}
        </SectionHeading>

        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li key={skill}>
              <Pill>{skill}</Pill>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
