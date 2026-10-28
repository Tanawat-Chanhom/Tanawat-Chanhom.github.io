import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import type { Article } from '@/data/site';
import type { Locale } from '@/i18n/config';

type ArticleRowProps = {
  article: Article;
  locale: Locale;
  /** Call to action, e.g. "Read on Medium". */
  readLabel: string;
  /** Set when the post is in another language than the page, e.g. "Written in Thai". */
  langLabel?: string;
};

/**
 * One teaser in the articles list: year / title + excerpt / language note.
 *
 * The title is the row's only link, stretched over the whole row with an
 * ::after overlay — one tab stop per article and an accessible name that is
 * just the title, while the excerpt stays ordinary readable text. The visible
 * "Read on Medium" cue is decorative; screen readers hear it as part of the
 * link name instead.
 *
 * No hover fill or side padding, unlike the project list: the columns have to
 * line up with the Experience and Education rows directly above.
 */
export function ArticleRow({ article, locale, readLabel, langLabel }: ArticleRowProps) {
  return (
    <li className="group border-rule relative grid grid-cols-1 gap-2 border-t py-7 md:grid-cols-12 md:gap-8 md:py-9">
      <p className="text-label text-dim md:col-span-3">
        <time dateTime={article.date}>{article.date.slice(0, 4)}</time>
      </p>

      <div className="md:col-span-6">
        <h3 className="text-lg font-semibold tracking-tight md:text-xl">
          <a
            href={article.href}
            target="_blank"
            rel="noreferrer noopener"
            hrefLang={article.lang}
            className="after:absolute after:inset-0"
          >
            {article.title[locale]}
            <span className="sr-only"> — {readLabel}</span>
          </a>
        </h3>
        <p className="text-dim mt-4 max-w-prose text-sm leading-relaxed md:text-base">
          {article.excerpt[locale]}
        </p>
        <span
          className="text-label text-dim group-hover:text-fg mt-4 inline-flex items-center gap-2 underline underline-offset-4 transition-colors duration-200"
          aria-hidden="true"
        >
          {readLabel}
          <ArrowUpRightIcon
            weight="bold"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
          />
        </span>
      </div>

      {langLabel && <p className="text-label text-dim md:col-span-3 md:text-right">{langLabel}</p>}
    </li>
  );
}
