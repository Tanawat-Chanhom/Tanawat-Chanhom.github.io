import { Container } from '@/components/ui/Container';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { getDictionary, type Locale } from '@/i18n';
import { site } from '@/data/site';

/** Site footer: copyright, colophon, and social links. */
export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-rule mt-24 border-t py-12">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1">
            <p className="text-label text-dim">
              © {year} {site.name}. {t.footer.rights}
            </p>
            <p className="text-label text-dim">{t.footer.builtWith}</p>
          </div>

          <div className="flex items-center gap-6">
            <SocialLinks label={t.nav.socialLabel} />
            <a
              href="#top"
              className="text-label text-dim hover:text-fg transition-colors duration-200"
            >
              {t.footer.backToTop}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
