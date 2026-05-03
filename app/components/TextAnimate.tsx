'use client';

import React, { useRef, useState, useEffect, RefObject } from 'react';
import { useIntersection } from 'react-use';

export function TextAnimate({ 
  children, 
  animation = "blurInUp", 
  by = "character", 
  once = true 
}: { 
  children: string;
  animation?: "blurInUp" | string;
  by?: "character" | "word";
  once?: boolean;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const intersection = useIntersection(containerRef as RefObject<HTMLElement>, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2, // Trigger when 20% visible
  });

  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setHasTriggered(true);
    } else if (!once) {
      setHasTriggered(false); // reset if repeating
    }
  }, [intersection, once]);

  const tokens = by === "word" ? children.split(" ") : children.split("");
  
  return (
    <span ref={containerRef} className="inline-block relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes text-blur-in-up {
          0% { filter: blur(8px); transform: translateY(12px); opacity: 0; }
          100% { filter: blur(0px); transform: translateY(0); opacity: 1; }
        }
        .animate-blurInUp {
          animation: text-blur-in-up 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          opacity: 0;
          display: inline-block;
        }
        .opacity-0-hidden {
          opacity: 0;
          display: inline-block;
          transform: translateY(12px);
        }
      `}} />
      {tokens.map((token, i) => (
        <span 
          key={i} 
          className={hasTriggered ? "animate-blurInUp" : "opacity-0-hidden"}
          style={{ 
            animationDelay: hasTriggered ? `${i * (by === "word" ? 0.08 : 0.02)}s` : "0s",
            whiteSpace: token === " " && by === "character" ? "pre" : "normal",
            marginRight: by === "word" && i < tokens.length - 1 ? "0.25em" : "0"
          }}
        >
          {token === " " && by === "character" ? " " : token}
        </span>
      ))}
    </span>
  );
}
