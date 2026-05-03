'use client';

import { useEffect, useRef } from 'react';

interface Props { onComplete: () => void; }

const CinematicLoader = ({ onComplete }: Props) => {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLImageElement>(null);

  const arcRef     = useRef<SVGCircleElement>(null);
  const barRef     = useRef<HTMLDivElement>(null);
  const barFillRef = useRef<HTMLDivElement>(null);
  const tagRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();

    // Arc circumference: r=148 → C = 2π×148 ≈ 929.9
    const CIRCUMFERENCE = 2 * Math.PI * 148;

    const LOGO_START  = 200;
    const LOGO_DUR    = 1800;   // very slow, cinematic reveal
    const ARC_START   = 100;
    const ARC_DUR     = 2000;   // arc draws itself around the logo
    const GLOW_START  = 600;
    const GLOW_DUR    = 1400;
    const BAR_START   = 400;
    const BAR_DUR     = 1800;
    const TAG_START   = 1200;
    const TAG_DUR     = 600;
    const EXIT_START  = 3200;
    const EXIT_DUR    = 600;
    const DONE_AT     = EXIT_START + EXIT_DUR + 60;

    const easeOut3  = (t: number) => 1 - Math.pow(1 - t, 3);
    const easeOut5  = (t: number) => 1 - Math.pow(1 - t, 5);
    const easeInOut = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const tick = (now: number) => {
      const el = now - t0;

      // ── Logo: ultra-slow fade + scale from slightly small ──
      if (logoRef.current) {
        const p = Math.min(1, Math.max(0, (el - LOGO_START) / LOGO_DUR));
        const e = easeOut5(p);
        logoRef.current.style.opacity   = String(e);
        logoRef.current.style.transform = `scale(${0.82 + 0.18 * e})`;
      }

      // ── SVG arc: draws itself clockwise from top ──
      if (arcRef.current) {
        const p = Math.min(1, Math.max(0, (el - ARC_START) / ARC_DUR));
        const e = easeInOut(p);
        const drawn = e * CIRCUMFERENCE;
        arcRef.current.style.strokeDashoffset = String(CIRCUMFERENCE - drawn);
        // fade in arc as it starts drawing
        arcRef.current.style.opacity = String(Math.min(1, p * 6));
      }


      // ── Progress bar ──
      if (barRef.current && barFillRef.current) {
        const pb = Math.min(1, Math.max(0, (el - BAR_START) / BAR_DUR));
        barRef.current.style.opacity   = String(Math.min(1, (el - BAR_START) / 300));
        barFillRef.current.style.width = `${easeOut3(pb) * 100}%`;
      }

      // ── Tagline ──
      if (tagRef.current) {
        const pt = Math.min(1, Math.max(0, (el - TAG_START) / TAG_DUR));
        const et = easeOut3(pt);
        tagRef.current.style.opacity   = String(et);
        tagRef.current.style.transform = `translateY(${(1 - et) * 10}px)`;
      }

      // ── Exit ──
      if (wrapRef.current && el >= EXIT_START) {
        const xe = el - EXIT_START;
        wrapRef.current.style.opacity = String(1 - easeOut3(Math.min(1, xe / EXIT_DUR)));
      }

      if (el >= DONE_AT) { onComplete(); return; }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const SIZE = 320;
  const R    = 148;
  const CX   = SIZE / 2;
  const CIRC = 2 * Math.PI * R;

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: '#111A12' }}
    >
      {/* ── Logo cluster ── */}
      <div style={{ position: 'relative', width: SIZE, height: SIZE }}>



        {/* SVG arc that draws itself clockwise */}
        <svg
          width={SIZE}
          height={SIZE}
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        >
          {/* Static faint track */}
          <circle
            cx={CX} cy={CX} r={R}
            fill="none"
            stroke="rgba(201,168,108,0.08)"
            strokeWidth={1}
          />
          {/* Animated drawing arc */}
          <circle
            ref={arcRef}
            cx={CX} cy={CX} r={R}
            fill="none"
            stroke="rgba(201,168,108,0.7)"
            strokeWidth={1.5}
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC}
            strokeLinecap="round"
            style={{ opacity: 0, willChange: 'stroke-dashoffset, opacity' }}
          />
        </svg>

        {/* Logo — original, untouched */}
        <img
          ref={logoRef}
          src="/aysurance_logo.png"
          alt="Ayusurance"
          style={{
            position: 'absolute',
            inset: 0,
            margin: 'auto',
            width: 320,
            height: 320,
            objectFit: 'contain',
            opacity: 0,
            transform: 'scale(0.82)',
            willChange: 'transform, opacity',
          }}
        />
      </div>

      {/* ── Progress bar ── */}
      <div
        ref={barRef}
        style={{
          width: 200, height: 1,
          background: 'rgba(201,168,108,0.12)',
          marginTop: 48, opacity: 0,
          borderRadius: 1, overflow: 'hidden',
        }}
      >
        <div
          ref={barFillRef}
          style={{
            height: '100%', width: '0%',
            background: 'linear-gradient(90deg, transparent, #C9A86C, #E8D5A3)',
            willChange: 'width', borderRadius: 1,
          }}
        />
      </div>

      {/* ── Tagline ── */}
      <div
        ref={tagRef}
        style={{
          opacity: 0, transform: 'translateY(10px)',
          marginTop: 20, willChange: 'transform, opacity',
          textAlign: 'center',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-sans, DM Sans, sans-serif)',
          fontSize: '0.6rem',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.40)',
          fontWeight: 500,
        }}>
          Ancient Wisdom · Modern Care
        </span>
      </div>
    </div>
  );
};

export default CinematicLoader;
