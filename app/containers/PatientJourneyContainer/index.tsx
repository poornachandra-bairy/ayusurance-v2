'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { JOURNEY_STEPS } from '../../constants/patientJourneyData';
import { SHLOKAS } from '../../constants';

const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const ph = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);

const SHEETS = [
  {
    frontType: 'cover',
    backType: 'inside-cover',
    frontData: { title: 'Patient Journey', subtitle: 'Your Healing Journey', desc: 'Scroll to begin' },
    backData: {},
  },
  { frontType: 'step', backType: 'step', frontData: JOURNEY_STEPS[0], backData: JOURNEY_STEPS[1] },
  { frontType: 'step', backType: 'step', frontData: JOURNEY_STEPS[2], backData: JOURNEY_STEPS[3] },
  { frontType: 'step', backType: 'step', frontData: JOURNEY_STEPS[4], backData: JOURNEY_STEPS[5] },
  { frontType: 'step', backType: 'step', frontData: JOURNEY_STEPS[6], backData: JOURNEY_STEPS[7] },
  {
    frontType: 'inside-backcover',
    backType: 'backcover',
    frontData: {},
    backData: {
      title: 'Complete Wellness',
      desc: 'Your path to harmony and balance is ongoing. We stand by you every step of the way.',
    },
  },
];

const FLIPS = SHEETS.length;
const INTRO_UNITS = 1.5;
const OUTRO_UNITS = 1.5;
const TOTAL_UNITS = INTRO_UNITS + FLIPS + OUTRO_UNITS;

const PatientJourneyContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      const current = -rect.top;
      const p = clamp((current / maxScroll) * TOTAL_UNITS, 0, TOTAL_UNITS);
      setScrollProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const introP = clamp(scrollProgress / INTRO_UNITS, 0, 1);
  const bookP = clamp(scrollProgress - INTRO_UNITS, 0, FLIPS);
  const outroP = clamp((scrollProgress - INTRO_UNITS - FLIPS) / OUTRO_UNITS, 0, 1);

  const titleScale = lerp(1, 0, ease(introP));
  const outroScale = lerp(0, 1, ease(outroP));

  const INITIAL_BOOK_SCALE = isMobile ? 0.35 : 0.45;
  const FULL_BOOK_SCALE = isMobile ? 0.72 : 1.0;

  let baseScale: number;
  if (scrollProgress <= INTRO_UNITS) {
    baseScale = lerp(INITIAL_BOOK_SCALE, FULL_BOOK_SCALE, ease(ph(scrollProgress, 0, INTRO_UNITS)));
  } else if (scrollProgress <= INTRO_UNITS + FLIPS) {
    baseScale = FULL_BOOK_SCALE;
  } else {
    baseScale = lerp(FULL_BOOK_SCALE, INITIAL_BOOK_SCALE, ease(outroP));
  }

  const bookScale = baseScale;
  const shiftX = isMobile ? 12 : 24;

  let bookX: number, bookY: number;
  if (scrollProgress <= INTRO_UNITS) {
    const t = ease(ph(scrollProgress, 0, INTRO_UNITS));
    bookX = lerp(-shiftX, 0, t);
    bookY = lerp(70, 0, t);
  } else if (scrollProgress <= INTRO_UNITS + FLIPS) {
    bookX = 0;
    bookY = 0;
  } else {
    const t = ease(outroP);
    bookX = lerp(0, shiftX, t);
    bookY = lerp(0, 70, t);
  }

  const overlayOpacity =
    scrollProgress <= INTRO_UNITS
      ? lerp(0, 0.65, ease(introP))
      : scrollProgress < INTRO_UNITS + FLIPS
        ? 0.65
        : lerp(0.65, 0, ease(outroP));

  return (
    <main
      ref={containerRef}
      className="relative overflow-x-clip bg-transparent"
      style={{ height: `${TOTAL_UNITS * 120 + 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pt-[76px]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: `rgba(15,22,15,${overlayOpacity})` }}
        />

        <div
          className="absolute z-20 text-center pointer-events-none select-none px-6"
          style={{
            top: '12%',
            left: '50%',
            transform: `translate(-50%, 0) scale(${titleScale})`,
            opacity: titleScale > 0 ? 1 : 0,
          }}
        >
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 100 100" fill="none" stroke="#a8843e" strokeWidth="2" width="40" height="40" className="opacity-80">
              <path d="M50 10 L90 50 L50 90 L10 50 Z" />
              <circle cx="50" cy="50" r="15" />
            </svg>
          </div>
          <h1 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] text-[#3b4a38] leading-[1.0] mb-4" style={{ fontWeight: 400 }}>
            Your Path to Wellness
          </h1>
          <p className="text-[#556353] font-body text-sm md:text-base leading-relaxed max-w-[38ch] mx-auto">
            A transparent, seamless clinical process combining authentic Ayurvedic protocols with modern convenience.
          </p>
        </div>

        <div
          className="absolute z-20 text-center pointer-events-none select-none px-6"
          style={{
            top: '12%',
            left: '50%',
            transform: `translate(-50%, 0) scale(${outroScale})`,
            opacity: outroScale > 0 ? 1 : 0,
          }}
        >
          <div className="flex justify-center mb-5">
            <svg viewBox="0 0 100 100" fill="none" stroke="#a8843e" strokeWidth="2" width="40" height="40" className="opacity-80">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="20" />
            </svg>
          </div>
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] text-[#3b4a38] leading-tight mb-4" style={{ fontWeight: 400 }}>
            A Restored Balance
          </h2>
          <p className="text-[#556353] font-body text-sm md:text-base leading-relaxed max-w-[38ch] mx-auto">
            You have reached the end of the initial clinical protocol. True wellness is a continuous commitment — and we remain by your side.
          </p>
        </div>

        <div
          className="relative z-10 w-full max-w-[1400px] will-change-transform"
          style={{
            height: 'calc(100vh - 100px)',
            transform: `translate(${bookX * bookScale}%, ${bookY}px) scale(${bookScale})`,
            transformOrigin: 'center center',
            perspective: '3000px',
            opacity: 1,
          }}
        >
          <div className="absolute top-0 bottom-0 left-1/2 w-20 -ml-10 journey-shadow-spine z-50 pointer-events-none" />

          {SHEETS.map((sheet, idx) => {
            const sheetP = clamp(bookP - idx, 0, 1);
            const rotation = -180 * sheetP;
            let zIndex = 20 - idx;
            if (sheetP > 0 && sheetP < 1) zIndex = 50 + idx;
            if (sheetP === 1) zIndex = 20 + idx;

            const isCoverSheet = idx === 0 || idx === FLIPS - 1;
            const shadowStyle = isCoverSheet ? 'shadow-[2px_12px_25px_rgba(0,0,0,0.4)]' : 'shadow-[1px_4px_10px_rgba(0,0,0,0.12)]';
            const T = isCoverSheet ? 16 : 8;
            const edgeColor = isCoverSheet ? '#18281d' : '#dabe9b';

            return (
              <div
                key={idx}
                className={`absolute top-[1vh] bottom-[1vh] left-[50%] right-[3%] lg:right-[calc(50vw-680px)] origin-left will-change-transform ${shadowStyle}`}
                style={{ transform: `rotateY(${rotation}deg)`, zIndex, transformStyle: 'preserve-3d' }}
              >
                <div
                  className="absolute inset-0 overflow-hidden flex"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: `translateZ(${T / 2}px)` }}
                >
                  <RenderPage type={sheet.frontType} data={sheet.frontData} side="right" />
                </div>
                <div
                  className="absolute inset-0 overflow-hidden flex"
                  style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: `rotateY(180deg) translateZ(${T / 2}px)` }}
                >
                  <RenderPage type={sheet.backType} data={sheet.backData} side="left" />
                </div>
                <div className="absolute top-0 bottom-0" style={{ right: `-${T / 2}px`, width: `${T}px`, background: edgeColor, transform: 'rotateY(90deg)' }} />
                <div className="absolute left-0 right-0" style={{ bottom: `-${T / 2}px`, height: `${T}px`, background: edgeColor, transform: 'rotateX(-90deg)' }} />
                <div className="absolute left-0 right-0" style={{ top: `-${T / 2}px`, height: `${T}px`, background: edgeColor, transform: 'rotateX(90deg)' }} />
              </div>
            );
          })}
        </div>

        <div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: clamp(1 - scrollProgress * 5, 0, 1) }}
        >
          <span className="animate-pulse text-[11px] md:text-sm font-extrabold tracking-[0.5em] uppercase text-[#2b4230] drop-shadow-sm">
            Scroll Down
          </span>
          <div className="flex flex-col items-center text-[#2b4230] animate-bounce mt-1">
            <svg className="w-6 h-6 md:w-8 md:h-8 -mb-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div
          className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none transition-opacity duration-700"
          style={{ opacity: outroScale > 0.5 ? 1 : 0 }}
        >
          <div className="flex flex-col items-center text-[#2b4230] animate-bounce mb-1">
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            <svg className="w-6 h-6 md:w-8 md:h-8 -mt-4 opacity-70" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
          <span className="animate-pulse text-[11px] md:text-sm font-extrabold tracking-[0.5em] uppercase text-[#2b4230] drop-shadow-sm">
            Scroll Up
          </span>
        </div>
      </div>
    </main>
  );
};

function RenderPage({ type, data, side }: { type: string; data: any; side: 'left' | 'right' }) {
  const isLeft = side === 'left';

  const paperTexture = {
    backgroundColor: '#fbf8f1',
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`,
    boxShadow: isLeft ? 'inset -30px 0 50px rgba(0,0,0,0.06)' : 'inset 30px 0 50px rgba(0,0,0,0.06)',
  };

  if (type === 'cover') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center bg-[#2b4230] relative border-l border-black/20" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }}>
        <div className="absolute top-0 bottom-0 left-[2%] w-4 journey-shadow-side" />
        <div className="absolute inset-4 md:inset-8 border-2 border-[#a8843e]/40 rounded-lg pointer-events-none" />
        <div className="absolute inset-5 md:inset-9 border border-[#a8843e]/20 rounded-lg pointer-events-none" />
        <div className="w-20 h-20 md:w-32 md:h-32 border-2 border-[#a8843e] rounded-full flex items-center justify-center mb-8 bg-[#2b4230] shadow-[0_0_30px_rgba(168,132,62,0.2)]">
          <span className="text-4xl md:text-6xl text-[#e6d7b1]">ॐ</span>
        </div>
        <h2 className="text-[10px] md:text-sm font-sans tracking-[0.4em] text-[#a9bc97] uppercase mb-4">{data.title}</h2>
        <h1 className="text-5xl md:text-7xl font-display font-medium text-[#f8f4ea] drop-shadow-lg mb-6 max-w-[12ch]">{data.subtitle}</h1>
        <p className="text-[#a9bc97] italic font-serif text-sm md:text-lg">{data.desc}</p>
      </div>
    );
  }

  if (type === 'backcover') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-16 text-center bg-[#2b4230] relative border-r border-black/20" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }}>
        <div className="absolute top-0 bottom-0 right-[2%] w-4 journey-shadow-side -scale-x-100" />
        <div className="absolute inset-4 md:inset-8 border-2 border-[#a8843e]/40 rounded-lg pointer-events-none" />
        <h1 className="text-4xl md:text-5xl font-display font-medium text-[#f8f4ea] mb-6 drop-shadow-md">{data.title}</h1>
        <p className="text-[#a9bc97] font-body text-sm md:text-lg max-w-[30ch] mb-12">{data.desc}</p>
        <button className="px-8 py-3 border border-[#a8843e] text-[#e6d7b1] tracking-widest text-xs uppercase hover:bg-[#a8843e] hover:text-[#2b4230] transition-colors rounded shadow-lg">
          Begin Consultation
        </button>
      </div>
    );
  }

  if (type === 'inside-cover') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 text-center" style={paperTexture}>
        <div className="w-32 h-32 md:w-48 md:h-48 relative mb-8 mix-blend-multiply opacity-90 select-none pointer-events-none">
          <Image src="/rishi.png" alt="Ayurvedic Rishi" fill className="object-contain" priority />
        </div>
        <h3 className="text-lg md:text-2xl font-display text-[#3b4a38] mb-2 leading-[1.8]">
          {SHLOKAS[0].text}<br />{SHLOKAS[0].line2}
        </h3>
        <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#7e966c] mb-6">{SHLOKAS[0].attr}</p>
        <p className="text-[#556353] font-body text-sm md:text-base max-w-[40ch] leading-relaxed italic border-t border-black/10 pt-4 px-4">
          "Ayurveda is that which deals with good, bad, happy and unhappy life, its promoters and non-promoters, measure and nature."
        </p>
      </div>
    );
  }

  if (type === 'inside-backcover') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8 md:p-12 text-center" style={paperTexture}>
        <div className="w-32 h-32 md:w-48 md:h-48 relative mb-8 mix-blend-multiply opacity-90 select-none pointer-events-none">
          <Image src="/rishi.png" alt="Ayurvedic Rishi" fill className="object-contain" priority />
        </div>
        <h3 className="text-lg md:text-2xl font-display text-[#3b4a38] mb-2 leading-[1.8]">
          {SHLOKAS[1].text}<br />{SHLOKAS[1].line2}
        </h3>
        <p className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-[#7e966c] mb-6">{SHLOKAS[1].attr}</p>
        <p className="text-[#556353] font-body text-sm md:text-base max-w-[44ch] leading-relaxed italic border-t border-black/10 pt-4 px-4">
          "One whose doshas are balanced, whose appetite is good, whose tissues are functioning normally, whose wastes are eliminated properly, and whose self, mind, and senses remain full of bliss is called a healthy person."
        </p>
      </div>
    );
  }

  const step = data;
  return (
    <div
      className={`p-8 md:p-16 h-full flex flex-col relative w-full ${isLeft ? 'items-end text-right' : 'items-start text-left'}`}
      style={paperTexture}
    >
      <div
        className="text-[140px] md:text-[220px] font-display font-bold leading-none opacity-5 pointer-events-none absolute select-none"
        style={{ color: step.accentColor, top: '4rem', [isLeft ? 'left' : 'right']: '3rem' }}
      >
        0{step.id}
      </div>
      <div className="relative z-10 w-full pt-16 md:pt-32 px-4 md:px-12">
        <h4 className="text-[0.65rem] md:text-xs tracking-[0.2em] font-semibold uppercase mb-4 md:mb-6 drop-shadow-sm" style={{ color: step.accentColor }}>
          Step 0{step.id} · {step.subtitle}
        </h4>
        <h3 className="text-4xl md:text-6xl font-display text-[#243126] mb-6 md:mb-10 font-medium tracking-tight">
          {step.title}
        </h3>
        <p className="text-[#3b4a38] font-body text-base md:text-xl leading-[1.8] max-w-[38ch] break-words">
          {step.desc}
        </p>
      </div>
      <div className="mt-auto w-24 md:w-40 h-1" style={{ background: `${step.accentColor}50` }} />
    </div>
  );
}

export default PatientJourneyContainer;
