'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, NAV_CTA_LABEL, LOADER_BRAND_AYU, LOADER_BRAND_SUFFIX } from '../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSolutionsModal, setShowSolutionsModal] = useState(false);

  return (
    <>
      <nav className="fixed top-4 left-4 right-4 md:left-[5%] md:right-[5%] w-auto md:w-[90%] max-w-7xl mx-auto z-[100] h-[72px] bg-[#F9F9F4] rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.2)] border-[3px] border-white">
        <div className="flex items-center justify-between h-full px-6 md:px-8">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center no-underline select-none z-10 group px-2">
            <span className="font-display text-2xl md:text-[1.65rem] font-bold tracking-tight text-[#2A3F28] group-hover:text-[#111A13] transition-colors">
              Ayu<span className="text-[#C9A86C] font-normal italic">surance</span>
            </span>
          </Link>

          {/* Desktop Links (Center) */}
          <div className="hidden md:flex flex-1 justify-center gap-8 items-center">
            {NAV_LINKS.filter(link => link.href !== '/').map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-sans text-sm font-semibold tracking-wide no-underline text-[#516450] hover:text-[#4A6B48] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right CTA Area */}
          <div className="flex items-center gap-4">
            {/* Unified Actions Dropdown */}
            <div className="relative group hidden sm:block z-50">
              <button className="flex items-center gap-2 bg-[#4A6B48] hover:bg-[#3d5a40] hover:shadow-[0_0_20px_rgba(74,107,72,0.6)] hover:-translate-y-0.5 transition-all duration-300 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-md">
                Get Started
                <svg className="w-3.5 h-3.5 opacity-80 ml-0.5 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              
              {/* Hover Floating Card */}
              <div className="absolute top-[calc(100%+8px)] right-0 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100">
                <div className="bg-[#F9F9F4] rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.12)] border-[3px] border-white p-2 flex flex-col gap-1">
                  
                  {/* 1 — Book Consultation (darkest) */}
                  <Link href="#" onClick={(e) => e.preventDefault()} className="px-4 py-3 rounded-xl text-sm font-bold text-white bg-[#2A4A28] hover:bg-[#22391f] transition-colors flex items-center justify-between">
                    <span>{NAV_CTA_LABEL}</span>
                    <svg className="w-4 h-4 opacity-90 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  </Link>

                  {/* 2 — Our Solutions (dark-medium) */}
                  <button onClick={() => setShowSolutionsModal(true)} className="px-4 py-3 rounded-xl text-sm font-bold text-white bg-[#4A6B48] hover:bg-[#3d5a40] transition-colors flex items-center justify-between w-full">
                    <span>Our Solutions</span>
                    <svg className="w-4 h-4 opacity-90 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                  </button>

                  {/* 3 — Standard Login (light-medium) */}
                  <Link href="#" onClick={(e) => e.preventDefault()} className="px-4 py-3 rounded-xl text-sm font-bold text-white bg-[#7A9E78] hover:bg-[#6b8e69] transition-colors flex items-center justify-between">
                    <span>Standard Login</span>
                    <svg className="w-4 h-4 opacity-90 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  </Link>

                  {/* 4 — Register Vaidya (lightest) */}
                  <a href="https://ayusurance.com" target="_blank" rel="noopener noreferrer" className="px-4 py-3 rounded-xl text-sm font-bold text-[#152418] bg-[#C6F18D] hover:bg-[#b0db79] transition-colors flex items-center justify-between">
                    <span>Register Vaidya</span>
                    <svg className="w-4 h-4 opacity-80 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
                  </a>

                </div>
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full bg-[#EBF1E6] text-[#4A6B48] focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1'}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-[calc(100%+8px)] left-0 right-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden ${isOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-[#F9F9F4] rounded-[2rem] flex flex-col gap-2 p-6 shadow-2xl border-[3px] border-white mx-2">
            {NAV_LINKS.filter(link => link.href !== '/').map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setIsOpen(false)}
                className="px-4 py-3 font-sans text-base font-bold rounded-xl transition-colors no-underline text-[#516450] hover:bg-[#EBF1E6] hover:text-[#4A6B48]">
                {link.label}
              </Link>
            ))}
            
            <div className="h-px w-full bg-gray-200 my-2"></div>
            
            {/* Mobile Extra Links */}
            <button onClick={() => { setIsOpen(false); setShowSolutionsModal(true); }} className="px-4 py-3 font-sans text-base font-bold rounded-xl transition-colors text-left text-[#516450] hover:bg-[#EBF1E6] hover:text-[#4A6B48]">
              Our Solutions
            </button>
            <Link href="#" onClick={(e) => { e.preventDefault(); setIsOpen(false); }} className="px-4 py-3 font-sans text-base font-bold rounded-xl transition-colors no-underline text-[#516450] hover:bg-[#EBF1E6] hover:text-[#4A6B48]">
              Standard Login
            </Link>
            
            <a href="https://ayusurance.com" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)} className="mt-2 bg-[#C6F18D] text-[#152418] text-center py-4 rounded-[1.5rem] font-bold shadow-md">
              Register Vaidya
            </a>
            <Link href="#" onClick={(e) => { e.preventDefault(); setIsOpen(false); }} className="mt-2 bg-[#4A6B48] text-white text-center py-4 rounded-[1.5rem] font-bold shadow-md">
              {NAV_CTA_LABEL}
            </Link>
          </div>
        </div>
      </nav>

      {/* Our Solutions Modal */}
      {showSolutionsModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          onClick={() => setShowSolutionsModal(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative bg-[#F9F9F4] rounded-[2rem] shadow-[0_30px_80px_rgba(0,0,0,0.2)] border-[3px] border-white p-10 w-[90vw] max-w-xl flex flex-col gap-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setShowSolutionsModal(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            <div className="mb-2">
              <p className="text-xs font-bold tracking-[0.15em] uppercase text-[#4A6B48]/60 mb-1">Explore</p>
              <h2 className="font-display text-2xl font-bold text-[#2A3F28]">Our Solutions</h2>
            </div>

            {/* Solution 1 */}
            <Link
              href="https://ayusurance-1-0.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowSolutionsModal(false)}
              className="group flex items-center justify-between p-6 rounded-2xl bg-white border-2 border-[#EBF1E6] hover:border-[#4A6B48] hover:shadow-md transition-all no-underline"
            >
              <div className="flex items-center gap-5">
                <div className="w-32 h-20 rounded-2xl bg-[#3d3d38] shrink-0 flex items-center justify-center overflow-hidden px-3">
                  <svg viewBox="0 0 180 110" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* 4 squares grid mark */}
                    <rect x="12" y="12" width="18" height="18" rx="2" stroke="#F5A623" strokeWidth="2.2" fill="none"/>
                    <rect x="34" y="12" width="18" height="18" rx="2" stroke="#F5A623" strokeWidth="2.2" fill="none"/>
                    <rect x="12" y="34" width="18" height="18" rx="2" stroke="#F5A623" strokeWidth="2.2" fill="none"/>
                    <rect x="34" y="34" width="18" height="18" rx="2" stroke="#F5A623" strokeWidth="2.2" fill="none"/>
                    {/* wordmark: 'ayu' in orange, 'surance' in white */}
                    <text x="12" y="84" fontFamily="Georgia, serif" fontSize="18" fill="#F5A623" fontWeight="400">ayu</text>
                    <text x="46" y="84" fontFamily="Georgia, serif" fontSize="18" fill="#E8E8E8" fontWeight="400">surance</text>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-[#2A3F28] text-lg group-hover:text-[#4A6B48] transition-colors">Ayusurance Care Portal</p>
                  <p className="text-sm text-gray-400 mt-1">Panchakarma operations platform</p>
                </div>
              </div>
              <svg className="w-6 h-6 text-[#4A6B48] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>

            {/* Solution 2 */}
            <Link
              href="https://www.studywithshiva.com/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowSolutionsModal(false)}
              className="group flex items-center justify-between p-6 rounded-2xl bg-white border-2 border-[#EBF1E6] hover:border-[#4A6B48] hover:shadow-md transition-all no-underline"
            >
              <div className="flex items-center gap-5">
                <img src="/shiva-logo.png" alt="Study With Shiva" className="w-20 h-20 object-contain rounded-2xl bg-white shrink-0 p-1" />
                <div>
                  <p className="font-bold text-[#2A3F28] text-lg group-hover:text-[#4A6B48] transition-colors">Study With Shiva</p>
                  <p className="text-sm text-gray-400 mt-1">Ayurvedic learning platform</p>
                </div>
              </div>
              <svg className="w-6 h-6 text-[#4A6B48] opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0 ml-2" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
