'use client';

import { useEffect, useRef } from 'react';

const MANDALAS = [
  {
    src:      '/mandala%20art%201.png',
    pos:      'top-[-8%] left-[-8%] w-[52vw] h-[52vw]',
    strength: 18,
    spin:     2,
    opacity:  0.12,
    spinAnim: 'mandalaSpinCW 100s linear infinite',
    float:    'mandalaFloat 18s ease-in-out infinite',
  },
  {
    src:      '/mandala%20art%202.png',
    pos:      'bottom-[-10%] right-[-6%] w-[42vw] h-[42vw]',
    strength: 10,
    spin:     -1.5,
    opacity:  0.10,
    spinAnim: 'mandalaSpinCCW 130s linear infinite',
    float:    'mandalaFloat 22s ease-in-out infinite',
  },
  {
    src:      '/mandala%20art%203.png',
    pos:      'top-[20%] left-[28%] w-[30vw] h-[30vw]',
    strength: 6,
    spin:     1.5,
    opacity:  0.06,
    spinAnim: 'mandalaSpinCW 85s linear infinite',
    float:    'mandalaFloat 15s ease-in-out infinite',
  },
] as const;

const MandalaBackground = () => {
  const refs    = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef  = useRef<number | null>(null);
  const target  = useRef({ dx: 0, dy: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth  / 2;
      const cy = window.innerHeight / 2;
      target.current = { dx: (e.clientX - cx) / cx, dy: (e.clientY - cy) / cy };

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const { dx, dy } = target.current;
        refs.current.forEach((el, i) => {
          if (!el) return;
          const m = MANDALAS[i];
          el.style.transform = `translate(${(-dx * m.strength).toFixed(2)}px, ${(-dy * m.strength).toFixed(2)}px) rotate(${(dx * m.spin).toFixed(2)}deg)`;
        });
      });
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {MANDALAS.map((m, i) => (
        <div
          key={i}
          ref={el => { refs.current[i] = el; }}
          className={`absolute will-change-transform mix-blend-multiply ${m.pos}`}
          style={{ opacity: m.opacity }}
        >
          <div className="w-full h-full" style={{ animation: m.float }}>
            <div className="w-full h-full" style={{ animation: m.spinAnim }}>
              
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
