'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '../components/Navbar';
import MandalaBackground from '../components/MandalaBackground';
import JourneyStackCard from './JourneyStackCard';
import { JOURNEY_STEPS } from './patientJourneyData';
import {
  JOURNEY_CTA_EYEBROW,
  JOURNEY_CTA_HEADLINE,
  JOURNEY_CTA_BODY,
  JOURNEY_CTA_LABEL,
  JOURNEY_CTA_HREF,
  JOURNEY_CTA_FOOTER,
} from '../constants';

// Each card reveal uses this many vh of scroll distance
const VH_PER_CARD = 120;
const TOTAL_VH = JOURNEY_STEPS.length * VH_PER_CARD + 60;

// Fixed pixel height of each collapsed tab header
const TAB_H = 64;

// Estimated expanded body height — used only to size the container
const EXPANDED_BODY_H = 360;

const PatientJourneyPage = () => {
  const scrollWrapRef = useRef<HTMLDivElement>(null);

  const [revealedCount, setRevealedCount] = useState(0);
  const [activeId, setActiveId] = useState<number | null>(null);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  // Tracks whether the user has manually clicked a card
  const userSelectedRef = useRef(false);
  // Stable reference to latest revealedCount inside rAF without re-subscribing
  const revealedRef = useRef(0);
  const activeIdRef = useRef<number | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const ticking = useRef(false);

  const handleSelect = useCallback((id: number) => {
    userSelectedRef.current = true;
    setActiveId((prev) => (prev === id ? null : id));
    activeIdRef.current = id;
  }, []);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const wrap = scrollWrapRef.current;
      if (!wrap) return;

      const { top } = wrap.getBoundingClientRect();
      const scrollable = wrap.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.min(1, Math.max(0, -top / scrollable));
      const raw = progress * JOURNEY_STEPS.length;
      // How many cards should be visible right now
      const toReveal = Math.min(JOURNEY_STEPS.length, Math.floor(raw) + 1);

      // Direct DOM update for 60fps smooth scrolling without React re-renders
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${(progress * 100).toFixed(1)}%`;
      }
      if (progressTextRef.current) {
        progressTextRef.current.textContent = `${Math.round(progress * 100)}% revealed`;
      }

      if (toReveal !== revealedRef.current) {
        revealedRef.current = toReveal;
        setRevealedCount(toReveal);
      }

      // Only auto-advance the active card if the user hasn't manually chosen one
      if (!userSelectedRef.current) {
        const targetId = JOURNEY_STEPS[Math.min(toReveal - 1, JOURNEY_STEPS.length - 1)].id;
        if (targetId !== activeIdRef.current) {
          activeIdRef.current = targetId;
          setActiveId(targetId);
        }
      }
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        rafIdRef.current = requestAnimationFrame(update);
      }
    };

    // Support both native scroll and Lenis (which still dispatches on window)
    window.addEventListener('scroll', onScroll, { passive: true });
    // Fire once on mount so initial state is set even before scrolling
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const activeIndex = JOURNEY_STEPS.findIndex((s) => s.id === activeId);
  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  // Container must be tall enough to hold all tab headers + the expanded body
  const stackHeight = TAB_H * JOURNEY_STEPS.length + EXPANDED_BODY_H;

  return (
    <>
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative min-h-screen bg-hero overflow-hidden flex flex-col items-center justify-center text-center px-8 pt-28 pb-20">
        <MandalaBackground />
        <div className="relative z-10 max-w-2xl mx-auto">
          <p className="text-[9.5px] tracking-[0.35em] uppercase text-text-400 font-body font-medium mb-7">
            8 Steps · Your Healing Path
          </p>
          <h1
            className="font-display font-bold text-text-900 leading-[1.06] tracking-[0.02em] mb-6"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)' }}
          >
            Your Patient<br />Journey
          </h1>
          <p
            className="font-body text-text-500 leading-[1.85] mx-auto mb-12 max-w-[42ch]"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)' }}
          >
            Scroll to reveal each step of your healing path — from first contact to ongoing wellness.
          </p>
          <div className="flex flex-col items-center gap-2 animate-[bounceUp_2.2s_ease-in-out_infinite]">
            <span className="text-[9px] tracking-[0.3em] text-text-300 uppercase font-body">Scroll to begin</span>
            <div className="w-px h-12 bg-gradient-to-b from-text-300/50 to-transparent" />
          </div>
        </div>
      </section>

      {/* ── Sticky dossier scroll section ── */}
      <div
        ref={scrollWrapRef}
        className="relative"
        style={{ height: `${TOTAL_VH}vh` }}
      >
        <div
          className="sticky top-0 h-screen bg-hero overflow-hidden"
          aria-label="Patient Journey Interactive Dossier"
        >
          {/* Single mandala, lighter opacity inside the interactive pane */}
          <MandalaBackground />

          <div className="relative z-10 h-full flex flex-col px-6 sm:px-10 pt-24 pb-6">

            {/* ── Header bar ── */}
            <div className="flex items-center justify-between mb-6 max-w-3xl mx-auto w-full">
              <div>
                <p className="text-[9px] tracking-[0.3em] uppercase text-text-400 font-body mb-0.5">Patient Journey</p>
                <p className="font-display font-semibold text-text-900 text-base tracking-[0.02em]">Ayusurance</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5 items-center">
                  {JOURNEY_STEPS.map((step, i) => (
                    <button
                      key={step.id}
                      onClick={() => { if (i < revealedCount) handleSelect(step.id); }}
                      disabled={i >= revealedCount}
                      aria-label={`Go to step ${step.id}: ${step.title}`}
                      className="rounded-full transition-all duration-500 focus:outline-none focus-visible:ring-2"
                      style={{
                        width: activeId === step.id ? '18px' : '6px',
                        height: '6px',
                        background: i >= revealedCount
                          ? 'rgba(90,100,88,0.12)'
                          : activeId === step.id
                            ? step.accentColor
                            : 'rgba(90,100,88,0.30)',
                        opacity: i >= revealedCount ? 0.3 : 1,
                      }}
                    />
                  ))}
                </div>
                <span className="font-display text-text-400 text-sm tracking-[0.06em] tabular-nums">
                  {String(revealedCount).padStart(2, '0')}&thinsp;/&thinsp;{String(JOURNEY_STEPS.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* ── Stack container — inner scrollable on small screens ── */}
            <div className="relative max-w-3xl mx-auto w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div
                className="relative w-full"
                style={{ height: `${stackHeight}px` }}
              >
                {JOURNEY_STEPS.map((step, index) => (
                  <JourneyStackCard
                    key={step.id}
                    step={step}
                    index={index}
                    activeIndex={safeActiveIndex}
                    isActive={activeId === step.id}
                    isRevealed={index < revealedCount}
                    pushDown={EXPANDED_BODY_H}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>

            {/* ── Progress bar ── */}
            <div className="mt-4 max-w-3xl mx-auto w-full">
              <div className="h-[2px] rounded-full bg-[rgba(90,100,88,0.08)] overflow-hidden">
                <div
                  ref={progressBarRef}
                  className="h-full rounded-full transition-[width] duration-75 ease-out"
                  style={{
                    width: '0%',
                    background: 'linear-gradient(90deg, #a8843e, #7a9e7e)',
                  }}
                />
              </div>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[8.5px] tracking-[0.22em] uppercase font-body text-text-300">Your path</span>
                <span ref={progressTextRef} className="text-[8.5px] tracking-[0.22em] uppercase font-body text-text-300 tabular-nums">
                  0% revealed
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <section
        className="relative px-8 text-center overflow-hidden bg-hero"
        style={{
          paddingTop: 'clamp(5rem, 10vw, 9rem)',
          paddingBottom: 'clamp(5rem, 10vw, 9rem)',
        }}
      >
        <MandalaBackground />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="w-12 h-px mx-auto mb-8"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(168,132,62,0.5), transparent)' }}
          />
          <p className="text-[9.5px] tracking-[0.32em] uppercase text-text-400 font-body font-medium mb-5">
            {JOURNEY_CTA_EYEBROW}
          </p>
          <h2
            className="font-display font-bold text-text-900 mb-5 tracking-[0.03em] leading-[1.1]"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.6rem)' }}
          >
            {JOURNEY_CTA_HEADLINE}
          </h2>
          <p className="font-body text-text-500 max-w-[44ch] mx-auto mb-12 leading-[1.85] text-[1.02rem]">
            {JOURNEY_CTA_BODY}
          </p>
          <a
            href={JOURNEY_CTA_HREF}
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-body font-medium text-[0.85rem] tracking-[0.14em] uppercase text-white no-underline transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-soft"
            style={{
              background: 'linear-gradient(135deg, #b8934c 0%, #6c875b 100%)',
              boxShadow: '0 10px 32px rgba(168,132,62,0.22)',
            }}
          >
            {JOURNEY_CTA_LABEL}
            <span className="opacity-75">→</span>
          </a>
          <p className="mt-16 text-[10px] text-text-300 tracking-[0.08em] font-body">
            {JOURNEY_CTA_FOOTER}
          </p>
        </div>
      </section>
    </>
  );
};

export default PatientJourneyPage;
