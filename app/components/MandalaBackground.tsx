'use client';

import { useEffect, useRef } from 'react';

const MANDALAS = [
  {
    src: '/mandala%20art%201.png',
    style: { top: '-8%', left: '-8%', width: '52vw', height: '52vw' },
    strength: 18,
    spin: 2,
    opacity: 0.12,
    spinDur: '100s',
    spinDir: 'normal' as const,
    floatDur: '18s',
  },
  {
    src: '/mandala%20art%202.png',
    style: { bottom: '-10%', right: '-6%', width: '42vw', height: '42vw' },
    strength: 10,
    spin: -1.5,
    opacity: 0.10,
    spinDur: '130s',
    spinDir: 'reverse' as const,
    floatDur: '22s',
  },
  {
    src: '/mandala%20art%203.png',
    style: { top: '20%', left: '28%', width: '30vw', height: '30vw' },
    strength: 6,
    spin: 1.5,
    opacity: 0.06,
    spinDur: '85s',
    spinDir: 'normal' as const,
    floatDur: '15s',
  },
] as const;

const MandalaBackground = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ dx: 0, dy: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetRef.current = {
        dx: (e.clientX - cx) / cx,
        dy: (e.clientY - cy) / cy,
      };

      // Only schedule a new rAF if one isn't already pending
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const { dx, dy } = targetRef.current;
        refs.current.forEach((el, i) => {
          if (!el) return;
          const m = MANDALAS[i];
          const tx = -dx * m.strength;
          const ty = -dy * m.strength;
          const rot = dx * m.spin;
          el.style.transform = `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot.toFixed(2)}deg)`;
        });
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {MANDALAS.map((m, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute will-change-transform mix-blend-multiply"
          style={{ ...m.style, opacity: m.opacity }}
        >
          <div
            className="w-full h-full"
            style={{ animation: `mandalaFloat ${m.floatDur} ease-in-out infinite` }}
          >
            <div
              className="w-full h-full"
              style={{
                animation: `${m.spinDir === 'reverse' ? 'mandalaSpinCCW' : 'mandalaSpinCW'} ${m.spinDur} linear infinite`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt=""
                className="w-full h-full object-contain select-none block"
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MandalaBackground;
