import {
  HOME_HERO_HEADLINE_LINE1,
  HOME_HERO_HEADLINE_LINE2,
  HOME_HERO_BODY,
  HOME_HERO_CTA_PRIMARY,
  HOME_HERO_CTA_SECONDARY,
} from '../../constants';

interface Props {
  textRef: React.RefObject<HTMLDivElement | null>;
}

const HeroText = ({ textRef }: Props) => (
  <div
    ref={textRef}
    className="flex-1 min-w-0 pr-0 md:pr-8 flex flex-col items-center md:items-start text-center md:text-left justify-center opacity-0"
  >
    <h1
      className="font-sanskrit font-normal leading-[1.12] tracking-[0.03em] mb-6 text-gradient"
      style={{
        fontSize: 'clamp(2.2rem, 3.8vw, 5rem)',
      }}
    >
      {HOME_HERO_HEADLINE_LINE1}
      <br />
      {HOME_HERO_HEADLINE_LINE2}
    </h1>

    <p className="text-[0.975rem] leading-[1.85] text-text-700 max-w-[44ch] mb-10 tracking-[0.01em] border-l-2 border-[rgba(42,104,130,0.5)] pl-4">
      {HOME_HERO_BODY}
    </p>

    <div className="flex gap-4 flex-wrap">
      <button className="inline-block px-7 py-3 rounded-xl text-[0.9375rem] font-medium text-white btn-gradient shadow-[0_10px_28px_rgba(168,132,62,0.22)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(168,132,62,0.28)]">
        {HOME_HERO_CTA_PRIMARY}
      </button>
      <button className="inline-block px-7 py-3 rounded-xl text-[0.9375rem] font-medium text-forest-deep bg-white/45 border border-[rgba(168,132,62,0.24)] backdrop-blur-[10px] transition-[background,border-color,color] duration-200 hover:bg-white/70 hover:border-[rgba(168,132,62,0.4)] hover:text-gold-deep">
        {HOME_HERO_CTA_SECONDARY}
      </button>
    </div>
  </div>
);

export default HeroText;
