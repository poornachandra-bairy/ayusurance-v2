'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

const SmoothScroll = () => {
  const pathname = usePathname();
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      // Higher duration = slower, more cinematic scroll
      duration: 2.4,
      // Smooth ease — starts fast, decelerates into a long tail
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      // Limit how much the user can scroll per wheel tick
      wheelMultiplier: 0.65,
      // Touch also slowed down
      touchMultiplier: 0.9,
      // Smooth on all axis
      smoothWheel: true,
    });

    setLenisInstance(lenis);

    let rafId: number;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Reset scroll on navigation
  useEffect(() => {
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
  }, [pathname, lenisInstance]);

  return null;
};

export default SmoothScroll;
