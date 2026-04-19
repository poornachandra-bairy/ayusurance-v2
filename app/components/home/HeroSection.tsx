import Image from 'next/image';
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
        style={{ background: 'radial-gradient(ellipse 80% 90% at 60% 55%, rgba(10,18,12,0.9) 0%, rgba(20,30,20,0.7) 50%, rgba(10,18,12,0.95) 100%)', opacity: 0, transition: 'none' }}
      />

      {/*
        Mandala behind the rishi — centred in the right half of the screen
        where the rishi lives. Fixed z-index below rishi (z-[5]) but above bg (z-0).
        opacity-30 so it shows as a subtle watermark.
      */}
      <div
        className="absolute z-[5] pointer-events-none select-none"
        style={{
          // Right half centre: left = 50% + half of right-half = 75%
          // Vertically centering accounting for navbar (76px)
          top:  'calc(76px + (100vh - 76px) / 2)',
          left: '74%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(340px, 44vw, 640px)',
          opacity: 0.18,
          animation: 'mandalaSpinCW 120s linear infinite',
        }}
      >
        <Image
          src="/mandala art 1.png"
          alt=""
          aria-hidden
          width={640}
          height={640}
          className="w-full h-auto"
          loading="eager"
        />
      </div>

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
