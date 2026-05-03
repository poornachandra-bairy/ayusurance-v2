'use client';

/**
 * NeuBackground — Floating botanical SVG elements for a lively neumorphic
 * Ayurvedic background. Pure decorative; pointer-events none.
 * Replaces mandala art. Gentle drifting animations.
 */

const ELEMENTS = [
  // Large leaf — top left
  {
    style: { top: '-4%', left: '-3%', width: '28vw', height: '28vw', opacity: 0.07 },
    anim: 'mandalaFloat 22s ease-in-out infinite',
    path: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 10 C60 10, 10 50, 10 100 C10 150, 60 190, 100 190 C140 190, 190 150, 190 100 C190 50, 140 10, 100 10Z" fill="none" stroke="#8a7060" stroke-width="2.5"/>
      <path d="M100 10 Q140 60 100 190" fill="none" stroke="#8a7060" stroke-width="2"/>
      <path d="M100 10 Q60 60 100 190" fill="none" stroke="#8a7060" stroke-width="1.5" opacity="0.6"/>
      <path d="M55 55 Q100 80 145 145" fill="none" stroke="#8a7060" stroke-width="1" opacity="0.5"/>
      <path d="M40 130 Q80 110 160 70" fill="none" stroke="#8a7060" stroke-width="1" opacity="0.5"/>
    </svg>`,
  },
  // Lotus — centre right
  {
    style: { top: '30%', right: '-5%', width: '22vw', height: '22vw', opacity: 0.065 },
    anim: 'mandalaSpinCW 120s linear infinite',
    path: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="100" cy="110" rx="18" ry="28" fill="none" stroke="#8a7060" stroke-width="2"/>
      <ellipse cx="70" cy="115" rx="15" ry="26" fill="none" stroke="#8a7060" stroke-width="2" transform="rotate(-20 70 115)"/>
      <ellipse cx="130" cy="115" rx="15" ry="26" fill="none" stroke="#8a7060" stroke-width="2" transform="rotate(20 130 115)"/>
      <ellipse cx="45" cy="120" rx="12" ry="22" fill="none" stroke="#8a7060" stroke-width="1.5" transform="rotate(-40 45 120)"/>
      <ellipse cx="155" cy="120" rx="12" ry="22" fill="none" stroke="#8a7060" stroke-width="1.5" transform="rotate(40 155 120)"/>
      <ellipse cx="28" cy="130" rx="10" ry="18" fill="none" stroke="#8a7060" stroke-width="1.2" transform="rotate(-60 28 130)"/>
      <ellipse cx="172" cy="130" rx="10" ry="18" fill="none" stroke="#8a7060" stroke-width="1.2" transform="rotate(60 172 130)"/>
      <path d="M30 148 Q100 148, 170 148" fill="none" stroke="#8a7060" stroke-width="2.5"/>
      <path d="M85 148 Q90 170 100 178 Q110 170 115 148" fill="none" stroke="#8a7060" stroke-width="1.5"/>
    </svg>`,
  },
  // Branch with leaves — bottom left
  {
    style: { bottom: '0%', left: '-2%', width: '30vw', height: '30vw', opacity: 0.07 },
    anim: 'mandalaFloat 28s ease-in-out infinite',
    path: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path d="M30 190 Q70 140 100 100 Q130 60 160 20" fill="none" stroke="#8a7060" stroke-width="2.5"/>
      <path d="M80 130 Q60 110 40 120" fill="none" stroke="#8a7060" stroke-width="1.5"/>
      <path d="M80 130 Q95 108 75 90" fill="none" stroke="#8a7060" stroke-width="1.5"/>
      <ellipse cx="35" cy="118" rx="12" ry="7" fill="none" stroke="#8a7060" stroke-width="1.2" transform="rotate(-30 35 118)"/>
      <ellipse cx="72" cy="86" rx="12" ry="7" fill="none" stroke="#8a7060" stroke-width="1.2" transform="rotate(-60 72 86)"/>
      <path d="M120 80 Q110 60 90 65" fill="none" stroke="#8a7060" stroke-width="1.5"/>
      <path d="M120 80 Q140 62 128 48" fill="none" stroke="#8a7060" stroke-width="1.5"/>
      <ellipse cx="88" cy="63" rx="12" ry="7" fill="none" stroke="#8a7060" stroke-width="1.2" transform="rotate(-50 88 63)"/>
      <ellipse cx="130" cy="46" rx="12" ry="7" fill="none" stroke="#8a7060" stroke-width="1.2" transform="rotate(20 130 46)"/>
    </svg>`,
  },
  // Small geometric herb/leaf — top right
  {
    style: { top: '5%', right: '4%', width: '14vw', height: '14vw', opacity: 0.08 },
    anim: 'mandalaFloat 16s ease-in-out infinite',
    path: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <path d="M60 10 C45 30, 10 40, 20 70 C30 95, 60 110, 60 110 C60 110, 90 95, 100 70 C110 40, 75 30, 60 10Z" fill="none" stroke="#8a7060" stroke-width="2.5"/>
      <path d="M60 10 L60 110" fill="none" stroke="#8a7060" stroke-width="1.5"/>
      <path d="M40 50 Q60 65 80 50" fill="none" stroke="#8a7060" stroke-width="1" opacity="0.7"/>
      <path d="M32 72 Q60 85 88 72" fill="none" stroke="#8a7060" stroke-width="1" opacity="0.7"/>
    </svg>`,
  },
  // Circular ripple — centre
  {
    style: { top: '40%', left: '35%', width: '18vw', height: '18vw', opacity: 0.04 },
    anim: 'mandalaSpinCCW 90s linear infinite',
    path: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="90" fill="none" stroke="#8a7060" stroke-width="1.5"/>
      <circle cx="100" cy="100" r="72" fill="none" stroke="#8a7060" stroke-width="1.2"/>
      <circle cx="100" cy="100" r="54" fill="none" stroke="#8a7060" stroke-width="1"/>
      <circle cx="100" cy="100" r="36" fill="none" stroke="#8a7060" stroke-width="0.8"/>
      <circle cx="100" cy="100" r="18" fill="none" stroke="#8a7060" stroke-width="0.6"/>
      ${Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const x1 = 100 + 18 * Math.cos(angle);
        const y1 = 100 + 18 * Math.sin(angle);
        const x2 = 100 + 90 * Math.cos(angle);
        const y2 = 100 + 90 * Math.sin(angle);
        return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#8a7060" stroke-width="0.7" opacity="0.5"/>`;
      }).join('')}
    </svg>`,
  },
];

const NeuBackground = () => (
  <div
    className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
    aria-hidden="true"
  >
    {ELEMENTS.map((el, i) => (
      <div
        key={i}
        className="absolute will-change-transform"
        style={{ ...el.style }}
      >
        <div
          className="w-full h-full"
          style={{ animation: el.anim }}
          dangerouslySetInnerHTML={{ __html: el.path }}
        />
      </div>
    ))}
  </div>
);

export default NeuBackground;
