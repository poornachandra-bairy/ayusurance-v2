'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { CARD_CONTENT } from '../../lib/tokens';
import { Playfair_Display, Caveat, Cormorant_Garamond } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import {
  OFFERINGS_HEADLINE,
  OFFERINGS_SUBHEAD,
  OFFERINGS_SCROLL_LABEL,
  OFFERINGS_SCROLL_END,
} from '../../constants/offerings';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const caveat = Caveat({ subsets: ['latin'] });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], style: ['normal', 'italic'] });

gsap.registerPlugin(ScrollTrigger);

const OfferingsContainer = () => {
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let mm = gsap.matchMedia();

    mm.add('(min-width: 769px)', () => {
      const sections = gsap.utils.toArray('.manuscript-item') as HTMLElement[];

      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: galleryWrapperRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${sections.length * 1500}`,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
            if (progressTextRef.current) {
              progressTextRef.current.innerText =
                self.progress > 0.98 ? OFFERINGS_SCROLL_END : OFFERINGS_SCROLL_LABEL;
            }
          },
        },
      });

      sections.forEach((el, index) => {
        scrollTween.to({}, { duration: 0.6 });
        if (index < sections.length - 1) {
          scrollTween.to(galleryContentRef.current, {
            x: () => -((index + 1) * window.innerWidth),
            ease: 'power1.inOut',
            duration: 1,
          });
        }
      });

      sections.forEach((el, index) => {
        const heading = el.querySelector('.parallax-heading') as HTMLElement;
        const imageBlock = el.querySelector('.manuscript-image-block') as HTMLElement;
        const isOdd = index % 2 !== 0;

        gsap.fromTo(
          imageBlock,
          { x: 150, y: 40, rotation: isOdd ? 4 : -4 },
          {
            x: -150, y: -10, rotation: isOdd ? -2 : 2, ease: 'none',
            scrollTrigger: { trigger: el, containerAnimation: scrollTween, start: 'left right', end: 'right left', scrub: true },
          },
        );

        gsap.fromTo(
          heading,
          { x: 450 },
          {
            x: -450, ease: 'none',
            scrollTrigger: { trigger: el, containerAnimation: scrollTween, start: 'left right', end: 'right left', scrub: true },
          },
        );
      });
    });

    mm.add('(max-width: 768px)', () => {
      const sections = gsap.utils.toArray('.manuscript-item') as HTMLElement[];
      sections.forEach((el) => {
        const imageBlock = el.querySelector('.manuscript-image-block') as HTMLElement;
        const heading = el.querySelector('.parallax-heading') as HTMLElement;

        gsap.from(imageBlock, {
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
        gsap.from(heading, {
          y: 40, opacity: 0, duration: 1, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <main className="text-[#1A1A1A] relative overflow-x-hidden w-screen">
        <section className="h-screen flex flex-col justify-center items-center px-6 text-center pt-20 md:pt-0">
          <h1
            className={`${cormorant.className} leading-[0.85] font-normal`}
            style={{ fontSize: 'clamp(60px, 10vw, 150px)', letterSpacing: '-0.02em' }}
          >
            {OFFERINGS_HEADLINE}
          </h1>
          <p
            className={`${cormorant.className} text-[#4A635A] mt-6`}
            style={{ fontSize: 'clamp(20px, 3vw, 36px)' }}
          >
            {OFFERINGS_SUBHEAD}
          </p>
        </section>

        <div
          ref={galleryWrapperRef}
          className="w-screen h-screen overflow-hidden relative"
        >
          <div
            className="progress-hud absolute bottom-[6vh] left-[10vw] right-[10vw] z-50 flex flex-col items-center pointer-events-none"
          >
            <span
              ref={progressTextRef}
              className={`${cormorant.className} text-[#4A635A] mb-4`}
              style={{ fontSize: 'clamp(16px, 1.5vw, 24px)', letterSpacing: '0.05em', opacity: 0.9 }}
            >
              {OFFERINGS_SCROLL_LABEL}
            </span>
            <div className="w-full h-px bg-[rgba(74,99,90,0.2)] relative">
              <div
                ref={progressBarRef}
                className="absolute inset-y-0 left-0 w-full bg-[#4A635A]"
                style={{ transformOrigin: 'left center', transform: 'scaleX(0)' }}
              />
            </div>
          </div>

          <div
            className="artistic-bg absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-40"
          >
            <svg
              viewBox="0 0 800 800"
              className="opacity-[0.12]"
              style={{ width: '180vh', height: '180vh', animation: 'slowSpin 80s linear infinite' }}
            >
              <circle cx="400" cy="400" r="390" fill="none" stroke="#b8993e" strokeWidth="2" strokeDasharray="15 30" />
              <circle cx="400" cy="400" r="340" fill="none" stroke="#8b4a2b" strokeWidth="1" />
              <path d="M400,0 L800,400 L400,800 L0,400 Z" fill="none" stroke="#b8993e" strokeWidth="1" opacity="0.5" />
              <circle cx="400" cy="400" r="250" fill="none" stroke="#8b4a2b" strokeWidth="3" strokeDasharray="4 12" />
              <path d="M150,150 L650,650 M150,650 L650,150" stroke="#b8993e" strokeWidth="0.5" opacity="0.3" />
            </svg>
            <div className="absolute inset-0 offerings-bg-radial" />
          </div>

          <div
            ref={galleryContentRef}
            className="gallery-track flex flex-nowrap h-full relative z-[1]"
          >
            {CARD_CONTENT.map((offering, index) => {
              const isOdd = index % 2 !== 0;
              return (
                <section
                  key={index}
                  className="manuscript-item w-screen flex-shrink-0 flex flex-col items-center justify-center h-full px-[5vw] relative"
                >
                  <h2
                    className={`parallax-heading ${playfair.className} absolute text-center w-full pointer-events-none`}
                    style={{
                      fontSize: 'clamp(40px, 8vw, 130px)',
                      fontWeight: 400,
                      lineHeight: 1,
                      color: '#241b12',
                      textShadow: `1px 1px 0px #33261a, 2px 2px 0px #1a130d, 3px 3px 0px #0d0a06, 4px 4px 8px rgba(0,0,0,0.5)`,
                      top: '15%',
                      zIndex: 0,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {offering.title}
                  </h2>

                  <div
                    className="manuscript-image-block relative w-full max-w-[1300px] flex flex-col justify-center items-center z-[2]"
                  >
                    <div className="relative w-full" style={{ minHeight: '400px', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.15))' }}>
                      <Image
                        src="/manuscript.png"
                        alt={`Manuscript ${index + 1}`}
                        fill
                        className="select-none pointer-events-none z-0"
                        style={{ objectFit: 'fill' }}
                        priority={index < 2}
                      />
                      <div
                        className="manuscript-text-block text-content-layer relative z-[1] w-full text-center"
                        style={{ padding: '20% 20% 20% 25%', mixBlendMode: 'multiply', color: '#2b231d' }}
                      >
                        <p
                          className={`${caveat.className} font-medium text-left`}
                          style={{
                            fontSize: 'clamp(18px, 2.0vw, 30px)',
                            lineHeight: 1.4,
                            letterSpacing: '0.01em',
                            margin: '0 auto',
                            maxWidth: '90%',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {offering.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes slowSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .gallery-track {
            flex-direction: column !important;
            height: auto !important;
            gap: 15vh !important;
            padding: 10vh 0 !important;
          }
          .manuscript-item {
            height: auto !important;
            min-height: 60vh !important;
            width: 100vw !important;
          }
          .parallax-heading {
            position: relative !important;
            top: 0 !important;
            margin-bottom: -2rem !important;
            z-index: 5 !important;
            font-size: clamp(40px, 12vw, 80px) !important;
            text-shadow: none !important;
            color: #1A1A1A !important;
          }
          .manuscript-image-block {
            max-width: 95vw !important;
          }
          .text-content-layer {
            padding: 25% 10% !important;
          }
          .progress-hud, .artistic-bg {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default OfferingsContainer;
