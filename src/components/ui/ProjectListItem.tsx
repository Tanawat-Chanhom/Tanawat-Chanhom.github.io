import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import type { ProjectEntry } from '@/lib/content';
import { localePath, type Locale } from '@/i18n/config';
import { HoverPreview } from './HoverPreview';
import { PixelCanvas } from './PixelCanvas';
import { cn } from '@/lib/cn';

type ProjectListItemProps = {
  project: ProjectEntry;
  locale: Locale;
  /** Screen-reader-only suffix, e.g. "View project". */
  viewLabel: string;
  className?: string;
};

/**
 * One row of the typography-driven project list.
 *
 * The whole row is a single <a> — no nested interactive elements — so keyboard
 * users get exactly one stop per project and the accessible name is the title.
 *
 * Two layers respond to hover — the pixel dissolve behind the type, and the
 * cursor-following image preview above it. Both are client components that
 * bind to this link's own pointer events rather than wrapping it, so neither
 * adds a tab stop, and both no-op on devices without a fine pointer.
 */
export function ProjectListItem({ project, locale, viewLabel, className }: ProjectListItemProps) {
  const href = localePath(`/projects/${project.slug}`, locale);

  return (
    <li className={cn('border-rule border-t', className)}>
      <Link
        href={href}
        className={cn(
          'group relative flex items-center gap-4 px-2 py-7 md:gap-8 md:px-4 md:py-10',
          'hover:bg-raised transition-colors duration-300',
          // `isolate` keeps the canvas's negative z-index scoped to this row —
          // without a stacking context it would paint behind the page itself.
          'isolate',
        )}
      >
        <PixelCanvas />

        {/* Category — fixed width so titles align down the column */}
        <span className="text-label text-dim w-20 shrink-0 md:w-40" aria-hidden="true">
          {project.category}
        </span>

        {/* Title */}
        <h3 className="text-display min-w-0 flex-1 text-[clamp(1.5rem,5vw,3.25rem)]">
          <span className="group-hover:text-fg transition-colors duration-300">
            {project.title}
          </span>
          {/* Announced to screen readers only — sighted users get the arrow. */}
          <span className="sr-only"> — {viewLabel}</span>
        </h3>

        {/*
          Hover preview. Decorative and hidden from assistive tech — the link
          already carries the project's name — and only ever shown on devices
          with a real pointer to follow.
        */}
        {project.cover ? <HoverPreview src={project.cover} width={480} height={320} /> : null}

        {/* Year */}
        <span className="text-label text-dim shrink-0 tabular-nums" aria-hidden="true">
          {project.year}
        </span>

        <ArrowUpRightIcon
          weight="bold"
          className={cn(
            'text-dim group-hover:text-fg size-4 shrink-0 transition-all duration-300',
            'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
            'motion-reduce:transform-none',
          )}
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}
