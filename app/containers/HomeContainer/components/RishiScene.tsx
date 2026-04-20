import Image from 'next/image';
import { DOSHAS, BHUTAS, CARD_COLORS, CARD_ACCENTS, CARD_CONTENT } from '../../../lib/tokens';

interface Props {
  rishiRef:    React.RefObject<HTMLDivElement | null>;
  rishiImgRef: React.RefObject<HTMLDivElement | null>;
  doshaRefs:   React.MutableRefObject<(HTMLDivElement | null)[]>;
  bhutaRefs:   React.MutableRefObject<(HTMLDivElement | null)[]>;
  cardRefs:    React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const RishiScene = ({ rishiRef, rishiImgRef, doshaRefs, bhutaRefs, cardRefs }: Props) => (
  <div className="w-full md:basis-1/2 shrink-0 grow-0 h-auto md:h-full flex items-center justify-center md:justify-end md:pr-12 relative mt-8 md:mt-0">

    <div ref={rishiRef} className="opacity-0 relative flex items-center justify-center">

      <div ref={rishiImgRef} className="origin-center will-change-[transform,opacity] relative">
        <Image
          src="/rishi.png"
          alt="Rishi"
          width={630}
          height={810}
          priority
          className="object-contain select-none w-auto block"
          style={{ maxHeight: '60vh' }}
        />
      </div>

      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        {DOSHAS.map((d, i) => (
          <div
            key={d.id}
            ref={el => { doshaRefs.current[i] = el; }}
            className="opacity-0 flex flex-col items-center gap-1"
          >
            <Image
              src={d.src}
              alt={d.alt}
              width={70}
              height={70}
              className="object-contain select-none max-h-[8vh] w-auto"
              loading="lazy"
            />
            <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#3a2e1a]/70 leading-none">
              {d.alt}
            </span>
          </div>
        ))}
      </div>

      {BHUTAS.map((b, i) => (
        <div
          key={b.id}
          ref={el => { bhutaRefs.current[i] = el; }}
          className="absolute top-[45%] left-1/2 opacity-0 will-change-[transform,opacity] flex flex-col items-center gap-1"
          style={{ transform: `translate(calc(-50% + 0px), calc(-50% + ${b.startDy}px))` }}
        >
          <Image
            src={b.src}
            alt={b.alt}
            width={85}
            height={85}
            className="object-contain select-none max-h-[10vh] w-auto"
            loading="lazy"
          />
          <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#3a2e1a]/70 leading-none">
            {b.alt}
          </span>
        </div>
      ))}

      
      {BHUTAS.map((b, i) => {
        const card   = CARD_CONTENT[i];
        const accent = CARD_ACCENTS[b.id];
        return (
          <div
            key={`card-${b.id}`}
            ref={el => { cardRefs.current[i] = el; }}
            className={`absolute top-[52%] left-1/2 w-[280px] h-[185px] rounded-[18px] opacity-0 flex flex-col gap-1.5 select-none overflow-hidden will-change-[transform,opacity] ${CARD_COLORS[b.id]}`}
            style={{
              boxShadow:  '0 12px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.10)',
              padding:    '16px 18px',
            }}
          >
            <h3 className="m-0 text-[17px] font-display font-semibold text-white leading-[1.25] tracking-[0.04em]">
              {card.title}
            </h3>
            <div
              className="h-px shrink-0 card-line"
              style={{ color: accent }}
            />
            <p className="m-0 text-[13.5px] text-white/90 leading-[1.65] tracking-[0.008em] line-clamp-3">
              {card.desc}
            </p>
          </div>
        );
      })}
    </div>
  </div>
);

export default RishiScene;
