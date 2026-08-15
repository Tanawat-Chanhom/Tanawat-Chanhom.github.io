import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/i18n';

/** Required by `output: 'export'` — metadata routes must be statically emitted. */
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
