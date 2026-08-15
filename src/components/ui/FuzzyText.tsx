'use client';

import { useEffect, useRef } from 'react';

/**
 * Scanline-displacement "fuzzy" text, adapted from React Bits' FuzzyText (MIT).
 * https://reactbits.dev/text-animations/fuzzy-text
 *
 * The algorithm is the original's: render the text once to an offscreen
 * canvas, then blit it back one horizontal scanline at a time with a random
 * x-offset per line, so the glyphs shear apart into static.
 *
 * Adapted in three ways:
 *
 * 1. The canvas is `aria-hidden`. The upstream component renders its text
 *    *only* into a canvas, which is invisible to screen readers and to search
 *    engines. Here the real text stays in the DOM and this is decoration over
 *    it — see the caller.
 * 2. `prefers-reduced-motion` paints one clean frame and never starts the
 *    loop. The effect is continuous jitter with no natural end, which is
 *    close to the worst case for motion sensitivity.
 * 3. The prop surface is trimmed to what this site uses. Gradients, glitch
 *    bursts, click pulses and letter-spacing are dropped rather than carried
 *    as dead configuration.
 */

type FuzzyTextProps = {
  children: string;
  /** Any CSS length. Measured off a probe element when not a number. */
  fontSize?: string | number;
  fontWeight?: number;
  color?: string;
  /** Displacement when idle, 0-1. */
  baseIntensity?: number;
  /** Displacement while hovered, 0-1. */
  hoverIntensity?: number;
  /** Maximum scanline offset in px at intensity 1. */
  fuzzRange?: number;
  /** Frame cap. Below 60 to keep a permanently-animating page cheap. */
  fps?: number;
  className?: string;
};

export function FuzzyText({
  children,
  fontSize = 'clamp(4rem, 22vw, 14rem)',
  fontWeight = 900,
  color = '#f2f2f0',
  baseIntensity = 0.14,
  hoverIntensity = 0.42,
  fuzzRange = 26,
  fps = 30,
  className,
}: FuzzyTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;
    let rafId: number | null = null;
    let teardown: (() => void) | null = null;

    const init = async () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // Inherit whatever the surrounding CSS resolved, so this tracks the
      // design tokens instead of hardcoding a family.
      const family = window.getComputedStyle(canvas).fontFamily || 'sans-serif';
      const sizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const font = `${fontWeight} ${sizeStr} ${family}`;

      // Measuring before the webfont lands would size the canvas to the
      // fallback metrics and leave the text clipped.
      try {
        await document.fonts.load(font);
      } catch {
        await document.fonts.ready;
      }
      if (cancelled) return;

      let pxSize: number;
      if (typeof fontSize === 'number') {
        pxSize = fontSize;
      } else {
        const probe = document.createElement('span');
        probe.style.cssText = `position:absolute;visibility:hidden;font-size:${fontSize}`;
        document.body.appendChild(probe);
        pxSize = parseFloat(window.getComputedStyle(probe).fontSize);
        probe.remove();
      }

      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = font;
      offCtx.textBaseline = 'alphabetic';

      const metrics = offCtx.measureText(children);
      const left = metrics.actualBoundingBoxLeft ?? 0;
      const right = metrics.actualBoundingBoxRight ?? metrics.width;
      const ascent = metrics.actualBoundingBoxAscent ?? pxSize;
      const descent = metrics.actualBoundingBoxDescent ?? pxSize * 0.2;

      const textWidth = Math.ceil(left + right);
      const textHeight = Math.ceil(ascent + descent);
      const pad = 10;
      const offWidth = textWidth + pad;

      offscreen.width = offWidth;
      offscreen.height = textHeight;
      offCtx.font = font;
      offCtx.textBaseline = 'alphabetic';
      offCtx.fillStyle = color;
      offCtx.fillText(children, pad / 2 - left, ascent);

      // Room for scanlines to slide sideways without being clipped.
      const margin = fuzzRange + 20;
      canvas.width = offWidth + margin * 2;
      canvas.height = textHeight;
      canvas.style.width = `${canvas.width}px`;
      canvas.style.height = `${canvas.height}px`;
      ctx.translate(margin, 0);

      const drawClean = () => {
        ctx.clearRect(-margin, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreen, 0, 0);
      };

      if (reducedMotion) {
        drawClean();
        return;
      }

      let hovering = false;
      let lastFrame = 0;
      const frameDuration = 1000 / fps;

      // Hover is tracked against the glyph box, not the padded canvas, so the
      // effect only intensifies over the text itself.
      const textLeft = margin + pad / 2;
      const textRight = textLeft + textWidth;

      const onMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        hovering = x >= textLeft && x <= textRight && y >= 0 && y <= textHeight;
      };
      const onLeave = () => {
        hovering = false;
      };

      const run = (time: number) => {
        if (cancelled) return;

        if (time - lastFrame < frameDuration) {
          rafId = requestAnimationFrame(run);
          return;
        }
        lastFrame = time;

        const intensity = hovering ? hoverIntensity : baseIntensity;
        ctx.clearRect(-margin, 0, canvas.width, canvas.height);

        for (let row = 0; row < textHeight; row++) {
          const dx = Math.floor(intensity * (Math.random() - 0.5) * fuzzRange);
          ctx.drawImage(offscreen, 0, row, offWidth, 1, dx, row, offWidth, 1);
        }

        rafId = requestAnimationFrame(run);
      };

      canvas.addEventListener('mousemove', onMove);
      canvas.addEventListener('mouseleave', onLeave);
      rafId = requestAnimationFrame(run);

      teardown = () => {
        canvas.removeEventListener('mousemove', onMove);
        canvas.removeEventListener('mouseleave', onLeave);
      };
    };

    void init();

    return () => {
      cancelled = true;
      if (rafId !== null) cancelAnimationFrame(rafId);
      teardown?.();
    };
  }, [children, fontSize, fontWeight, color, baseIntensity, hoverIntensity, fuzzRange, fps]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`font-display max-w-full ${className ?? ''}`}
    />
  );
}
