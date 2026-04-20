'use client';

import { useEffect, useRef } from 'react';
import { Cormorant_Garamond } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  ABOUT_EYEBROW,
  ABOUT_HEADLINE,
  ABOUT_SUBHEAD,
  ABOUT_LETTER_HEADER,
  ABOUT_SALUTATION,
  ABOUT_PARAGRAPHS,
  ABOUT_SIGN_OFF,
  ABOUT_FOUNDERS,
  ABOUT_FOUNDERS_ROLE,
} from '../../constants/about';

gsap.registerPlugin(ScrollTrigger);

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

const AboutContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: viewportRef.current,
          start: 'top top',
          end: '+=600',
          scrub: 1,
        },
      });
      tl.to(overlayRef.current, { opacity: 0.7, ease: 'none' }, 0);
      tl.to(
        '.about-header-content',
        { scale: 0.7, opacity: 0, y: -30, ease: 'power2.inOut' },
        0,
      );
      tl.to(letterRef.current, { scale: 1.25, ease: 'power2.inOut' }, 0);
    });

    mm.add('(max-width: 768px)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: viewportRef.current,
          start: 'top top',
          end: '+=400',
          scrub: 1,
        },
      });
      tl.to(overlayRef.current, { opacity: 0.6, ease: 'none' }, 0);
      tl.to(
        '.about-header-content',
        { scale: 0.8, opacity: 0, y: -20, ease: 'linear' },
        0,
      );
      tl.to(letterRef.current, { scale: 1.05, ease: 'power2.inOut' }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&display=swap');

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .letter-paper {
          position: relative;
          background: url('/letter.jpeg') no-repeat center center;
          background-size: 100% 100%;
          padding: 16% 8% 10% 8%;
          animation: fadeInUp 0.9s ease 0.1s both;
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        }

        @media(min-width: 768px) {
          .letter-paper { padding: 14% 12% 12% 14%; }
        }

        .wax-seal {
          position: absolute;
          bottom: 12%;
          right: 12%;
          width: 96px;
          height: 96px;
          background: #5c0a0a;
          background-blend-mode: multiply;
          border-radius: 50%;
          filter: url(#seal-distort) drop-shadow(4px 6px 10px rgba(0,0,0,0.5));
          box-shadow:
            inset -4px -4px 12px rgba(0,0,0,0.8),
            inset 4px 4px 8px rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          transform: rotate(-12deg);
        }

        .wax-seal::after {
          content: 'A';
          font-family: 'serif';
          color: rgba(184, 153, 62, 0.4);
          font-size: 38px;
          font-weight: bold;
          text-shadow: 2px 2px 2px rgba(0,0,0,0.9), -1px -1px 0 rgba(255,255,255,0.05);
          border: 1.5px solid rgba(184, 153, 62, 0.2);
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='2'/%3E%3C/filter%3E%3Ccircle cx='50' cy='50' r='50' filter='url(%23c)' opacity='0.2'/%3E%3C/svg%3E");
        }

        .letter-header {
          font-family: 'sans-serif';
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #7a6a4a;
          margin-bottom: 40px;
          font-weight: 600;
          opacity: 0.8;
          border-bottom: 1px solid rgba(122, 106, 74, 0.15);
          display: inline-block;
          padding-bottom: 4px;
        }
      `}</style>

      <main
        ref={containerRef}
        className='min-h-screen overflow-x-hidden relative'
      >
        <div
          ref={overlayRef}
          className='fixed inset-0 pointer-events-none'
          style={{ background: '#0a0d0a', opacity: 0, zIndex: 0 }}
        />

        <svg className='absolute' style={{ width: 0, height: 0 }}>
          <filter id='seal-distort'>
            <feTurbulence
              type='fractalNoise'
              baseFrequency='0.05'
              numOctaves='5'
              seed='5'
            />
            <feDisplacementMap in='SourceGraphic' scale='15' />
          </filter>
        </svg>

        <div
          ref={viewportRef}
          className='w-full flex flex-col items-center relative z-10'
        >
          <div className='max-w-[1100px] mx-auto px-6 py-24 md:py-36 relative z-10'>
            <div
              className='about-header-content text-center mb-32'
              style={{ transformOrigin: 'center bottom' }}
            >
              <h2 className='text-[0.8rem] tracking-[0.6em] uppercase text-[#4A635A] mb-8 font-bold font-sans'>
                {ABOUT_EYEBROW}
              </h2>
              <h1
                className={`${cormorant.className} uppercase text-[#4d4232] font-bold leading-[0.8] mb-6`}
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  letterSpacing: '-0.04em',
                }}
              >
                {ABOUT_HEADLINE}
              </h1>
              <p
                className={`${cormorant.className} text-[1.2rem] tracking-[0.2em] uppercase text-[#4d4232] opacity-70 italic`}
              >
                {ABOUT_SUBHEAD}
              </p>
            </div>

            <div
              ref={letterRef}
              className='w-full relative z-10'
              style={{ transformOrigin: 'center top' }}
            >
              <div className='letter-paper'>
                <div
                  className='wax-seal wax-seal-bg'
                  title='Ayusurance Guarantee'
                />

                <div className='relative z-10 pl-[36px]'>
                  <div className='letter-header'>{ABOUT_LETTER_HEADER}</div>

                  <div
                    className='text-[#2a2216] leading-relaxed font-medium'
                    style={{
                      fontFamily: 'Caveat, cursive',
                      fontSize: 'clamp(20px, 2.4vw, 26px)',
                    }}
                  >
                    <p
                      className='mb-8 font-semibold text-[#3d3224]'
                      style={{ fontSize: '1.4rem' }}
                    >
                      {ABOUT_SALUTATION}
                    </p>
                    {ABOUT_PARAGRAPHS.map((para, i) => (
                      <p key={i} className='mb-6'>
                        {para}
                      </p>
                    ))}
                    <p className='mb-6'>{ABOUT_SIGN_OFF}</p>
                  </div>

                  <div className='mt-12 '>
                    <p
                      className='text-[#2a2216] font-medium'
                      style={{
                        fontFamily: 'Caveat, cursive',
                        fontSize: 'clamp(24px, 2.8vw, 30px)',
                        lineHeight: 1.2,
                      }}
                    >
                      {ABOUT_FOUNDERS}
                    </p>
                    <div className='w-[180px] h-[1.5px] bg-[rgba(61,50,36,0.2)] my-2.5' />
                    <p className='text-[11px] text-[#7a6a4a] uppercase tracking-[0.2em] font-semibold font-sans'>
                      {ABOUT_FOUNDERS_ROLE}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='h-[35vh]' />
      </main>
    </>
  );
};

export default AboutContainer;
