import { useEffect, useRef } from 'react';

export interface ParallaxOptions {
  /** Multiplier applied to window.scrollY (e.g. 0.5 means move half the scroll distance). */
  speed?: number;
  /** Clamp absolute translate value in px (prevents huge GPU layers on very tall pages). */
  maxTranslate?: number;
  /** Axis to move along – currently only 'y' is used in Hero but 'x' supported. */
  axis?: 'y' | 'x';
  /** Disable parallax when viewport width is below this (helps on mobile). */
  disableBelow?: number;
}

/**
 * Lightweight parallax hook that applies a translate3d transform via rAF without causing React re-renders.
 * Usage:
 *   const ref = useParallax({ speed: 0.4 });
 *   <div ref={ref} className="parallax-layer" />
 */
export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    maxTranslate,
    axis = 'y',
    disableBelow = 640, // sm breakpoint default
  } = options;

  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR safeguard
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // Accessibility
    if (window.innerWidth < disableBelow) return; // Skip on small screens

    const el = elRef.current;
    if (!el) return;

    let frame: number | null = null;

    const update = () => {
      frame = null;
      const raw = window.scrollY * speed;
      const value = maxTranslate != null
        ? Math.max(Math.min(raw, maxTranslate), -maxTranslate)
        : raw;
      if (axis === 'y') {
        el.style.transform = `translate3d(0, ${value}px, 0)`;
      } else {
        el.style.transform = `translate3d(${value}px, 0, 0)`;
      }
    };

    const onScroll = () => {
      if (frame != null) return; // throttle to 1 rAF
      frame = requestAnimationFrame(update);
    };

    // Initial paint
    update();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, [speed, maxTranslate, axis, disableBelow]);

  return elRef;
}

export default useParallax;