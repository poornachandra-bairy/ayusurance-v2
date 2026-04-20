import { ShlokaData } from '../../../constants';

interface Props {
  shloka: ShlokaData;
  side:   'left' | 'right';
  divRef: React.RefObject<HTMLDivElement | null>;
}


const PalmLeafCard = ({ shloka, side, divRef }: Props) => {
  const isLeft = side === 'left';

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
        className="relative overflow-hidden palm-leaf-bg"
        style={{
          borderRadius,
          boxShadow: [
            '0 14px 50px rgba(60,45,10,0.40)',
            '0 3px 12px rgba(80,60,15,0.25)',
            'inset 0 1px 0 rgba(230,220,170,0.30)',
            'inset 0 -2px 8px rgba(60,45,10,0.25)',
          ].join(', '),
          padding: '36px 32px 30px',
        }}
      >
        <div className="absolute inset-0 pointer-events-none palm-leaf-fiber-h" />

        <div className="absolute inset-0 pointer-events-none palm-leaf-fiber-diag" />

        <div
          className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 pointer-events-none palm-leaf-midrib"
          style={{ width: '2px' }}
        />

        <div className="absolute inset-0 pointer-events-none palm-leaf-spots" />

        
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

        <div
          className="relative mx-auto my-3 palm-leaf-separator"
          style={{
            height:     '1px',
            width:      '60%',
          }}
        />

        
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
