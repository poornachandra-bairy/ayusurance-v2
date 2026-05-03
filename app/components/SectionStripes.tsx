'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function SectionStripes({ colors, reversed = false }: { colors: string[], reversed?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          const totalDist = windowHeight + rect.height;
          const currentDist = windowHeight - rect.top;
          const p = Math.max(0, Math.min(1, currentDist / totalDist));
          setProgress(p);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden opacity-50">
      <svg width="100%" height="100%" viewBox="0 0 1000 1000" fill="none" preserveAspectRatio="xMidYMid slice" className={reversed ? 'scale-x-[-1] scale-y-[-1]' : ''}>
        <path d="M -200 100 C 400 -100, 800 200, 500 500 C 200 800, -100 600, 200 900 C 500 1200, 1200 800, 800 1100" 
          stroke={colors[0]} strokeWidth="80" strokeLinecap="round" strokeOpacity="0.15"
          pathLength="100" strokeDasharray="100" strokeDashoffset={Math.max(0, 100 - (progress * 130))}
           />
        
        <path d="M 1200 -100 C 600 200, 200 -100, 400 300 C 600 700, 1000 400, 800 800 C 600 1200, -200 900, 300 1300" 
          stroke={colors[1]} strokeWidth="60" strokeLinecap="round" strokeOpacity="0.1"
          pathLength="100" strokeDasharray="100" strokeDashoffset={Math.max(0, 100 - (progress * 110))}
           />
          
        <path d="M 500 -300 C 800 100, 200 400, 500 800 C 800 1200, 800 1600, 400 2000" 
          stroke={colors[2]} strokeWidth="20" strokeLinecap="round" strokeOpacity="0.15"
          pathLength="100" strokeDasharray="100" strokeDashoffset={Math.max(0, 100 - (progress * 150))}
           />
      </svg>
    </div>
  );
}
