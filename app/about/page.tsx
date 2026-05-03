'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import HomeFooter from '../components/HomeFooter';
import Image from 'next/image';
import Link from 'next/link';
import SectionStripes from '../components/SectionStripes';

const PILLARS = [
  {
    num: '01',
    title: 'Patient-First Design',
    body: 'Every system, process, and role at Ayusurance is built around one question: what does the patient actually need at this moment of their journey?',
  },
  {
    num: '02',
    title: 'Clinical Integrity',
    body: 'We work only with Vaidyas and centers whose practice is grounded in classical Ayurvedic protocols — not adaptations made for convenience.',
  },
  {
    num: '03',
    title: 'Structured Coordination',
    body: 'Healing deserves infrastructure. We bring defined roles, clear handoffs, and operational discipline to a space that has historically lacked it.',
  },
  {
    num: '04',
    title: 'Geography Without Barriers',
    body: 'Whether a patient is in Udupi or Oslo, the quality of guidance, preparation, and support they receive should be the same.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="about-root">
        <div className="moringa-noise" />

        {/* ── HERO ── */}
        <section className="about-hero">
          <div className="about-hero-img-wrap">
            <img src="/about_hero.jpg" alt="Ayurvedic herbs and spices — Sadaika Healthcare" className="about-hero-img" />
            <div className="about-hero-overlay" />
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

          <div className="about-hero-inner">
            <div className="about-hero-topbar justify-end">
              <span className="about-hero-tagline">Ancient Practice. Modern Access.</span>
            </div>
            <div className="about-hero-center relative z-10">
              <h1 className="about-h1">
                <span style={{ color: 'transparent', WebkitTextStroke: '2px #F5F0E8', WebkitTextFillColor: 'transparent' }}>Who</span>
                <span style={{ color: 'transparent', WebkitTextStroke: '2px #C9A86C', WebkitTextFillColor: 'transparent' }}>We Are.</span>
              </h1>
              <p className="about-hero-sub">A team of practitioners, technologists, and lifelong students of Ayurveda — building the bridge between ancient healing and modern coordination.</p>
            </div>
            <div className="about-hero-bottom">
              <div className="about-scroll-hint">
                <div className="about-scroll-line" />
                <span className="about-scroll-label">Scroll to explore</span>
              </div>
            </div>
          </div>
        
          {/* ── HERO STRIP ── */}
          <div className="about-hero-strip">
            <div className="about-hero-strip-inner">
              <span className="about-hero-strip-label">Our Pillars</span>
              <div className="about-hero-strip-divider" />
              {['Patient-First', 'Clinical Integrity', 'Transparency', 'Ecosystem', 'Long-Term Care'].map((item, i, arr) => (
                <span key={item} className="about-hero-strip-group">
                  <span className="about-hero-strip-item">{item}</span>
                  {i < arr.length - 1 && <span className="about-hero-strip-dot">·</span>}
                </span>
              ))}
            </div>
          </div>
          </section>

        {/* ── INTRO — wide text block ── */}
        <section className="about-intro relative z-10 overflow-hidden">
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#284A34']} />
          <div className="about-intro-inner">
            <div className="about-intro-label-col">
              <span className="about-section-label">Who We Are</span>
            </div>
            <div className="about-intro-text-col">
              <p className="about-lead">
                We are a team of practitioners, technologists, and lifelong students of Ayurveda who grew tired of watching one of the world's most complete healing systems remain out of reach.
              </p>
              <p className="about-body-text">
                So we built what we needed. A platform where verified Ayurvedic physicians connect privately with patients worldwide. Where clinical assessments follow classical protocols, and geography is no longer a barrier to receiving authentic care.
              </p>
              <p className="about-body-text">
                Ayusurance is the digital and operational access layer for Sadaika Healthcare's Panchakarma and Ayurvedic care network — a bridge between ancient wisdom and modern coordination.
              </p>
            </div>
          </div>
        </section>

        {/* ── FOUNDER SECTION ── */}
        <section className="about-founder relative z-10 overflow-hidden">
          <SectionStripes colors={['#C9A86C', '#A8B5A9', '#284A34']} reversed />
          <div className="about-founder-inner">
            <div className="about-founder-img-wrap">
              <Image
                src="/about_founder.jpg"
                alt="Consultation at Sadaika Healthcare"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                className="about-founder-img"
              />
            </div>
            <div className="about-founder-text">
              <span className="about-section-label">Founder's Note</span>
              <blockquote className="about-founder-quote">
                "True healing emerges when profound medical traditions are supported by seamless operational care — ensuring every step of a patient's journey is clear, protected, and fully guided."
              </blockquote>
              <div className="about-founder-sig">
                <p className="about-founder-name">Dr. Sathyajith Kadukol</p>
                <p className="about-founder-role">Founder, Sadaika Healthcare & Ayusurance</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── PHILOSOPHY PULLQUOTE ── */}
        <section className="about-pullquote-section relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#284A34] z-[-2]" />
          <SectionStripes colors={['#F5F0E8', '#D4A878', '#A8B5A9']} />
          <div className="about-pullquote-inner">
            <div className="about-pullquote-rule" />
            <blockquote className="about-pullquote">
              A healing system is only as strong as the trust, preparation, and clarity behind it.
            </blockquote>
            <p className="about-pullquote-attr">— The Ayusurance Approach</p>
          </div>
        </section>

        {/* ── PILLARS SECTION ── */}
        <section className="about-pillars relative z-10 overflow-hidden">
          <SectionStripes colors={['#C9A86C', '#A8B5A9', '#284A34']} reversed />
          <div className="about-pillars-inner">
            <div className="about-pillars-header">
              <span className="about-section-label">What Guides Us</span>
              <h2 className="about-pillars-heading">Four pillars of<br />our practice</h2>
            </div>
            <div className="about-pillars-grid">
              {PILLARS.map((p) => (
                <div key={p.num} className="about-pillar">
                  <span className="about-pillar-num">{p.num}</span>
                  <div className="about-pillar-rule" />
                  <h3 className="about-pillar-title">{p.title}</h3>
                  <p className="about-pillar-body">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM SECTION ── */}
        <section className="about-ecosystem relative z-10 overflow-hidden">
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#284A34']} />
          <div className="about-ecosystem-inner">
            <div className="about-ecosystem-label-col">
              <span className="about-section-label">The System</span>
            </div>
            <div className="about-ecosystem-text-col">
              <h2 className="about-ecosystem-heading">A Refined Ecosystem</h2>
              <p className="about-body-text">
                Sadaika and Ayusurance are building a refined care ecosystem for Panchakarma and Ayurvedic treatment journeys. The foundation of this model is simple: meaningful healing deserves thoughtful structure.
              </p>
              <p className="about-body-text">
                Our operational workflow connects multiple stakeholders into one coherent patient experience — Pracharakas, Vaidyas, astrologer teams, center organizers, educational support, and coordinators — all working together with defined roles and responsibilities.
              </p>
              <p className="about-body-text">
                Patients move through a carefully planned sequence of eligibility review, medical screening, treatment design, orientation, onboarding, and admission — never with confusion or fragmentation.
              </p>
              <p className="about-body-text">
                At its heart, this is a model of care that respects both depth and discipline — preserving the integrity of Ayurveda while creating a professional, welcoming journey for patients across geographies.
              </p>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="about-cta relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#F5F0E8] z-[-2]" />
          <SectionStripes colors={['#C9A86C', '#A8B5A9', '#284A34']} reversed />
          <div className="about-cta-inner">
            <div className="about-cta-left">
              <p className="about-eyebrow">Begin</p>
              <h2 className="about-cta-heading">Ready to take the first step?</h2>
            </div>
            <div className="about-cta-right">
              <p className="about-cta-body">Explore our ten pathways to care or get in touch with our team directly.</p>
              <div className="about-cta-links">
                <Link href="/offerings" className="about-cta-btn-primary">View Our Offerings</Link>
                <Link href="/contact" className="about-cta-btn-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <HomeFooter />
      <style>{`
        /* ── Root ── */
        .about-root {
          min-height: 100vh;
          background: #F5F0E8;
          color: #1C2E1E;
          font-family: var(--font-sans);
          position: relative;
        }

        /* ── HERO ── */
        .about-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .about-hero-img-wrap {
          position: absolute;
          inset: 0;
        }
        .about-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
        }
        .about-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(25,15,10,0.85) 0%, rgba(20,10,5,0.7) 50%, rgba(10,20,12,0.9) 100%);
        }
        .about-hero-inner {
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
        .about-hero-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .about-hero-brand {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.90);
          letter-spacing: 0.55em;
          text-transform: uppercase;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .about-hero-tagline {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.72rem;
        }
        .about-hero-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .about-hero-line {
          width: 4rem;
          height: 1px;
          background: #C9A86C;
          margin-bottom: 2.5rem;
          opacity: 0.85;
        }
        .about-h1 {
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
        .about-h1 span:last-child { color: #C9A86C; }
        .about-h1 span { display: block; white-space: nowrap; }
        .about-hero-sub {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: rgba(245,240,232,0.65);
          max-width: 500px;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }
        .about-hero-bottom {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .about-scroll-hint {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .about-scroll-line {
          width: 1px;
          height: 2.5rem;
          background: rgba(255,255,255,0.25);
        }
        .about-scroll-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
        }

        /* ── HERO STRIP ── */
        .about-hero-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 20;
          border-top: 1px solid rgba(201,168,108,0.35);
          background: rgba(245,240,232,0.92);
          backdrop-filter: blur(12px);
        }
        .about-hero-strip-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 7vw;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          overflow-x: auto;
        }
        .about-hero-strip-label {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.55);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .about-hero-strip-divider {
          width: 1px;
          height: 1rem;
          background: rgba(44,58,50,0.15);
          flex-shrink: 0;
        }
        .about-hero-strip-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .about-hero-strip-item {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.90);
          white-space: nowrap;
        }
        .about-hero-strip-dot {
          color: rgba(201,168,108,0.60);
          font-size: 0.75rem;
        }

        /* ── SHARED LABEL ── */
        .about-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A4028;
          display: block;
        }

        /* ── INTRO ── */
        .about-intro {
          background: #F5F0E8;
          padding: 7rem 7vw 5rem;
          border-bottom: 1px solid rgba(28,46,30,0.1);
        }
        .about-intro-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-intro-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .about-intro-label-col {
          padding-top: 0.35rem;
        }
        .about-intro-text-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .about-lead {
          font-family: var(--font-display);
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          font-weight: 400;
          line-height: 1.3;
          color: #1C2E1E;
          margin: 0;
          letter-spacing: -0.01em;
        }
        .about-body-text {
          font-size: 0.97rem;
          line-height: 1.85;
          color: rgba(28,46,30,0.68);
          font-weight: 400;
          margin: 0;
          max-width: 640px;
        }

        /* ── FOUNDER ── */
        .about-founder {
          background: #1C2E1E;
          overflow: hidden;
        }
        .about-founder-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 580px;
        }
        @media (max-width: 768px) {
          .about-founder-inner {
            grid-template-columns: 1fr;
            min-height: auto;
          }
        }
        .about-founder-img-wrap {
          position: relative;
          min-height: 400px;
        }
        .about-founder-img {
          object-fit: cover;
          object-position: center;
          filter: sepia(0.15) contrast(1.05);
        }
        .about-founder-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 2rem;
          padding: 5rem 6vw 5rem 5vw;
        }
        .about-founder-text .about-section-label {
          color: #D4A878;
          opacity: 0.8;
        }
        .about-founder-quote {
          font-family: var(--font-display);
          font-size: clamp(1.3rem, 2.5vw, 2rem);
          font-style: italic;
          font-weight: 400;
          color: #F5F0E8;
          line-height: 1.45;
          margin: 0;
          letter-spacing: -0.01em;
          border-left: 2px solid #D4A878;
          padding-left: 1.5rem;
        }
        .about-founder-sig {
          padding-top: 1.5rem;
          border-top: 1px solid rgba(245,240,232,0.12);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .about-founder-name {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 500;
          color: #F5F0E8;
          margin: 0;
        }
        .about-founder-role {
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.4);
          margin: 0;
          font-weight: 600;
        }

        /* ── PULLQUOTE ── */
        .about-pullquote-section {
          background: #F5F0E8;
          padding: 7rem 7vw;
          border-bottom: 1px solid rgba(28,46,30,0.1);
        }
        .about-pullquote-inner {
          max-width: 820px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .about-pullquote-rule {
          width: 44px;
          height: 1px;
          background: #7A4028;
          opacity: 0.5;
        }
        .about-pullquote {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 4vw, 3.2rem);
          font-style: italic;
          font-weight: 400;
          color: #F5F0E8;
          line-height: 1.3;
          margin: 0;
          letter-spacing: -0.015em;
        }
        .about-pullquote-attr {
          font-size: 0.68rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #D4A878;
          font-weight: 700;
          margin: 0;
        }

        /* ── PILLARS ── */
        .about-pillars {
          background: #284A34;
          padding: 7rem 7vw;
        }
        .about-pillars-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }
        .about-pillars-header {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .about-pillars-header .about-section-label {
          color: #D4A878;
          opacity: 0.75;
        }
        .about-pillars-heading {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 500;
          color: #F5F0E8;
          line-height: 1.05;
          letter-spacing: -0.02em;
          margin: 0;
          max-width: 420px;
        }
        .about-pillars-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border-top: 1px solid rgba(245,240,232,0.1);
          border-left: 1px solid rgba(245,240,232,0.1);
        }
        @media (max-width: 640px) {
          .about-pillars-grid {
            grid-template-columns: 1fr;
          }
        }
        .about-pillar {
          padding: 2.8rem 2.5rem;
          border-right: 1px solid rgba(245,240,232,0.1);
          border-bottom: 1px solid rgba(245,240,232,0.1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .about-pillar-num {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(245,240,232,0.3);
        }
        .about-pillar-rule {
          width: 28px;
          height: 1px;
          background: #D4A878;
          opacity: 0.5;
        }
        .about-pillar-title {
          font-family: var(--font-display);
          font-size: 1.35rem;
          font-weight: 500;
          color: #F5F0E8;
          letter-spacing: -0.01em;
          line-height: 1.2;
          margin: 0;
        }
        .about-pillar-body {
          font-size: 0.88rem;
          line-height: 1.75;
          color: rgba(245,240,232,0.55);
          margin: 0;
          font-weight: 400;
        }

        /* ── ECOSYSTEM ── */
        .about-ecosystem {
          background: #F5F0E8;
          padding: 7rem 7vw;
          border-top: 1px solid rgba(28,46,30,0.08);
          border-bottom: 1px solid rgba(28,46,30,0.08);
        }
        .about-ecosystem-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 200px 1fr;
          gap: 4rem;
          align-items: start;
        }
        @media (max-width: 768px) {
          .about-ecosystem-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        .about-ecosystem-label-col {
          padding-top: 0.35rem;
        }
        .about-ecosystem-text-col {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .about-ecosystem-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.4rem);
          font-weight: 500;
          color: #1C2E1E;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0 0 0.5rem;
        }

        /* ── CTA ── */
        .about-cta {
          background: #F5F0E8;
          padding: 7rem 7vw 9rem;
        }
        .about-cta-inner {
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
          .about-cta-inner {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }
        .about-cta-left {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .about-cta-heading {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 500;
          color: #1C2E1E;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .about-cta-right {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        .about-cta-body {
          font-size: 0.95rem;
          line-height: 1.75;
          color: rgba(28,46,30,0.6);
          margin: 0;
        }
        .about-cta-links {
          display: flex;
          flex-direction: row;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .about-cta-btn-primary {
          display: inline-block;
          background: #284A34;
          color: #F5F0E8;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          border-radius: 3px;
          transition: background 0.2s;
        }
        .about-cta-btn-primary:hover {
          background: #1C2E1E;
        }
        .about-cta-btn-secondary {
          display: inline-block;
          color: #284A34;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.9rem 2rem;
          border-radius: 3px;
          border: 1.5px solid rgba(40,74,52,0.3);
          transition: border-color 0.2s, color 0.2s;
        }
        .about-cta-btn-secondary:hover {
          border-color: #284A34;
          color: #1C2E1E;
        }
      `}</style>
    </>
  );
}
