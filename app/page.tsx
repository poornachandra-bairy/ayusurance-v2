'use client';

import Navbar from './components/Navbar';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

// ─── Orbit config ─────────────────────────────────────────────────────────────
const ORBIT_RADIUS = 230; // px from rishi centre

/**
 * Pentagon arrangement (72° apart).
 * targetAngleDeg : final orbit angle (0° = right, clockwise).
 * startDy        : approximate Y offset (px) of the parent dosha relative to
 *                  the stack centre. Stack order top→bottom: vata, pitta, kapha.
 */
const BHUTAS = [
  { id: 'akasha', src: '/akasha.png', alt: 'Akasha', targetAngleDeg: -90, startDy: -90 }, // from vata
  { id: 'vayu', src: '/vayu.png', alt: 'Vayu', targetAngleDeg: -18, startDy: -90 }, // from vata
  { id: 'agni', src: '/agni.png', alt: 'Agni', targetAngleDeg: 54, startDy: 0 }, // from pitta
  { id: 'jala', src: '/jala.png', alt: 'Jala', targetAngleDeg: 126, startDy: -45 }, // shared
  { id: 'bhumi', src: '/bhumi.png', alt: 'Bhumi', targetAngleDeg: 198, startDy: 90 }, // from kapha
] as const;

const DOSHAS = [
  { id: 'vata', src: '/vata.png', alt: 'Vata' },
  { id: 'pitta', src: '/pitta.png', alt: 'Pitta' },
  { id: 'kapha', src: '/kapha.png', alt: 'Kapha' },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }
function phase(p: number, s: number, e: number) { return clamp((p - s) / (e - s), 0, 1); }
function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

// Entrance timing (seconds)
const TEXT_ENTER     = 0.0;
const RISHI_ENTER    = 0.35;
const DOSHA_ENTRANCE = [1.0, 1.5, 2.0] as const;
const ENTRANCE_DONE  = 2.8;

// Card layout
const CARD_RADIUS = 265; // px — lowered from 295 so top card clears the floating navbar

// Card colors — matched to Panchamahabhutas
const CARD_COLORS: Record<string, string> = {
  akasha: 'linear-gradient(150deg, #1a0533 0%, #5b21b6 100%)', // Void violet — Space
  vayu:   'linear-gradient(150deg, #0c2340 0%, #0ea5e9 100%)', // Sky blue    — Air
  agni:   'linear-gradient(150deg, #450a00 0%, #ea580c 100%)', // Ember red   — Fire
  jala:   'linear-gradient(150deg, #022c22 0%, #059669 100%)', // Aqua teal   — Water
  bhumi:  'linear-gradient(150deg, #1c0a00 0%, #92400e 100%)', // Earth ochre — Earth
};

// Card accent colours (lighter, used for decorative elements)
const CARD_ACCENTS: Record<string, string> = {
  akasha: '#c4b5fd', vayu: '#7dd3fc', agni: '#fdba74',
  jala:   '#6ee7b7', bhumi: '#fbbf24',
};

// Card content — in BHUTAS order: akasha, vayu, agni, jala, bhumi
const CARD_CONTENT = [
  {
    element: 'Akasha • Space',
    title: 'Teleconsultations',
    desc: 'Online consultations with qualified Ayurvedic doctors for personalised guidance and treatment plans.',
  },
  {
    element: 'Vayu • Air',
    title: 'Concierge Services',
    desc: 'Dedicated support for users to seamlessly access Ayurvedic services and products.',
  },
  {
    element: 'Agni • Fire',
    title: 'Global Directory',
    desc: 'A comprehensive list of Ayurveda Vaidyas, practitioners, hospitals, and centres worldwide.',
  },
  {
    element: 'Jala • Water',
    title: 'Multilingual Support',
    desc: 'Availability in multiple languages for broader accessibility across cultures.',
  },
  {
    element: 'Bhumi • Earth',
    title: 'Expert Network',
    desc: 'A team of experienced Ayurvedic professionals offering consultations and guidance.',
  },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const textRef         = useRef<HTMLDivElement>(null);
  const rishiRef        = useRef<HTMLDivElement>(null);
  const doshaRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const bhutaRefs       = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs        = useRef<(HTMLDivElement | null)[]>([]);
  const mountTimeRef    = useRef(0);
  const centerOffsetRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable browser scroll restoration so the entrance animation always starts at top
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    mountTimeRef.current = performance.now();
    const SCROLL_ZONE = window.innerHeight * 2;
    let rafId = 0;
    let lastY = -1;
    let entranceDone = false;

    // All start invisible; RAF is the sole owner of opacity from here
    if (textRef.current)  { textRef.current.style.opacity  = '0'; textRef.current.style.transform = 'translateY(24px)'; }
    if (rishiRef.current) { rishiRef.current.style.opacity = '0'; }
    doshaRefs.current.forEach((el) => { if (el) el.style.opacity = '0'; });

    function animate() {
      const elapsed = (performance.now() - mountTimeRef.current) / 1000;
      const scrollY = window.scrollY;

      // ── Entrance phase (run until 2.8 s OR user scrolls) ───────────────
      if (!entranceDone && elapsed < ENTRANCE_DONE && scrollY < 20) {
        if (textRef.current) {
          const t = ease(clamp((elapsed - TEXT_ENTER) / 0.65, 0, 1));
          textRef.current.style.opacity   = String(t);
          textRef.current.style.transform = `translateY(${lerp(24, 0, t)}px)`;
        }
        if (rishiRef.current) {
          const t = ease(clamp((elapsed - RISHI_ENTER) / 0.75, 0, 1));
          rishiRef.current.style.opacity = String(t);
        }
        doshaRefs.current.forEach((el, i) => {
          if (!el) return;
          const t = ease(clamp((elapsed - DOSHA_ENTRANCE[i]) / 0.45, 0, 1));
          el.style.opacity = String(t);
        });
        bhutaRefs.current.forEach((el) => { if (el) el.style.opacity = '0'; });
        rafId = requestAnimationFrame(animate);
        return;
      }

      // ── One-time lock when entrance finishes ────────────────────────────
      if (!entranceDone) {
        entranceDone = true;
        if (textRef.current)  { textRef.current.style.opacity = '1'; textRef.current.style.transform = ''; }
        if (rishiRef.current) { rishiRef.current.style.opacity = '1'; }
        doshaRefs.current.forEach((el) => { if (el) el.style.opacity = '1'; });
        lastY = -1; // force scroll phase to evaluate immediately
      }

      // Rishi is always visible in scroll phase (only opacity-animated in entrance)
      if (rishiRef.current) { rishiRef.current.style.opacity = '1'; }

      // ── Scroll-driven phase ─────────────────────────────────────────────
      if (scrollY !== lastY) {
        lastY = scrollY;
        const p = clamp(scrollY / SCROLL_ZONE, 0, 1);

        // 1. Text fades out when orbit begins
        if (textRef.current) {
          textRef.current.style.opacity   = String(1 - ease(phase(p, 0.55, 0.70)));
          textRef.current.style.transform = '';
        }

        // 2. Lazy-compute rishi-to-centre offset
        if (p > 0.52 && centerOffsetRef.current === null && rishiRef.current) {
          const r = rishiRef.current.getBoundingClientRect();
          centerOffsetRef.current = window.innerWidth / 2 - (r.left + r.width / 2);
        }

        // 3. Rishi slides to viewport centre
        if (rishiRef.current) {
          const dx = centerOffsetRef.current !== null
            ? lerp(0, centerOffsetRef.current, ease(phase(p, 0.60, 0.82)))
            : 0;
          rishiRef.current.style.transform = `translateX(${dx}px)`;
        }

        // 4. Doshas & bhutas
        const doshaAlpha    = 1 - ease(phase(p, 0.15, 0.38));
        const bhutaFadeCard = ease(phase(p, 0.82, 0.96));
        const bhutaAlpha    = ease(phase(p, 0.18, 0.42)) * (1 - bhutaFadeCard);
        const orbitT        = ease(phase(p, 0.40, 0.62));
        const rotateDeg     = phase(p, 0.60, 1.00) * 360;

        doshaRefs.current.forEach((el) => { if (el) el.style.opacity = String(doshaAlpha); });

        BHUTAS.forEach((b, i) => {
          const el = bhutaRefs.current[i];
          if (!el) return;
          const angleRad = (b.targetAngleDeg + rotateDeg) * (Math.PI / 180);
          const orbitX   = Math.cos(angleRad) * ORBIT_RADIUS;
          const orbitY   = Math.sin(angleRad) * ORBIT_RADIUS;
          const x        = lerp(0, orbitX, orbitT);
          const y        = lerp(b.startDy, orbitY, orbitT);
          const scale    = lerp(1.0, 1.5, orbitT);
          el.style.opacity   = String(bhutaAlpha);
          el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        });

        // 5. Cards bloom in as bhutas fade
        const cardT = ease(phase(p, 0.82, 1.0));
        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const b = BHUTAS[i];
          const angleRad = b.targetAngleDeg * (Math.PI / 180);
          const cx    = Math.cos(angleRad) * CARD_RADIUS;
          const cy    = Math.sin(angleRad) * CARD_RADIUS;
          const scale = lerp(0.25, 1.0, cardT);
          el.style.opacity   = String(cardT);
          el.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scale(${scale})`;
        });
      }
      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <>
      <Navbar />

      {/* 300 vh gives enough scroll room for all animation phases */}
      <div style={{ height: '300vh' }}>

        {/* ── Sticky hero ─────────────────────────────────────────────────── */}
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          {/* Gradient background — sky blue → cream → forest green */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: [
                'radial-gradient(ellipse 90% 55% at 50% 58%, #EAF2B8 0%, transparent 65%)',
                'linear-gradient(180deg, #88C0D8 0%, #6A9868 100%)',
              ].join(', '),
              zIndex: 0,
            }}
          />

          {/* ── Layout row ────────────────────────────────────────────────── */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              paddingTop: '76px',
              paddingLeft: '6vw',
              paddingRight: '2rem',
              gap: '4vw',
            }}
          >

            {/* LEFT — Hero copy */}
            <div
              ref={textRef}
              style={{
                flex: 1,
                minWidth: 0,
                paddingRight: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* Eyebrow */}
              <div className="hero-eyebrow">
                <span>Authentic Ayurvedic Care</span>
              </div>

              <h1 className="hero-heading">
                Ancient Wisdom<br />Modern Assurance
              </h1>

              <h2 className="hero-subheading">
                Your Gateway to Authentic Ayurvedic Care
              </h2>

              <hr className="hero-divider" />

              <p className="hero-body">
                Ayusurance connects you with certified Ayurvedic practitioners worldwide,
                offering personalized teleconsultations, concierge services,
                and holistic wellness solutions.
              </p>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
                <button className="btn-primary">Begin Your Wellness Journey</button>
                <button className="btn-ghost">Explore Our Offerings</button>
              </div>
            </div>

            {/* RIGHT — Rishi + animation: fixed 50%, pushed to the right */}
            <div
              style={{
                flex: '0 0 50%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '3rem',
                position: 'relative',
              }}
            >
              <div
                ref={rishiRef}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Rishi — large base image */}
                <Image
                  src="/rishi.png"
                  alt="Rishi"
                  width={700}
                  height={900}
                  priority
                  className="object-contain select-none"
                  style={{ maxHeight: '85vh', width: 'auto' }}
                />

                {/* Doshas — stacked vertically on rishi body */}
                <div
                  style={{
                    position: 'absolute',
                    top: '45%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                  }}
                >
                  {DOSHAS.map((d, i) => (
                    <div
                      key={d.id}
                      ref={(el) => { doshaRefs.current[i] = el; }}
                      style={{ display: 'flex' }}
                    >
                      <Image
                        src={d.src}
                        alt={d.alt}
                        width={70}
                        height={70}
                        className="object-contain select-none"
                        style={{ maxHeight: '8vh', width: 'auto' }}
                      />
                    </div>
                  ))}
                </div>

                {/* Bhutas — orbit around rishi */}
                {BHUTAS.map((b, i) => (
                  <div
                    key={b.id}
                    ref={(el) => { bhutaRefs.current[i] = el; }}
                    style={{
                      position: 'absolute',
                      top: '45%',
                      left: '50%',
                      transform: `translate(calc(-50% + 0px), calc(-50% + ${b.startDy}px))`,
                      opacity: 0,
                      willChange: 'transform, opacity',
                    }}
                  >
                    <Image
                      src={b.src}
                      alt={b.alt}
                      width={85}
                      height={85}
                      className="object-contain select-none"
                      style={{ maxHeight: '10vh', width: 'auto' }}
                    />
                  </div>
                ))}

                {/* Cards — bloom in once rishi is centred */}
                {BHUTAS.map((b, i) => {
                  const card    = CARD_CONTENT[i];
                  const accent  = CARD_ACCENTS[b.id];
                  return (
                    <div
                      key={`card-${b.id}`}
                      ref={(el) => { cardRefs.current[i] = el; }}
                      style={{
                        position: 'absolute',
                        top: '52%',          // shifted down from 45% → top card clears navbar
                        left: '50%',
                        width: '218px',      // landscape: wider than tall
                        height: '145px',
                        borderRadius: '18px',
                        background: CARD_COLORS[b.id],
                        boxShadow: `0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.10)`,
                        opacity: 0,
                        willChange: 'transform, opacity',
                        transform: 'translate(-50%, -50%)',
                        padding: '16px 18px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                        cursor: 'default',
                        userSelect: 'none',
                        boxSizing: 'border-box',
                        overflow: 'hidden',
                      }}
                    >
                      {/* Element label */}
                      <span style={{
                        fontSize: '8.5px',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: accent,
                        fontWeight: 700,
                        opacity: 0.95,
                        whiteSpace: 'nowrap',
                      }}>
                        {card.element}
                      </span>

                      {/* Title */}
                      <h3 style={{
                        margin: 0,
                        fontSize: '14px',
                        fontFamily: 'var(--font-serif, Georgia, serif)',
                        fontWeight: 600,
                        color: '#ffffff',
                        lineHeight: 1.2,
                        letterSpacing: '0.01em',
                      }}>
                        {card.title}
                      </h3>

                      {/* Accent rule */}
                      <div style={{
                        height: '1px',
                        background: `linear-gradient(90deg, ${accent}80, transparent)`,
                        flexShrink: 0,
                      }} />

                      {/* Description */}
                      <p style={{
                        margin: 0,
                        fontSize: '10.5px',
                        color: 'rgba(255,255,255,0.70)',
                        lineHeight: 1.55,
                        letterSpacing: '0.008em',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
