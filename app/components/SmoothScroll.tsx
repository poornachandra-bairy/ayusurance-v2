'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      
      duration: 2.4,
      
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -12 * t)),
      
      wheelMultiplier: 0.65,
      
      touchMultiplier: 0.9,
      
      smoothWheel: true,
    });

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

  return null;
};

export default SmoothScroll;
