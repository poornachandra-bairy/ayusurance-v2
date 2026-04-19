import { ShlokaData } from '../../constants';

interface Props {
  shloka: ShlokaData;
  side:   'left' | 'right';
  divRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Authentic palm-leaf manuscript panel.
 * — Warm golden-tan base (dried palm frond palette)
 * — Multi-layer texture: horizontal fibers, age patina, central midrib, edge shadow
 * — Pointed corners on outer edge, rounded on inner edge (classic talipot shape)
 * — Significantly larger for visibility
 */
const PalmLeafCard = ({ shloka, side, divRef }: Props) => {
  const isLeft = side === 'left';

  // Outer shape: asymmetric rounded rectangle mimicking a palm frond
  const borderRadius = isLeft
    ? '6px 64px 6px 64px / 8px 72px 8px 72px'
    : '64px 6px 64px 6px / 72px 8px 72px 8px';

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      className="absolute top-1/2 z-[8] will-change-[transform,opacity] -translate-y-1/2"
      style={{
        [isLeft ? 'left' : 'right']: '3vw',
        width:     'clamp(300px, 26vw, 420px)',
        opacity:   0,
        transform: `translateY(-50%) translateX(${isLeft ? '-60px' : '60px'})`,
      }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius,
          // ── Layered background: lighting → age spots → fiber grain → base ──
          background: [
            // Surface gloss / top-light reflection
            'linear-gradient(165deg, rgba(255,250,220,0.25) 0%, transparent 38%)',
            // Age patina — darker irregular patches
            'radial-gradient(ellipse 40% 25% at 22% 30%, rgba(80,60,20,0.15) 0%, transparent 100%)',
            'radial-gradient(ellipse 30% 20% at 78% 68%, rgba(70,55,15,0.12) 0%, transparent 100%)',
            'radial-gradient(ellipse 20% 15% at 55% 82%, rgba(60,45,10,0.10) 0%, transparent 100%)',
            // Edge vignette
            'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(60,45,15,0.25) 100%)',
            // Main authentic dried palm leaf base (muted earthy beige/greenish-tan)
            isLeft
              ? 'linear-gradient(160deg, #d3c49e 0%, #b8a67c 22%, #c5b48b 44%, #ad9a6e 66%, #baaa80 88%, #a08d60 100%)'
              : 'linear-gradient(200deg, #d3c49e 0%, #b8a67c 22%, #c5b48b 44%, #ad9a6e 66%, #baaa80 88%, #a08d60 100%)',
          ].join(', '),
          boxShadow: [
            '0 14px 50px rgba(60,45,10,0.40)',
            '0 3px 12px rgba(80,60,15,0.25)',
            'inset 0 1px 0 rgba(230,220,170,0.30)',
            'inset 0 -2px 8px rgba(60,45,10,0.25)',
          ].join(', '),
          padding: '36px 32px 30px',
        }}
      >
        {/* ── Horizontal fiber texture (palm frond grain runs along leaf's length) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: [
              // Primary fiber lines
              'repeating-linear-gradient(90deg, transparent 0px, transparent 7px, rgba(80,60,15,0.07) 7px, rgba(80,60,15,0.07) 8px)',
              // Secondary finer fibers between
              'repeating-linear-gradient(90deg, transparent 0px, transparent 3px, rgba(60,45,10,0.04) 3px, rgba(60,45,10,0.04) 3.5px)',
            ].join(', '),
          }}
        />

        {/* ── Diagonal fiber sheen (gives 3-D woven texture) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(175deg, transparent 0px, transparent 12px, rgba(230,220,170,0.04) 12px, rgba(230,220,170,0.04) 13px)',
          }}
        />

        {/* ── Central midrib — the spine running lengthwise through the leaf ── */}
        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: '2px',
            background: 'linear-gradient(180deg, rgba(80,60,15,0.0) 0%, rgba(80,60,15,0.20) 20%, rgba(80,60,15,0.26) 50%, rgba(80,60,15,0.20) 80%, rgba(80,60,15,0.0) 100%)',
          }}
        />

        {/* ── Age spots / natural discoloration ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: [
              'radial-gradient(circle 4px at 18% 22%, rgba(80,60,15,0.16) 0%, transparent 100%)',
              'radial-gradient(circle 3px at 82% 15%, rgba(70,50,10,0.12) 0%, transparent 100%)',
              'radial-gradient(circle 5px at 65% 78%, rgba(90,65,15,0.14) 0%, transparent 100%)',
              'radial-gradient(circle 3px at 30% 85%, rgba(75,55,10,0.10) 0%, transparent 100%)',
              'radial-gradient(circle 4px at 88% 55%, rgba(80,60,10,0.13) 0%, transparent 100%)',
            ].join(', '),
          }}
        />

        {/* ── Shloka text — inscribed appearance (dark brown on earthy tan) ── */}
        <p
          className="relative m-0 text-center leading-[2.3] tracking-[0.04em]"
          style={{
            fontSize:   'clamp(0.90rem, 1.6vw, 1.15rem)',
            fontFamily: "'Noto Serif Devanagari', serif",
            color:      '#332508',
            textShadow: '0 1px 0 rgba(220,210,160,0.40)',
          }}
        >
          {shloka.text}<br />{shloka.line2}
        </p>

        {/* ── Separator — carved line between text and attribution ── */}
        <div
          className="relative mx-auto my-3"
          style={{
            height:     '1px',
            width:      '60%',
            background: 'linear-gradient(90deg, transparent, rgba(80,55,10,0.40), transparent)',
          }}
        />

        {/* ── Attribution ── */}
        <span
          className="relative block text-center font-sans tracking-[0.28em] uppercase"
          style={{
            fontSize:   '0.60rem',
            color:      'rgba(60,42,8,0.70)',
            fontWeight: 500,
          }}
        >
          {shloka.attr}
        </span>
      </div>
    </div>
  );
};

export default PalmLeafCard;
