import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArticleRow } from '@/components/ui/ArticleRow';
import { getDictionary, type Locale } from '@/i18n';
import { articles } from '@/data/site';

/** Posts published on Medium, as teasers that link out to the full article. */
export function Articles({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="articles" aria-labelledby="articles-heading" className="py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow={t.articles.eyebrow} id="articles-heading">
          {t.articles.heading}
        </SectionHeading>

        <ul className="border-rule border-b">
          {articles.map((article) => (
            <ArticleRow
              key={article.href}
              article={article}
              locale={locale}
              readLabel={t.articles.readOnMedium}
              langLabel={article.lang === locale ? undefined : t.articles.writtenIn[article.lang]}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
