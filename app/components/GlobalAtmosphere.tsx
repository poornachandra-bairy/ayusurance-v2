'use client';

import React from 'react';
import MandalaBackground from './MandalaBackground';

const GlobalAtmosphere = () => {
  return (
    <>
      <div
        className="fixed inset-0 z-[-1]"
        style={{
          background: [
            'radial-gradient(ellipse 65% 55% at -8% 2%,  rgba(230,200,140,0.75) 0%, transparent 65%)',
            'radial-gradient(ellipse 85% 52% at 50% 0%,  rgba(245,232,196,0.92) 0%, transparent 58%)',
            'radial-gradient(ellipse 78% 72% at 68% 52%, rgba(155,198,170,0.72) 0%, rgba(155,198,170,0) 78%)',
            'radial-gradient(ellipse 65% 50% at 58% 80%, rgba(138,182,158,0.55) 0%, transparent 80%)',
            'radial-gradient(ellipse 55% 42% at 88% 88%, rgba(118,168,145,0.48) 0%, transparent 78%)',
            'radial-gradient(ellipse 50% 38% at 5%  90%, rgba(145,185,162,0.42) 0%, transparent 75%)',
            'linear-gradient(158deg, #f4ead0 0%, #eee0bc 18%, #dce8d0 40%, #c4d8c4 58%, #aecebc 76%, #9cc0b0 90%, #8ab4a8 100%)',
          ].join(', '),
        }}
      />

      <svg
        className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
        aria-hidden="true"
        style={{ opacity: 0.13, mixBlendMode: 'multiply' }}
      >
        <filter id="global-wc-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.62 0.68"
            numOctaves="4"
            seed="5"
            stitchTiles="stitch"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.68  0 0 0 0 0.60  0 0 0 0 0.48  0 0 0 1 0"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-wc-grain)" />
      </svg>

      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <MandalaBackground />
      </div>
    </>
  );
};

export default GlobalAtmosphere;
