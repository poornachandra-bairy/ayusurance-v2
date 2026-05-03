'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/Navbar';
import HomeFooter from './components/HomeFooter';
import RishiMandala from './components/RishiMandala';
import SectionStripes from './components/SectionStripes';

// ── UTILITY: SOFT FADE COMPONENT ──
const FadeIn = ({ children, delay = 0, className = '' }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[1.2s] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};





export default function Home() {
  const OFFERINGS = [
    { t: 'Virtual Consultations', d: 'Private Ayurvedic guidance from experienced Vaidyas, wherever you are.' },
    { t: 'Screening & Planning', d: 'A clinical review of your suitability, followed by a personalised care plan.' },
    { t: 'Panchakarma Prep', d: 'Readiness guidance, orientation, and travel support before your program begins.' },
    { t: 'Continuity of Care', d: 'Follow-up support and long-term wellness direction beyond the first treatment.' },
  ];

  return (
    <>
      {/* ── CUSTOM ANIMATIONS ── */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .animate-slow-zoom { animation: slow-zoom 28s ease-in-out infinite; }

        @keyframes scroll-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(8px); opacity: 1; }
        }
        .animate-scroll-bounce { animation: scroll-bounce 2s ease-in-out infinite; }

        header {
          background: linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 100%) !important;
        }
        header * { color: white !important; }
      `}} />

      <Navbar />
      <main className="bg-[#FAF8F5] text-[#2C3A32] min-h-screen selection:bg-[#4A5D52]/20 selection:text-[#2C3A32] font-sans antialiased overflow-x-clip">
        <div className="moringa-noise" />
        {/* ── PINNED HERO WRAPPER ── */}
        <div className="h-[200vh] relative w-full">
          <section className="sticky top-0 w-full h-screen overflow-hidden">
          {/* Background image with moderate dark overlay */}
          <div className="absolute inset-0">
            <img src="/home_hero-bg.png" alt="Ayurvedic sanctuary" className="w-full h-full object-cover animate-slow-zoom" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, rgba(10,20,12,0.40) 0%, rgba(10,20,12,0.25) 50%, rgba(10,20,12,0.50) 100%)' }} />
          </div>

          {/* Smooth left-to-right dark gradient for text readability */}
          <div className="absolute inset-y-0 left-0 w-full md:w-[70%] bg-gradient-to-r from-[#0A140C]/70 via-[#0A140C]/20 to-transparent z-[4] pointer-events-none" />

          {/* Elegant Geometric Rings Animation */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 -translate-x-[40%] w-[800px] h-[800px] md:w-[1200px] md:h-[1200px] z-[5] pointer-events-none flex items-center justify-center opacity-50">
            {/* Outer dashed gold ring */}
            <div className="absolute inset-0 rounded-full border-[1px] border-[#C9A86C]/40 border-dashed animate-[spin_120s_linear_infinite]" />
            {/* Inner solid green ring */}
            <div className="absolute inset-[4%] rounded-full border-[1px] border-[#284A34]/50 animate-[spin_90s_linear_infinite_reverse]" />
            {/* Third delicate ring */}
            <div className="absolute inset-[8%] rounded-full border-[1px] border-[#C9A86C]/20 animate-[spin_60s_linear_infinite]" />
          </div>

          {/* Content — split layout: brand top-left, tagline center-left, ctas bottom-left */}
          <div className="relative z-10 h-full max-w-[1400px] mx-auto px-8 md:px-16 flex flex-col justify-between py-28">



            {/* Center: Main headline */}
            <div className="flex-1 flex flex-col justify-center relative">

              <h1 className="font-display mb-8">
                <span className="block italic text-[4rem] md:text-[7rem] lg:text-[9vw] leading-[0.88] tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '2px #F5F0E8', WebkitTextFillColor: 'transparent' }}>
                  Ancient Wisdom.
                </span>
                <span className="block italic text-[4rem] md:text-[7rem] lg:text-[9vw] leading-[0.88] tracking-tight" style={{ color: 'transparent', WebkitTextStroke: '2px #C9A86C', WebkitTextFillColor: 'transparent' }}>
                  Modern Care.
                </span>
              </h1>

              <p className="font-body text-white/60 text-lg md:text-xl max-w-lg font-light leading-relaxed mt-6">
                A private, structured gateway to authentic Ayurveda — connecting patients with trusted Vaidyas, care planning, and healing destinations worldwide.
              </p>

              {/* Right side: Rishi Mandala (Absolute overlay, does not affect text) */}
              <div className="hidden lg:block absolute right-[10%] lg:right-[15%] xl:right-[18%] top-1/2 -translate-y-1/2 scale-[0.85] xl:scale-[0.95] z-10 pointer-events-none">
                <RishiMandala />
              </div>
            </div>

            {/* Bottom: CTAs + scroll */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="flex flex-row gap-4 items-center">
                <Link href="/patient-journey" className="font-body px-8 py-4 bg-[#C9A86C] hover:bg-[#B8965A] text-[#0A140C] uppercase tracking-widest text-xs font-bold transition-all hover:-translate-y-1">
                  Begin Your Journey
                </Link>
                <Link href="/offerings" className="font-body px-8 py-4 border border-white/30 hover:border-white/60 text-white uppercase tracking-widest text-xs font-medium transition-all hover:-translate-y-1">
                  Our Offerings
                </Link>
              </div>

              {/* Scroll indicator */}
              <div className="flex items-center gap-3 animate-scroll-bounce">
                <div className="w-px h-10 bg-white/25" />
                <span className="font-body text-white/35 text-xs tracking-[0.25em] uppercase">Scroll to explore</span>
              </div>
            </div>
          </div>

          {/* ── HERO STRIP ── */}
          <div className="absolute bottom-0 left-0 right-0 z-20" style={{background: 'rgba(245,240,232,0.92)', backdropFilter: 'blur(12px)', borderTop: '1px solid rgba(201,168,108,0.35)'}}>
            <div className="max-w-[1400px] mx-auto px-8 md:px-16 py-4 flex items-center gap-6 overflow-x-auto">
              <span className="font-body text-[0.6rem] tracking-[0.28em] uppercase whitespace-nowrap shrink-0" style={{color:"rgba(44,58,50,0.55)"}}>Ayusurance</span>
              <div className="w-px h-4 shrink-0" style={{background:"rgba(44,58,50,0.15)"}} />
              {['Sadaika Healthcare', 'Udupi, India', 'Global Patients', 'Classical Protocols', 'Panchakarma Specialists'].map((item, i, arr) => (
                <span key={item} className="flex items-center gap-6">
                  <span className="font-body text-[0.7rem] tracking-[0.15em] uppercase whitespace-nowrap" style={{color:"rgba(44,58,50,0.90)"}}>{item}</span>
                  {i < arr.length - 1 && <span className="text-xs" style={{color:"rgba(201,168,108,0.60)"}}>·</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
        </div>


        {/* ── INTRO ── */}
        <section className="py-32 px-6 relative z-10 bg-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[#FAF6F0] z-[-2]" />
          <SectionStripes colors={['#A8B5A9', '#C9A86C', '#2C3A32']} />
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-serif leading-[1.4] text-[#2C3A32]">
                We are building a care experience that makes authentic Ayurvedic healing more <span className="italic text-[#A38F72]">accessible, coordinated,</span> and reassuring for patients across the world.
              </h2>
            </FadeIn>
          </div>
        </section>

        {/* ── OFFERINGS: INTERACTIVE LIST ── */}
        <section className="py-32 px-6 relative z-10 border-y border-[#2C3A32]/5 bg-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[#F4EFE6] z-[-2]" />
          <SectionStripes colors={['#C9A86C', '#2C3A32', '#A8B5A9']} reversed />
          <div className="max-w-[1300px] mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
              <FadeIn className="lg:w-1/3 lg:sticky lg:top-32 h-fit">
                <span className="block text-[#A38F72] tracking-[0.2em] uppercase text-xs font-semibold mb-4">What We Offer</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C3A32]">Comprehensive Pathways</h2>
                <p className="text-lg text-[#5A665D] font-light leading-relaxed mb-8">
                  Ayusurance supports the full healing pathway—combining traditional depth with a structured, patient-friendly experience.
                </p>
                <div className="w-16 h-px bg-[#A38F72]/50" />
              </FadeIn>

              <div className="lg:w-2/3 flex flex-col">
                {OFFERINGS.map((item, i) => (
                  <FadeIn key={i} delay={i * 100}>
                    <div className="group flex flex-col md:flex-row md:items-center gap-6 border-b border-[#2C3A32]/10 py-10 cursor-pointer transition-all hover:pl-6 hover:border-[#A38F72]">
                      <span className="text-2xl font-serif italic text-[#A38F72]/50 group-hover:text-[#A38F72] transition-colors md:w-16">0{i + 1}</span>
                      <div className="flex-1">
                        <h3 className="text-3xl font-serif mb-3 text-[#2C3A32] group-hover:text-[#A38F72] transition-colors">{item.t}</h3>
                        <p className="text-lg text-[#5A665D] font-light leading-relaxed max-w-xl">{item.d}</p>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-[#2C3A32]/10 group-hover:border-[#A38F72] group-hover:bg-[#A38F72] group-hover:text-white transition-all transform -translate-x-4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                      </div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HEALING CENTERS: ELEGANT OVERLAPS ── */}
        <section className="py-40 px-6 relative z-10 bg-transparent overflow-hidden">
          <SectionStripes colors={['#2C3A32', '#A8B5A9', '#C9A86C']} />
          <div className="max-w-[1300px] mx-auto">
            <FadeIn>
              <div className="text-center mb-32">
                <span className="block text-[#A38F72] tracking-[0.2em] uppercase text-xs font-semibold mb-4">Locations</span>
                <h2 className="text-5xl md:text-6xl font-serif text-[#2C3A32]">Our Healing Network</h2>
              </div>
            </FadeIn>

            <div className="flex flex-col gap-40">
              {/* UVA Sands - India */}
              <FadeIn className="relative flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-[60%] rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl relative z-0">
                  <img src="/home_UVA-Sands.png" alt="UVA Sands Healing Center" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                </div>
                {/* Overlapping Text Card */}
                <div className="w-full lg:w-[45%] lg:-ml-[5%] relative z-10 mt-8 lg:mt-0 transform transition-transform hover:-translate-y-2 duration-500">
                  <div className="bg-[#FAF8F5]/95 backdrop-blur-xl p-10 md:p-16 rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                    <span className="block text-[#A38F72] tracking-[0.2em] uppercase text-xs font-semibold mb-4">India</span>
                    <h3 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C3A32]">UVA Sands</h3>
                    <p className="text-lg text-[#5A665D] font-light leading-relaxed mb-8">
                      Offering a grounded setting for patients seeking deeper restorative care and Panchakarma-based healing experiences. Rooted deeply in traditional practices.
                    </p>
                    <a href="https://uvasands.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#2C3A32] hover:text-[#A38F72] font-semibold transition-colors uppercase tracking-widest text-xs">
                      View Center <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </a>
                  </div>
                </div>
              </FadeIn>

              {/* Montagne Alternative - Switzerland */}
              <FadeIn className="relative flex flex-col lg:flex-row-reverse items-center">
                <div className="w-full lg:w-[60%] rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl relative z-0">
                  <img src="/home_montagne.jpg" alt="Montagne Alternative Healing Center" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[2s]" />
                </div>
                {/* Overlapping Text Card */}
                <div className="w-full lg:w-[45%] lg:-mr-[5%] relative z-10 mt-8 lg:mt-0 transform transition-transform hover:-translate-y-2 duration-500">
                  <div className="bg-[#FAF8F5]/95 backdrop-blur-xl p-10 md:p-16 rounded-2xl border border-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-left lg:text-right">
                    <span className="block text-[#A38F72] tracking-[0.2em] uppercase text-xs font-semibold mb-4">Switzerland</span>
                    <h3 className="text-4xl md:text-5xl font-serif mb-6 text-[#2C3A32]">Montagne Alternative</h3>
                    <p className="text-lg text-[#5A665D] font-light leading-relaxed mb-8 lg:ml-auto">
                      A quiet, nature-connected mountain destination with renovated historic barns and a restorative alpine atmosphere, perfect for immersive wellness.
                    </p>
                    <a href="https://montagne-alternative.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#2C3A32] hover:text-[#A38F72] font-semibold transition-colors uppercase tracking-widest text-xs lg:flex-row-reverse">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="rotate-180 lg:rotate-0"><path d="M5 12h14M12 5l7 7-7 7" /></svg> View Center
                    </a>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── THE JOURNEY: STAGGERED REVEAL ── */}
        <section className="py-32 px-6 relative z-10 text-[#F0EBE1] bg-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[#284A34] z-[-2]" />
          <SectionStripes colors={['#F0EBE1', '#C9A86C', '#A8B5A9']} reversed />
          <div className="max-w-[1200px] mx-auto">
            <FadeIn className="text-center mb-24">
              <span className="block text-[#A38F72] tracking-[0.2em] uppercase text-xs font-semibold mb-4">The Process</span>
              <h2 className="text-4xl md:text-6xl font-serif">A Thoughtful Journey</h2>
            </FadeIn>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative">
              <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-px bg-[#F0EBE1]/10 z-0" />
              {[
                { n: '01', t: 'First Inquiry' },
                { n: '02', t: 'Eligibility' },
                { n: '03', t: 'Health Profiling' },
                { n: '04', t: 'Planning' },
                { n: '05', t: 'Preparation' },
                { n: '06', t: 'Treatment' }
              ].map((step, i) => (
                <FadeIn key={i} delay={i * 150} className="flex flex-col items-center text-center relative z-10 group">
                  <div className="w-20 h-20 rounded-full bg-[#284A34] border border-[#F0EBE1]/20 flex items-center justify-center mb-6 group-hover:border-[#A38F72] group-hover:bg-[#A38F72] transition-colors duration-500">
                    <span className="text-xl font-serif italic text-[#A38F72] group-hover:text-white transition-colors">{step.n}</span>
                  </div>
                  <h4 className="text-lg font-medium tracking-wide">{step.t}</h4>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SHLOKAS ── */}
        <section className="py-40 px-6 relative z-10 border-b border-[#2C3A32]/5 bg-transparent overflow-hidden">
          <SectionStripes colors={['#A8B5A9', '#2C3A32', '#C9A86C']} />
          <div className="max-w-[1000px] mx-auto">
            <FadeIn className="text-center mb-24">
              <span className="block text-[#A38F72] tracking-[0.2em] uppercase text-xs font-semibold mb-4">Foundational Wisdom</span>
            </FadeIn>

            <div className="flex flex-col gap-24">
              <FadeIn className="flex flex-col gap-6 text-center">
                <p className="font-serif italic text-2xl md:text-3xl text-[#2C3A32] leading-snug">
                  “हिताहितं सुखं दुःखमायुस्तस्य हिताहितम् | मानं च तच्च यत्रोक्तमायुर्वेदः स उच्यते”
                </p>
                <p className="text-lg text-[#5A665D] font-light leading-relaxed max-w-2xl mx-auto">
                  Ayurveda teaches how to live in a way that keeps you healthy and happy by explaining what is good and bad for life, and what helps or harms long life.
                </p>
              </FadeIn>

              <div className="w-24 h-px bg-[#2C3A32]/10 mx-auto" />

              <FadeIn className="flex flex-col gap-6 text-center">
                <p className="font-serif italic text-2xl md:text-3xl text-[#2C3A32] leading-snug">
                  “समदोषः समाग्निश्च समधातुमलक्रियः । प्रसन्नात्मेन्द्रियमनाः स्वस्थ इत्यभिधीयते”
                </p>
                <p className="text-lg text-[#5A665D] font-light leading-relaxed max-w-2xl mx-auto">
                  True health means a balanced body, proper digestion, clear waste removal, and a peaceful mind, senses, and soul.
                </p>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="py-40 px-6 relative z-10 text-center bg-transparent overflow-hidden">
          <SectionStripes colors={['#C9A86C', '#A8B5A9', '#2C3A32']} reversed />
          <FadeIn className="max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif text-[#2C3A32] mb-8">Ready to begin?</h2>
            <p className="text-xl text-[#5A665D] font-light mb-12">
              Explore consultations, treatment pathways, and healing destinations designed to support you with clarity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/patient-journey" className="px-10 py-5 bg-[#4A5D52] hover:bg-[#38483F] text-white rounded-md uppercase tracking-widest text-xs font-medium transition-all shadow-lg hover:-translate-y-1">
                Start Your Journey
              </Link>
              <Link href="/contact" className="px-10 py-5 bg-transparent hover:bg-black/5 text-[#2C3A32] border border-[#2C3A32]/20 rounded-md uppercase tracking-widest text-xs font-medium transition-all hover:-translate-y-1">
                Speak With Us
              </Link>
            </div>
          </FadeIn>
        </section>

      </main>
      <HomeFooter />
    </>
  );
}
