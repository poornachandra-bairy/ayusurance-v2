import Link from 'next/link';
import { HOME_FINAL_HEADING, HOME_FINAL_BODY } from '../../constants';

interface Props {
  divRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * HeroCTA — Final scroll-trigger CTA without a card wrapper behind the text.
 * Just the headline, body, and button floating on the dark backdrop.
 */
const HeroCTA = ({ divRef }: Props) => (
  <div
    ref={divRef}
    className="absolute top-1/2 left-1/2 z-10 text-center w-full max-w-[560px] pointer-events-auto flex flex-col items-center gap-6 opacity-0 will-change-[transform,opacity]"
    style={{ transform: 'translate(-50%, -50%)' }}
  >
    <h2
      className="m-0 font-display font-semibold leading-[1.15] tracking-[-0.01em]"
      style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: '#F0EAE0', textShadow: '0 4px 20px rgba(10,22,14,0.80)' }}
    >
      {HOME_FINAL_HEADING}
    </h2>

    <p
      className="m-0 font-sans text-[1rem] leading-[1.75]"
      style={{ color: 'rgba(240,234,224,0.75)', maxWidth: '38ch', textShadow: '0 2px 12px rgba(10,22,14,0.70)' }}
    >
      {HOME_FINAL_BODY}
    </p>

    <Link href="/contact" className="btn-ayurveda no-underline mt-2">
      Book a Consultation
    </Link>
  </div>
);

export default HeroCTA;
