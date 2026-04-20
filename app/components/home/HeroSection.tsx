import Image from 'next/image';
import HeroText from './HeroText';
import RishiScene from './RishiScene';
import PalmLeafCard from './PalmLeafCard';
import HeroCTA from './HeroCTA';
import { SHLOKAS } from '../../constants';
import type { HeroRefs } from '../../hooks/useHeroAnimation';

type Props = HeroRefs;


const HeroSection = ({
  textRef, rishiRef, rishiImgRef, finalTextRef,
  shloka1Ref, shloka2Ref, bgOverlayRef,
  doshaRefs, bhutaRefs, cardRefs,
}: Props) => (
  <div className="h-[500vh]">
    <div className="sticky top-0 h-screen overflow-hidden">



      <div
        ref={bgOverlayRef}
        className="absolute inset-0 z-[8] pointer-events-none hero-overlay"
        style={{ opacity: 0, transition: 'none' }}
      />

      <div
        className="absolute z-[5] pointer-events-none select-none"
        style={{
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

      
      <PalmLeafCard shloka={SHLOKAS[0]} side="left"  divRef={shloka1Ref} />
      <PalmLeafCard shloka={SHLOKAS[1]} side="right" divRef={shloka2Ref} />

      
      <HeroCTA divRef={finalTextRef} />
    </div>
  </div>
);

export default HeroSection;
