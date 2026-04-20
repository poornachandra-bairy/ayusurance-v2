'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, NAV_CTA_LABEL, SITE_NAME } from '../constants';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className='fixed top-3 left-3 right-3 md:left-5 md:right-5 z-[100] h-14 bg-ivory/80 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_10px_30px_rgba(95,119,80,0.08),0_2px_8px_rgba(168,132,62,0.08)]'>
      <div className='flex items-center justify-between h-full px-5 md:px-7'>
        <Link
          href='/'
          className='font-display font-semibold text-xl md:text-2xl text-forest-deep tracking-tight no-underline select-none z-10'
        >
          <div className='flex items-center gap-1'>
            <Image src={'/logo.png'} alt={SITE_NAME} width={32} height={32} />
            <div className='flex items-center -mt-[4px]'>
              <span className='text-gold-deep'>ayu</span>
              <span>surance</span>
            </div>
          </div>
        </Link>

        <div className='flex align-center gap-8'>
          <div className='hidden md:flex gap-8 items-center'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className='font-sans text-sm font-medium text-text-700 tracking-wide no-underline transition-colors duration-200 hover:text-gold-deep'
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className='flex items-center gap-3'>
            <Link
              href='/contact'
              className='hidden sm:inline-flex items-center px-4 py-1.5 md:px-5 md:py-2 rounded-xl text-xs md:text-sm font-medium text-white no-underline btn-gradient shadow-[0_10px_28px_rgba(168,132,62,0.22)] transition-transform duration-300 hover:-translate-y-0.5'
            >
              {NAV_CTA_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
