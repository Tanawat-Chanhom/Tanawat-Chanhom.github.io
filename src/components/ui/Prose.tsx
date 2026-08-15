import { cn } from '@/lib/cn';

/**
 * Renders build-time-generated markdown HTML.
 *
 * `dangerouslySetInnerHTML` is safe here: the HTML comes from markdown files
 * in this repo, rendered during the build. It never contains user input.
 */
export function Prose({ html, className }: { html: string; className?: string }) {
  return (
    <div
      className={cn(
        'prose prose-invert max-w-none',
        'prose-headings:text-display prose-headings:tracking-tight',
        'prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4',
        'prose-h3:text-xl',
        'prose-p:text-dim prose-li:text-dim prose-p:leading-relaxed',
        'prose-strong:text-fg prose-a:text-fg prose-a:underline-offset-4',
        'prose-hr:border-rule prose-blockquote:border-rule prose-blockquote:text-dim',
        'prose-code:text-fg prose-pre:bg-raised prose-pre:border prose-pre:border-rule',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
