/**
 * First focusable element on the page. Visually hidden until focused, then it
 * appears — letting keyboard users jump past the header to the main content.
 */
export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#main"
      className="bg-fg text-bg text-label sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:px-5 focus:py-3"
    >
      {label}
    </a>
  );
}
