'use client';

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import HomeFooter from '../components/HomeFooter';
import Link from 'next/link';
import SectionStripes from '../components/SectionStripes';

const STEPS = [
  {
    num: '01',
    title: 'Registration',
    phase: 'Entry',
    body: 'Begin your journey by sharing your basic details, health concerns, and what you are seeking through Ayurveda. This helps us understand your needs and prepare the right next steps.',
  },
  {
    num: '02',
    title: 'Eligibility Review',
    phase: 'Assessment',
    body: 'Your information is reviewed to understand the most suitable timing and readiness for Panchakarma. If the timing is right, you move ahead. If not, you may receive guidance and a preparatory plan for a later stage.',
  },
  {
    num: '03',
    title: 'Health Profile',
    phase: 'Assessment',
    body: 'You complete a detailed health questionnaire, upload relevant medical records, and submit the required consent and disclaimer forms. This creates a complete picture before screening.',
  },
  {
    num: '04',
    title: 'Initial Screening',
    phase: 'Clinical',
    body: 'A Screening Vaidya conducts a teleconsultation to assess your clinical suitability for Panchakarma. This step helps determine whether the treatment path is appropriate for your current condition.',
  },
  {
    num: '05',
    title: 'Treatment Planning',
    phase: 'Clinical',
    body: 'Once approved, a personalized treatment plan is prepared. It includes your Ayurvedic assessment, Panchakarma type, therapy duration, preparation phase, main schedule, and post-treatment care.',
  },
  {
    num: '06',
    title: 'Panchakarma Consultation',
    phase: 'Clinical',
    body: 'You meet with the Treating Vaidya to understand the treatment approach in detail. This includes the Ayurvedic view of your condition, procedures involved, expected outcomes, stay duration, diet guidance, and preparation instructions.',
  },
  {
    num: '07',
    title: 'Reservation & Orientation',
    phase: 'Preparation',
    body: 'After confirmation, your reservation is secured and you receive an orientation kit with key documents, travel guidance, payment instructions, packing checklist, and important do\'s and don\'ts.',
  },
  {
    num: '08',
    title: 'Portal Access',
    phase: 'Preparation',
    body: 'You receive access to the Ayusurance patient portal, where you can view your schedule, medicine list, documents, and communication updates in one place.',
  },
  {
    num: '09',
    title: 'Travel Preparation',
    phase: 'Preparation',
    body: 'You prepare for your visit by confirming travel, arranging insurance, and coordinating arrival details. A shared communication channel supports you with updates, instructions, and assistance before arrival.',
  },
  {
    num: '10',
    title: 'Arrival & Admission',
    phase: 'Treatment',
    body: 'On arrival, the center team completes your check-in, verifies documents, finalizes consent, allocates your room, and confirms your treatment schedule. Your Panchakarma program officially begins here.',
  },
  {
    num: '11',
    title: 'Panchakarma Treatment',
    phase: 'Treatment',
    body: 'You begin your structured Panchakarma journey under guided supervision, following your personalized protocol from preparation through treatment and post-care.',
  },
];

const PHASES = ['Entry', 'Assessment', 'Clinical', 'Preparation', 'Treatment'];

export default function PatientJourneyPage() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      <main className="pj-root">
        <div className="moringa-noise" />

        {/* ── HERO ── */}
        <section className="pj-hero">
          <div className="pj-hero-img-wrap">
            <img src="/patient-journey_hero.jpg" alt="Patient journey through Ayurvedic care" className="pj-hero-img" />
            <div className="pj-hero-overlay" />
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
          </div>          <div className="pj-hero-inner">
            {/* Top bar */}
            <div className="pj-hero-topbar justify-end">
              <span className="pj-hero-tagline">Your Healing. Our Guidance.</span>
            </div>
            {/* Center headline */}
            <div className="pj-hero-center relative z-10">
              <h1 className="pj-h1">
                <span style={{ color: 'transparent', WebkitTextStroke: '2px #F5F0E8', WebkitTextFillColor: 'transparent' }}>Your Path</span>
                <span style={{ color: 'transparent', WebkitTextStroke: '2px #C9A86C', WebkitTextFillColor: 'transparent' }}>to Wellness.</span>
              </h1>
              <p className="pj-hero-sub">
                Eleven considered steps from first contact to Panchakarma — each one designed to be clear, supported, and guided.
              </p>
            </div>
            {/* Bottom bar */}
            <div className="pj-hero-bottom">
              <div className="pj-scroll-hint">
                <div className="pj-scroll-line" />
                <span className="pj-scroll-label">Scroll to explore</span>
              </div>
            </div>
          </div>
        
          {/* ── HERO STRIP ── */}
          <div className="pj-hero-strip">
            <div className="pj-hero-strip-inner">
              <span className="pj-hero-strip-label">Journey Phases</span>
              <div className="pj-hero-strip-divider" />
              {['Entry', 'Assessment', 'Clinical', 'Preparation', 'Treatment'].map((item, i, arr) => (
                <span key={item} className="pj-hero-strip-group">
                  <span className="pj-hero-strip-item">{item}</span>
                  {i < arr.length - 1 && <span className="pj-hero-strip-dot">·</span>}
                </span>
              ))}
            </div>
          </div>
          </section>

        {/* ── PHASE LEGEND ── */}
        <section className="pj-legend relative z-10 overflow-hidden">
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#284A34']} />
          <div className="pj-legend-inner">
            <span className="pj-section-label">Journey Phases</span>
            <div className="pj-legend-pills">
              {PHASES.map((phase) => (
                <span key={phase} className="pj-phase-pill">{phase}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── STEPS SECTION ── */}
        <section className="pj-steps-section relative z-10 overflow-hidden">
          <SectionStripes colors={['#C9A86C', '#A8B5A9', '#284A34']} reversed />
          <div className="pj-steps-inner">

            {/* Left sticky column */}
            <aside className="pj-aside">
              <div className="pj-aside-inner">
                <span className="pj-section-label">The Journey</span>
                <div className="pj-aside-line" />
                <span className="pj-aside-count">11 steps</span>
                <div className="pj-aside-progress">
                  {STEPS.map((s, i) => (
                    <div
                      key={s.num}
                      className={`pj-aside-dot${activeStep === i ? ' is-active' : ''}`}
                      title={s.title}
                    />
                  ))}
                </div>
              </div>
            </aside>

            {/* Right steps list */}
            <div className="pj-steps-list">
              {STEPS.map((step, i) => {
                const isOpen = activeStep === i;
                return (
                  <article
                    key={step.num}
                    className={`pj-step${isOpen ? ' is-open' : ''}`}
                    onClick={() => setActiveStep(isOpen ? null : i)}
                    onMouseEnter={() => !isOpen && setActiveStep(i)}
                  >
                    <div className="pj-step-row">
                      <span className="pj-step-num">{step.num}</span>
                      <div className="pj-step-meta">
                        <h2 className="pj-step-title">{step.title}</h2>
                        <span className="pj-step-phase">{step.phase}</span>
                      </div>
                      <span className="pj-step-arrow" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>

                    {/* Expanded body */}
                    <div className="pj-step-body">
                      <p className="pj-step-desc">{step.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </section>

        {/* ── PULLQUOTE ── */}
        <section className="pj-pullquote-section relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#284A34] z-[-2]" />
          <SectionStripes colors={['#F5F0E8', '#D4A878', '#A8B5A9']} />
          <div className="pj-pullquote-inner">
            <div className="pj-pullquote-rule" />
            <blockquote className="pj-pullquote">
              "A healing system is only as strong as the trust, preparation, and clarity behind it."
            </blockquote>
            <p className="pj-pullquote-attr">— The Ayusurance Approach</p>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="pj-cta relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#F5F0E8] z-[-2]" />
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#284A34']} reversed />
          <div className="pj-cta-inner">
            <div className="pj-cta-left">
              <p className="pj-eyebrow">Begin</p>
              <h2 className="pj-cta-heading">Ready to take<br />the first step?</h2>
            </div>
            <div className="pj-cta-right">
              <p className="pj-cta-body">
                Reach out to our care team to begin your eligibility review. We will guide you from there — no guesswork, no ambiguity.
              </p>
              <div className="pj-cta-links">
                <Link href="/contact" className="pj-cta-btn-primary">Contact Us</Link>
                <Link href="/offerings" className="pj-cta-btn-secondary">Our Offerings</Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        /* ── Root ── */
        .pj-root {
          min-height: 100vh;
          background: #F5F0E8;
          color: #1C2E1E;
          font-family: var(--font-sans);
          position: relative;
        }

        /* ── HERO ── */
        .pj-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .pj-hero-img-wrap {
          position: absolute;
          inset: 0;
        }
        .pj-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
        }
        .pj-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(15,25,15,0.85) 0%, rgba(10,20,12,0.75) 50%, rgba(10,15,10,0.90) 100%);
        }
        .pj-hero-inner {
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
        .pj-hero-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .pj-hero-brand {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.90);
          letter-spacing: 0.55em;
          text-transform: uppercase;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .pj-hero-tagline {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.72rem;
        }
        .pj-hero-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .pj-hero-line {
          width: 4rem;
          height: 1px;
          background: #C9A86C;
          margin-bottom: 2.5rem;
          opacity: 0.85;
        }
        .pj-h1 {
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
        .pj-h1 span { display: block; white-space: nowrap; }
        .pj-hero-sub {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: rgba(245,240,232,0.65);
          max-width: 480px;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }
        .pj-hero-bottom {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .pj-scroll-hint {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .pj-scroll-line {
          width: 1px;
          height: 2.5rem;
          background: rgba(255,255,255,0.25);
        }
        .pj-scroll-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
        }

        
        .pj-hero-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 20;
          border-top: 1px solid rgba(201,168,108,0.35);
          background: rgba(245,240,232,0.92);
          backdrop-filter: blur(12px);
        }
        .pj-hero-strip-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 7vw;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          overflow-x: auto;
        }
        .pj-hero-strip-label {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.55);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .pj-hero-strip-divider {
          width: 1px;
          height: 1rem;
          background: rgba(44,58,50,0.15);
          flex-shrink: 0;
        }
        .pj-hero-strip-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .pj-hero-strip-item {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.90);
          white-space: nowrap;
        }
        .pj-hero-strip-dot {
          color: rgba(201,168,108,0.60);
          font-size: 0.75rem;
        }

        /* ── LEGEND ── */
        .pj-legend {
          background: #F5F0E8;
          padding: 3rem 7vw 2rem;
          border-bottom: 1px solid rgba(28,46,30,0.09);
        }
        .pj-legend-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .pj-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A4028;
          flex-shrink: 0;
        }
        .pj-legend-pills {
          display: flex;
          gap: 0.6rem;
          flex-wrap: wrap;
        }
        .pj-phase-pill {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(28,46,30,0.55);
          border: 1px solid rgba(28,46,30,0.18);
          border-radius: 2px;
          padding: 0.3rem 0.75rem;
        }

        /* ── STEPS SECTION ── */
        .pj-steps-section {
          background: #F5F0E8;
          padding: 0 0 6rem;
        }
        .pj-steps-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 7vw 0;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 0 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .pj-steps-inner {
            grid-template-columns: 1fr;
            padding: 3rem 5vw 0;
          }
        }

        /* Aside */
        .pj-aside {
          position: sticky;
          top: 7rem;
        }
        @media (max-width: 768px) {
          .pj-aside { display: none; }
        }
        .pj-aside-inner {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pj-aside-line {
          width: 36px;
          height: 1px;
          background: #7A4028;
          opacity: 0.35;
        }
        .pj-aside-count {
          font-size: 0.7rem;
          color: rgba(28,46,30,0.4);
          letter-spacing: 0.05em;
        }
        .pj-aside-progress {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 1rem;
        }
        .pj-aside-dot {
          width: 22px;
          height: 2px;
          background: rgba(28,46,30,0.15);
          border-radius: 1px;
          transition: background 0.25s, width 0.25s;
        }
        .pj-aside-dot.is-active {
          background: #284A34;
          width: 36px;
        }

        /* Steps list */
        .pj-steps-list {
          border-top: 1px solid rgba(28,46,30,0.13);
        }

        /* Individual step */
        .pj-step {
          border-bottom: 1px solid rgba(28,46,30,0.10);
          cursor: pointer;
          transition: background 0.15s;
        }
        .pj-step:hover {
          background: rgba(212,168,120,0.05);
        }
        .pj-step.is-open {
          background: rgba(40,74,52,0.04);
        }

        .pj-step-row {
          display: flex;
          align-items: center;
          gap: 2rem;
          padding: 1.5rem 1rem;
          user-select: none;
        }
        @media (max-width: 480px) {
          .pj-step-row { gap: 1rem; padding: 1.2rem 0.25rem; }
        }

        .pj-step-num {
          font-family: var(--font-display);
          font-size: 0.72rem;
          font-weight: 400;
          color: rgba(28,46,30,0.3);
          letter-spacing: 0.04em;
          min-width: 26px;
          flex-shrink: 0;
        }
        .pj-step-meta {
          flex: 1;
          display: flex;
          align-items: baseline;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pj-step-title {
          font-family: var(--font-display);
          font-size: clamp(1.2rem, 2.2vw, 1.85rem);
          font-weight: 500;
          color: #1C2E1E;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
          transition: color 0.2s;
        }
        .pj-step:hover .pj-step-title,
        .pj-step.is-open .pj-step-title {
          color: #284A34;
        }
        .pj-step-phase {
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #7A4028;
          font-weight: 700;
          white-space: nowrap;
          opacity: 0.75;
        }
        @media (max-width: 480px) {
          .pj-step-phase { display: none; }
        }
        .pj-step-arrow {
          color: rgba(28,46,30,0.3);
          flex-shrink: 0;
          display: flex;
          transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), color 0.2s;
        }
        .pj-step.is-open .pj-step-arrow {
          transform: rotate(180deg);
          color: #284A34;
        }

        /* Expanding body */
        .pj-step-body {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.45s cubic-bezier(0.4,0,0.2,1);
        }
        .pj-step.is-open .pj-step-body {
          max-height: 200px;
        }
        .pj-step-desc {
          font-size: 0.94rem;
          line-height: 1.8;
          color: rgba(28,46,30,0.65);
          font-weight: 400;
          margin: 0;
          padding: 0 1rem 2rem 3.5rem;
          max-width: 600px;
        }
        @media (max-width: 480px) {
          .pj-step-desc { padding: 0 0.25rem 1.5rem 0.25rem; }
        }

        /* ── PULLQUOTE ── */
        .pj-pullquote-section {
          background: #284A34;
          padding: 7rem 7vw;
        }
        .pj-pullquote-inner {
          max-width: 780px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .pj-pullquote-rule {
          width: 44px;
          height: 1px;
          background: #D4A878;
          opacity: 0.55;
        }
        .pj-pullquote {
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3.5vw, 2.8rem);
          font-style: italic;
          font-weight: 400;
          color: #F5F0E8;
          line-height: 1.35;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .pj-pullquote-attr {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A878;
          font-weight: 700;
          margin: 0;
          opacity: 0.82;
        }

        /* ── CTA ── */
        .pj-cta {
          background: #F5F0E8;
          padding: 8rem 7vw 9rem;
        }
        .pj-cta-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
          border-top: 1px solid rgba(28,46,30,0.12);
          padding-top: 5rem;
        }
        @media (max-width: 768px) {
          .pj-cta-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .pj-cta-left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .pj-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 500;
          color: #1C2E1E;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .pj-cta-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .pj-cta-body {
          font-size: 0.93rem;
          line-height: 1.8;
          color: rgba(28,46,30,0.6);
          margin: 0;
          max-width: 420px;
        }
        .pj-cta-links {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .pj-cta-btn-primary {
          display: inline-block;
          background: #284A34;
          color: #F5F0E8;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          border-radius: 3px;
          transition: background 0.2s;
        }
        .pj-cta-btn-primary:hover {
          background: #1C2E1E;
        }
        .pj-cta-btn-secondary {
          display: inline-block;
          color: #284A34;
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          border-radius: 3px;
          border: 1.5px solid rgba(40,74,52,0.28);
          transition: border-color 0.2s, color 0.2s;
        }
        .pj-cta-btn-secondary:hover {
          border-color: #284A34;
          color: #1C2E1E;
        }
      `}</style>
      <HomeFooter />
    </>
  );
}
