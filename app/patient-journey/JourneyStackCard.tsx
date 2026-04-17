'use client';

import { useEffect, useRef } from 'react';
import { type JourneyStep } from './patientJourneyData';

type Props = {
  step: JourneyStep;
  index: number;
  activeIndex: number;
  isActive: boolean;
  isRevealed: boolean;
  pushDown: number;
  onSelect: (id: number) => void;
};

// Must match the constant in page.tsx
const TAB_H = 64;

const JourneyStackCard = ({
  step,
  index,
  activeIndex,
  isActive,
  isRevealed,
  pushDown,
  onSelect,
}: Props) => {
  const mountedRef = useRef(false);
  const elRef = useRef<HTMLDivElement>(null);

  // Animate in only on first reveal — slide up from below + fade
  useEffect(() => {
    if (!isRevealed || mountedRef.current) return;
    mountedRef.current = true;
    const el = elRef.current;
    if (!el) return;
    el.animate(
      [
        { opacity: '0', transform: 'translateY(24px) scale(0.98)' },
        { opacity: '1', transform: 'translateY(0px) scale(1)' },
      ],
      { duration: 480, easing: 'cubic-bezier(0.22,1,0.36,1)', fill: 'forwards' },
    );
  }, [isRevealed]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(step.id);
    }
  };

  if (!isRevealed) return null;

  // Cards before or at activeIndex sit at their natural tab position.
  // Cards after activeIndex are pushed down by pushDown (the expanded body h).
  const topOffset = index * TAB_H + (index > activeIndex ? pushDown : 0);

  const stackDepth = Math.abs(index - activeIndex);
  const stackScale = isActive ? 1 : Math.max(0.975, 1 - stackDepth * 0.004);

  return (
    <div
      ref={elRef}
      className="absolute left-0 right-0 transition-[top,transform,box-shadow] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{
        top: topOffset,
        zIndex: isActive ? 50 : 40 - stackDepth,
        transform: `scale(${stackScale})`,
        transformOrigin: 'top center',
        // Push down all cards that sit below the active card to make room
        // for its expanded body. We use a CSS variable trick: the expansion
        // is driven purely by maxHeight on the body, and siblings below shift
        // automatically because they are stacked in document flow... except
        // they are absolute. We handle this by giving non-active cards below
        // the active card a `marginTop` for the expanded content height.
        //
        // Simplest reliable approach: cards above active sit at index × TAB_H,
        // cards at/after active sit at index × TAB_H + expanded offset.
        // The expanded offset is derived from the body's maxHeight transition.
      }}
    >
      <div
        className="relative mx-auto w-full max-w-3xl rounded-2xl overflow-hidden border border-[rgba(168,132,62,0.16)] transition-shadow duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          background: 'rgba(255,252,245,0.96)',
          boxShadow: isActive
            ? `0 24px 64px rgba(43,66,48,0.12), 0 2px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px ${step.accentColor}22`
            : `0 2px 10px rgba(43,66,48,0.06), 0 1px 0 rgba(255,255,255,0.8) inset`,
        }}
      >
        {/* Tab / header — always visible */}
        <button
          id={`journey-card-tab-${step.id}`}
          aria-expanded={isActive}
          aria-controls={`journey-card-body-${step.id}`}
          onClick={() => onSelect(step.id)}
          onKeyDown={handleKeyDown}
          className="w-full flex items-center justify-between px-6 cursor-pointer text-left transition-colors duration-200 hover:bg-[rgba(168,132,62,0.03)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(168,132,62,0.5)] focus-visible:ring-offset-0"
          style={{
            height: `${TAB_H}px`,
            borderBottom: isActive ? `1px solid ${step.accentColor}18` : '1px solid transparent',
          }}
        >
          <div className="flex items-center gap-4 min-w-0">
            <span
              className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-bold tracking-wide border"
              style={{
                color: step.accentColor,
                borderColor: `${step.accentColor}38`,
                background: step.accentLight,
              }}
            >
              {String(step.id).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <p
                className="text-[8px] tracking-[0.28em] uppercase font-body font-semibold mb-0.5 truncate transition-opacity duration-300"
                style={{ color: step.accentColor, opacity: isActive ? 1 : 0.65 }}
              >
                {step.tag}
              </p>
              <h3 className="font-display font-semibold text-text-900 text-[0.92rem] leading-tight tracking-[0.02em] truncate">
                {step.title}
              </h3>
            </div>
          </div>

          <div
            className="shrink-0 ml-4 w-5 h-5 flex items-center justify-center rounded-full border transition-all duration-500"
            style={{
              borderColor: `${step.accentColor}40`,
              background: isActive ? step.accentColor : 'transparent',
              transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <path
                d="M1.5 3L4.5 6L7.5 3"
                stroke={isActive ? '#fff' : step.accentColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>

        {/* Expandable body */}
        <div
          id={`journey-card-body-${step.id}`}
          role="region"
          aria-labelledby={`journey-card-tab-${step.id}`}
          className="overflow-hidden transition-[max-height,opacity] duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            maxHeight: isActive ? '480px' : '0px',
            opacity: isActive ? 1 : 0,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_260px]">
            <div className="p-6 flex flex-col justify-center">
              <p
                className="text-[8px] tracking-[0.32em] uppercase font-body font-semibold mb-3"
                style={{ color: step.accentColor }}
              >
                {step.subtitle}
              </p>
              <div
                className="h-px w-10 mb-4"
                style={{ background: `linear-gradient(90deg, ${step.accentColor}55, transparent)` }}
              />
              <p className="font-body text-text-700 text-[0.92rem] leading-[1.88] max-w-[44ch]">
                {step.desc}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: step.accentColor }} />
                <span className="text-[8px] tracking-[0.2em] uppercase font-body font-semibold text-text-400">
                  {step.tag}
                </span>
              </div>
            </div>

            {/* Image — scaled to crop out bottom-right watermark */}
            <div className="relative overflow-hidden md:rounded-br-2xl" style={{ minHeight: '200px' }}>
              <div className="absolute inset-0" style={{ overflow: 'hidden' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: 'center 12%',
                    transform: 'scale(1.12)',
                    transformOrigin: 'center 18%',
                  }}
                  loading="lazy"
                  draggable={false}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(135deg, ${step.accentColor}18 0%, transparent 50%)` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyStackCard;
