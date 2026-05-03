import React from "react";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  [key: string]: any;
}

export function Marquee({
  className = "",
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={`flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)] ${
        vertical ? "flex-col" : "flex-row"
      } ${pauseOnHover ? "pause-on-hover" : ""} ${className}`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap))); }
        }
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap))); }
        }
        .animate-marquee { animation: marquee var(--duration) linear infinite; }
        .animate-marquee-vertical { animation: marquee-vertical var(--duration) linear infinite; }
        .pause-on-hover:hover .animate-marquee, .pause-on-hover:hover .animate-marquee-vertical { animation-play-state: paused !important; }
        .reverse-marquee { animation-direction: reverse !important; }
      `}} />
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={`flex shrink-0 justify-around [gap:var(--gap)] ${
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row"
            } ${reverse ? "reverse-marquee" : ""}`}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
