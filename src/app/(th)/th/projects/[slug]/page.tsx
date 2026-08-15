import type { Metadata } from 'next';
import { ProjectDetailPage } from '@/components/pages/ProjectDetailPage';
import { getAllSlugs, getEntry } from '@/lib/content';
import { buildMetadata } from '@/lib/metadata';

type Params = { slug: string };

/** Same slug set as English — untranslated projects fall back to the English file. */
export function generateStaticParams(): Params[] {
  return getAllSlugs('projects').map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = await getEntry('projects', slug, 'th');

  return buildMetadata({
    locale: 'th',
    path: `/projects/${slug}`,
    title: project ? `${project.title} — ธนวัฒน์ จันทร์หอม` : undefined,
    description: project?.description,
  });
}

/** `/th/projects/[slug]` — Thai project detail. */
export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  return <ProjectDetailPage locale="th" slug={slug} />;
}
