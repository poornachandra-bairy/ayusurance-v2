'use client';

import React from 'react';
import MandalaBackground from './MandalaBackground';

const GlobalAtmosphere = () => {
  return (
    <>
      <div
        className="fixed inset-0 z-[-1] atmosphere-bg"
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
