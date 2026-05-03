"use client";

import React, { useEffect, useRef } from "react";

interface ScrollVelocityMarqueeProps {
  children: React.ReactNode;
  baseVelocity?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function ScrollVelocityMarquee({
  children,
  baseVelocity = -1.5,
  pauseOnHover = true,
  className = "",
}: ScrollVelocityMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const boostRef = useRef(0);
  const isHoveredRef = useRef(false);
  const rafRef = useRef<number>(0);

  /* ── Listen on BOTH window scroll AND wheel events on the wrapper ── */
  useEffect(() => {
    let lastY = window.scrollY;

    const onWindowScroll = () => {
      const dy = window.scrollY - lastY;
      lastY = window.scrollY;
      boostRef.current += dy * 1.2;
      boostRef.current = Math.max(-20, Math.min(20, boostRef.current));
    };

    // wheel fires even when the window isn't scrolling (e.g., trackpad)
    const onWheel = (e: WheelEvent) => {
      boostRef.current += e.deltaY * 0.04;
      boostRef.current = Math.max(-20, Math.min(20, boostRef.current));
    };

    window.addEventListener("scroll", onWindowScroll, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => {
      window.removeEventListener("scroll", onWindowScroll);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  /* ── rAF animation loop ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      if (!isHoveredRef.current || !pauseOnHover) {
        const speed = baseVelocity + boostRef.current;
        positionRef.current += speed;

        // Decay boost
        boostRef.current *= 0.9;
        if (Math.abs(boostRef.current) < 0.05) boostRef.current = 0;

        // Seamless wrap (4 copies → 1 segment = 25% of total width)
        const seg = track.scrollWidth / 4;
        if (positionRef.current <= -seg) positionRef.current += seg;
        if (positionRef.current > 0)    positionRef.current -= seg;

        track.style.transform = `translateX(${positionRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [baseVelocity, pauseOnHover]);

  return (
    <div
      ref={wrapperRef}
      className={`overflow-hidden w-full ${className}`}
      onMouseEnter={() => { isHoveredRef.current = true; }}
      onMouseLeave={() => { isHoveredRef.current = false; }}
    >
      <div ref={trackRef} className="flex flex-row flex-nowrap will-change-transform">
        <div className="flex flex-row flex-nowrap shrink-0 gap-3 pr-3">{children}</div>
        <div className="flex flex-row flex-nowrap shrink-0 gap-3 pr-3">{children}</div>
        <div className="flex flex-row flex-nowrap shrink-0 gap-3 pr-3">{children}</div>
        <div className="flex flex-row flex-nowrap shrink-0 gap-3 pr-3">{children}</div>
      </div>
    </div>
  );
}
