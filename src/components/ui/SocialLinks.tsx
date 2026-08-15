import {
  GithubLogoIcon,
  LinkedinLogoIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react/dist/ssr';
import { socialLinks, type SocialLink } from '@/data/site';
import { cn } from '@/lib/cn';

const icons = {
  github: GithubLogoIcon,
  linkedin: LinkedinLogoIcon,
  envelope: EnvelopeSimpleIcon,
} as const;

type SocialLinksProps = {
  /** Accessible name for the nav landmark wrapping these links. */
  label: string;
  links?: SocialLink[];
  /** Show the platform name next to the icon. */
  showLabels?: boolean;
  className?: string;
};

/**
 * Social profile links.
 *
 * Icons are decorative; each link's accessible name comes from either visible
 * text or an aria-label, never from the icon itself.
 */
export function SocialLinks({
  label,
  links = socialLinks,
  showLabels = false,
  className,
}: SocialLinksProps) {
  return (
    <nav aria-label={label} className={cn('flex items-center gap-5', className)}>
      {links.map((link) => {
        const Icon = icons[link.icon];
        const isExternal = link.href.startsWith('http');

        return (
          <a
            key={link.label}
            href={link.href}
            {...(isExternal ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
            className="text-dim hover:text-fg inline-flex items-center gap-2 transition-colors duration-200"
            {...(showLabels ? {} : { 'aria-label': link.label })}
          >
            <Icon weight="regular" className="size-5" aria-hidden="true" />
            {showLabels ? <span className="text-label">{link.label}</span> : null}
          </a>
        );
      })}
    </nav>
  );
}
