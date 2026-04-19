'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { NAV_LINKS, NAV_CTA_LABEL, SITE_NAME } from '../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-3 left-3 right-3 md:left-5 md:right-5 z-[100] h-14 bg-ivory/80 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_10px_30px_rgba(95,119,80,0.08),0_2px_8px_rgba(168,132,62,0.08)]">
      <div className="flex items-center justify-between h-full px-5 md:px-7">
        <Link 
          href="/" 
          className="font-display font-semibold text-xl md:text-2xl text-forest-deep tracking-tight no-underline select-none z-10"
        >
          {SITE_NAME}
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 items-center">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-medium text-text-700 tracking-wide no-underline transition-colors duration-200 hover:text-gold-deep"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center px-4 py-1.5 md:px-5 md:py-2 rounded-xl text-xs md:text-sm font-medium text-white no-underline bg-gradient-to-br from-[#b8934c] to-[#6c875b] shadow-[0_10px_28px_rgba(168,132,62,0.22)] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {NAV_CTA_LABEL}
          </Link>

          {/* Hamburger Icon */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none z-10"
            aria-label="Toggle Menu"
          >
            <span className={`block w-5 h-0.5 bg-forest-deep transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : 'mb-1'}`} />
            <span className={`block w-5 h-0.5 bg-forest-deep transition-all duration-300 ${isOpen ? 'opacity-0' : 'mb-1'}`} />
            <span className={`block w-5 h-0.5 bg-forest-deep transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`
        absolute top-[calc(100%+8px)] left-0 right-0 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] md:hidden
        ${isOpen ? 'max-h-[80vh] opacity-100 p-4' : 'max-h-0 opacity-0 p-0'}
      `}>
        <div className="bg-ivory/95 backdrop-blur-xl rounded-2xl border border-white/30 shadow-2xl flex flex-col gap-2 p-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 font-sans text-base font-medium text-text-700 hover:bg-forest/10 rounded-xl transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="mt-2 px-4 py-3 font-sans text-base font-semibold text-center text-white bg-gradient-to-br from-[#b8934c] to-[#6c875b] rounded-xl"
          >
            {NAV_CTA_LABEL}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
