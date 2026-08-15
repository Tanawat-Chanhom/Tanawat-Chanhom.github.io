import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

/**
 * Renders a markdown body to HTML at build time.
 *
 * Content is authored by the site owner and never user-submitted, so
 * `sanitize: false` is safe here and lets raw HTML through for the occasional
 * embed. Revisit that if this ever accepts third-party content.
 */
export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await remark().use(remarkGfm).use(remarkHtml, { sanitize: false }).process(markdown);

  return String(file);
}
