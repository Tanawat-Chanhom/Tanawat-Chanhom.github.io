import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  /** Small mono label above the heading, e.g. "ABOUT". */
  eyebrow: string;
  /** Visible heading text. */
  children: React.ReactNode;
  /**
   * id for the heading element. The parent <section> points at this with
   * aria-labelledby, which is what gives the landmark an accessible name.
   */
  id: string;
  className?: string;
};

/**
 * Shared section header: mono eyebrow, rule, and an h2.
 *
 * The eyebrow is aria-hidden because it duplicates the heading's meaning and
 * would otherwise be read out as a second, contextless string.
 */
export function SectionHeading({ eyebrow, children, id, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-10 md:mb-14', className)}>
      <div className="border-rule flex items-baseline justify-between border-b pb-3">
        <span className="text-label text-dim" aria-hidden="true">
          {eyebrow}
        </span>
      </div>
      <h2 id={id} className="text-display text-display-sm mt-6">
        {children}
      </h2>
    </div>
  );
}
