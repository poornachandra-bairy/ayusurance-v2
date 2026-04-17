import { NAV_LINKS, NAV_CTA_LABEL, SITE_NAME } from '../constants';

const Navbar = () => (
  <nav className="fixed top-3 left-5 right-5 z-[100] h-14 flex items-center px-7 justify-between bg-sky/70 backdrop-blur-md rounded-2xl border border-white/30 shadow-nav">
    <a href="/" className="nav-logo">
      {SITE_NAME}
    </a>
    <div className="flex gap-8 items-center">
      {NAV_LINKS.map((link) => (
        <a key={link.label} href={link.href} className="nav-link">
          {link.label}
        </a>
      ))}
    </div>
    <button className="btn-primary btn-primary-sm">
      {NAV_CTA_LABEL}
    </button>
  </nav>
);

export default Navbar;
