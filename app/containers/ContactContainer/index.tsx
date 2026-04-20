'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import {
  CONTACT_HEADLINE,
  CONTACT_SUBHEADLINE,
  CONTACT_COMPANY,
  CONTACT_ESTB,
  CONTACT_ADDRESS_LABEL,
  CONTACT_ADDRESS_LINE1,
  CONTACT_ADDRESS_LINE2,
  CONTACT_ADDRESS_LINE3,
  CONTACT_PHONE_LABEL,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
  CONTACT_HOVER_TEXT,
  CONTACT_MAP_TITLE,
  CONTACT_MAP_SRC,
} from '../../constants/contact';

const playfair = Playfair_Display({ subsets: ['latin'], style: ['normal', 'italic'] });
const cormorant = Cormorant_Garamond({ subsets: ['latin'] });

gsap.registerPlugin(ScrollTrigger);

const ContactContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);
  const [isPhoneHovered, setIsPhoneHovered] = useState(false);

  useEffect(() => {
    let rafId: number;
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
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
    return () => { window.removeEventListener('mousemove', onMouseMove); cancelAnimationFrame(rafId); };
  }, []);

  const handleMagneticMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!magneticRef.current) return;
    const rect = magneticRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(magneticRef.current, { x: x * 0.3, y: y * 0.3, duration: 0.6, ease: 'power3.out' });
  };

  const handleMagneticLeave = () => {
    if (!magneticRef.current) return;
    gsap.to(magneticRef.current, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    setIsPhoneHovered(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add('(min-width: 769px)', () => {
        gsap.to('.sub-headline-wrapper', {
          y: -150,
          scrollTrigger: { trigger: 'body', start: 'top top', end: 'bottom top', scrub: 1 },
        });
      });

      const words = document.querySelectorAll('.whisper-word');
      gsap.fromTo(
        words,
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 1.2, ease: 'power3.out', delay: 0.2 },
      );

      gsap.fromTo(
        '.reveal-block',
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, stagger: 0.2, duration: 1.5, ease: 'power3.out',
          scrollTrigger: { trigger: '.grid-section', start: 'top 85%' },
        },
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <main
        ref={containerRef}
        className="relative overflow-x-hidden w-screen font-body text-[#1A1A1A]"
        style={{ minHeight: '200vh' }}
      >
        <div className="fixed inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden">
          <div
            ref={blobRef}
            className="contact-glow rounded-full"
            style={{
              width: '90vw',
              height: '90vw',
              maxWidth: '1200px',
              maxHeight: '1200px',
              filter: 'blur(80px)',
              transform: 'translate3d(0,0,0)',
              willChange: 'transform',
            }}
          />
        </div>

        <section className="relative z-10 flex flex-col justify-center items-center text-center px-6 pt-[20vh] pb-[10vh]" style={{ minHeight: '90vh' }}>
          <h1
            className={`${playfair.className} font-normal text-center text-[#1A1A1A] mb-12 whitespace-nowrap`}
            style={{ fontSize: 'clamp(48px, 9vw, 150px)', lineHeight: 0.85, letterSpacing: '-0.02em' }}
          >
            {CONTACT_HEADLINE}
          </h1>

          <div className="sub-headline-wrapper w-full text-center" style={{ willChange: 'transform' }}>
            <p
              className={`${playfair.className} text-[#1A1A1A] italic`}
              style={{ fontSize: 'clamp(14px, 3vw, 36px)', lineHeight: 1.3, fontWeight: 400, whiteSpace: 'nowrap' }}
            >
              {CONTACT_SUBHEADLINE.split(' ').map((word, i) => (
                <span key={i} className="whisper-word inline-block">{word}&nbsp;</span>
              ))}
            </p>
          </div>
        </section>

        <section
          className="grid-section relative z-10 px-[5vw]"
          style={{ padding: '10vh 5vw 20vh 5vw', borderTop: '1px solid rgba(26,26,26,0.1)' }}
        >
          <div className="reveal-block flex justify-between items-start mb-[15vh] flex-wrap gap-4">
            <h3
              className={`${playfair.className} text-[#1A1A1A] font-medium`}
              style={{ fontSize: 'clamp(20px, 2.5vw, 32px)' }}
            >
              {CONTACT_COMPANY}
            </h3>
            <div
              className={`${cormorant.className} text-[#4A635A] px-4 py-1 border border-current rounded-full`}
              style={{ fontSize: '24px', transform: 'rotate(-4deg)' }}
            >
              {CONTACT_ESTB}
            </div>
          </div>

          <div
            className="contact-grid grid gap-8 items-center relative"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <div
              className="contact-divider contact-line absolute"
              style={{ left: '50%', top: '-10%', bottom: '-10%', width: '1px', transform: 'rotate(1deg)' }}
            />

            <div className="reveal-block contact-grid-item pr-[4vw]">
              <div
                className="flex gap-6 items-start rounded-lg p-8"
                style={{
                  transform: 'rotate(-1.5deg)',
                  background: 'rgba(251, 251, 249, 0.4)',
                  boxShadow: '-10px 10px 30px rgba(0,0,0,0.03)',
                }}
              >
                <svg
                  className="mt-2 flex-shrink-0"
                  width="18" height="18" viewBox="0 0 24 24" fill="none"
                  style={{ animation: 'pulse 3s infinite alternate' }}
                >
                  <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" fill="#4A635A" />
                </svg>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.2em] text-[#4A635A] mb-6 font-body">
                    {CONTACT_ADDRESS_LABEL}
                  </p>
                  <address
                    className={`${playfair.className} not-italic text-[#1A1A1A] font-normal`}
                    style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', lineHeight: 1.15 }}
                  >
                    <span className="block mb-2">{CONTACT_ADDRESS_LINE1}</span>
                    <span className="block mb-2 text-[#4A635A] italic">{CONTACT_ADDRESS_LINE2}</span>
                    <span className="block">{CONTACT_ADDRESS_LINE3}</span>
                  </address>
                </div>
              </div>
            </div>

            <div className="reveal-block contact-grid-item contact-phone-block pl-[4vw]">
              <div className="w-fit mx-auto">
                <p
                  className="text-[12px] uppercase tracking-[0.2em] text-[#4A635A] mb-8 text-center font-body"
                  style={{ transform: 'rotate(2deg)' }}
                >
                  {CONTACT_PHONE_LABEL}
                </p>
                <div className="inline-block">
                  <a
                    ref={magneticRef}
                    href={CONTACT_PHONE_HREF}
                    onMouseMove={handleMagneticMove}
                    onMouseLeave={handleMagneticLeave}
                    onMouseEnter={() => setIsPhoneHovered(true)}
                    className="flex items-center justify-center rounded-full no-underline cursor-pointer"
                    style={{
                      width: 'clamp(250px, 20vw, 350px)',
                      height: 'clamp(250px, 20vw, 350px)',
                      background: isPhoneHovered ? '#1A1A1A' : 'transparent',
                      border: '1px solid',
                      borderColor: isPhoneHovered ? '#1A1A1A' : 'rgba(74, 99, 90, 0.4)',
                      transition: 'background 0.4s, border-color 0.4s, transform 0.2s',
                      boxShadow: '10px 15px 40px rgba(0,0,0,0.04)',
                    }}
                  >
                    <span
                      className={`${playfair.className} text-[#1A1A1A] whitespace-nowrap`}
                      style={{ fontSize: 'clamp(24px, 3vw, 42px)', display: isPhoneHovered ? 'none' : 'block' }}
                    >
                      {CONTACT_PHONE}
                    </span>
                    <span
                      className={`${cormorant.className} text-[#FBFBF9] whitespace-nowrap`}
                      style={{ fontSize: 'clamp(36px, 4vw, 54px)', display: isPhoneHovered ? 'block' : 'none' }}
                    >
                      {CONTACT_HOVER_TEXT}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 pb-[15vh]">
          <div className="text-center mb-16">
            <h2 className={`${playfair.className} italic text-2xl text-[#4A635A]`}>
              {CONTACT_MAP_TITLE}
            </h2>
          </div>
          <div className="map-portal-container">
            <div className="absolute inset-0 pointer-events-none rounded-[inherit] z-[2]" style={{ boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)' }} />
            <iframe
              src={CONTACT_MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 1; }
        }

        .map-portal-container {
          width: 90%;
          height: 70vh;
          max-width: 1400px;
          margin: 0 auto;
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
          .contact-divider { display: none !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-phone-block { padding-left: 0 !important; }
          .contact-grid-item { padding-right: 0 !important; }
        }
      `}</style>
    </>
  );
};

export default ContactContainer;
