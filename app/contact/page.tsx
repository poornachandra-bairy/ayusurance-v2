'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import HomeFooter from '../components/HomeFooter';
import SectionStripes from '../components/SectionStripes';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="contact-root">
        <div className="moringa-noise" />

        {/* ── HERO ── */}
        <section className="contact-hero">
          <div className="contact-hero-img-wrap">
            <Image src="/contact_hero.jpg" alt="Ayurvedic Reception — Sadaika Healthcare" fill priority className="contact-hero-img" sizes="100vw" />
            <div className="contact-hero-overlay" />
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

          <div className="contact-hero-inner">
            <div className="contact-hero-topbar justify-end">
              <span className="contact-hero-tagline">We are here for you.</span>
            </div>
            <div className="contact-hero-center relative z-10">
              <h1 className="contact-h1">
                <span style={{ color: 'transparent', WebkitTextStroke: '2px #F5F0E8', WebkitTextFillColor: 'transparent' }}>Come</span>
                <span style={{ color: 'transparent', WebkitTextStroke: '2px #C9A86C', WebkitTextFillColor: 'transparent' }}>Find Us.</span>
              </h1>
              <p className="contact-hero-sub">We are here to answer your questions, guide your next step, and connect you with the right care.</p>
            </div>
            <div className="contact-hero-bottom">
              <div className="contact-scroll-hint">
                <div className="contact-scroll-line" />
                <span className="contact-scroll-label">Scroll to explore</span>
              </div>
            </div>
          </div>
        
          {/* ── HERO STRIP ── */}
          <div className="contact-hero-strip">
            <div className="contact-hero-strip-inner">
              <span className="contact-hero-strip-label">Reach Us</span>
              <div className="contact-hero-strip-divider" />
              {['Udupi HQ', 'Clinical Enquiries', 'International', 'Partnerships', 'Wellness Network'].map((item, i, arr) => (
                <span key={item} className="contact-hero-strip-group">
                  <span className="contact-hero-strip-item">{item}</span>
                  {i < arr.length - 1 && <span className="contact-hero-strip-dot">·</span>}
                </span>
              ))}
            </div>
          </div>
          </section>

        {/* ── MAIN CONTENT SPLIT ── */}
        <section className="contact-body relative z-10 overflow-hidden" style={{ background: 'transparent' }}>
          <div className="absolute inset-0 bg-[#F5F0E8] z-[-2]" />
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#284A34']} />
          <div className="contact-body-inner">

            {/* LEFT — Info Column */}
            <div className="contact-left">

              <div className="contact-block">
                <span className="contact-block-label">Clinical Headquarters</span>
                <h2 className="contact-block-heading">Sadaika Healthcare</h2>
                <address className="contact-address">
                  Shri Manyu, Gundibail,<br />
                  Manipal Road, Udupi,<br />
                  Karnataka — 576102
                </address>
              </div>

              <div className="contact-divider" />

              <div className="contact-block">
                <span className="contact-block-label">Direct Line</span>
                <p className="contact-block-body">
                  Speak directly with our Ayurvedic consultants or care coordinators — no automated menus, no hold music.
                </p>
                <a href="tel:+919845702082" className="contact-phone-link">
                  +91 98457 02082
                </a>
              </div>

              <div className="contact-divider" />

              <div className="contact-block">
                <span className="contact-block-label">Hours of Reach</span>
                <div className="contact-hours">
                  <div className="contact-hours-row">
                    <span>Monday — Saturday</span>
                    <span>9 am – 6 pm</span>
                  </div>
                  <div className="contact-hours-row">
                    <span>Sunday</span>
                    <span>By appointment</span>
                  </div>
                </div>
              </div>

              <div className="contact-divider" />

              <div className="contact-block">
                <span className="contact-block-label">A Note</span>
                <blockquote className="contact-note">
                  "We believe good care starts with good listening. Whether you have a question, a concern, or simply want to understand what Ayurveda can do for you — we are here, unhurried."
                </blockquote>
              </div>

            </div>

            {/* RIGHT — Map Column */}
            <div className="contact-right">
              <div className="contact-map-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3881.821216040295!2d74.7682112!3d13.3613904!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbcbca58fbc6247%3A0x23f0062dd0000000!2sSadaika%20Healthcare%20OPC%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1776512436763!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="contact-map-iframe"
                />
              </div>
              <div className="contact-map-caption">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-map-pin">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>Sadaika Healthcare, Udupi, Karnataka</span>
              </div>
            </div>

          </div>
        </section>

      </main>
      <HomeFooter />

      <style>{`
        /* ── Root ── */
        .contact-root {
          min-height: 100vh;
          background: #F5F0E8;
          color: #1C2E1E;
          font-family: var(--font-sans);
          position: relative;
        }

        /* ── HERO ── */
        .contact-hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
        }
        .contact-hero-img-wrap {
          position: absolute;
          inset: 0;
        }
        .contact-hero-img {
          object-fit: cover;
          object-position: center 40%;
        }
        .contact-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(160deg, rgba(15,25,15,0.85) 0%, rgba(10,20,12,0.75) 50%, rgba(10,15,10,0.90) 100%);
        }
        .contact-hero-inner {
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
        .contact-hero-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .contact-hero-brand {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.90);
          letter-spacing: 0.55em;
          text-transform: uppercase;
          font-size: 0.85rem;
          font-weight: 600;
        }
        .contact-hero-tagline {
          font-family: var(--font-sans);
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-size: 0.72rem;
        }
        .contact-hero-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-hero-line {
          width: 4rem;
          height: 1px;
          background: #C9A86C;
          margin-bottom: 2.5rem;
          opacity: 0.85;
        }
        .contact-h1 {
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
        .contact-h1 span { display: block; white-space: nowrap; }
        .contact-hero-sub {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          color: rgba(245,240,232,0.65);
          max-width: 460px;
          line-height: 1.7;
          margin: 0;
          font-weight: 300;
        }
        .contact-hero-bottom {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .contact-scroll-hint {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          animation: scroll-bounce 2s ease-in-out infinite;
        }
        .contact-scroll-line {
          width: 1px;
          height: 2.5rem;
          background: rgba(255,255,255,0.25);
        }
        .contact-scroll-label {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.35);
        }

        
        .contact-hero-strip {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 20;
          border-top: 1px solid rgba(201,168,108,0.35);
          background: rgba(245,240,232,0.92);
          backdrop-filter: blur(12px);
        }
        .contact-hero-strip-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 1rem 7vw;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          overflow-x: auto;
        }
        .contact-hero-strip-label {
          font-family: var(--font-sans);
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.55);
          white-space: nowrap;
          flex-shrink: 0;
        }
        .contact-hero-strip-divider {
          width: 1px;
          height: 1rem;
          background: rgba(44,58,50,0.15);
          flex-shrink: 0;
        }
        .contact-hero-strip-group {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .contact-hero-strip-item {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(44,58,50,0.90);
          white-space: nowrap;
        }
        .contact-hero-strip-dot {
          color: rgba(201,168,108,0.60);
          font-size: 0.75rem;
        }

        /* ── BODY ── */
        .contact-body {
          background: #F5F0E8;
          padding: 6rem 0 5rem;
        }
        .contact-body-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 7vw;
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 6rem;
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-body-inner {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }

        /* ── LEFT ── */
        .contact-left {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .contact-block {
          padding: 2.5rem 0;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .contact-block-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #7A4028;
        }
        .contact-block-heading {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3vw, 2.8rem);
          font-weight: 500;
          color: #1C2E1E;
          letter-spacing: -0.02em;
          line-height: 1.1;
          margin: 0;
        }
        .contact-address {
          font-style: normal;
          font-size: 1.05rem;
          line-height: 1.85;
          color: rgba(28,46,30,0.7);
          font-weight: 400;
        }
        .contact-block-body {
          font-size: 0.92rem;
          line-height: 1.75;
          color: rgba(28,46,30,0.65);
          font-weight: 400;
          max-width: 420px;
          margin: 0;
        }
        .contact-phone-link {
          display: inline-block;
          font-family: var(--font-display);
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 500;
          color: #284A34;
          text-decoration: none;
          letter-spacing: -0.01em;
          border-bottom: 1.5px solid rgba(40,74,52,0.25);
          padding-bottom: 3px;
          width: fit-content;
          transition: color 0.2s, border-color 0.2s;
        }
        .contact-phone-link:hover {
          color: #7A4028;
          border-color: rgba(122,64,40,0.4);
        }
        .contact-divider {
          width: 100%;
          height: 1px;
          background: rgba(28,46,30,0.10);
        }
        .contact-hours {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .contact-hours-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: rgba(28,46,30,0.7);
          line-height: 1.5;
        }
        .contact-hours-row span:first-child {
          color: rgba(28,46,30,0.55);
        }
        .contact-hours-row span:last-child {
          font-weight: 500;
          color: #1C2E1E;
        }
        .contact-note {
          font-family: var(--font-display);
          font-size: clamp(1rem, 1.8vw, 1.3rem);
          font-style: italic;
          color: rgba(28,46,30,0.6);
          line-height: 1.55;
          margin: 0;
          font-weight: 400;
          border-left: 2px solid #D4A878;
          padding-left: 1.2rem;
        }

        /* ── RIGHT ── */
        .contact-right {
          position: sticky;
          top: 7rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        @media (max-width: 900px) {
          .contact-right {
            position: static;
          }
        }
        .contact-map-wrap {
          width: 100%;
          aspect-ratio: 4/5;
          border-radius: 4px;
          overflow: hidden;
          background: #E8E0D0;
          border: 1px solid rgba(28,46,30,0.1);
        }
        @media (max-width: 900px) {
          .contact-map-wrap {
            aspect-ratio: 16/10;
          }
        }
        .contact-map-iframe {
          width: 100%;
          height: 100%;
          filter: grayscale(0.1) sepia(0.15) contrast(1.05);
          transition: filter 0.5s ease;
        }
        .contact-map-iframe:hover {
          filter: none;
        }
        .contact-map-caption {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.7rem;
          letter-spacing: 0.06em;
          color: rgba(28,46,30,0.4);
          font-weight: 500;
        }
        .contact-map-pin {
          color: #7A4028;
          flex-shrink: 0;
          opacity: 0.7;
        }

        /* ── FOOTER STRIP ── */
        .contact-footer-strip {
          background: #1C2E1E;
          padding: 3.5rem 7vw;
        }
        .contact-footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }
        .contact-footer-text {
          font-size: 0.8rem;
          color: rgba(245,240,232,0.45);
          line-height: 1.65;
          max-width: 380px;
          margin: 0;
        }
        .contact-footer-links {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          flex-wrap: wrap;
        }
        .contact-footer-link {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(245,240,232,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .contact-footer-link:hover {
          color: #D4A878;
        }
        .contact-footer-dot {
          color: rgba(245,240,232,0.2);
          font-size: 1rem;
        }
      `}</style>
    </>
  );
}
