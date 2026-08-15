'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Cursor-following image preview for a project row.
 *
 * Behaviour follows React Bits Pro's HoverPreview — the image tracks the
 * pointer, tilts with movement, and lags slightly behind it — but the
 * implementation is written from scratch: that component is not published, and
 * it is built on Motion, a ~50KB dependency this site would otherwise not
 * carry. A requestAnimationFrame loop over two transforms does the same job
 * for nothing.
 *
 * The tilt is velocity-derived rather than position-derived. Rotation comes
 * from how far the image still has to travel to reach the pointer, so it leans
 * into fast movement and settles level when the pointer stops — which is what
 * makes the effect read as weight rather than as a static skew.
 */

type HoverPreviewProps = {
  src: string;
  width: number;
  height: number;
  /** Rendered width in px; height follows the source aspect ratio. */
  displayWidth?: number;
  /** Max tilt in degrees at full speed. */
  maxRotation?: number;
  /** How far the image trails the pointer, 0-1. Lower lags more. */
  follow?: number;
  /**
   * Clearance between the pointer and the bottom edge of the image, in px.
   *
   * Must exceed how far tilting drops the lower corner, or the image clips the
   * title it is meant to stay clear of: rotating about the centre pushes that
   * corner down by roughly `displayWidth / 2 * sin(maxRotation)` — about 22px
   * at the defaults.
   */
  gap?: number;
  className?: string;
};

export function HoverPreview({
  src,
  width,
  height,
  displayWidth = 210,
  maxRotation = 12,
  follow = 0.16,
  gap = 26,
  className,
}: HoverPreviewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const displayHeight = Math.round((height / width) * displayWidth);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // No hover means no pointer to follow — leave the element hidden entirely
    // rather than parking a preview somewhere arbitrary.
    if (!canHover) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rotation = 0;
    let rafId: number | null = null;
    let active = false;

    // Anchored by its bottom edge, so the image sits above the pointer and
    // leaves the project title readable. `rotate` comes last so the image
    // still turns about its own centre rather than swinging from the cursor.
    const render = () => {
      el.style.transform =
        `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)` +
        ` translate(-50%, -100%) translateY(${-gap}px)` +
        ` rotate(${rotation.toFixed(2)}deg)`;
    };

    const loop = () => {
      const dx = targetX - currentX;
      const dy = targetY - currentY;

      currentX += dx * follow;
      currentY += dy * follow;

      // Lean into the direction of travel, easing back to level as it catches up.
      const desiredRotation = Math.max(-maxRotation, Math.min(maxRotation, dx * 0.35));
      rotation += (desiredRotation - rotation) * 0.12;

      render();

      // Keep animating only while there is motion left to resolve.
      if (active || Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1 || Math.abs(rotation) > 0.05) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    };

    const start = () => {
      if (rafId === null) rafId = requestAnimationFrame(loop);
    };

    const onMove = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      start();
    };

    const onEnter = (event: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;

      // Materialise at the pointer instead of sliding in from wherever the
      // previous hover left it.
      if (!active) {
        currentX = targetX;
        currentY = targetY;
        rotation = 0;
        render();
      }

      active = true;
      el.style.opacity = '1';
      start();
    };

    const onLeave = () => {
      active = false;
      el.style.opacity = '0';
      start();
    };

    if (reducedMotion) {
      // Honour the preference by dropping the motion, not the affordance:
      // the image still appears, parked to the right, with opacity alone
      // animating. Anchor is pushed down by half the image plus the gap so the
      // shared bottom-edge transform lands it centred on the row instead of
      // floating above it, where there is no cursor to sit above.
      const rect = host.getBoundingClientRect();
      currentX = targetX = rect.width * 0.72;
      currentY = targetY = rect.height / 2 + displayHeight / 2 + gap;
      render();

      const show = () => {
        el.style.opacity = '1';
      };
      const hide = () => {
        el.style.opacity = '0';
      };

      host.addEventListener('mouseenter', show);
      host.addEventListener('mouseleave', hide);
      return () => {
        host.removeEventListener('mouseenter', show);
        host.removeEventListener('mouseleave', hide);
      };
    }

    host.addEventListener('mouseenter', onEnter);
    host.addEventListener('mousemove', onMove);
    host.addEventListener('mouseleave', onLeave);

    return () => {
      host.removeEventListener('mouseenter', onEnter);
      host.removeEventListener('mousemove', onMove);
      host.removeEventListener('mouseleave', onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [follow, maxRotation, gap, displayHeight]);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute top-0 left-0 z-20 hidden opacity-0 will-change-transform [@media(hover:hover)_and_(pointer:fine)]:block ${className ?? ''}`}
      style={{
        width: displayWidth,
        height: displayHeight,
        // Enter is slower than exit so it feels like it settles in and snaps away.
        transition: 'opacity 0.2s ease-out',
      }}
    >
      {/* The transform lives on the parent span, so this is just content. */}
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        loading="lazy"
        sizes={`${displayWidth}px`}
        className="border-rule size-full rounded-sm border object-cover grayscale"
      />
    </span>
  );
}
