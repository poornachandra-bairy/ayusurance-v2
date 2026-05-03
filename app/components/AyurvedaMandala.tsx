'use client';

/**
 * AyurvedaMandala — 3 slow-rotating mandala art overlays.
 * Drop this into any page layout to render the full atmospheric background.
 * Pointer-events and aria hidden: purely decorative.
 */
const MANDALAS = [
  {
    src:     '/mandala-1.png',
    style:   { top: '-8%', left: '-8%', width: '52vw', height: '52vw' },
    opacity: 0.05,
    spin:    'mandalaSpinCW 100s linear infinite',
    float:   'mandalaFloat 18s ease-in-out infinite',
  },
  {
    src:     '/mandala-2.png',
    style:   { bottom: '-10%', right: '-6%', width: '42vw', height: '42vw' },
    opacity: 0.035,
    spin:    'mandalaSpinCCW 130s linear infinite',
    float:   'mandalaFloat 22s ease-in-out infinite',
  },
  {
    src:     '/mandala-3.png',
    style:   { top: '30%', left: '30%', width: '28vw', height: '28vw' },
    opacity: 0.018,
    spin:    'mandalaSpinCW 85s linear infinite',
    float:   'mandalaFloat 15s ease-in-out infinite',
  },
] as const;

const AyurvedaMandala = () => (
  <div
    className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none"
    aria-hidden="true"
  >
    {MANDALAS.map((m, i) => (
      <div
        key={i}
        className="absolute mix-blend-multiply will-change-transform"
        style={{ ...m.style, opacity: m.opacity }}
      >
        <div className="w-full h-full" style={{ animation: m.float }}>
          <div className="w-full h-full" style={{ animation: m.spin }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={m.src}
              alt=""
              className="w-full h-full object-contain block"
              draggable={false}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default AyurvedaMandala;
