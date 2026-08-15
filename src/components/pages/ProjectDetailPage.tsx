import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeftIcon, ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Container } from '@/components/ui/Container';
import { Pill } from '@/components/ui/Pill';
import { Prose } from '@/components/ui/Prose';
import { getEntry } from '@/lib/content';
import { getDictionary, localePath, type Locale } from '@/i18n';

/**
 * A single project case study, shared by both locales.
 *
 * Renders the markdown body that the list view only summarises, and turns the
 * optional `link` frontmatter field into a "View live" action.
 */
export async function ProjectDetailPage({ locale, slug }: { locale: Locale; slug: string }) {
  const project = await getEntry('projects', slug, locale);

  if (!project) {
    notFound();
  }

  const t = getDictionary(locale);
  const path = `/projects/${slug}`;

  return (
    <>
      <Header locale={locale} path={path} />

      <main id="main" className="pt-32 pb-(--spacing-section) md:pt-44">
        <span id="top" />
        <Container>
          <Link
            href={localePath('/#work', locale)}
            className="text-label text-dim hover:text-fg group inline-flex items-center gap-2 transition-colors duration-200"
          >
            <ArrowLeftIcon
              weight="bold"
              className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5 motion-reduce:transform-none"
              aria-hidden="true"
            />
            {t.projectDetail.backToWork}
          </Link>

          <article className="mt-10">
            <header>
              <p className="text-label text-dim">{project.category}</p>

              <h1 className="text-display text-display-md mt-5">{project.title}</h1>

              <p className="text-dim mt-6 max-w-2xl text-lg leading-relaxed">
                {project.description}
              </p>

              <dl className="border-rule mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-b py-5">
                <div className="flex items-center gap-3">
                  <dt className="text-label text-dim">{t.projectDetail.published}</dt>
                  <dd className="text-label">
                    <time dateTime={project.date}>{project.date}</time>
                  </dd>
                </div>

                {project.link ? (
                  <div className="flex items-center gap-3">
                    <dt className="sr-only">{t.projectDetail.viewLive}</dt>
                    <dd>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-label group hover:text-fg inline-flex items-center gap-2 underline underline-offset-4 transition-colors duration-200"
                      >
                        {t.projectDetail.viewLive}
                        <ArrowUpRightIcon
                          weight="bold"
                          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                          aria-hidden="true"
                        />
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </header>

            {project.cover ? (
              <Image
                src={project.cover}
                alt={project.coverAlt ?? ''}
                width={480}
                height={320}
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="border-rule mt-12 h-auto w-full rounded-sm border grayscale"
              />
            ) : null}

            <div className="mt-12 max-w-3xl">
              <Prose html={project.body} />
            </div>

            {project.tags.length > 0 ? (
              <ul className="mt-14 flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <li key={tag}>
                    <Pill>{tag}</Pill>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        </Container>
      </main>

      <Footer locale={locale} />
    </>
  );
}
