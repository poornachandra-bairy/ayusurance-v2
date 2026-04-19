import Link from 'next/link';
import { NAV_LINKS, NAV_CTA_LABEL, SITE_NAME } from '../constants';

const Navbar = () => (
  <nav className="fixed top-3 left-5 right-5 z-[100] h-14 flex items-center px-7 justify-between bg-ivory/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_10px_30px_rgba(95,119,80,0.08),0_2px_8px_rgba(168,132,62,0.08)]">
    <Link href="/" className="font-display font-semibold text-2xl text-forest-deep tracking-tight no-underline select-none">
      {SITE_NAME}
    </Link>

    <div className="flex gap-8 items-center">
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

    <Link
      href="/contact"
      className="inline-flex items-center px-5 py-2 rounded-xl text-sm font-medium text-white no-underline bg-gradient-to-br from-[#b8934c] to-[#6c875b] shadow-[0_10px_28px_rgba(168,132,62,0.22)] transition-transform duration-300 hover:-translate-y-0.5"
    >
      {NAV_CTA_LABEL}
    </Link>
  </nav>
);

export default Navbar;
