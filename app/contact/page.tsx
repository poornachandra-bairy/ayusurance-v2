'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Playfair_Display, Caveat } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const caveat = Caveat({ subsets: ['latin'] });

gsap.registerPlugin(ScrollTrigger);

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  // 1. Mouse Tracking for Liquid Blob
  useEffect(() => {
    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const ease = 0.08;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX - window.innerWidth / 2;
      targetY = e.clientY - window.innerHeight / 2;
    };

    const animate = () => {
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      if (blobRef.current) {
        blobRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 2. Magnetic Button Interaction Logic
  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(magneticRef.current, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  const handleMagneticLeave = () => {
    if (!magneticRef.current) return;
    gsap.to(magneticRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.3)'
    });
    setIsPhoneHovered(false);
  };

  // 3. GSAP Choreography
  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 769px)", () => {
        // Infinite Marquee (Self-Rolling)
        gsap.to('.kinetic-text', {
          xPercent: -50,
          duration: 25,
          ease: 'none',
          repeat: -1
        });

        // Sub-headline Parallax (Moves on scroll)
        gsap.to('.sub-headline-wrapper', {
          y: -150,
          scrollTrigger: {
            trigger: 'body',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
          }
        });
      });

      mm.add("(max-width: 768px)", () => {
        // Lighter marquee for mobile
        gsap.to('.kinetic-text', {
          xPercent: -50,
          duration: 15,
          ease: 'none',
          repeat: -1
        });
      });

      // Word-by-Word Whisper Reveal
      const words = document.querySelectorAll('.whisper-word');
      gsap.fromTo(words, 
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          stagger: 0.08, 
          duration: 1.2, 
          ease: 'power3.out',
          delay: 0.2 
        }
      );

      // Scroll Fade for Info Block
      gsap.fromTo('.reveal-block',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.grid-section',
            start: 'top 85%',
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const subHeadline = "We're here to guide you on your wellness journey.";

  return (
    <>
      <Navbar />

      <main
        ref={containerRef}
        style={{
          minHeight: '200vh',
          color: '#1A1A1A',
          position: 'relative',
          overflowX: 'hidden',
          fontFamily: 'var(--font-body), sans-serif',
          width: '100vw'
        }}
      >
        {/* The Wellness Blob (Cursor Follower) */}
        <div style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          <div 
            ref={blobRef}
            style={{
              width: '90vw',
              height: '90vw',
              maxWidth: '1200px',
              maxHeight: '1200px',
              background: 'radial-gradient(circle, rgba(74, 99, 90, 0.08) 0%, rgba(251, 251, 249, 0) 70%)',
              borderRadius: '50%',
              filter: 'blur(80px)',
              transform: 'translate3d(0,0,0)',
              willChange: 'transform'
            }}
          />
        </div>

        {/* ─── Hero Section ─── */}
        <section style={{ 
          position: 'relative', 
          zIndex: 10, 
          minHeight: '90vh', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          alignItems: 'center', 
          paddingTop: '20vh'
        }}>
          
          <h1 className={playfair.className} style={{
            fontSize: 'clamp(80px, 12vw, 200px)',
            lineHeight: 0.85,
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#1A1A1A',
            marginBottom: '3rem',
            whiteSpace: 'nowrap',
            textAlign: 'center'
          }}>
            GET IN TOUCH
          </h1>

          <div 
            style={{ overflow: 'hidden', width: '100%', marginBottom: '6rem' }}
          >
            <div 
              className={`kinetic-text ${caveat.className}`} 
              style={{ 
                fontSize: 'clamp(40px, 8vw, 120px)', 
                color: '#4A635A', 
                opacity: 0.5, 
                whiteSpace: 'nowrap', 
                display: 'inline-block',
                willChange: 'transform'
              }}
            >
              Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — Connect With Us — 
            </div>
          </div>

          <div className="sub-headline-wrapper" style={{ width: '100%', textAlign: 'center', willChange: 'transform' }}>
            <p className={playfair.className} style={{
              fontSize: 'clamp(14px, 3vw, 36px)',
              color: '#1A1A1A',
              fontStyle: 'italic',
              lineHeight: 1.3,
              fontWeight: 400,
              whiteSpace: 'nowrap'
            }}>
              {subHeadline.split(' ').map((word, i) => (
                <span key={i} className="whisper-word" style={{ display: 'inline-block' }}>
                  {word}&nbsp;
                </span>
              ))}
            </p>
          </div>
        </section>

        {/* ─── Information Grid (Refined & Balanced) ─── */}
        <section className="grid-section" style={{ 
          position: 'relative', 
          zIndex: 10, 
          padding: '10vh 5vw 20vh 5vw',
          borderTop: '1px solid rgba(26,26,26,0.1)'
        }}>
          
          {/* Header Row: Company & Badge */}
          <div className="reveal-block" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15vh', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 className={playfair.className} style={{ fontSize: 'clamp(20px, 2.5vw, 32px)', color: '#1A1A1A', fontWeight: 500 }}>
              Sadaika Healthcare OPC Pvt Ltd
            </h3>
            <div className={caveat.className} style={{ 
              fontSize: '24px',
              color: '#4A635A',
              padding: '5px 15px',
              border: '1px solid currentColor',
              borderRadius: '30px',
              transform: 'rotate(-4deg)'
            }}>
              Estb. 2015
            </div>
          </div>

          {/* Main Grid: Address & Phone */}
          <div className="contact-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'center',
            position: 'relative'
          }}>
            
            {/* Center dividing line for the 'split in middle' feel */}
            <div className="contact-divider" style={{
              position: 'absolute',
              left: '50%',
              top: '-10%',
              bottom: '-10%',
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(74, 99, 90, 0.2), transparent)',
              transform: 'rotate(1deg)' // Slight imperfection
            }} />

            {/* Address (Left) */}
            <div className="reveal-block contact-grid-item" style={{ paddingRight: '4vw' }}>
              <div style={{ 
                display: 'flex', 
                gap: '1.5rem', 
                alignItems: 'flex-start',
                transform: 'rotate(-1.5deg)', // Artistic imperfection
                background: 'rgba(251, 251, 249, 0.4)',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '-10px 10px 30px rgba(0,0,0,0.03)'
              }}>
                <svg 
                  style={{ marginTop: '0.5rem', flexShrink: 0, animation: 'pulse 3s infinite alternate' }} 
                  width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#4A635A"/>
                </svg>
                <div>
                  <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#4A635A', marginBottom: '1.5rem' }}>
                    Clinical HQ
                  </p>
                  <address className={playfair.className} style={{ 
                    fontStyle: 'normal', 
                    fontSize: 'clamp(24px, 3.5vw, 42px)', 
                    lineHeight: 1.15, 
                    color: '#1A1A1A',
                    fontWeight: 400
                  }}>
                    <span style={{ display: 'block', marginBottom: '8px' }}>Shri Manyu, Gundibail,</span>
                    <span style={{ display: 'block', marginBottom: '8px', color: '#4A635A', fontStyle: 'italic' }}>Manipal Road, Udupi,</span>
                    <span style={{ display: 'block' }}>Karnataka, 576102</span>
                  </address>
                </div>
              </div>
            </div>

            {/* Phone (Right) */}
            <div className="reveal-block contact-grid-item contact-phone-block" style={{ paddingLeft: '4vw' }}>
              <div style={{ width: 'fit-content', margin: '0 auto' }}>
                <p style={{ fontFamily: 'var(--font-body), sans-serif', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#4A635A', marginBottom: '2rem', textAlign: 'center', transform: 'rotate(2deg)' /* Imperfection */ }}>
                  Direct Line
                </p>
                <div style={{ display: 'inline-block' }}>
                  <a
                    ref={magneticRef}
                    href="tel:+919845702082"
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    onMouseEnter={() => setIsPhoneHovered(true)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 'clamp(250px, 20vw, 350px)',
                      height: 'clamp(250px, 20vw, 350px)',
                      background: isPhoneHovered ? '#1A1A1A' : 'transparent',
                      border: '1px solid',
                      borderColor: isPhoneHovered ? '#1A1A1A' : 'rgba(74, 99, 90, 0.4)',
                      borderRadius: '50%', // Return to elegant circle for magnetic target
                      textDecoration: 'none',
                      transition: 'background 0.4s, border-color 0.4s, transform 0.2s',
                      cursor: 'pointer',
                      boxShadow: '10px 15px 40px rgba(0,0,0,0.04)'
                    }}
                  >
                    <span className={playfair.className} style={{ 
                      fontSize: 'clamp(24px, 3vw, 42px)', 
                      display: isPhoneHovered ? 'none' : 'block',
                      color: '#1A1A1A',
                      whiteSpace: 'nowrap'
                    }}>
                      +91 9845702082
                    </span>
                    <span className={caveat.className} style={{ 
                      fontSize: 'clamp(36px, 4vw, 54px)', 
                      display: isPhoneHovered ? 'block' : 'none',
                      color: '#FBFBF9',
                      whiteSpace: 'nowrap'
                    }}>
                      Speak With Us
                    </span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ─── Map: Cinematic Portal Reveal ─── */}
        <section style={{ position: 'relative', zIndex: 10, paddingBottom: '15vh' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className={playfair.className} style={{ fontStyle: 'italic', fontSize: '24px', color: '#4A635A' }}>
              The Location
            </h2>
          </div>

          <div className="map-portal-container">
             <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)', zIndex: 2, pointerEvents: 'none', borderRadius: 'inherit' }} />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.821216040295!2d74.7682112!3d13.3613904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbca58fbc6247%3A0x23f0062dd0000000!2sSadaika%20Healthcare%20OPC%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1776512436763!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </section>

      </main>

      <style>{`
        /* Avoid horizontal overflow entirely */
        body {
          overflow-x: hidden;
        }

        /* Pulse animation for the star */
        @keyframes pulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 1; }
        }

        /* Responsive Map Portal */
        .map-portal-container {
          width: 90%;
          height: 70vh;
          max-width: 1400px;
          margin: 0 auto;
          /* Starts as an elegant rounded rectangle/heavy pill rather than a perfect circle to avoid iframe edge breaks */
          clip-path: inset(10% 20% 10% 20% round 300px);
          transition: clip-path 1.2s cubic-bezier(0.77, 0, 0.175, 1);
          background: #e5dcc5;
          position: relative;
        }

        .map-portal-container iframe {
          filter: grayscale(0.7) sepia(0.4) contrast(1.1);
          transition: filter 1.2s ease;
          pointer-events: none;
        }

        /* Interactive Expansion */
        .map-portal-container:hover {
          clip-path: inset(0% 0% 0% 0% round 24px);
        }

        .map-portal-container:hover iframe {
          filter: grayscale(1) contrast(1.2) brightness(0.9);
          pointer-events: auto;
        }

        @media (max-width: 768px) {
          .map-portal-container {
            clip-path: inset(5% 10% 5% 10% round 150px);
            height: 50vh;
          }
          .contact-divider {
            display: none !important;
          }
          .contact-phone-block {
            transform: none !important;
          }
        }
      `}</style>
    </>
  );
}
