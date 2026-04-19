'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { CARD_CONTENT } from '../lib/tokens';
import { Playfair_Display, Caveat } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const caveat = Caveat({ subsets: ['latin'] });

gsap.registerPlugin(ScrollTrigger);

export default function OfferingsPage() {
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const galleryContentRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      
      const sections = gsap.utils.toArray('.manuscript-item') as HTMLElement[];
      
      // 1. Horizontal Scroll Tween (Stop & Go Mechanic)
      const scrollTween = gsap.timeline({
        scrollTrigger: {
          trigger: galleryWrapperRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${sections.length * 1500}`, // Increase total scroll space for deep pauses
          onUpdate: (self) => {
            if (progressBarRef.current) {
              gsap.set(progressBarRef.current, { scaleX: self.progress });
            }
            if (progressTextRef.current) {
              if (self.progress > 0.98) {
                progressTextRef.current.innerText = "End of Manuscripts";
              } else {
                progressTextRef.current.innerText = "Keep Scrolling to Explore";
              }
            }
          }
        }
      });

      sections.forEach((el, index) => {
        // Physical pause: user scrolls but horizontal track stays pinned dead still
        scrollTween.to({}, { duration: 0.6 }); 

        // Slide out to the next track piece
        if (index < sections.length - 1) {
          scrollTween.to(galleryContentRef.current, {
            x: () => -((index + 1) * window.innerWidth),
            ease: 'power1.inOut',
            duration: 1
          });
        }
      });

      // 2. Add Horizontal Parallax to inner elements
      sections.forEach((el, index) => {
        const heading = el.querySelector('.parallax-heading') as HTMLElement;
        const imageBlock = el.querySelector('.manuscript-image-block') as HTMLElement;
        const isOdd = index % 2 !== 0;

        // The Foreground Parallax: Manuscript canvas gracefully drags through the horizontal track
        gsap.fromTo(imageBlock, 
          { 
            x: 150, 
            y: 40,
            rotation: isOdd ? 4 : -4 
          }, 
          { 
            x: -150,
            y: -10,
            rotation: isOdd ? -2 : 2,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: "left right",
              end: "right left",
              scrub: true
            }
          }
        );

        // The Background Parallax: Huge 3D headings sweep independently at a faster velocity
        gsap.fromTo(heading, 
          { x: 450 }, 
          { 
            x: -450, 
            ease: "none",
            scrollTrigger: {
              trigger: el,
              containerAnimation: scrollTween,
              start: "left right", // when the left edge of the section hits the right edge of screen
              end: "right left",   // when the right edge of the section hits the left edge of screen
              scrub: true
            }
          }
        );
      });

    }, galleryWrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Navbar />

      <main
        style={{
          color: '#1A1A1A',
          position: 'relative',
          overflowX: 'hidden',
          width: '100vw',
        }}
      >
        {/* ─── Hero Header ─── */}
        <section style={{ 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center', 
        }}>
          <h1 className={playfair.className} style={{
            fontSize: 'clamp(60px, 10vw, 150px)',
            lineHeight: 0.85,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            textAlign: 'center'
          }}>
            Our Offerings
          </h1>
          <p className={caveat.className} style={{
             fontSize: 'clamp(24px, 4vw, 42px)',
             color: '#4A635A',
             marginTop: '2rem',
             transform: 'rotate(-2deg)'
          }}>
            Scroll to unroll the manuscripts.
          </p>
        </section>

        {/* ─── Horizontal Pinned Gallery ─── */}
        <div ref={galleryWrapperRef} style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
          
          {/* ─── Scroll Progress HUD ─── */}
          <div style={{
            position: 'absolute',
            bottom: '6vh',
            left: '10vw',
            right: '10vw',
            zIndex: 50, // Guarantee position atop background layers and images
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pointerEvents: 'none' // Ensures users can still interact below horizontally if needed
          }}>
            <span 
              ref={progressTextRef}
              className={caveat.className}
              style={{
                fontSize: 'clamp(16px, 1.5vw, 24px)',
                letterSpacing: '0.05em',
                color: '#4A635A',
                marginBottom: '1rem',
                opacity: 0.9
              }}
            >
              Keep Scrolling to Explore
            </span>
            <div style={{ width: '100%', height: '1px', background: 'rgba(74, 99, 90, 0.2)', position: 'relative' }}>
              <div 
                ref={progressBarRef}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, bottom: 0,
                  width: '100%',
                  background: '#4A635A',
                  transformOrigin: 'left center',
                  transform: 'scaleX(0)' // GSAP securely modifies this attribute natively
                }}
              />
            </div>
          </div>

          {/* ─── Artistic Background Layer ─── */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.4 }}>
            <svg viewBox="0 0 800 800" style={{ width: '180vh', height: '180vh', animation: 'slowSpin 80s linear infinite', opacity: 0.12 }}>
              <circle cx="400" cy="400" r="390" fill="none" stroke="#b8993e" strokeWidth="2" strokeDasharray="15 30" />
              <circle cx="400" cy="400" r="340" fill="none" stroke="#8b4a2b" strokeWidth="1" />
              <path d="M400,0 L800,400 L400,800 L0,400 Z" fill="none" stroke="#b8993e" strokeWidth="1" opacity="0.5" />
              <circle cx="400" cy="400" r="250" fill="none" stroke="#8b4a2b" strokeWidth="3" strokeDasharray="4 12" />
              <path d="M150,150 L650,650 M150,650 L650,150" stroke="#b8993e" strokeWidth="0.5" opacity="0.3" />
            </svg>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, transparent 20%, #fdfbf7 85%)' }}></div>
          </div>

          <div ref={galleryContentRef} style={{ display: 'flex', flexWrap: 'nowrap', height: '100%', position: 'relative', zIndex: 1 }}>
            {CARD_CONTENT.map((offering, index) => {
              const isOdd = index % 2 !== 0;

              return (
                <section 
                  key={index} 
                  className="manuscript-item" 
                  style={{
                    width: '100vw',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    padding: '0 5vw',
                    position: 'relative'
                  }}
                >
                  {/* 1. The Heading Completely Behind the Image */}
                  <h2 className={`parallax-heading ${playfair.className}`} style={{ 
                    fontSize: 'clamp(40px, 8vw, 130px)', // Safely shrunk down so entire headings remain completely visible
                    fontStyle: 'italic',
                    fontWeight: 400, // Reduced from 700 to soften the visual weight
                    lineHeight: 1,
                    color: '#241b12', // A very dark, rich heritage tone for the top face
                    textShadow: `
                      1px 1px 0px #33261a,
                      2px 2px 0px #1a130d,
                      3px 3px 0px #0d0a06,
                      4px 4px 8px rgba(0,0,0,0.5)
                    `, // Deep, heavy 3D shadow matching the dark text
                    textAlign: 'center',
                    position: 'absolute',
                    top: '15%', 
                    width: '100%',
                    zIndex: 0,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none'
                  }}>
                    {offering.title}
                  </h2>

                  <div 
                    className="manuscript-image-block"
                    style={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '1300px', // Massively increased scale for majestic reading
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 2 // Make sure it stays strongly above the heading
                    }}
                  >
                  {/* Container height is driven by text, image stretches to fill it */}
                  <div style={{ position: 'relative', width: '100%', minHeight: '300px', filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.15))' }}>
                    
                    <Image 
                      src="/manuscript.png" 
                      alt={`Manuscript ${index + 1}`}
                      fill
                      className="select-none pointer-events-none z-0"
                      style={{ objectFit: 'fill' }} // Stretches strictly to the container
                      priority={index < 2} 
                    />

                    {/* The Applied Text Overlay strictly setting the height via padding */}
                    <div 
                      className="manuscript-text-block text-content-layer" 
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        width: '100%',
                        padding: '20% 15%', // Restored heavy vertical padding to enforce the tall manuscript height 
                        textAlign: 'center',
                        mixBlendMode: 'multiply',
                        color: '#2b231d',
                      }}
                    >
                      <p className={caveat.className} style={{ 
                        fontSize: 'clamp(20px, 2.2vw, 36px)', // Scaled up to match the massive paper natively
                        lineHeight: 1.55,
                        letterSpacing: '0.01em',
                        textAlign: 'center',
                        fontWeight: 500,
                        margin: '0 auto',
                        maxWidth: '80%',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
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

        /* Avoid horizontal overflow entirely */
        body {
          overflow-x: hidden;
        }

        /* Responsive dampening for text overlay positioning */
        @media (max-width: 768px) {
          .text-content-layer {
            width: 85% !important;
          }
        }
      `}</style>
    </>
  );
}
