import type { Metadata } from 'next';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';
import { getAllSlugs, getEntry } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

type Params = { slug: string };

/**
 * Pre-renders every project at build time — required by `output: 'export'`,
 * which has no server to render an unknown slug on demand.
 *
 * Uses the union of slugs across locales so a project that exists only in
 * English still builds an English page (and vice versa).
 */
export function generateStaticParams(): Params[] {
  return getAllSlugs('projects').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getEntry('projects', slug, 'en');

  return buildMetadata({
    locale: 'en',
    path: `/projects/${slug}`,
    title: project ? `${project.title} — Tanawat Chanhom` : undefined,
    description: project?.description,
  });
}

/** `/projects/[slug]` — English project detail. */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <ProjectDetailPage locale="en" slug={slug} />;
}
