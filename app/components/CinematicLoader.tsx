'use client';

import { useEffect, useState } from 'react';
import {
  LOADER_BRAND_NAME,
  LOADER_TAGLINE,
  SHLOKA_1_TEXT,
  SHLOKA_1_LINE2,
  SHLOKA_1_ATTR,
  SHLOKA_2_TEXT,
  SHLOKA_2_LINE2,
  SHLOKA_2_ATTR,
} from '../constants';

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const PHASES: { at: number; to: Phase }[] = [
  { at: 0,    to: 0 },
  { at: 200,  to: 1 },
  { at: 700,  to: 2 },
  { at: 1500, to: 3 },
  { at: 2600, to: 4 },
  { at: 3400, to: 5 },
  { at: 6800, to: 6 },
  { at: 9300, to: 7 },
];

const CinematicLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<Phase>(0);

  useEffect(() => {
    const timers = PHASES.map(({ at, to }) =>
      setTimeout(() => setPhase(to), at),
    );
    const done = setTimeout(() => onComplete(), 10200);
    return () => { timers.forEach(clearTimeout); clearTimeout(done); };
  }, [onComplete]);

  const exiting = phase === 7;

  return (
    <div
      className={[
        'fixed inset-0 z-[9999] bg-loader',
        'flex flex-col items-center justify-center overflow-hidden',
        'transition-opacity duration-1000 ease-[cubic-bezier(0.4,0,0.6,1)]',
        exiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto',
      ].join(' ')}
    >
      {phase >= 1 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="cl-ring-cw absolute w-[70vmin] h-[70vmin] rounded-full border border-[rgba(80,110,60,0.18)]" />
          <div className="cl-ring-ccw absolute w-[56vmin] h-[56vmin] rounded-full border border-[rgba(140,100,40,0.14)]" />
          <div className="cl-ring-cw2 absolute w-[42vmin] h-[42vmin] rounded-full" style={{ border: '0.5px solid rgba(80,110,60,0.10)' }} />
          <div
            className="absolute w-[50vmin] h-[50vmin] rounded-full animate-[bgBreath_5s_ease-in-out_infinite]"
            style={{ background: 'radial-gradient(circle, rgba(255,240,200,0.18) 0%, transparent 70%)' }}
          />
        </div>
      )}

      <div className="relative z-[2] flex flex-col items-center w-full">

        {phase >= 2 && (
          <div className="cl-rule-grow h-px w-[200px] mb-[2.8rem] bg-[linear-gradient(90deg,transparent,rgba(130,95,35,0.65),transparent)]" />
        )}

        {phase >= 3 && (
          <h1
            className="cl-title-in font-display font-bold text-[#283820] tracking-[0.1em] leading-none mb-[0.8rem] whitespace-nowrap [text-shadow:0_2px_24px_rgba(60,90,40,0.15)]"
            style={{ fontSize: 'clamp(1.8rem, 5.5vw, 5rem)' }}
          >
            {LOADER_BRAND_NAME}
          </h1>
        )}

        {phase >= 4 && (
          <p className="cl-fade-up mb-12 font-sans text-[9.5px] tracking-[0.38em] uppercase text-[rgba(60,80,35,0.60)] text-center">
            {LOADER_TAGLINE}
          </p>
        )}

        {phase >= 2 && (
          <div className="cl-rule-grow h-px w-[200px] mb-[3.2rem] bg-[linear-gradient(90deg,transparent,rgba(130,95,35,0.65),transparent)]" />
        )}

        {phase === 5 && (
          <div className="cl-shloka-in min-h-[120px] text-center">
            <p
              className="font-serif italic font-normal text-[rgba(40,56,28,0.82)] leading-[2] mb-[1.1rem] text-center"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}
            >
              {SHLOKA_1_TEXT}<br />
              {SHLOKA_1_LINE2}
            </p>
            <span className="text-[9px] tracking-[0.22em] text-[rgba(60,80,35,0.52)] uppercase font-sans">
              {SHLOKA_1_ATTR}
            </span>
          </div>
        )}

        {phase >= 6 && phase < 7 && (
          <div className="cl-shloka-in min-h-[120px] text-center">
            <p
              className="font-serif italic font-normal text-[rgba(40,56,28,0.82)] leading-[2] mb-[1.1rem] text-center"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)' }}
            >
              {SHLOKA_2_TEXT}<br />
              {SHLOKA_2_LINE2}
            </p>
            <span className="text-[9px] tracking-[0.22em] text-[rgba(60,80,35,0.52)] uppercase font-sans">
              {SHLOKA_2_ATTR}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};

export default CinematicLoader;
