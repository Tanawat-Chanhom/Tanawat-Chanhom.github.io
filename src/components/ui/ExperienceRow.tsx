import type { ExperienceItem } from '@/data/site';
import type { Locale } from '@/i18n/config';

type ExperienceRowProps = {
  item: ExperienceItem;
  locale: Locale;
  /** Localized word for an ongoing role, e.g. "Present". */
  presentLabel: string;
};

/**
 * One row of the experience grid: period / role + org + summary / note.
 *
 * Uses <time> elements so the date range is machine-readable, collapses a
 * same-year range to a single year, and stacks to a single column on small
 * screens.
 */
export function ExperienceRow({ item, locale, presentLabel }: ExperienceRowProps) {
  return (
    <li className="border-rule grid grid-cols-1 gap-2 border-t py-7 md:grid-cols-12 md:gap-8 md:py-9">
      <p className="text-label text-dim md:col-span-3">
        <time dateTime={item.start}>{item.start}</time>
        {item.end !== item.start && (
          <>
            {' — '}
            {item.end ? <time dateTime={item.end}>{item.end}</time> : <span>{presentLabel}</span>}
          </>
        )}
      </p>

      <div className="md:col-span-6">
        <h3 className="text-lg font-semibold tracking-tight md:text-xl">{item.role[locale]}</h3>
        <p className="text-dim mt-1 text-sm">{item.org}</p>
        {item.summary && (
          <p className="text-dim mt-4 max-w-prose text-sm leading-relaxed md:text-base">
            {item.summary[locale]}
          </p>
        )}
      </div>

      {item.note && (
        <p className="text-label text-dim md:col-span-3 md:text-right">{item.note[locale]}</p>
      )}
    </li>
  );
}
