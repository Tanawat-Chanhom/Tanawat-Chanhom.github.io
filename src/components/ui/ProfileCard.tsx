'use client';

import { useCallback, useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

/**
 * Tilting profile card, adapted from React Bits' ProfileCard (MIT).
 * https://reactbits.dev/components/profile-card
 *
 * The mechanics are the original's: pointer position drives a set of CSS
 * custom properties, which in turn drive a 3D rotation plus a masked
 * "sheen" layer and a radial glare that track the cursor. Movement is eased
 * toward its target rather than following the pointer exactly, so the card
 * feels weighted.
 *
 * Adapted in four ways:
 *
 * 1. Recoloured to the site palette. Upstream is deliberately holographic —
 *    six rainbow "sunpillar" stops, a violet inner gradient and a blue glow.
 *    On a strictly black-and-white page that reads as a foreign object, so the
 *    same layers are rebuilt in greys. The iridescence becomes a metallic
 *    sheen.
 * 2. `prefers-reduced-motion` disables the tilt engine entirely. What is left
 *    is a static card, not a broken one.
 * 3. The contact affordance is a real link to the contact section rather than
 *    a button with an onClick, so it works as navigation and is reachable by
 *    keyboard.
 * 4. Device-orientation tilt is dropped. It gates on a permission prompt fired
 *    from a click handler, which is a lot of intrusion for a decorative effect.
 */

const ANIMATION = {
  INITIAL_DURATION: 1200,
  INITIAL_X_OFFSET: 70,
  INITIAL_Y_OFFSET: 60,
  /** Easing time constants, in seconds. */
  TAU: 0.14,
  INITIAL_TAU: 0.6,
} as const;

const clamp = (v: number, min = 0, max = 100) => Math.min(Math.max(v, min), max);
const round = (v: number, precision = 3) => parseFloat(v.toFixed(precision));
const adjust = (v: number, fMin: number, fMax: number, tMin: number, tMax: number) =>
  round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

export type ProfileCardProps = {
  avatarUrl: string;
  name: string;
  title: string;
  handle: string;
  status: string;
  contactLabel: string;
  contactHref: string;
  className?: string;
};

export function ProfileCard({
  avatarUrl,
  name,
  title,
  handle,
  status,
  contactLabel,
  contactHref,
  className,
}: ProfileCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const setTilt = useCallback((active: boolean) => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = active ? 'none' : 'transform 1s ease';
    card.style.transform = active
      ? 'translateZ(0) rotateX(var(--rotate-y)) rotateY(var(--rotate-x))'
      : 'translateZ(0) rotateX(0deg) rotateY(0deg)';
  }, []);

  useEffect(() => {
    const shell = shellRef.current;
    const wrap = wrapRef.current;
    if (!shell || !wrap) return;

    // A card that leans toward the cursor is exactly the kind of motion this
    // preference is about. Leave it flat and still.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    /*
     * The tilt engine lives inside the effect rather than in a useMemo: it is
     * mutable state driven by rAF, not a pure computation, and the React
     * Compiler rightly rejects reassigning memo-scoped bindings after render.
     */
    let rafId: number | null = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let initialUntil = 0;

    const applyVars = (x: number, y: number) => {
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;

      const vars: Record<string, string> = {
        '--pointer-x': `${percentX}%`,
        '--pointer-y': `${percentY}%`,
        '--background-x': `${adjust(percentX, 0, 100, 35, 65)}%`,
        '--background-y': `${adjust(percentY, 0, 100, 35, 65)}%`,
        '--pointer-from-center': `${clamp(Math.hypot(percentY - 50, percentX - 50) / 50, 0, 1)}`,
        '--pointer-from-top': `${percentY / 100}`,
        '--pointer-from-left': `${percentX / 100}`,
        '--rotate-x': `${round(-(centerX / 5))}deg`,
        '--rotate-y': `${round(centerY / 4)}deg`,
      };

      for (const [k, v] of Object.entries(vars)) wrap.style.setProperty(k, v);
    };

    const step = (ts: number) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;

      const tau = ts < initialUntil ? ANIMATION.INITIAL_TAU : ANIMATION.TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      applyVars(currentX, currentY);

      // Stop once it has settled — no idle rAF burning frames.
      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        rafId = null;
      }
    };

    const start = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    const setTarget = (x: number, y: number) => {
      targetX = x;
      targetY = y;
      start();
    };

    const toCenter = () => setTarget(shell.clientWidth / 2, shell.clientHeight / 2);

    const offsets = (event: PointerEvent) => {
      const rect = shell.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };

    const onEnter = (event: PointerEvent) => {
      wrap.style.setProperty('--card-opacity', '1');
      setTilt(true);
      const { x, y } = offsets(event);
      setTarget(x, y);
    };
    const onMove = (event: PointerEvent) => {
      const { x, y } = offsets(event);
      setTarget(x, y);
    };
    const onLeave = () => {
      wrap.style.setProperty('--card-opacity', '0');
      setTilt(false);
      toCenter();
    };

    shell.addEventListener('pointerenter', onEnter);
    shell.addEventListener('pointermove', onMove);
    shell.addEventListener('pointerleave', onLeave);

    // Sweep in from an offset corner on mount so the card announces itself.
    currentX = shell.clientWidth - ANIMATION.INITIAL_X_OFFSET;
    currentY = ANIMATION.INITIAL_Y_OFFSET;
    applyVars(currentX, currentY);
    initialUntil = performance.now() + ANIMATION.INITIAL_DURATION;
    toCenter();

    return () => {
      shell.removeEventListener('pointerenter', onEnter);
      shell.removeEventListener('pointermove', onMove);
      shell.removeEventListener('pointerleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
      running = false;
    };
  }, [setTilt]);

  const radius = '24px';

  const rootVars = {
    perspective: '500px',
    transform: 'translate3d(0, 0, 0.1px)',
    '--card-radius': radius,
    '--pointer-x': '50%',
    '--pointer-y': '50%',
    '--pointer-from-center': '0',
    '--pointer-from-top': '0.5',
    '--pointer-from-left': '0.5',
    '--background-x': '50%',
    '--background-y': '50%',
    '--rotate-x': '0deg',
    '--rotate-y': '0deg',
    '--card-opacity': '0',
  } as CSSProperties;

  /**
   * Monochrome stand-in for the upstream rainbow sheen: a repeating grey ramp
   * plus a diagonal band, masked by the pointer-tracked radial gradient.
   */
  const sheenStyle: CSSProperties = {
    gridArea: '1 / -1',
    borderRadius: radius,
    pointerEvents: 'none',
    zIndex: 3,
    transform: 'translate3d(0, 0, 1px)',
    overflow: 'hidden',
    mixBlendMode: 'color-dodge',
    filter: 'brightness(0.5) contrast(1.4) opacity(0.32)',
    animation: 'pc-sheen 18s linear infinite',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: `
      repeating-linear-gradient(
        0deg,
        #1a1a18 5%,
        #6f6f6a 10%,
        #d8d8d4 15%,
        #6f6f6a 20%,
        #1a1a18 25%,
        #4a4a45 30%,
        #1a1a18 35%
      ),
      repeating-linear-gradient(
        -45deg,
        #0e0e0d 0%,
        #4c4c48 3.8%,
        #8f8f89 4.5%,
        #4c4c48 5.2%,
        #0e0e0d 10%,
        #0e0e0d 12%
      ),
      radial-gradient(
        farthest-corner circle at var(--pointer-x) var(--pointer-y),
        rgba(0, 0, 0, 0.1) 12%,
        rgba(0, 0, 0, 0.15) 20%,
        rgba(0, 0, 0, 0.25) 120%
      )
    `.replace(/\s+/g, ' '),
  };

  const glareStyle: CSSProperties = {
    gridArea: '1 / -1',
    borderRadius: radius,
    pointerEvents: 'none',
    zIndex: 4,
    transform: 'translate3d(0, 0, 1.1px)',
    overflow: 'hidden',
    mixBlendMode: 'overlay',
    filter: 'brightness(0.85) contrast(1.2)',
    backgroundImage: `radial-gradient(
      farthest-corner circle at var(--pointer-x) var(--pointer-y),
      #c9c9c4 12%,
      rgba(38, 38, 36, 0.85) 90%
    )`,
  };

  return (
    <div ref={wrapRef} className={`relative touch-none ${className ?? ''}`} style={rootVars}>
      {/* Ambient glow behind the card, revealed on hover. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-200 ease-out"
        style={{
          background:
            'radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(242, 242, 240, 0.28) 0%, transparent 55%)',
          filter: 'blur(50px)',
          opacity: 'calc(0.9 * var(--card-opacity))',
        }}
      />

      <div ref={shellRef} className="relative z-1">
        <div
          ref={cardRef}
          className="border-rule relative grid overflow-hidden border"
          style={{
            aspectRatio: '0.718',
            width: '100%',
            borderRadius: radius,
            background: '#0d0d0c',
            backgroundBlendMode: 'color-dodge, normal, normal',
            boxShadow:
              'rgba(0, 0, 0, 0.85) calc((var(--pointer-from-left) * 10px) - 3px) calc((var(--pointer-from-top) * 20px) - 6px) 26px -8px',
            transition: 'transform 1s ease',
            transform: 'translateZ(0) rotateX(0deg) rotateY(0deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <div
            className="absolute inset-0 grid"
            style={{ borderRadius: radius, backgroundColor: '#0d0d0c' }}
          >
            <div aria-hidden="true" style={sheenStyle} />
            <div aria-hidden="true" style={glareStyle} />

            {/* Portrait */}
            <div
              className="overflow-visible"
              style={{
                gridArea: '1 / -1',
                borderRadius: radius,
                pointerEvents: 'none',
                mixBlendMode: 'luminosity',
                transform: 'translateZ(2px)',
                backfaceVisibility: 'hidden',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- decorative layer; next/image's wrapper fights the 3D transform stack */}
              <img
                src={avatarUrl}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute bottom-0 left-1/2 w-full will-change-transform"
                style={{
                  transformOrigin: '50% 100%',
                  transform:
                    'translateX(calc(-50% + (var(--pointer-from-left) - 0.5) * 6px)) translateZ(0) scaleY(calc(1 + (var(--pointer-from-top) - 0.5) * 0.02))',
                  borderRadius: radius,
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>

            {/* Name plate */}
            <div
              className="relative z-5 text-center"
              style={{
                gridArea: '1 / -1',
                pointerEvents: 'none',
                transform:
                  'translate3d(calc(var(--pointer-from-left) * -6px + 3px), calc(var(--pointer-from-top) * -6px + 3px), 0.1px)',
              }}
            >
              <div className="absolute top-10 flex w-full flex-col px-6">
                <h3 className="text-display text-[clamp(1.5rem,4vw,2.25rem)]">{name}</h3>
                <p className="text-label text-dim mt-3">{title}</p>
              </div>
            </div>

            {/* Footer: handle, status, contact */}
            <div
              className="absolute right-4 bottom-4 left-4 z-10 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-xl"
              style={{ gridArea: '1 / -1', alignSelf: 'end' }}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white/90">@{handle}</p>
                <p className="text-dim truncate text-xs">{status}</p>
              </div>

              <a
                href={contactHref}
                className="text-label shrink-0 rounded-lg border border-white/15 px-4 py-2.5 text-white/90 transition-colors duration-200 hover:border-white/50"
              >
                {contactLabel}
                <span className="sr-only"> — {name}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
