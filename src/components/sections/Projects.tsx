import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProjectListItem } from '@/components/ui/ProjectListItem';
import { getDictionary, type Locale } from '@/i18n';
import type { ProjectEntry } from '@/lib/content';

/**
 * The centrepiece: projects as a typography-driven list, not a card grid.
 *
 * The list is bottom-ruled so the final row closes the section, matching the
 * top rule each item draws.
 */
export function Projects({ locale, projects }: { locale: Locale; projects: ProjectEntry[] }) {
  const t = getDictionary(locale);

  return (
    <section id="work" aria-labelledby="work-heading" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow={t.projects.eyebrow} id="work-heading">
          {t.projects.heading}
        </SectionHeading>

        {projects.length === 0 ? (
          <p className="text-dim">{t.projects.empty}</p>
        ) : (
          <ul className="border-rule border-b">
            {projects.map((project) => (
              <ProjectListItem
                key={project.slug}
                project={project}
                locale={locale}
                viewLabel={t.projects.viewProject}
              />
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
