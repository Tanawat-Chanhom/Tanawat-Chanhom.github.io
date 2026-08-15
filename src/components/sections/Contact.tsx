import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/ssr';
import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { getDictionary, type Locale } from '@/i18n';
import { site } from '@/data/site';

/**
 * Closing call to action.
 *
 * A mailto link rather than a form: a static export has no server to accept a
 * POST, and a third-party form service would add an external dependency to an
 * otherwise self-contained page.
 */
export function Contact({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  return (
    <section id="contact" aria-labelledby="contact-heading" className="py-(--spacing-section)">
      <Container>
        <p className="text-label text-dim mb-6">{t.contact.eyebrow}</p>

        <h2 id="contact-heading" className="text-display text-display-lg">
          {t.contact.heading}
        </h2>

        <div className="border-rule mt-10 flex flex-col gap-8 border-t pt-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-6">
            <p className="text-dim max-w-md text-lg">{t.contact.body}</p>

            <a
              href={`mailto:${site.email}`}
              className="group text-fg inline-flex items-center gap-3 text-xl font-semibold tracking-tight underline decoration-1 underline-offset-8 transition-colors duration-200 md:text-2xl"
            >
              {site.email}
              <ArrowUpRightIcon
                weight="bold"
                className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transform-none"
                aria-hidden="true"
              />
            </a>
          </div>

          <SocialLinks
            label={t.nav.socialLabel}
            showLabels
            className="flex-col items-start gap-3"
          />
        </div>
      </Container>
    </section>
  );
}
