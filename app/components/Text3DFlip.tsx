'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useIntersection } from 'react-use';

interface Text3DFlipProps {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: "top" | "bottom" | "left" | "right";
  staggerDuration?: number;
  staggerFrom?: "center" | "start" | "end" | "edges";
}

export default function Text3DFlip({ 
  children,
  className = "",
  rotateDirection = "top",
  staggerDuration = 0.03,
  staggerFrom = "start",
  ...props
}: Text3DFlipProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const intersection = useIntersection(containerRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setHasTriggered(true);
    }
  }, [intersection]);

  const chars = children.split("");
  const totalChars = chars.length;

  return (
    <span ref={containerRef} className={`inline-block perspective-[1000px] ${className}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flip-in-3d-top {
          0% { transform: rotateX(-90deg); opacity: 0; }
          100% { transform: rotateX(0deg); opacity: 1; }
        }
        .animate-flip-3d {
          transform-style: preserve-3d;
          transform-origin: top center;
          animation: flip-in-3d-top 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
          display: inline-block;
        }
        .opacity-0-hidden-flip {
          opacity: 0;
          transform: rotateX(-90deg);
          transform-origin: top center;
          display: inline-block;
        }
      `}} />
      {chars.map((char, i) => {
        let delay = i * staggerDuration;
        
        if (staggerFrom === "center") {
          const center = totalChars / 2;
          const dist = Math.abs(i - center);
          delay = dist * staggerDuration;
        } else if (staggerFrom === "end") {
          delay = (totalChars - i) * staggerDuration;
        } else if (staggerFrom === "edges") {
          const center = totalChars / 2;
          const dist = Math.abs(i - center);
          delay = (center - dist) * staggerDuration;
        }

        return (
          <span 
            key={i} 
            className={hasTriggered ? "animate-flip-3d" : "opacity-0-hidden-flip"}
            style={{ 
              animationDelay: hasTriggered ? `${delay}s` : "0s",
              whiteSpace: char === " " ? "pre" : "normal",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}
