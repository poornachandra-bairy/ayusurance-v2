'use client';

import { useEffect, useRef } from 'react';

const MANDALAS = [
  {
    src: '/mandala%20art%201.png',
    style: { top: '-8%', left: '-8%', width: '52vw', height: '52vw' },
    strength: 22,
    spin: 3,
    opacity: 0.13,
    spinDur: '90s',
    spinDir: 'normal' as const,
    floatDur: '16s',
  },
  {
    src: '/mandala%20art%202.png',
    style: { bottom: '-10%', right: '-6%', width: '42vw', height: '42vw' },
    strength: 14,
    spin: -2,
    opacity: 0.11,
    spinDur: '120s',
    spinDir: 'reverse' as const,
    floatDur: '20s',
  },
  {
    src: '/mandala%20art%203.png',
    style: { top: '20%', left: '28%', width: '32vw', height: '32vw' },
    strength: 8,
    spin: 2,
    opacity: 0.07,
    spinDur: '75s',
    spinDir: 'normal' as const,
    floatDur: '13s',
  },
] as const;

export default function MandalaBackground() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const m = MANDALAS[i];
        const tx = -dx * m.strength;
        const ty = -dy * m.strength;
        const rot = dx * m.spin;
        // Only translate on outer — inner handles full rotation via CSS
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}deg)`;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      <style>{`
        @keyframes mandalaSpinCW  { to { transform: rotate(360deg); } }
        @keyframes mandalaSpinCCW { to { transform: rotate(-360deg); } }
        @keyframes mandalaFloat {
          0%,100% { margin-top: 0px;   margin-left: 0px;   }
          25%     { margin-top: -22px; margin-left: 12px;  }
          50%     { margin-top: -8px;  margin-left: -18px; }
          75%     { margin-top: 16px;  margin-left: 8px;   }
        }
      `}</style>
      {MANDALAS.map((m, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          style={{
            position: 'absolute',
            ...m.style,
            opacity: m.opacity,
            willChange: 'transform',
            transition: 'transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            mixBlendMode: 'overlay',
          }}
        >
          {/* Inner: float drift */}
          <div style={{
            width: '100%', height: '100%',
            animation: `mandalaFloat ${m.floatDur} ease-in-out infinite`,
          }}>
            {/* Innermost: continuous spin */}
            <div style={{
              width: '100%', height: '100%',
              animation: `${m.spinDir === 'reverse' ? 'mandalaSpinCCW' : 'mandalaSpinCW'} ${m.spinDur} linear infinite`,
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain', userSelect: 'none', display: 'block' }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

