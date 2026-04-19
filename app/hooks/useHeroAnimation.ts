'use client';

import { useEffect, useRef } from 'react';
import { clamp, phase, ease, lerp } from '../lib/utils';
import {
  ORBIT_RADIUS,
  CARD_RADIUS,
  TEXT_ENTER,
  RISHI_ENTER,
  ENTRANCE_DONE,
  BHUTAS,
} from '../lib/tokens';

export interface HeroRefs {
  textRef:      React.RefObject<HTMLDivElement | null>;
  rishiRef:     React.RefObject<HTMLDivElement | null>;
  rishiImgRef:  React.RefObject<HTMLDivElement | null>;
  finalTextRef: React.RefObject<HTMLDivElement | null>;
  shloka1Ref:   React.RefObject<HTMLDivElement | null>;
  shloka2Ref:   React.RefObject<HTMLDivElement | null>;
  bgOverlayRef: React.RefObject<HTMLDivElement | null>;
  doshaRefs:    React.MutableRefObject<(HTMLDivElement | null)[]>;
  bhutaRefs:    React.MutableRefObject<(HTMLDivElement | null)[]>;
  cardRefs:     React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function useHeroAnimation(loaderDone: boolean): HeroRefs {
  const textRef      = useRef<HTMLDivElement>(null);
  const rishiRef     = useRef<HTMLDivElement>(null);
  const rishiImgRef  = useRef<HTMLDivElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const shloka1Ref   = useRef<HTMLDivElement>(null);
  const shloka2Ref   = useRef<HTMLDivElement>(null);
  const bgOverlayRef = useRef<HTMLDivElement>(null);
  const doshaRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const bhutaRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const mountTimeRef    = useRef(0);
  const centerOffsetRef = useRef<number | null>(null);

  useEffect(() => {
    if (!loaderDone) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }

    document.body.style.overflow = '';
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    mountTimeRef.current  = performance.now();
    centerOffsetRef.current = null;

    const BASE_ZONE = window.innerHeight * 2;
    let rafId = 0;
    let lastY = -1;
    let entranceDone = false;

    // Set initial hidden state
    const setOpacity = (el: HTMLDivElement | null, v: string) => {
      if (el) el.style.opacity = v;
    };

    setOpacity(textRef.current,      '0');
    setOpacity(rishiRef.current,     '0');
    setOpacity(finalTextRef.current, '0');
    setOpacity(shloka1Ref.current,   '0');
    setOpacity(shloka2Ref.current,   '0');
    if (textRef.current) textRef.current.style.transform = 'translateY(24px)';
    doshaRefs.current.forEach(el => setOpacity(el, '0'));

    const animate = () => {
      const elapsed = (performance.now() - mountTimeRef.current) / 1000;
      const scrollY = window.scrollY;

      // ── Entrance phase ────────────────────────────────────────────────────
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
        // Doshas appear with rishi — no stagger
        doshaRefs.current.forEach(el => {
          if (!el) return;
          el.style.opacity = rishiRef.current?.style.opacity ?? '0';
        });
        bhutaRefs.current.forEach(el => { if (el) el.style.opacity = '0'; });

        rafId = requestAnimationFrame(animate);
        return;
      }

      // Snap to final entrance state
      if (!entranceDone) {
        entranceDone = true;
        setOpacity(textRef.current,  '1');
        setOpacity(rishiRef.current, '1');
        if (textRef.current) textRef.current.style.transform = '';
        doshaRefs.current.forEach(el => setOpacity(el, '1'));
        lastY = -1;
      }

      setOpacity(rishiRef.current, '1');

      // ── Scroll-driven phase ───────────────────────────────────────────────
      if (scrollY === lastY) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      lastY = scrollY;

      const p = clamp(scrollY / BASE_ZONE, 0, 2.5);

      // Hero text slide-fade
      if (textRef.current) {
        const fadeT = ease(phase(p, 0.5, 0.68));
        textRef.current.style.opacity   = String(1 - fadeT);
        textRef.current.style.transform = `translateX(${lerp(0, -110, fadeT)}px)`;
      }

      // Rishi center offset (computed lazily)
      if (p > 0.52 && centerOffsetRef.current === null && rishiRef.current) {
        const r = rishiRef.current.getBoundingClientRect();
        centerOffsetRef.current = window.innerWidth / 2 - (r.left + r.width / 2);
      }
      if (rishiRef.current) {
        const dx = centerOffsetRef.current !== null
          ? lerp(0, centerOffsetRef.current, ease(phase(p, 0.6, 0.82)))
          : 0;
        rishiRef.current.style.transform = `translateX(${dx}px)`;
      }

      // Doshas fade out
      const doshaAlpha = 1 - ease(phase(p, 0.15, 0.38));
      doshaRefs.current.forEach(el => { if (el) el.style.opacity = String(doshaAlpha); });

      // Bhutas orbit
      const bhutaFadeCard = ease(phase(p, 0.82, 0.96));
      const bhutaAlpha    = ease(phase(p, 0.18, 0.42)) * (1 - bhutaFadeCard);
      const orbitT        = ease(phase(p, 0.4,  0.62));
      const rotateDeg     = phase(p, 0.6, 1.0) * 360;

      BHUTAS.forEach((b, i) => {
        const el = bhutaRefs.current[i];
        if (!el) return;
        const rad   = (b.targetAngleDeg + rotateDeg) * (Math.PI / 180);
        const x     = lerp(0, Math.cos(rad) * ORBIT_RADIUS, orbitT);
        const y     = lerp(b.startDy, Math.sin(rad) * ORBIT_RADIUS, orbitT);
        const scale = lerp(1.0, 1.5, orbitT);
        el.style.opacity   = String(bhutaAlpha);
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
      });

      // Cards scale down / fade out — synced exactly with Rishi zoom (p 1.1 → 1.55)
      const cardT    = ease(phase(p, 0.82, 1.0));
      const cardOutT = ease(phase(p, 1.1,  1.55));
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const b   = BHUTAS[i];
        const rad = b.targetAngleDeg * (Math.PI / 180);
        const cx  = Math.cos(rad) * CARD_RADIUS * 1.5;
        const cy  = Math.sin(rad) * CARD_RADIUS + b.cardOffsetY;
        // Scale from 0.25 → 1.0 on entry, then 1.0 → 0.0 on exit (shrink in place)
        const scaleIn  = lerp(0.25, 1.0, cardT);
        const scaleOut = lerp(1.0,  0.0, cardOutT);
        const sc = Math.min(scaleIn, scaleOut);
        el.style.opacity   = String(cardT * (1 - cardOutT));
        el.style.transform = `translate(calc(-50% + ${cx}px), calc(-50% + ${cy}px)) scale(${sc})`;
      });

      // Rishi zoom + dark overlay — same phase as cards (1.1 → 1.55)
      if (rishiImgRef.current) {
        const rs = lerp(1, 1.7, ease(phase(p, 1.1, 1.55)));
        rishiImgRef.current.style.transform = `scale(${rs})`;
        rishiImgRef.current.style.opacity   = String(1 - ease(phase(p, 1.75, 2.2)));
      }
      if (bgOverlayRef.current) {
        const darkT = ease(phase(p, 1.1, 1.55));
        bgOverlayRef.current.style.opacity = String(darkT * 0.55);
      }

      // Shloka leaves slide in from sides
      const shlokaT    = ease(phase(p, 1.2,  1.55));
      const shlokaOutT = ease(phase(p, 1.75, 2.1));
      const shlokaA    = shlokaT * (1 - shlokaOutT);
      if (shloka1Ref.current) {
        shloka1Ref.current.style.opacity   = String(shlokaA);
        shloka1Ref.current.style.transform = `translateY(-50%) translateX(${lerp(-60, 0, shlokaT)}px)`;
      }
      if (shloka2Ref.current) {
        shloka2Ref.current.style.opacity   = String(shlokaA);
        shloka2Ref.current.style.transform = `translateY(-50%) translateX(${lerp(60, 0, shlokaT)}px)`;
      }

      // Final CTA overlay
      if (finalTextRef.current) {
        const ft = ease(phase(p, 1.4, 1.75));
        finalTextRef.current.style.opacity   = String(ft);
        finalTextRef.current.style.transform =
          `translate(-50%, -50%) scale(${lerp(1.1, 1.0, ft)}) translateY(${lerp(20, 0, ft)}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [loaderDone]);

  return {
    textRef, rishiRef, rishiImgRef, finalTextRef,
    shloka1Ref, shloka2Ref, bgOverlayRef,
    doshaRefs, bhutaRefs, cardRefs,
  };
}
