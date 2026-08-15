import { cn } from '@/lib/cn';

type PillProps = {
  children: React.ReactNode;
  className?: string;
};

/** Bordered mono chip used for the skills / tech-stack list. */
export function Pill({ children, className }: PillProps) {
  return (
    <span
      className={cn(
        'text-label border-rule text-dim inline-flex items-center rounded-full border px-4 py-2',
        'hover:border-fg hover:text-fg transition-colors duration-200',
        className,
      )}
    >
      {children}
    </span>
  );
}
