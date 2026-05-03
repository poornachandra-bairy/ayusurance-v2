'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const DOSHAS = [
  { name: 'Vata', src: '/vata.png', vertY: -95, desc: 'Space & Air. Governs movement, breathing, and the nervous system.' },
  { name: 'Pitta', src: '/pitta.png', vertY: 0, desc: 'Fire & Water. Governs digestion, metabolism, and energy production.' },
  { name: 'Kapha', src: '/kapha.png', vertY: 95, desc: 'Water & Earth. Governs structure, lubrication, and immunity.' }
];

const ELEMENTS = [
  { name: 'Akasha', src: '/akasha.png', desc: 'Space. The infinite, empty container for all other elements.' },
  { name: 'Vayu', src: '/vayu.png', desc: 'Air. The principle of movement, flow, and kinetic energy.' },
  { name: 'Agni', src: '/agni.png', desc: 'Fire. The force of transformation, heat, and digestion.' },
  { name: 'Jala', src: '/jala.png', desc: 'Water. The principle of cohesion, fluid, and cooling.' },
  { name: 'Prithvi', src: '/bhumi.png', desc: 'Earth. The solid, stable, and foundational force.' }
];

const RishiMandala = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const playState = isScrolled && !hoveredNode ? 'running' : 'paused';

  return (
    <div className="relative flex items-center justify-center w-full h-full min-h-[600px] animate-mandalaFloat">

      {/* ── Outer Mandala Ring (CCW) ── */}
      <div 
        className="absolute w-[600px] h-[600px] pointer-events-none transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
        style={{ 
          animation: 'mandalaSpinCCW 60s linear infinite', 
          animationPlayState: playState,
          opacity: isScrolled ? 0.15 : 0.05,
          transform: `scale(${isScrolled ? 1 : 0.8})`,
        }}
      >
        <Image src="/mandala-3.png" alt="Outer Mandala" fill className="object-contain" unoptimized loading="eager" priority />
      </div>

      {/* ── Inner Mandala Ring (CW) ── */}
      <div 
        className="absolute w-[450px] h-[450px] pointer-events-none transition-all duration-1000 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
        style={{ 
          animation: 'mandalaSpinCW 45s linear infinite', 
          animationPlayState: playState,
          opacity: isScrolled ? 0.20 : 0.05,
          transform: `scale(${isScrolled ? 1 : 0.85})`,
        }}
      >
        <Image src="/mandala-2.png" alt="Inner Mandala" fill className="object-contain" unoptimized />
      </div>

      {/* ── Center Mandala (CCW) ── */}
      <div 
        className="absolute w-[300px] h-[300px] pointer-events-none transition-all duration-1000 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)]" 
        style={{ 
          animation: 'mandalaSpinCCW 30s linear infinite', 
          animationPlayState: playState,
          opacity: isScrolled ? 0.25 : 0.4,
          transform: `scale(1)`,
        }}
      >
        <Image src="/mandala-1.png" alt="Center Mandala" fill className="object-contain" unoptimized />
      </div>

      {/* ── Center: Rishi ── */}
      <div 
        className="absolute z-30 flex items-center justify-center w-40 h-40 transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-auto" 
        style={{ 
          transform: `scale(${isScrolled ? 1 : 1.1})`,
        }}
      >
        <Image 
          src="/rishi.png" 
          alt="Rishi" 
          width={160} 
          height={160} 
          className="object-contain pointer-events-none relative z-10 transition-all duration-1000 drop-shadow-[0_0_15px_rgba(201,168,108,0.5)]" 
          unoptimized
        />
      </div>

      {/* ── Inner Ring: 3 Doshas ── */}
      <div className="absolute z-40 w-full h-full pointer-events-none">
        {DOSHAS.map((dosha, i) => {
          const targetY = isScrolled ? 0 : dosha.vertY;
          const currentScale = isScrolled ? 0 : 1;
          
          return (
            <div 
              key={dosha.name}
              className={`absolute left-1/2 top-1/2 w-16 h-16 -ml-8 -mt-8 flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-auto`}
              style={{ 
                transform: `translate(0px, ${targetY}px) scale(${currentScale})`,
                opacity: currentScale,
              }}
              onMouseEnter={() => setHoveredNode(dosha.name)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div className="w-full h-full relative group cursor-pointer transition-transform hover:scale-110">
                <div className="absolute inset-0 bg-[#C9A86C]/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image 
                  src={dosha.src} 
                  alt={dosha.name} 
                  fill 
                  className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]" 
                  unoptimized
                />

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-3 bg-[#0A140C]/90 border border-[#C9A86C]/30 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <h4 className="text-[#C9A86C] font-display italic text-base mb-1">{dosha.name}</h4>
                  <p className="text-white/70 text-xs font-light leading-relaxed">{dosha.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Outer Ring: 5 Panchamahabhutas ── */}
      <div 
        className="absolute z-50 w-full h-full pointer-events-none" 
        style={{ 
          animation: 'mandalaSpinCCW 60s linear infinite',
          animationPlayState: playState
        }}
      >
        {ELEMENTS.map((element, i) => {
          const angle = (i * 360) / ELEMENTS.length;
          const rad = (angle * Math.PI) / 180;
          const radius = 240; 
          const circleX = Math.sin(rad) * radius;
          const circleY = -Math.cos(rad) * radius;

          const targetX = isScrolled ? circleX : 0;
          const targetY = isScrolled ? circleY : 0;
          
          const currentScale = isScrolled ? 1 : 0.2;
          const currentOpacity = isScrolled ? 1 : 0;
          const currentBlur = 'blur(0px)';

          return (
            <div 
              key={element.name}
              className={`absolute left-1/2 top-1/2 w-20 h-20 -ml-10 -mt-10 flex flex-col items-center justify-center transition-all duration-[1.5s] ease-[cubic-bezier(0.34,1.56,0.64,1)] pointer-events-auto`}
              style={{ 
                transform: `translate(${targetX}px, ${targetY}px) scale(${currentScale})`,
                opacity: currentOpacity,
                filter: currentBlur,
                transitionDelay: isScrolled ? `${300 + i * 100}ms` : '0ms'
              }}
              onMouseEnter={() => setHoveredNode(element.name)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div 
                style={{ 
                  animation: 'mandalaSpinCW 60s linear infinite',
                  animationPlayState: playState
                }} 
                className="w-full h-full relative group cursor-pointer transition-transform hover:scale-110"
              >
                <div className="absolute inset-0 bg-[#C9A86C]/10 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <Image 
                  src={element.src} 
                  alt={element.name} 
                  fill 
                  className="object-contain opacity-80 group-hover:opacity-100 transition-all drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]" 
                  unoptimized
                />

                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-48 p-3 bg-[#0A140C]/90 border border-[#C9A86C]/30 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                  <h4 className="text-[#C9A86C] font-display italic text-base mb-1">{element.name}</h4>
                  <p className="text-white/70 text-xs font-light leading-relaxed">{element.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Global Glow */}
      <div 
        className="absolute z-0 w-[400px] h-[400px] rounded-full pointer-events-none transition-all duration-1000" 
        style={{ 
          background: 'rgba(201,168,108,0.1)',
          filter: 'blur(100px)',
          transform: `scale(${isScrolled ? 1 : 0.5})` 
        }} 
      />

    </div>
  );
};

export default RishiMandala;
