'use client';

import { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { Eczar, Cormorant_Garamond } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// const eczar = Eczar({
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   display: 'swap',
// });

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
});

export default function AboutPage() {
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
        '.header-content',
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
        '.header-content',
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
        style={{
          minHeight: '100vh',
          overflowX: 'hidden',
          position: 'relative',
        }}
      >
        <div
          ref={overlayRef}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0d0a',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
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
          className='w-full flex flex-col items-center'
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div className='max-w-[1100px] mx-auto px-6 py-24 md:py-36 relative z-10'>
            <div
              className='header-content'
              style={{
                ...{ textAlign: 'center', marginBottom: '8rem' },
                transformOrigin: 'center bottom',
              }}
            >
              <h2
                style={{
                  fontFamily: 'sans-serif',
                  fontSize: '0.8rem',
                  letterSpacing: '0.6em',
                  textTransform: 'uppercase',
                  color: '#4A635A',
                  marginBottom: '2rem',
                  fontWeight: 700,
                }}
              >
                A Chronicle of Heritage
              </h2>
              <h1
                className={cormorant.className}
                style={{
                  fontSize: 'clamp(3.5rem, 12vw, 9rem)',
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  color: '#4d4232',
                  fontWeight: 700,
                  lineHeight: 0.8,
                  marginBottom: '1.5rem',
                }}
              >
                The Genesis
              </h1>
              <p
                className={cormorant.className}
                style={{
                  fontSize: '1.2rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#4d4232',
                  opacity: 0.7,
                }}
              >
                Tracing the heartbeat of ancient wisdom into the digital age.
              </p>
            </div>

            <div
              ref={letterRef}
              style={{
                transformOrigin: 'center top',
                width: '100%',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <div className='letter-paper'>
                <div
                  className='wax-seal wax-seal-bg'
                  title='Ayusurance Guarantee'
                />

                <div style={{ position: 'relative', zIndex: 10 }}>
                  <div className='letter-header'>Ayusurance · Est. 2024</div>

                  <div
                    style={{
                      fontFamily: 'Caveat, cursive',
                      color: '#2a2216',
                      fontSize: 'clamp(20px, 2.4vw, 26px)',
                      lineHeight: 1.6,
                      fontWeight: 500,
                    }}
                  >
                    <p
                      style={{
                        marginBottom: '2rem',
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        color: '#3d3224',
                      }}
                    >
                      To every soul seeking genuine healing,
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                      We are Ayusurance — a small team of practitioners,
                      technologists, and lifelong students of Ayurveda who grew
                      tired of watching one of the world's most complete healing
                      systems remain out of reach for most people.
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                      Our founders spent years navigating the same frustrations
                      you may know: the difficulty of finding a genuinely
                      qualified Vaidya, the confusion of separating authentic
                      practice from diluted wellness trends, and the
                      impossibility of maintaining a real Ayurvedic regimen from
                      outside India.
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                      So, we built what we needed. A platform where verified
                      Ayurvedic physicians connect privately with patients
                      worldwide. Where clinical assessments follow classical
                      protocols. Where language, geography, and circumstance are
                      no longer barriers to care that has stood the test of
                      time.
                    </p>

                    <p style={{ marginBottom: '1.5rem' }}>
                      With fierce dedication to the source,
                    </p>
                  </div>

                  <div style={{ marginTop: '50px' }}>
                    <p
                      style={{
                        fontFamily: 'Caveat, cursive',
                        color: '#2a2216',
                        fontSize: 'clamp(24px, 2.8vw, 30px)',
                        lineHeight: 1.2,
                        fontWeight: 500,
                      }}
                    >
                      Dr. Sathyajith Kadukol & Dr. Gayathri Sathyajith
                    </p>
                    <div
                      style={{
                        width: '180px',
                        height: '1.5px',
                        background: 'rgba(61, 50, 36, 0.2)',
                        margin: '10px 0',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '11px',
                        color: '#7a6a4a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.2em',
                        fontWeight: 600,
                        fontFamily: 'sans-serif',
                      }}
                    >
                      Founders, Ayusurance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: '35vh' }} />
      </main>
    </>
  );
}
