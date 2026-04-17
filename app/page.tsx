'use client';

import Navbar from './components/Navbar';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import CinematicLoader from './components/CinematicLoader';
import MandalaBackground from './components/MandalaBackground';
import { clamp, phase, ease, lerp } from './lib/utils';
import {
  ORBIT_RADIUS,
  CARD_RADIUS,
  TEXT_ENTER,
  RISHI_ENTER,
  DOSHA_ENTRANCE,
  ENTRANCE_DONE,
  BHUTAS,
  DOSHAS,
  CARD_COLORS,
  CARD_ACCENTS,
  CARD_CONTENT,
} from './lib/tokens';
import {
  HOME_HERO_HEADLINE_LINE1,
  HOME_HERO_HEADLINE_LINE2,
  HOME_HERO_BODY,
  HOME_HERO_CTA_PRIMARY,
  HOME_HERO_CTA_SECONDARY,
  HOME_FINAL_HEADING,
  HOME_FINAL_BODY,
  HOME_FINAL_CTA,
  FOOTER_COPYRIGHT,
  FOOTER_CREDIT_TEXT,
  FOOTER_CREDIT_LINK,
  FOOTER_CREDIT_HREF,
} from './constants';

const Home = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const rishiRef = useRef<HTMLDivElement>(null);
  const rishiImgRef = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const doshaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bhutaRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mountTimeRef = useRef(0);
  const centerOffsetRef = useRef<number | null>(null);
  const [loaderDone, setLoaderDone] = useState(false);

  useEffect(() => {
    if (!loaderDone) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
    document.body.style.overflow = '';

    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    mountTimeRef.current = performance.now();
    const BASE_ZONE = window.innerHeight * 2;
    let rafId = 0;
    let lastY = -1;
    let entranceDone = false;

    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(24px)';
    }
    if (rishiRef.current) {
      rishiRef.current.style.opacity = '0';
    }
    if (finalTextRef.current) {
      finalTextRef.current.style.opacity = '0';
    }
    doshaRefs.current.forEach((el) => {
      if (el) el.style.opacity = '0';
    });

    const animate = () => {
      const elapsed = (performance.now() - mountTimeRef.current) / 1000;
      const scrollY = window.scrollY;

      if (!entranceDone && elapsed < ENTRANCE_DONE && scrollY < 20) {
        if (textRef.current) {
          const t = ease(clamp((elapsed - TEXT_ENTER) / 0.65, 0, 1));
          textRef.current.style.opacity = String(t);
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
        bhutaRefs.current.forEach((el) => {
          if (el) el.style.opacity = '0';
        });

        rafId = requestAnimationFrame(animate);
        return;
      }

      if (!entranceDone) {
        entranceDone = true;
        if (textRef.current) {
          textRef.current.style.opacity = '1';
          textRef.current.style.transform = '';
        }
        if (rishiRef.current) {
          rishiRef.current.style.opacity = '1';
        }
        doshaRefs.current.forEach((el) => {
          if (el) el.style.opacity = '1';
        });
        lastY = -1;
      }

      if (rishiRef.current) {
        rishiRef.current.style.opacity = '1';
      }

      if (scrollY !== lastY) {
        lastY = scrollY;
        const p = clamp(scrollY / BASE_ZONE, 0, 2.5);

        if (textRef.current) {
          const fadeT = ease(phase(p, 0.5, 0.68));
          textRef.current.style.opacity = String(1 - fadeT);
          textRef.current.style.transform = `translateX(${lerp(0, -110, fadeT)}px)`;
        }

        if (p > 0.52 && centerOffsetRef.current === null && rishiRef.current) {
          const r = rishiRef.current.getBoundingClientRect();
          centerOffsetRef.current =
            window.innerWidth / 2 - (r.left + r.width / 2);
        }

        if (rishiRef.current) {
          const dx =
            centerOffsetRef.current !== null
              ? lerp(0, centerOffsetRef.current, ease(phase(p, 0.6, 0.82)))
              : 0;
          rishiRef.current.style.transform = `translateX(${dx}px)`;
        }

        const doshaAlpha = 1 - ease(phase(p, 0.15, 0.38));
        const bhutaFadeCard = ease(phase(p, 0.82, 0.96));
        const bhutaAlpha = ease(phase(p, 0.18, 0.42)) * (1 - bhutaFadeCard);
        const orbitT = ease(phase(p, 0.4, 0.62));
        const rotateDeg = phase(p, 0.6, 1.0) * 360;

        doshaRefs.current.forEach((el) => {
          if (el) el.style.opacity = String(doshaAlpha);
        });

        BHUTAS.forEach((b, i) => {
          const el = bhutaRefs.current[i];
          if (!el) return;
          const angleRad = (b.targetAngleDeg + rotateDeg) * (Math.PI / 180);
          const orbitX = Math.cos(angleRad) * ORBIT_RADIUS;
          const orbitY = Math.sin(angleRad) * ORBIT_RADIUS;
          const x = lerp(0, orbitX, orbitT);
          const y = lerp(b.startDy, orbitY, orbitT);
          const scale = lerp(1.0, 1.5, orbitT);
          el.style.opacity = String(bhutaAlpha);
          el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        });

        const cardT = ease(phase(p, 0.82, 1.0));
        const cardOutT = ease(phase(p, 1.1, 1.4));

        cardRefs.current.forEach((el, i) => {
          if (!el) return;
          const b = BHUTAS[i];
          const angleRad = b.targetAngleDeg * (Math.PI / 180);
          const cx = Math.cos(angleRad) * CARD_RADIUS * 1.5;
          let cy = Math.sin(angleRad) * CARD_RADIUS + b.cardOffsetY;

          cy -= cardOutT * (window.innerHeight * 1.5);

          const scale = lerp(0.25, 1.0, cardT);
          el.style.opacity = String(cardT * (1 - cardOutT));
          el.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scale(${scale})`;
        });

        if (rishiImgRef.current) {
          const rishiScale = lerp(1, 1.7, ease(phase(p, 1.2, 1.6)));
          rishiImgRef.current.style.transform = `scale(${rishiScale})`;
          rishiImgRef.current.style.opacity = String(
            1 - ease(phase(p, 1.75, 2.2)),
          );
        }

        if (finalTextRef.current) {
          const finalTextT = ease(phase(p, 1.4, 1.75));
          finalTextRef.current.style.opacity = String(finalTextT);
          finalTextRef.current.style.transform = `translate(-50%, -50%) scale(${lerp(1.1, 1.0, finalTextT)}) translateY(${lerp(20, 0, finalTextT)}px)`;
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [loaderDone]);

  return (
    <>
      {!loaderDone && (
        <CinematicLoader onComplete={() => setLoaderDone(true)} />
      )}
      <Navbar />

      <div className='h-[500vh]'>
        <div className='sticky top-0 h-screen overflow-hidden'>
          <div className='absolute inset-0 z-0 bg-hero' />
          <MandalaBackground />

          <div className='relative z-10 h-full flex items-center pt-[76px] pl-[12vw] pr-8 gap-[4vw]'>
            <div
              ref={textRef}
              className='flex-1 min-w-0 pr-8 flex flex-col justify-center'
            >
              <h1
                className='font-display font-bold leading-[1.04] tracking-[0.05em] text-gradient-hero mb-6'
                style={{ fontSize: 'clamp(2.2rem, 3.8vw, 5rem)' }}
              >
                {HOME_HERO_HEADLINE_LINE1}
                <br />
                {HOME_HERO_HEADLINE_LINE2}
              </h1>

              <p className='text-[0.975rem] leading-[1.85] text-[#1e3428] max-w-[44ch] mb-10 tracking-[0.01em] border-l-2 border-[rgba(42,104,130,0.50)] pl-4'>
                {HOME_HERO_BODY}
              </p>

              <div className='flex gap-4 flex-wrap'>
                <button className='btn-primary'>{HOME_HERO_CTA_PRIMARY}</button>
                <button className='btn-ghost'>{HOME_HERO_CTA_SECONDARY}</button>
              </div>
            </div>

            <div className='basis-1/2 shrink-0 grow-0 h-full flex items-center justify-end pr-12 relative'>
              <div
                ref={rishiRef}
                className='relative flex items-center justify-center'
              >
                <div
                  ref={rishiImgRef}
                  className='origin-center'
                  style={{ willChange: 'transform, opacity' }}
                >
                  <Image
                    src='/rishi.png'
                    alt='Rishi'
                    width={(700 * 9) / 10}
                    height={(900 * 9) / 10}
                    priority
                    className='object-contain select-none max-h-[85vh] w-auto'
                  />
                </div>

                <div className='absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4'>
                  {DOSHAS.map((d, i) => (
                    <div
                      key={d.id}
                      ref={(el) => {
                        doshaRefs.current[i] = el;
                      }}
                      className='flex'
                    >
                      <Image
                        src={d.src}
                        alt={d.alt}
                        width={70}
                        height={70}
                        className='object-contain select-none max-h-[8vh] w-auto'
                      />
                    </div>
                  ))}
                </div>

                {BHUTAS.map((b, i) => (
                  <div
                    key={b.id}
                    ref={(el) => {
                      bhutaRefs.current[i] = el;
                    }}
                    className='absolute top-[45%] left-1/2 opacity-0'
                    style={{
                      transform: `translate(calc(-50% + 0px), calc(-50% + ${b.startDy}px))`,
                      willChange: 'transform, opacity',
                    }}
                  >
                    <Image
                      src={b.src}
                      alt={b.alt}
                      width={85}
                      height={85}
                      className='object-contain select-none max-h-[10vh] w-auto'
                    />
                  </div>
                ))}

                {BHUTAS.map((b, i) => {
                  const card = CARD_CONTENT[i];
                  const accent = CARD_ACCENTS[b.id];
                  return (
                    <div
                      key={`card-${b.id}`}
                      ref={(el) => {
                        cardRefs.current[i] = el;
                      }}
                      className='absolute top-[52%] left-1/2 w-[280px] h-[185px] rounded-[18px] opacity-0 flex flex-col gap-1.5 cursor-default select-none overflow-hidden box-border'
                      style={{
                        background: CARD_COLORS[b.id],
                        boxShadow:
                          '0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.10)',
                        padding: '16px 18px',
                        willChange: 'transform, opacity',
                      }}
                    >
                      <h3 className='m-0 text-[17px] font-display font-semibold text-white leading-[1.25] tracking-[0.04em]'>
                        {card.title}
                      </h3>
                      <div
                        className='h-px shrink-0'
                        style={{
                          background: `linear-gradient(90deg, ${accent}80, transparent)`,
                        }}
                      />
                      <p className='m-0 text-[13.5px] text-white/[0.88] leading-[1.65] tracking-[0.008em] line-clamp-3'>
                        {card.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div
              ref={finalTextRef}
              className='absolute top-1/2 left-1/2 z-10 text-center text-[#1e3428] w-full max-w-[600px] pointer-events-auto flex flex-col items-center gap-6 opacity-0'
              style={{
                transform: 'translate(-50%, -50%)',
                willChange: 'transform, opacity',
              }}
            >
              <h2
                className='m-0 font-serif font-semibold leading-[1.1] tracking-[-0.01em] [text-shadow:0_4px_24px_rgba(0,0,0,0.4)]'
                style={{ fontSize: '3rem' }}
              >
                {HOME_FINAL_HEADING}
              </h2>
              <p className='m-0 font-sans text-[1.1rem] text-[#1e3428] leading-[1.6] [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]'>
                {HOME_FINAL_BODY}
              </p>
              <button className='btn-primary mt-2 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'>
                {HOME_FINAL_CTA}
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className='py-[60px] px-5 text-center bg-earth-deep text-[#1e3428] font-sans text-[13px] flex flex-col gap-3 relative z-10'>
        <p className='m-0 tracking-[0.02em]'>{FOOTER_COPYRIGHT}</p>
        <p className='m-0 tracking-[0.02em]'>
          {FOOTER_CREDIT_TEXT}{' '}
          <a
            href={FOOTER_CREDIT_HREF}
            className='text-[#1e3428]/85 no-underline'
          >
            {FOOTER_CREDIT_LINK}
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
