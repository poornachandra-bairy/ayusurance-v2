'use client';

import { useEffect, useState } from 'react';

/**
 * CinematicLoader — "Dawn Over the Forest"
 *
 * Calm, warm parchment-to-sage palette. No dark colors, no harsh flashes.
 * Elements reveal sequentially with clip-path wipes, soft fade-ups, and a
 * live rotating ring decoration. The whole screen is warm from frame 1.
 */

type Phase = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

const PHASES: { at: number; to: Phase }[] = [
  { at: 0,    to: 0 },  // init
  { at: 200,  to: 1 },  // rings appear
  { at: 700,  to: 2 },  // golden rule draws in
  { at: 1500, to: 3 },  // AYUSURANCE wipes in
  { at: 2600, to: 4 },  // tagline fades up
  { at: 3400, to: 5 },  // shloka 1 fades in
  { at: 6800, to: 6 },  // shloka 2 fades in
  { at: 9300, to: 7 },  // exit
];

export default function CinematicLoader({ onComplete }: { onComplete: () => void }) {
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
    <>
      <style>{`
        /* ── Keyframes ─────────────────────────────────────────────── */
        @keyframes ruleGrow {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }
        @keyframes titleReveal {
          0%   { opacity: 0; transform: translateY(10px) scale(0.96); filter: blur(6px); }
          100% { opacity: 1; transform: translateY(0)    scale(1);    filter: blur(0);   }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes shlokaIn {
          from { opacity: 0; transform: translateY(20px); filter: blur(5px); }
          to   { opacity: 1; transform: translateY(0);   filter: blur(0);   }
        }
        @keyframes shlokaOut {
          from { opacity: 1; transform: translateY(0);    filter: blur(0);   }
          to   { opacity: 0; transform: translateY(-16px); filter: blur(4px); }
        }
        @keyframes ringSpinCW  { to { transform: rotate(360deg);  } }
        @keyframes ringSpinCCW { to { transform: rotate(-360deg); } }
        @keyframes bgBreath {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.88; }
        }

        /* ── Utilities ─────────────────────────────────────────────── */
        .cl-rule-grow   { transform-origin: center; animation: ruleGrow   1.1s cubic-bezier(0.22,1,0.36,1) forwards; }
        .cl-title-in    { animation: titleReveal 1.2s cubic-bezier(0.22,1,0.36,1) forwards; }
        .cl-fade-up     { animation: fadeUp     0.9s cubic-bezier(0.22,1,0.36,1) forwards; }
        .cl-shloka-in   { animation: shlokaIn   1.0s cubic-bezier(0.22,1,0.36,1) forwards; }
        .cl-shloka-out  { animation: shlokaOut  0.6s cubic-bezier(0.4,0,0.6,1) forwards;   }

        .cl-ring-cw  { animation: ringSpinCW  55s linear infinite; }
        .cl-ring-ccw { animation: ringSpinCCW 75s linear infinite; }
        .cl-ring-cw2 { animation: ringSpinCW  38s linear infinite; }
      `}</style>

      {/* ── Root shell ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          /* Warm dawn: cream sky → sage meadow → forest */
          background: 'linear-gradient(162deg, #e8dfc8 0%, #cdd4a8 28%, #9ab898 55%, #5a8870 80%, #3a6050 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          transition: 'opacity 1s cubic-bezier(0.4,0,0.6,1)',
          opacity: exiting ? 0 : 1,
          pointerEvents: exiting ? 'none' : 'auto',
        }}
      >
        {/* ── Decorative concentric rings ────────────────────────── */}
        {phase >= 1 && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
            <div className="cl-ring-cw" style={{ position: 'absolute', width: '70vmin', height: '70vmin', borderRadius: '50%', border: '1px solid rgba(80,110,60,0.18)' }} />
            <div className="cl-ring-ccw" style={{ position: 'absolute', width: '56vmin', height: '56vmin', borderRadius: '50%', border: '1px solid rgba(140,100,40,0.14)' }} />
            <div className="cl-ring-cw2" style={{ position: 'absolute', width: '42vmin', height: '42vmin', borderRadius: '50%', border: '0.5px solid rgba(80,110,60,0.10)' }} />
            {/* Warm radial glow at centre */}
            <div style={{ position: 'absolute', width: '50vmin', height: '50vmin', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,200,0.18) 0%, transparent 70%)', animation: 'bgBreath 5s ease-in-out infinite' }} />
          </div>
        )}

        {/* ── Content ─────────────────────────────────────────────── */}
        <div style={{
          position: 'relative', zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          width: '100%',
        }}>

          {/* Golden rule — top */}
          {phase >= 2 && (
            <div className="cl-rule-grow" style={{ height: '1px', width: '200px', marginBottom: '2.8rem', background: 'linear-gradient(90deg, transparent, rgba(130,95,35,0.65), transparent)' }} />
          )}

          {/* AYUSURANCE — flex alignItems:center guarantees perfect horizontal centering */}
          {phase >= 3 && (
            <h1
              className="cl-title-in"
              style={{
                fontFamily: 'var(--font-cinzel, Georgia, serif)',
                fontSize: 'clamp(1.8rem, 5.5vw, 5rem)',
                fontWeight: 700,
                color: '#283820',
                letterSpacing: '0.1em',
                lineHeight: 1,
                margin: '0 0 0.8rem',
                textShadow: '0 2px 24px rgba(60,90,40,0.15)',
                whiteSpace: 'nowrap',
              }}
            >
              AYUSURANCE
            </h1>
          )}

          {/* Tagline */}
          {phase >= 4 && (
            <p
              className="cl-fade-up"
              style={{
                margin: '0 0 3rem',
                fontFamily: 'var(--font-geist-sans, sans-serif)',
                fontSize: '9.5px',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'rgba(60,80,35,0.60)',
                textAlign: 'center',
              }}
            >
              Ancient Wisdom &nbsp;·&nbsp; Modern Assurance
            </p>
          )}

          {/* Golden rule — bottom */}
          {phase >= 2 && (
            <div className="cl-rule-grow" style={{ height: '1px', width: '200px', marginBottom: '3.2rem', background: 'linear-gradient(90deg, transparent, rgba(130,95,35,0.65), transparent)' }} />
          )}

          {/* Shloka 1 */}
          {phase === 5 && (
            <div className="cl-shloka-in" style={{ minHeight: '120px', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                fontStyle: 'italic', fontWeight: 400,
                color: 'rgba(40,56,28,0.82)',
                lineHeight: 2, margin: '0 0 1.1rem', textAlign: 'center',
              }}>
                हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् |<br />
                मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते
              </p>
              <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(60,80,35,0.52)', textTransform: 'uppercase', fontFamily: 'var(--font-geist-sans, sans-serif)' }}>
                Charaka Samhita &nbsp;·&nbsp; 1.41
              </span>
            </div>
          )}

          {/* Shloka 2 */}
          {phase >= 6 && phase < 7 && (
            <div className="cl-shloka-in" style={{ minHeight: '120px', textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--font-cormorant, Georgia, serif)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.75rem)',
                fontStyle: 'italic', fontWeight: 400,
                color: 'rgba(40,56,28,0.82)',
                lineHeight: 2, margin: '0 0 1.1rem', textAlign: 'center',
              }}>
                समदोषः समाग्निश्च समधातुमलक्रियः ।<br />
                प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते
              </p>
              <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(60,80,35,0.52)', textTransform: 'uppercase', fontFamily: 'var(--font-geist-sans, sans-serif)' }}>
                Sushruta Samhita &nbsp;·&nbsp; 15.41
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
