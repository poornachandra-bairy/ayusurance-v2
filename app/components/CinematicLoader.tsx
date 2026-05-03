'use client';

import { useEffect, useRef } from 'react';

interface Props { onComplete: () => void; }

const CinematicLoader = ({ onComplete }: Props) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const tlRef   = useRef<HTMLImageElement>(null);
  const trRef   = useRef<HTMLImageElement>(null);
  const blRef   = useRef<HTMLImageElement>(null);
  const brRef   = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();

    // Modern: fast, snappy, short — ~2s total
    const STAGGER    = 70;
    const FLIP_DUR   = 650;
    const EXIT_START = 1800;
    const EXIT_DUR   = 500;
    const DONE_AT    = EXIT_START + EXIT_DUR + 60;

    // Snappy ease-out quint — fast start, quick decelerate
    const eOut5 = (t: number) => 1 - Math.pow(1 - t, 5);

    const flip = (
      ref:      React.RefObject<HTMLImageElement | null>,
      rotY:     number,   // Y-axis start angle
      rotX:     number,   // X-axis start angle
      tx:       number,   // translation drift
      ty:       number,
      delay:    number
    ) => {
      if (!ref.current) return;
      const el  = performance.now() - t0;
      const p   = Math.min(1, Math.max(0, (el - delay) / FLIP_DUR));
      const e   = eOut5(p);

      const blur = (1 - e) * 16;

      ref.current.style.opacity   = String(Math.min(1, p * 3));
      ref.current.style.filter    = `blur(${blur}px)`;
      ref.current.style.transform =
        `translate(${tx * (1 - e)}px, ${ty * (1 - e)}px)`
        + ` rotateX(${rotX * (1 - e)}deg) rotateY(${rotY * (1 - e)}deg)`;
    };

    const tick = () => {
      const el = performance.now() - t0;

      // Each box flips in from a different 3D angle:
      // TL — flips from the left (rotateY 90°)
      flip(tlRef,  90,   0, -20, -20,   0);
      // TR — flips from above (rotateX -90°)
      flip(trRef,   0, -90,  20, -20, STAGGER);
      // BL — flips from below (rotateX 90°)
      flip(blRef,   0,  90, -20,  20, STAGGER * 2);
      // BR — flips from the right (rotateY -90°)
      flip(brRef, -90,   0,  20,  20, STAGGER * 3);

      // Fade out — fast
      if (wrapRef.current && el >= EXIT_START) {
        wrapRef.current.style.opacity =
          String(1 - eOut5(Math.min(1, (el - EXIT_START) / EXIT_DUR)));
      }

      if (el >= DONE_AT) { onComplete(); return; }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const SIZE = 460;

  const q: React.CSSProperties = {
    position:    'absolute',
    inset:        0,
    margin:      'auto',
    width:        SIZE,
    height:       SIZE,
    objectFit:   'contain',
    opacity:      0,
    willChange:  'transform, opacity, filter',
    backfaceVisibility: 'hidden',
  };

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: '#0D1510', perspective: '900px' }}
    >
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
        <img ref={tlRef} src="/aysurance_logo.png" alt="" style={{ ...q, clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)' }} />
        <img ref={trRef} src="/aysurance_logo.png" alt="" style={{ ...q, clipPath: 'polygon(50% 0, 100% 0, 100% 50%, 50% 50%)' }} />
        <img ref={blRef} src="/aysurance_logo.png" alt="" style={{ ...q, clipPath: 'polygon(0 50%, 50% 50%, 50% 100%, 0 100%)' }} />
        <img ref={brRef} src="/aysurance_logo.png" alt="Ayusurance" style={{ ...q, clipPath: 'polygon(50% 50%, 100% 50%, 100% 100%, 50% 100%)' }} />
      </div>
    </div>
  );
};

export default CinematicLoader;
