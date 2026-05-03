'use client';

const MANDALAS = [
  {
    src:      '/mandala-1.png',
    pos:      'top-[-8%] left-[-8%] w-[52vw] h-[52vw]',
    opacity:  0.12,
    spinAnim: 'mandalaSpinCW 100s linear infinite',
    float:    'mandalaFloat 18s ease-in-out infinite',
  },
  {
    src:      '/mandala-2.png',
    pos:      'bottom-[-10%] right-[-6%] w-[42vw] h-[42vw]',
    opacity:  0.10,
    spinAnim: 'mandalaSpinCCW 130s linear infinite',
    float:    'mandalaFloat 22s ease-in-out infinite',
  },
  {
    src:      '/mandala-3.png',
    pos:      'top-[20%] left-[28%] w-[30vw] h-[30vw]',
    opacity:  0.06,
    spinAnim: 'mandalaSpinCW 85s linear infinite',
    float:    'mandalaFloat 15s ease-in-out infinite',
  },
] as const;

const MandalaBackground = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {MANDALAS.map((m, i) => (
        <div
          key={i}
          className={`absolute will-change-transform mix-blend-multiply ${m.pos}`}
          style={{ opacity: m.opacity }}
        >
          <div className="w-full h-full" style={{ animation: m.float }}>
            <div className="w-full h-full" style={{ animation: m.spinAnim }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={m.src}
                alt=""
                className="w-full h-full object-contain select-none block"
                draggable={false}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MandalaBackground;
