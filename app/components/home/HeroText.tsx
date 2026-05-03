import Link from 'next/link';
import {
  HOME_HERO_HEADLINE_LINE1,
  HOME_HERO_HEADLINE_LINE2,
  HOME_HERO_BODY,
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
      className="font-display text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
      style={{ color: '#F0EAE0' }}
    >
      {HOME_HERO_HEADLINE_LINE1}
      <br />
      {HOME_HERO_HEADLINE_LINE2}
    </h1>

    <p
      className="font-sans text-lg md:text-xl max-w-[44ch] mb-10 leading-relaxed"
      style={{ color: 'rgba(240,234,224,0.75)' }}
    >
      {HOME_HERO_BODY}
    </p>

    <div className="flex gap-3 flex-wrap items-center">
      <Link href="/contact" className="btn-ayurveda no-underline">
        Begin Your Wellness Journey
      </Link>

      <Link
        href="/offerings"
        className="no-underline inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm md:text-[0.9375rem] font-medium transition-all duration-200"
        style={{
          background: '#2D5038', boxShadow: '-4px -4px 10px #6A9870, 4px 4px 10px #1E3828', color: '#F0EAE0',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLAnchorElement).style.boxShadow = '-12px -12px 28px #6A9870, 12px 12px 28px #1E3828';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLAnchorElement).style.background = '#4A7055';
        }}
      >
        Explore Offerings
      </Link>
    </div>
  </div>
);

export default HeroText;
