'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import SectionStripes from '../components/SectionStripes';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import HomeFooter from '../components/HomeFooter';
import { ShimmerButton } from '../components/ShimmerButton';
import { useLoader } from '../providers/LoaderProvider';

const OFFERINGS = [
  {
    num: '01',
    title: 'Virtual Clinic',
    tag: 'Remote Consultation',
    image: '/offerings_virtual-clinic.png',
    desc: 'Receive deeply personalized Ayurvedic guidance from experienced Vaidyas, wherever you are in the world. A calm, considered consultation experience designed around your constitution, concerns, and long-term wellbeing.',
  },
  {
    num: '02',
    title: 'Care Concierge',
    tag: 'High-Touch Support',
    image: '/offerings_care-concierge.png',
    desc: 'Thoughtful, high-touch support for every stage of the journey. We help simplify coordination, communication, and preparation so your healing experience feels seamless, supported, and clear.',
  },
  {
    num: '03',
    title: 'Global Directory',
    tag: 'Curated Network',
    image: '/offerings_global-directory.png',
    desc: 'Access a carefully curated world of Ayurvedic practitioners, centers, and Panchakarma destinations. Explore trusted pathways to care through a network chosen for authenticity, quality, and alignment.',
  },
  {
    num: '04',
    title: 'Intelligent Matching',
    tag: 'Personalised Care',
    image: '/offerings_intelligent-matching.png',
    desc: 'A more considered way to connect patients with care. We help align individual needs, treatment intentions, constitutional understanding, and practical preferences with the right Ayurvedic support system.',
  },
  {
    num: '05',
    title: 'Expert Network',
    tag: 'Practitioner Ecosystem',
    image: '/offerings_expert-network.png',
    desc: 'An evolving ecosystem of Vaidyas, educators, and wellness specialists dedicated to preserving depth in Ayurvedic care while making it more connected and accessible for today\'s patients.',
  },
  {
    num: '06',
    title: 'Treatment Planning',
    tag: 'Structured Guidance',
    image: '/offerings_treatment-planning.png',
    desc: 'Structured guidance that helps translate consultation insights into a clear next step, including timelines, preparation, and recommended care pathways.',
  },
  {
    num: '07',
    title: 'Panchakarma Preparation',
    tag: 'Deep Healing Programs',
    image: '/offerings_panchakarma-prep.png',
    desc: 'Support for patients preparing for deeper healing programs through orientation, readiness guidance, travel support, and pre-treatment planning.',
  },
  {
    num: '08',
    title: 'Patient Onboarding',
    tag: 'Seamless Entry',
    image: '/offerings_patient-onboarding.png',
    desc: 'A smooth digital and human onboarding experience with access to key documents, schedules, communication channels, and care-related updates.',
  },
  {
    num: '09',
    title: 'Educational Guidance',
    tag: 'Knowledge & Clarity',
    image: '/offerings_educational-guidance.png',
    desc: 'Thoughtfully designed resources that help patients better understand Ayurveda, treatment processes, preparation requirements, and what to expect from their journey.',
  },
  {
    num: '10',
    title: 'Continuity of Care',
    tag: 'Long-Term Wellness',
    image: '/offerings_continuity-of-care.png',
    desc: 'Support that extends beyond the first consultation or treatment milestone, helping patients stay connected to the right next steps, follow-ups, and long-term wellness direction.',
  },
];

export default function OfferingsPage() {
  const { loaderDone } = useLoader();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="offerings-root">
        <div className="moringa-noise" />

        {/* ── HERO ── */}
        <section className="offerings-hero">
          <div className="offerings-hero-img-wrap">
            <img src="/offerings_hero.jpg" alt="Ayurvedic Treatment Pathways" className="offerings-hero-img" />
            <div className="offerings-hero-overlay" />
          </div>

          {/* Smooth left-to-right dark gradient for text readability */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-[#0A140C]/90 via-[#0A140C]/40 to-transparent z-[4] pointer-events-none" />

          {/* Elegant Geometric Rings Animation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[40%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-[5] pointer-events-none flex items-center justify-center opacity-50">
            {/* Outer dashed gold ring */}
            <div className="absolute inset-0 rounded-full border-[1px] border-[#C9A86C]/40 border-dashed animate-[spin_120s_linear_infinite]" />
            {/* Inner solid green ring */}
            <div className="absolute inset-[4%] rounded-full border-[1px] border-[#284A34]/50 animate-[spin_90s_linear_infinite_reverse]" />
            {/* Third delicate ring */}
            <div className="absolute inset-[8%] rounded-full border-[1px] border-[#C9A86C]/20 animate-[spin_60s_linear_infinite]" />
          </div>

          <div className="offerings-hero-inner">
            <div className="offerings-hero-topbar justify-end">
              <span className="offerings-hero-tagline">Comprehensive Care</span>
            </div>
            <div className="offerings-hero-center relative z-10">
              <div className="relative w-fit">
                <h1 className="offerings-h1">
                  <span style={{ color: 'transparent', WebkitTextStroke: '2px #F5F0E8', WebkitTextFillColor: 'transparent' }}>Our</span>
                  <span style={{ color: 'transparent', WebkitTextStroke: '2px #C9A86C', WebkitTextFillColor: 'transparent' }}>Offerings.</span>
                </h1>
              </div>

              <p className="offerings-hero-sub">
                Ten considered pathways to authentic Ayurvedic care — each one shaped around you.
              </p>
            </div>
            <div className="offerings-hero-bottom">
              <div className="offerings-scroll-hint">
                <div className="offerings-scroll-line" />
                <span className="offerings-scroll-label">Scroll to explore</span>
              </div>
            </div>
          </div>
        
          {/* ── HERO STRIP ── */}
          <div className="offerings-hero-strip">
            <div className="offerings-hero-strip-inner">
              <span className="offerings-hero-strip-label">Our Services</span>
              <div className="offerings-hero-strip-divider" />
              {['Virtual Clinic', 'Care Concierge', 'Global Directory', 'Matching', 'Panchakarma Prep'].map((item, i, arr) => (
                <span key={item} className="offerings-hero-strip-group">
                  <span className="offerings-hero-strip-item">{item}</span>
                  {i < arr.length - 1 && <span className="offerings-hero-strip-dot">·</span>}
                </span>
              ))}
            </div>
          </div>
          </section>

        {/* ── ACCORDION LIST ── */}
        <section className="offerings-list-section relative z-10 overflow-hidden">
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#284A34']} />
          <div className="offerings-list-inner">

            {/* Left sticky label column */}
            <aside className="offerings-aside">
              <div className="offerings-aside-inner">
                <span className="offerings-aside-label">What we offer</span>
                <div className="offerings-aside-line" />
                <span className="offerings-aside-count">{OFFERINGS.length} services</span>
              </div>
            </aside>

            {/* Right list column */}
            <div className="offerings-list">
              {OFFERINGS.map((item, i) => {
                const isOpen = activeIndex === i;
                return (
                  <article
                    key={item.num}
                    className={`offerings-item${isOpen ? ' is-open' : ''}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    {/* Row — always visible */}
                    <div className="offerings-item-row">
                      <span className="offerings-item-num">{item.num}</span>
                      <div className="offerings-item-meta">
                        <h2 className="offerings-item-title">{item.title}</h2>
                        <span className="offerings-item-tag">{item.tag}</span>
                      </div>
                      <span className="offerings-item-arrow" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    {/* Expanded panel */}
                    <div className="offerings-item-panel">
                      <div className="offerings-item-panel-inner">
                        <div className="offerings-item-panel-img-wrap">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 420px"
                            className="offerings-item-panel-img"
                          />
                        </div>
                        <div className="offerings-item-panel-text">
                          <h3 className="offerings-item-panel-heading">{item.title}</h3>
                          <p className="offerings-item-panel-desc">{item.desc}</p>
                          <Link href="/contact" className="offerings-item-panel-link">
                            Enquire about this service →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── BOTTOM PULL QUOTE ── */}
        <section className="offerings-pullquote-section relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#284A34] z-[-2]" />
          <SectionStripes colors={['#F5F0E8', '#D4A878', '#A8B5A9']} reversed />
          <div className="offerings-pullquote-inner">
            <div className="offerings-pullquote-rule" />
            <blockquote className="offerings-pullquote">
              "Every pathway begins with listening — to the body, the season, and the self."
            </blockquote>
            <p className="offerings-pullquote-attr">— The Ayusurance Approach</p>
          </div>
        </section>

        {/* ── END CTA ── */}
        <section className="offerings-cta-section relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#F5F0E8] z-[-2]" />
          <SectionStripes colors={['#C9A86C', '#A8B5A9', '#284A34']} />
          <div className="offerings-cta-inner">
            <p className="offerings-cta-eyebrow">Begin your journey</p>
            <h2 className="offerings-cta-heading">
              Your path toward balance<br />starts with a single step.
            </h2>
            <p className="offerings-cta-sub">
              Whether you are ready to connect with a Vaidya or simply want to know more — we are here. Unhurried, attentive, and fully aligned with what you need.
            </p>
            <Link
              href="/patient-journey"
              className="offerings-cta-btn"
            >
              View Patient Journey
            </Link>
          </div>
        </section>
      </main>

      <style>{`
        /* ── Root & Background ── */
        .offerings-root {
          min-height: 100vh;
          background: #F5F0E8;
          color: #1C2E1E;
          font-family: var(--font-sans);
          position: relative;
        }

        /* ── HERO ── */
        .offerings-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .offerings-hero-img-wrap {
          position: absolute;
          inset: 0;
        }
        .offerings-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .offerings-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(20,15,10,0.65) 0%, rgba(20,15,10,0.45) 50%, rgba(10,20,12,0.85) 100%);
        }
        .offerings-hero-inner {
          position: relative;
          z-index: 10;
          height: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 7rem 7vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .offerings-hero-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .offerings-hero-brand {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.90);
          letter-spacing: 0.55em;
          text-transform: uppercase;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .offerings-hero-tagline {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.45);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.72rem;
        }
        .offerings-hero-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .offerings-hero-line {
          width: 4rem;
          height: 1px;
          background: #C9A86C;
          margin-bottom: 2.5rem;
          opacity: 0.85;
        }
        .offerings-h1 {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(3.5rem, 9vw, 9rem);
          font-weight: 400;
          line-height: 0.9;
          color: #F5F0E8;
          margin: 0 0 2rem;
          letter-spacing: -0.02em;
          display: flex;
          flex-direction: column;
        }
        .offerings-h1 span { display: block; white-space: nowrap; }
        .offerings-hero-sub {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: rgba(245,240,232,0.75);
          max-width: 500px;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }
        .offerings-hero-bottom {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .offerings-scroll-hint {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .offerings-scroll-line {
          width: 1px;
          height: 2.5rem;
          background: rgba(255,255,255,0.3);
        }
        .offerings-scroll-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
        }

        
        .offerings-hero-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 20;
          border-top: 1px solid rgba(201,168,108,0.35);
          background: rgba(245,240,232,0.92);
          backdrop-filter: blur(12px);
        }
        .offerings-hero-strip-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 7vw;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          overflow-x: auto;
        }
        .offerings-hero-strip-label {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.55);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .offerings-hero-strip-divider {
          width: 1px;
          height: 1rem;
          background: rgba(44,58,50,0.15);
          flex-shrink: 0;
        }
        .offerings-hero-strip-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .offerings-hero-strip-item {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.90);
          white-space: nowrap;
        }
        .offerings-hero-strip-dot {
          color: rgba(201,168,108,0.60);
          font-size: 0.75rem;
        }

        /* ── LIST SECTION ── */
        .offerings-list-section {
          background: #F5F0E8;
          padding: 0 0 6rem;
        }
        .offerings-list-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 5rem 7vw 0;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 0 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .offerings-list-inner {
            grid-template-columns: 1fr;
            padding: 3rem 5vw 0;
          }
        }

        /* Aside */
        .offerings-aside {
          position: sticky;
          top: 7rem;
        }
        @media (max-width: 768px) {
          .offerings-aside { display: none; }
        }
        .offerings-aside-inner {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .offerings-aside-label {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 600;
          color: #7A4028;
        }
        .offerings-aside-line {
          width: 40px;
          height: 1px;
          background: #7A4028;
          opacity: 0.4;
        }
        .offerings-aside-count {
          font-size: 0.72rem;
          color: #1C2E1E;
          opacity: 0.45;
          letter-spacing: 0.05em;
        }

        /* List */
        .offerings-list {
          border-top: 1px solid rgba(28,46,30,0.15);
        }

        /* Item */
        .offerings-item {
          border-bottom: 1px solid rgba(28,46,30,0.12);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .offerings-item:hover {
          background: rgba(212,168,120,0.06);
        }
        .offerings-item.is-open {
          background: rgba(40,74,52,0.04);
        }

        .offerings-item-row {
          display: flex;
          align-items: center;
          gap: 2.5rem;
          padding: 1.6rem 1rem;
          user-select: none;
        }
        @media (max-width: 480px) {
          .offerings-item-row {
            gap: 1rem;
            padding: 1.25rem 0.5rem;
          }
        }

        .offerings-item-num {
          font-family: var(--font-display);
          font-size: 0.75rem;
          font-weight: 400;
          color: rgba(28,46,30,0.35);
          letter-spacing: 0.05em;
          min-width: 28px;
          flex-shrink: 0;
        }
        .offerings-item-meta {
          flex: 1;
          display: flex;
          align-items: baseline;
          gap: 1.2rem;
          flex-wrap: wrap;
        }
        .offerings-item-title {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2.5vw, 2rem);
          font-weight: 500;
          color: #1C2E1E;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          transition: color 0.2s ease;
        }
        .offerings-item:hover .offerings-item-title,
        .offerings-item.is-open .offerings-item-title {
          color: #284A34;
        }
        .offerings-item-tag {
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #7A4028;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0.8;
        }
        @media (max-width: 480px) {
          .offerings-item-tag { display: none; }
        }
        .offerings-item-arrow {
          color: rgba(28,46,30,0.35);
          flex-shrink: 0;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), color 0.2s ease;
          display: flex;
        }
        .offerings-item.is-open .offerings-item-arrow {
          transform: rotate(180deg);
          color: #284A34;
        }

        /* Panel */
        .offerings-item-panel {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.5s cubic-bezier(0.4,0,0.2,1);
        }
        .offerings-item.is-open .offerings-item-panel {
          max-height: 600px;
        }
        .offerings-item-panel-inner {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2.5rem;
          padding: 0 1rem 2.5rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .offerings-item-panel-inner {
            grid-template-columns: 1fr;
            padding: 0 0.5rem 2rem;
          }
        }
        .offerings-item-panel-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .offerings-item-panel-img {
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .offerings-item.is-open .offerings-item-panel-img {
          transform: scale(1.04);
        }
        .offerings-item-panel-text {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          padding-top: 0.5rem;
        }
        .offerings-item-panel-heading {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 500;
          color: #284A34;
          margin: 0;
          letter-spacing: -0.02em;
        }
        .offerings-item-panel-desc {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(28,46,30,0.75);
          margin: 0;
          font-weight: 400;
          max-width: 520px;
        }
        .offerings-item-panel-link {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #7A4028;
          text-decoration: none;
          border-bottom: 1px solid rgba(122,64,40,0.4);
          padding-bottom: 2px;
          width: fit-content;
          transition: color 0.2s, border-color 0.2s;
        }
        .offerings-item-panel-link:hover {
          color: #5a2e15;
          border-color: #5a2e15;
        }

        /* ── PULL QUOTE ── */
        .offerings-pullquote-section {
          background: #284A34;
          padding: 7rem 7vw;
        }
        .offerings-pullquote-inner {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .offerings-pullquote-rule {
          width: 48px;
          height: 1px;
          background: #D4A878;
          opacity: 0.6;
        }
        .offerings-pullquote {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          font-weight: 400;
          font-style: italic;
          color: #F5F0E8;
          margin: 0;
          line-height: 1.35;
          letter-spacing: -0.01em;
        }
        .offerings-pullquote-attr {
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A878;
          font-weight: 600;
          margin: 0;
          opacity: 0.85;
        }

        /* ── END CTA ── */
        .offerings-cta-section {
          background: #F5F0E8;
          padding: 9rem 7vw;
        }
        .offerings-cta-inner {
          max-width: 640px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }
        .offerings-cta-eyebrow {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7A4028;
          margin: 0;
        }
        .offerings-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 500;
          color: #1C2E1E;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .offerings-cta-sub {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(28,46,30,0.65);
          margin: 0;
          font-weight: 400;
          max-width: 480px;
        }
        .offerings-cta-btn {
          display: inline-block;
          margin-top: 2rem;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #F5F0E8;
          background: #284A34;
          padding: 1.1rem 2.8rem;
          border-radius: 0;
          border: none;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.3s ease;
        }
        .offerings-cta-btn:hover {
          background: #1C3325;
          transform: translateY(-2px);
        }
      `}</style>
      <HomeFooter />
    </>
  );
}
