import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import type { ProjectEntry } from '@/lib/content';
import { localePath, type Locale } from '@/i18n/config';
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
 * The hover thumbnail is pure CSS (group-hover). No JS, no state, no
 * client component, which is what keeps this page at zero runtime JS.
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
        )}
      >
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
          Hover preview. Hidden from assistive tech: it is decorative, and the
          link already carries the project's name. Only shown on devices that
          truly support hover, so it can never get stuck visible on touch.
        */}
        {project.cover ? (
          <span
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute top-1/2 right-24 hidden -translate-y-1/2',
              'z-10 w-56 overflow-hidden rounded-sm opacity-0',
              'translate-x-6 transition-[opacity,transform] duration-500 ease-out',
              'group-hover:translate-x-0 group-hover:opacity-100',
              'motion-reduce:translate-x-0 motion-reduce:transition-opacity',
              // Underscores become spaces — without them this emits invalid CSS.
              '[@media(hover:hover)_and_(pointer:fine)]:block',
            )}
          >
            <Image
              src={project.cover}
              alt=""
              width={480}
              height={320}
              loading="lazy"
              sizes="224px"
              className="h-auto w-full grayscale"
            />
          </span>
        ) : null}

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
