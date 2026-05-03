import HeroText from './HeroText';

import RishiScene from './RishiScene';
import PalmLeafCard from './PalmLeafCard';
import HeroCTA from './HeroCTA';
import { SHLOKAS } from '../../constants';
import type { HeroRefs } from '../../hooks/useHeroAnimation';

type Props = HeroRefs;

/**
 * Full-screen sticky hero section that drives the cinematic scroll experience.
 * All animation refs come from useHeroAnimation and are threaded to children.
 */
const HeroSection = ({
  textRef, rishiRef, rishiImgRef, finalTextRef,
  shloka1Ref, shloka2Ref, bgOverlayRef,
  doshaRefs, bhutaRefs, cardRefs,
}: Props) => (
  <div className="h-[500vh]">
    <div className="sticky top-0 h-screen overflow-hidden">



      {/* Dark overlay — driven by scroll when Rishi zooms, starts fully transparent */}
      <div
        ref={bgOverlayRef}
        className="absolute inset-0 z-[8] pointer-events-none"
        style={{ background: '#2D5038', opacity: 0, transition: 'none' }}
      />

      {/* Ambient orb — right */}
      <div
        className="absolute z-[4] pointer-events-none select-none"
        style={{
          top:  'calc(76px + (100vh - 76px) / 2)',
          left: '72%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(420px, 52vw, 780px)',
          height: 'clamp(420px, 52vw, 780px)',
          borderRadius: '50%',
          background: 'none',
          animation: 'mandalaFloat 18s ease-in-out infinite',
        }}
      />

      {/* Ambient orb — left */}
      <div
        className="absolute z-[3] pointer-events-none select-none"
        style={{
          top:  'calc(76px + (100vh - 76px) / 2)',
          left: '15%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(380px, 45vw, 680px)',
          height: 'clamp(380px, 45vw, 680px)',
          borderRadius: '50%',
          background: 'none',
          animation: 'mandalaFloat 22s ease-in-out infinite',
        }}
      />

      {/* Main content row */}
      <div className="relative z-10 h-full flex flex-col md:flex-row items-center pt-[76px] px-6 md:pl-[12vw] md:pr-8 gap-8 md:gap-[4vw]">
        <HeroText textRef={textRef} />
        <RishiScene
          rishiRef={rishiRef}
          rishiImgRef={rishiImgRef}
          doshaRefs={doshaRefs}
          bhutaRefs={bhutaRefs}
          cardRefs={cardRefs}
        />
      </div>

      {/* Side shloka palm leaves */}
      <PalmLeafCard shloka={SHLOKAS[0]} side="left"  divRef={shloka1Ref} />
      <PalmLeafCard shloka={SHLOKAS[1]} side="right" divRef={shloka2Ref} />

      {/* Scroll-triggered CTA overlay */}
      <HeroCTA divRef={finalTextRef} />
    </div>
  </div>
);

export default HeroSection;
