'use client';

import { useEffect, useRef } from 'react';
import { LOADER_BRAND_AYU, LOADER_BRAND_SUFFIX } from '../../../constants';


const BOX_SIZE = 56;   
const GAP      = 12;   
const GRID_W   = BOX_SIZE * 2 + GAP;  
const GRID_H   = BOX_SIZE * 2 + GAP;  

const SLOTS = [
  { dx: -(BOX_SIZE / 2 + GAP / 2), dy: -(BOX_SIZE / 2 + GAP / 2) },
  { dx:  (BOX_SIZE / 2 + GAP / 2), dy: -(BOX_SIZE / 2 + GAP / 2) },
  { dx: -(BOX_SIZE / 2 + GAP / 2), dy:  (BOX_SIZE / 2 + GAP / 2) },
  { dx:  (BOX_SIZE / 2 + GAP / 2), dy:  (BOX_SIZE / 2 + GAP / 2) },
] as const;

const DELAYS   = [0, 130, 260, 390];   
const DROP_H   = 320;                   
const FALL_MS  = 520;                   
const DECAY    = 0.42;                  
const BOUNCE   = 190;                   

const easeIn  = (t: number) => t * t * t;
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);



interface Props { onComplete: () => void; }

const CinematicLoader = ({ onComplete }: Props) => {
  const boxRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const logoRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();

    const fallStart = DELAYS.map(d => t0 + d);
    const landTime  = DELAYS.map(d => t0 + d + FALL_MS);
    const maxLand   = Math.max(...landTime);

    const logoStart  = maxLand + 280;
    const exitStart  = logoStart + 1900;
    const completeAt = exitStart + 900;

    const tick = (now: number) => {
      
      SLOTS.forEach((slot, i) => {
        const el      = boxRefs.current[i];
        if (!el) return;
        const elapsed = now - fallStart[i];

        if (elapsed < 0) {
          el.style.opacity   = '0';
          el.style.transform = `translate(calc(-50% + ${slot.dx}px), calc(-50% + ${slot.dy - DROP_H}px))`;
          return;
        }

        
        if (elapsed < FALL_MS) {
          const y = -DROP_H + DROP_H * easeIn(elapsed / FALL_MS);
          el.style.opacity   = '1';
          el.style.boxShadow = 'none';
          el.style.transform = `translate(calc(-50% + ${slot.dx}px), calc(-50% + ${slot.dy + y}px))`;
          return;
        }

        
        const after  = elapsed - FALL_MS;
        let remain   = after;
        let amp      = DROP_H * 0.32;
        let bounceY  = 0;
        let sx = 1, sy = 1;
        const period = BOUNCE * 2;

        while (remain >= 0 && amp > 1.5) {
          if (remain < period) {
            bounceY = -amp * Math.sin((remain / period) * Math.PI);
            const g = 1 - Math.abs(bounceY) / amp;
            sx = 1 + g * 0.20;
            sy = 1 - g * 0.18;
            break;
          }
          remain -= period;
          amp    *= DECAY;
        }

        const glow = Math.max(0, 1 - after / 700);
        el.style.opacity   = '1';
        el.style.boxShadow = glow > 0.02
          ? `0 0 ${14 * glow}px ${5 * glow}px rgba(200,130,26,${0.5 * glow})`
          : 'none';
        el.style.transform = `translate(calc(-50% + ${slot.dx}px), calc(-50% + ${slot.dy + bounceY}px)) scaleX(${sx.toFixed(4)}) scaleY(${sy.toFixed(4)})`;
      });

      
      if (logoRef.current) {
        const le = now - logoStart;
        if (le < 0) {
          logoRef.current.style.opacity   = '0';
          logoRef.current.style.transform = 'translateY(14px)';
        } else {
          const e = easeOut(Math.min(1, le / 650));
          logoRef.current.style.opacity   = String(e);
          logoRef.current.style.transform = `translateY(${(1 - e) * 14}px)`;
        }
      }

      
      if (wrapRef.current) {
        const xe = now - exitStart;
        if (xe >= 0) {
          wrapRef.current.style.opacity = String(1 - easeOut(Math.min(1, xe / 900)));
        }
      }

      if (now >= completeAt) { onComplete(); return; }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      ref={wrapRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center loader-bg"
    >
      
      <div
        className="relative flex-shrink-0"
        style={{ width: GRID_W, height: GRID_H }}
      >
        {SLOTS.map((slot, i) => (
          <div
            key={i}
            ref={el => { boxRefs.current[i] = el; }}
            className="absolute top-1/2 left-1/2 rounded-[3px] will-change-transform"
            style={{
              width:           BOX_SIZE,
              height:          BOX_SIZE,
              border:          '2.5px solid #c8821a',
              opacity:         0,
              transformOrigin: 'bottom center',
              transform:       `translate(calc(-50% + ${slot.dx}px), calc(-50% + ${slot.dy - DROP_H}px))`,
            }}
          />
        ))}
      </div>

      
      <div
        ref={logoRef}
        className="flex items-baseline mt-4 will-change-transform"
        style={{ opacity: 0 }}
      >
        <span className="font-display font-semibold leading-none whitespace-nowrap text-[4rem] tracking-[0.12em] text-[#c8821a]">
          {LOADER_BRAND_AYU}
        </span>
        <span className="font-display font-semibold leading-none whitespace-nowrap text-[4rem] tracking-[0.06em] text-text-700">
          {LOADER_BRAND_SUFFIX}
        </span>
      </div>
    </div>
  );
};

export default CinematicLoader;
