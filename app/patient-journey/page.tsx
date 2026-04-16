'use client';

import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';

// ─── Per-step camera approach angles ─────────────────────────────────────────
// rotX: positive = tilt up (looking down), negative = tilt down (looking up)
// rotY: positive = spin right (approaching from left), negative = from right
const STEP_CAMERA = [
  { rotX: -6,  rotY:  14 }, // 1  Registration   — sweep from upper-right
  { rotX: -2,  rotY: -10 }, // 2  Doctor          — banking left
  { rotX:  5,  rotY:   8 }, // 3  Health Profile  — rising from below-right
  { rotX: -9,  rotY: -13 }, // 4  Screening       — steep dive, upper-left
  { rotX: -4,  rotY:  10 }, // 5  Scheduling      — level right approach
  { rotX:  3,  rotY:  -6 }, // 6  Consultation    — rising, slight left
  { rotX: -6,  rotY:  12 }, // 7  Treatment       — banking right
  { rotX: -2,  rotY:   0 }, // 8  Support         — final level approach
] as const;

// ─── Floating ambient objects ─────────────────────────────────────────────────
// depth: 0=near (moves most with mouse), 1=far (barely moves)
const FLOATERS = [
  { x: '12%', y: '18%', size: 160, depth: 0.92, dir:  1, type: 'ring',    dur: '62s',  color: 'rgba(90,136,112,0.20)'  },
  { x: '85%', y: '14%', size: 220, depth: 0.88, dir: -1, type: 'ring',    dur: '80s',  color: 'rgba(120,100,64,0.14)'  },
  { x: '8%',  y: '58%', size: 60,  depth: 0.45, dir:  1, type: 'diamond', dur: '28s',  color: 'rgba(78,104,130,0.26)'  },
  { x: '88%', y: '70%', size: 180, depth: 0.85, dir:  1, type: 'ring',    dur: '72s',  color: 'rgba(106,86,120,0.14)'  },
  { x: '48%', y: '90%', size: 72,  depth: 0.30, dir:  1, type: 'orb',     dur: '3.8s', color: 'rgba(90,136,112,0.22)'  },
  { x: '76%', y: '46%', size: 90,  depth: 0.60, dir: -1, type: 'diamond', dur: '32s',  color: 'rgba(140,160,80,0.20)'  },
  { x: '20%', y: '52%', size: 280, depth: 0.97, dir:  1, type: 'ring',    dur: '95s',  color: 'rgba(60,104,120,0.08)'  },
  { x: '54%', y: '8%',  size: 48,  depth: 0.38, dir:  1, type: 'orb',     dur: '5.2s', color: 'rgba(180,140,80,0.24)'  },
  { x: '36%', y: '28%', size: 110, depth: 0.70, dir: -1, type: 'ring',    dur: '55s',  color: 'rgba(88,160,112,0.12)'  },
  { x: '64%', y: '80%', size: 50,  depth: 0.40, dir:  1, type: 'diamond', dur: '20s',  color: 'rgba(160,120,80,0.22)'  },
] as const;

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  { n: 1, title: 'Registration', tag: 'Begin Your Path', color: '#5a8870', bg: 'rgba(90,136,112,0.13)',
    desc: 'Book your slot effortlessly — practitioner-agnostic, language-aware, and built around your schedule. Our system intelligently matches you to the right Vaidya.' },
  { n: 2, title: 'Doctor Invitation', tag: 'A Personal Touch', color: '#7a6a4e', bg: 'rgba(180,150,80,0.11)',
    desc: 'A qualified Vaidya reviews your request and dispatches a personalised intake questionnaire, crafted to reveal your unique Prakriti and complete health history.' },
  { n: 3, title: 'Health Profile', tag: 'Your Story, Heard', color: '#4e6882', bg: 'rgba(78,140,180,0.11)',
    desc: 'Complete your comprehensive questionnaire and securely upload lab reports. Every nuance of your health portrait — body, mind, spirit — helps our practitioners understand you holistically.' },
  { n: 4, title: 'Initial Screening', tag: 'Ancient Wisdom Applied', color: '#6a5878', bg: 'rgba(130,100,160,0.11)',
    desc: 'Our practitioners perform an initial analysis alongside constitutional and astrological assessments guided by classical Ayurvedic texts, identifying root causes rather than symptoms.' },
  { n: 5, title: 'Consultation Scheduling', tag: 'On Your Terms', color: '#4a7858', bg: 'rgba(70,160,120,0.11)',
    desc: 'A virtual consultation is scheduled based on mutual availability — flexible across time zones, calendar-integrated, designed for zero friction between you and your healing.' },
  { n: 6, title: 'Virtual Consultation', tag: 'Face-to-Face Healing', color: '#3a6878', bg: 'rgba(60,140,160,0.11)',
    desc: 'Connect with your Vaidya for a comprehensive 30-minute session — medical history, lifestyle, diet, sleep patterns, and a deep Prakriti and Vikriti analysis.' },
  { n: 7, title: 'In-Person Treatment', tag: 'Sacred Therapies', color: '#786040', bg: 'rgba(180,140,80,0.11)',
    desc: 'For those eligible following assessment, schedule a physical visit for Panchakarma, Rasayana, or specialised treatments at a vetted, accredited Ayurvedic centre near you.' },
  { n: 8, title: 'Ongoing Support', tag: 'The Journey Continues', color: '#4a7858', bg: 'rgba(70,160,120,0.11)',
    desc: 'Regular virtual follow-ups monitor your progress, refine treatment plans, and keep your path to complete wellness on course — season by season, as your health evolves.' },
] as const;

const STEP_Z      = 1400;
const PERSPECTIVE = 950;

// ─── Helpers ──────────────────────────────────────────────────────────────────
const lerp      = (a: number, b: number, t: number) => a + (b - a) * t;
const easeIO    = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PatientJourneyPage() {
  // Persistent refs — no React state in animation hot path
  const scrollWrapRef = useRef<HTMLDivElement>(null);
  const sceneRef      = useRef<HTMLDivElement>(null);
  const bgRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs      = useRef<(HTMLDivElement | null)[]>([]);
  const hudNumRef     = useRef<HTMLSpanElement>(null);
  const hudTitleRef   = useRef<HTMLSpanElement>(null);
  const hudBarRef     = useRef<HTMLDivElement>(null);
  const dotRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const hintRef       = useRef<HTMLDivElement>(null);
  const floaterRefs   = useRef<(HTMLDivElement | null)[]>([]);

  // Smoothed mouse (current) + raw target
  const mouse   = useRef({ x: 0, y: 0 });
  const mTarget = useRef({ x: 0, y: 0 });

  // Mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mTarget.current = {
        x: (e.clientX / window.innerWidth)  * 2 - 1,  // -1 … 1
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Main RAF loop
  useEffect(() => {
    let rafId: number;
    let lastStep = -1;

    function tick() {
      // ── 1. Smooth mouse ─────────────────────────────────────────
      mouse.current.x += (mTarget.current.x - mouse.current.x) * 0.04;
      mouse.current.y += (mTarget.current.y - mouse.current.y) * 0.04;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      // ── 2. Scroll progress ──────────────────────────────────────
      const wrap = scrollWrapRef.current;
      if (!wrap) { rafId = requestAnimationFrame(tick); return; }
      const { top }    = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      const progress   = Math.min(1, Math.max(0, -top) / scrollable);
      const stepProg   = progress * (STEPS.length - 1);
      const stepIdx    = Math.min(Math.floor(stepProg), STEPS.length - 1);
      const stepT      = stepProg - stepIdx;
      const cameraZ    = stepProg * STEP_Z;

      // ── 3. Camera angle — lerp between step angles + mouse micro-tilt ──
      const fromCam = STEP_CAMERA[stepIdx];
      const toCam   = STEP_CAMERA[Math.min(stepIdx + 1, STEPS.length - 1)];
      const eased   = easeIO(stepT);
      // Base angle from scroll + subtle mouse influence for live tilt
      const rotX = lerp(fromCam.rotX, toCam.rotX, eased) + my * 2.5;
      const rotY = lerp(fromCam.rotY, toCam.rotY, eased) + mx * -3.5;

      // ── 4. Scene transform ──────────────────────────────────────
      if (sceneRef.current) {
        sceneRef.current.style.transform =
          `rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateZ(${cameraZ.toFixed(1)}px)`;
      }

      // ── 5. Per-card opacity / blur ──────────────────────────────
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        // relZ: 0 = in focus, >0 = passed (zooming in), <0 = ahead (small)
        const relZ = cameraZ - i * STEP_Z;

        if (relZ > 900 || relZ < -(STEP_Z * 1.8)) {
          card.style.opacity = '0';
          card.style.filter  = 'blur(0px)';
          return;
        }

        let opacity: number;
        let blurPx: number;

        if (relZ > 0) {
          // Passed focal plane → zooms huge toward camera
          // Stay FULLY visible until very close (600 px), then dissolve
          if (relZ < 600) {
            opacity = 1; blurPx = 0;
          } else {
            const t = (relZ - 600) / 280;            // 0 at 600 → 1 at 880
            opacity = Math.max(0, 1 - t * t);        // lingers, then drops fast
            blurPx  = Math.min(20, t * 22);
          }
        } else {
          // Ahead — fades in as it approaches
          const dist    = Math.abs(relZ);
          const fadeIn  = STEP_Z * 0.12;
          const fadeEnd = STEP_Z * 0.92;
          opacity = dist < fadeIn
            ? 1
            : Math.max(0, 1 - (dist - fadeIn) / (fadeEnd - fadeIn));
          blurPx = dist < STEP_Z * 0.2
            ? 0
            : Math.min(14, (dist - STEP_Z * 0.2) / STEP_Z * 18);
        }

        card.style.opacity = opacity.toFixed(3);
        card.style.filter  = `blur(${blurPx.toFixed(1)}px)`;
      });

      // ── 6. Background colour crossfade ──────────────────────────
      bgRefs.current.forEach((bg, i) => {
        if (!bg) return;
        const dist = Math.abs(i - stepProg);
        bg.style.opacity = String(Math.max(0, 1 - dist));
      });

      // ── 7. Floating objects — mouse parallax ────────────────────
      floaterRefs.current.forEach((el, i) => {
        if (!el) return;
        // Near objects (low depth) feel closest → move most with mouse
        const strength = (1 - FLOATERS[i].depth) * 42;
        el.style.transform =
          `translate(${(mx * strength).toFixed(1)}px, ${(my * strength).toFixed(1)}px)`;
      });

      // ── 8. HUD ──────────────────────────────────────────────────
      const curStep = Math.min(Math.round(stepProg), STEPS.length - 1);
      if (curStep !== lastStep) {
        lastStep = curStep;
        if (hudNumRef.current)
          hudNumRef.current.textContent =
            `${String(curStep + 1).padStart(2, '0')} — ${String(STEPS.length).padStart(2, '0')}`;
        if (hudTitleRef.current)
          hudTitleRef.current.textContent = STEPS[curStep].title;
        dotRefs.current.forEach((dot, i) => {
          if (!dot) return;
          dot.style.opacity    = i === curStep ? '1' : '0.3';
          dot.style.height     = i === curStep ? '24px' : '6px';
          dot.style.background = i === curStep
            ? STEPS[curStep].color
            : 'rgba(255,255,255,0.5)';
        });
      }
      if (hudBarRef.current)
        hudBarRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
      if (hintRef.current)
        hintRef.current.style.opacity = String(Math.max(0, 1 - progress * 8));

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <Navbar />
      <style>{`
        @keyframes spinCW    { to { transform: rotate(360deg);  } }
        @keyframes spinCCW   { to { transform: rotate(-360deg); } }
        @keyframes floatBob  { 0%,100%{ transform:translateY(0);    } 50%{ transform:translateY(-10px); } }
        @keyframes bounceUp  { 0%,100%{ transform:translateY(0);    } 50%{ transform:translateY(-8px);  } }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section style={{
        minHeight: '100vh',
        background: [
          'radial-gradient(ellipse 90% 55% at 50% 58%, #EAF2B8 0%, transparent 65%)',
          'linear-gradient(180deg, #88C0D8 0%, #6A9868 100%)',
        ].join(', '),
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '80px 2rem 3rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)', marginBottom: '2rem' }}>
          8 Steps · Your Healing Path
        </p>
        <h1 style={{ fontFamily: 'var(--font-cinzel, Georgia, serif)', fontSize: 'clamp(2.8rem, 8vw, 6.5rem)', fontWeight: 900, color: '#fff', margin: '0 0 1.5rem', lineHeight: 1.04, letterSpacing: '0.03em', textShadow: '0 6px 48px rgba(0,0,0,0.22)' }}>
          Your Healing<br />Journey
        </h1>
        <p style={{ fontFamily: 'var(--font-cormorant, Georgia, serif)', fontSize: 'clamp(1.1rem, 2vw, 1.45rem)', color: 'rgba(255,255,255,0.80)', maxWidth: '44ch', lineHeight: 1.8, margin: '0 0 3.5rem' }}>
          Scroll to travel through your path — each step approached from a different angle.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, animation: 'bounceUp 2s ease-in-out infinite' }}>
          <span style={{ fontSize: '9px', letterSpacing: '0.26em', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>Scroll to begin</span>
          <div style={{ width: 1, height: 56, background: 'linear-gradient(180deg, rgba(255,255,255,0.55), transparent)' }} />
        </div>
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20vh', background: 'linear-gradient(to bottom, transparent, #0e2218)', pointerEvents: 'none' }} />
      </section>

      {/* ── 3D Journey ─────────────────────────────────────────────── */}
      <div ref={scrollWrapRef} style={{ height: `${STEPS.length * 105 + 30}vh`, position: 'relative' }}>

        {/* Sticky viewport */}
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          overflow: 'hidden',
          perspective: `${PERSPECTIVE}px`,
          perspectiveOrigin: '50% 50%',
        }}>
          {/* Base dark background */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, background: 'linear-gradient(180deg, #0e2218 0%, #152e24 50%, #0a1a12 100%)' }} />

          {/* Per-step colour overlay */}
          {STEPS.map((step, i) => (
            <div key={i} ref={el => { bgRefs.current[i] = el; }} style={{
              position: 'absolute', inset: 0, zIndex: 1, opacity: 0, pointerEvents: 'none',
              background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${step.bg}, transparent)`,
            }} />
          ))}

          {/* ── Floating ambient objects (mouse parallax) ─────────── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            {FLOATERS.map((obj, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: obj.x, top: obj.y,
                  // Centering wrapper — never touched by JS
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* JS-driven parallax layer */}
                <div ref={el => { floaterRefs.current[i] = el; }}>
                  {/* CSS animation layer */}
                  <div style={{
                    width: obj.size, height: obj.size,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: obj.type === 'orb'
                      ? `floatBob ${obj.dur} ease-in-out infinite`
                      : `${obj.dir > 0 ? 'spinCW' : 'spinCCW'} ${obj.dur} linear infinite`,
                  }}>
                    {obj.type === 'ring' && (
                      <div style={{
                        width: '100%', height: '100%', borderRadius: '50%',
                        border: `${Math.max(1, Math.round(obj.size * 0.007))}px solid ${obj.color}`,
                        boxShadow: `0 0 ${Math.round(obj.size * 0.18)}px ${obj.color}`,
                      }} />
                    )}
                    {obj.type === 'diamond' && (
                      <div style={{
                        width: '72%', height: '72%',
                        border: `1px solid ${obj.color}`,
                        transform: 'rotate(45deg)',
                        boxShadow: `0 0 14px ${obj.color}`,
                      }} />
                    )}
                    {obj.type === 'orb' && (
                      <div style={{
                        width: '100%', height: '100%', borderRadius: '50%',
                        background: `radial-gradient(circle at 38% 35%, rgba(255,255,255,0.28) 0%, ${obj.color} 45%, transparent 72%)`,
                        boxShadow: `0 0 ${Math.round(obj.size * 0.6)}px ${obj.color}`,
                      }} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Depth vignette fog */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'radial-gradient(ellipse 100% 50% at 50% 100%, rgba(20,50,30,0.55) 0%, transparent 70%)' }} />

          {/* ── 3D Scene ────────────────────────────────────────────── */}
          <div
            ref={sceneRef}
            style={{
              position: 'absolute', inset: 0, zIndex: 4,
              transformStyle: 'preserve-3d',
              transform: `rotateX(${STEP_CAMERA[0].rotX}deg) rotateY(${STEP_CAMERA[0].rotY}deg) translateZ(0px)`,
            }}
          >
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: `translateZ(${-i * STEP_Z}px)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  ref={el => { cardRefs.current[i] = el; }}
                  style={{
                    width: 'min(580px, 88vw)',
                    background: 'rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(28px)',
                    WebkitBackdropFilter: 'blur(28px)',
                    border: '1px solid rgba(255,255,255,0.14)',
                    borderTop: `2px solid ${step.color}`,
                    borderRadius: '20px',
                    padding: 'clamp(32px, 5vw, 56px) clamp(28px, 5vw, 60px)',
                    boxShadow: `0 40px 100px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.12)`,
                    opacity: 0,
                    willChange: 'opacity, filter',
                    textAlign: 'center',
                  }}
                >
                  {/* Large step number — ghosted background element */}
                  <div style={{ fontFamily: 'var(--font-cinzel, Georgia, serif)', fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, lineHeight: 1, color: step.color, opacity: 0.22, marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p style={{ margin: '0 0 0.7rem', fontSize: '9.5px', letterSpacing: '0.28em', textTransform: 'uppercase', color: step.color, opacity: 0.9 }}>
                    {step.tag}
                  </p>
                  <h2 style={{ margin: '0 0 1.1rem', fontFamily: 'var(--font-cinzel, Georgia, serif)', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700, lineHeight: 1.15, color: '#f0ede5', letterSpacing: '0.04em' }}>
                    {step.title}
                  </h2>
                  <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${step.color}70, transparent)`, margin: '0 auto 1.2rem', width: '80px' }} />
                  <p style={{ margin: '0 auto', fontSize: '0.98rem', color: 'rgba(240,237,229,0.72)', lineHeight: 1.82, maxWidth: '46ch' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── HUD — top bar ────────────────────────────────────────── */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: '28px 40px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(to bottom, rgba(10,26,18,0.80), transparent)' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase' }}>
              Ayusurance · Patient Journey
            </span>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', marginBottom: '2px' }}>Step</div>
              <span ref={hudNumRef} style={{ fontFamily: 'var(--font-cinzel, monospace)', fontSize: '1.1rem', fontWeight: 700, color: '#f0ede5', letterSpacing: '0.06em' }}>
                01 — 08
              </span>
            </div>
            <span ref={hudTitleRef} style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.52)', textTransform: 'uppercase', textAlign: 'right', maxWidth: '160px' }}>
              Registration
            </span>
          </div>

          {/* Nav dots — right edge */}
          <div style={{ position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {STEPS.map((_, i) => (
              <div key={i} ref={el => { dotRefs.current[i] = el; }} style={{ width: '4px', height: '6px', borderRadius: '3px', background: 'rgba(255,255,255,0.5)', transition: 'height 0.4s cubic-bezier(0.22,1,0.36,1), opacity 0.4s, background 0.4s', opacity: 0.3 }} />
            ))}
          </div>

          {/* Progress bar — bottom */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.08)', zIndex: 10 }}>
            <div ref={hudBarRef} style={{ height: '100%', background: 'rgba(255,255,255,0.65)', width: '0%' }} />
          </div>

          {/* Scroll hint — fades out as soon as scrolling starts */}
          <div ref={hintRef} style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', animation: 'bounceUp 2s ease-in-out infinite' }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>Scroll to journey</span>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(180deg, rgba(255,255,255,0.38), transparent)' }} />
          </div>
        </div>
      </div>

      {/* ── CTA Footer ─────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(160deg, #0e2218 0%, #162e20 50%, #0a1a14 100%)', padding: 'clamp(5rem,10vw,9rem) 2rem', textAlign: 'center' }}>
        <p style={{ fontSize: '9.5px', letterSpacing: '0.30em', textTransform: 'uppercase', color: 'rgba(200,220,180,0.42)', marginBottom: '1.4rem' }}>
          Begin Today
        </p>
        <h2 style={{ fontFamily: 'var(--font-cinzel, Georgia, serif)', fontSize: 'clamp(2rem, 5vw, 3.8rem)', fontWeight: 700, color: '#f0ede5', margin: '0 0 1.4rem', letterSpacing: '0.05em', lineHeight: 1.1 }}>
          Take Your First Step
        </h2>
        <p style={{ fontSize: '1.05rem', color: 'rgba(240,237,229,0.56)', maxWidth: '44ch', margin: '0 auto 2.8rem', lineHeight: 1.85 }}>
          Your path to complete wellness begins with a single moment of intention. Our Vaidyas are ready to guide you.
        </p>
        <a
          href="/"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '15px 48px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', color: '#f0ede5', borderRadius: '4px', fontFamily: 'var(--font-cinzel, Georgia, serif)', fontSize: '12px', letterSpacing: '0.18em', textDecoration: 'none', textTransform: 'uppercase', backdropFilter: 'blur(12px)', boxShadow: '0 8px 32px rgba(0,0,0,0.20)', transition: 'background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s' }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.14)'; el.style.borderColor = 'rgba(255,255,255,0.30)'; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 14px 40px rgba(0,0,0,0.28)'; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.borderColor = 'rgba(255,255,255,0.18)'; el.style.transform = ''; el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.20)'; }}
        >
          Start Registration <span style={{ opacity: 0.55 }}>→</span>
        </a>
        <p style={{ marginTop: '5rem', fontSize: '11px', color: 'rgba(200,220,180,0.22)', letterSpacing: '0.06em' }}>
          © 2024 Ayusurance · Ancient Wisdom Modern Assurance
        </p>
      </section>
    </>
  );
}
