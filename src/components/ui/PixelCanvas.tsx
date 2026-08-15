'use client';

import { useEffect, useRef } from 'react';

/**
 * Pixel-dissolve hover effect, adapted from React Bits' PixelCard (MIT).
 * https://reactbits.dev/components/pixel-card
 *
 * Three deliberate departures from the original, driven by where it is used —
 * a full-width list row rather than a fixed-size card:
 *
 * 1. No wrapper element and no `tabIndex`. The original card is itself
 *    focusable, which inside our project link would add a second tab stop per
 *    row and break the one-stop-per-project contract. This renders only a
 *    decorative canvas and binds to its parent's hover/focus instead.
 * 2. Pixels are built on first activation, not on mount. A row is ~1150x120px,
 *    so eager building would allocate tens of thousands of Pixel objects
 *    across six rows before the user touches anything.
 * 3. Hover binding is skipped on devices without real hover, matching how the
 *    thumbnail reveal is gated.
 */

class Pixel {
  private readonly ctx: CanvasRenderingContext2D;
  private readonly x: number;
  private readonly y: number;
  private readonly color: string;
  private readonly speed: number;
  private readonly sizeStep: number;
  private readonly minSize = 0.5;
  private readonly maxSizeInteger = 2;
  private readonly maxSize: number;
  private readonly delay: number;
  private readonly counterStep: number;

  private size = 0;
  private counter = 0;
  private isReverse = false;
  private isShimmer = false;

  isIdle = false;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    speed: number,
    delay: number,
  ) {
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = randomBetween(0.1, 0.9) * speed;
    this.sizeStep = Math.random() * 0.4;
    this.maxSize = randomBetween(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counterStep = Math.random() * 4 + (canvas.width + canvas.height) * 0.01;
  }

  private draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  /** Grows the pixel in, then shimmers it. Delay is distance-based, so the
   *  effect radiates outward from the centre of the row. */
  appear() {
    this.isIdle = false;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }

    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }

    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;

    if (this.size <= 0) {
      this.isIdle = true;
      return;
    }

    this.size -= 0.1;
    this.draw();
  }

  private shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }

    this.size += this.isReverse ? -this.speed : this.speed;
  }
}

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function effectiveSpeed(value: number, reducedMotion: boolean) {
  if (reducedMotion || value <= 0) return 0;
  return Math.min(value, 100) * 0.001;
}

type PixelCanvasProps = {
  /** Pixel grid spacing in px. Lower is denser and more expensive. */
  gap?: number;
  /** Shimmer speed, 0-100. */
  speed?: number;
  /** Comma-separated hex colors, sampled at random per pixel. */
  colors?: string;
  className?: string;
};

/**
 * Renders a decorative canvas that fills its positioned parent and animates
 * when that parent is hovered or receives focus.
 *
 * The parent must establish a stacking context (`isolate`) so this can sit at
 * a negative z-index — above the parent's background but behind its text.
 */
export function PixelCanvas({
  // Tuned well below the upstream defaults (gap 5, near-white palette). At a
  // card's scale that reads as sparkle; across a full-width row behind a huge
  // headline it read as noise and fought the type for attention. Sparser grid
  // and no pure white keeps it as texture, with the title still the loudest
  // thing in the row.
  gap = 9,
  speed = 35,
  // --color-dim, then two steps down toward --color-rule.
  colors = '#8a8a86,#4a4a45,#2e2e2b',
  className,
}: PixelCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let pixels: Pixel[] = [];
    let rafId: number | null = null;
    let prevTime = 0;
    let built = false;

    const build = () => {
      const ctx = canvas.getContext('2d');
      const rect = host.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);
      if (!ctx || width === 0 || height === 0) return;

      canvas.width = width;
      canvas.height = height;

      const palette = colors.split(',');
      const next: Pixel[] = [];
      const step = Math.max(1, Math.floor(gap));

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const color = palette[Math.floor(Math.random() * palette.length)] ?? '#f2f2f0';
          const dx = x - width / 2;
          const dy = y - height / 2;
          const delay = reducedMotion ? 0 : Math.sqrt(dx * dx + dy * dy);

          next.push(
            new Pixel(canvas, ctx, x, y, color, effectiveSpeed(speed, reducedMotion), delay),
          );
        }
      }

      pixels = next;
      built = true;
    };

    const tick = (mode: 'appear' | 'disappear') => {
      rafId = requestAnimationFrame(() => tick(mode));

      const now = performance.now();
      const elapsed = now - prevTime;
      const frame = 1000 / 60;
      if (elapsed < frame) return;
      prevTime = now - (elapsed % frame);

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let allIdle = true;
      for (const pixel of pixels) {
        pixel[mode]();
        if (!pixel.isIdle) allIdle = false;
      }

      // Stop burning frames once every pixel has settled.
      if (allIdle && rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const run = (mode: 'appear' | 'disappear') => {
      if (!built) build();
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => tick(mode));
    };

    const onEnter = () => run('appear');
    const onLeave = () => run('disappear');

    // Focus bubbles via focusin/focusout, so keyboard users get the effect
    // without this element being focusable itself.
    const onFocusIn = () => run('appear');
    const onFocusOut = () => run('disappear');

    if (canHover) {
      host.addEventListener('mouseenter', onEnter);
      host.addEventListener('mouseleave', onLeave);
    }
    host.addEventListener('focusin', onFocusIn);
    host.addEventListener('focusout', onFocusOut);

    // Only rebuild after a resize if the grid already exists; otherwise leave
    // construction to the first interaction.
    const observer = new ResizeObserver(() => {
      if (built) build();
    });
    observer.observe(host);

    return () => {
      observer.disconnect();
      if (canHover) {
        host.removeEventListener('mouseenter', onEnter);
        host.removeEventListener('mouseleave', onLeave);
      }
      host.removeEventListener('focusin', onFocusIn);
      host.removeEventListener('focusout', onFocusOut);
      if (rafId !== null) cancelAnimationFrame(rafId);
      pixels = [];
    };
  }, [gap, speed, colors]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 block size-full ${className ?? ''}`}
    />
  );
}
