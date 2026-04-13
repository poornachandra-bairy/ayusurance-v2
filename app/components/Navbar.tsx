const NAV_LINKS = [
  { label: "Home",            href: "/"                },
  { label: "About",           href: "/about"           },
  { label: "Offerings",       href: "/offerings"       },
  { label: "Patient Journey", href: "/patient-journey" },
  { label: "Contact",         href: "/contact"         },
];

export default function Navbar() {
  return (
    <nav
      style={{
        position: "fixed",
        top: "12px",
        left: "1.25rem",
        right: "1.25rem",
        zIndex: 100,
        height: "56px",
        display: "flex",
        alignItems: "center",
        padding: "0 1.75rem",
        justifyContent: "space-between",
        background: "rgba(136, 192, 216, 0.72)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.30)",
        boxShadow: "0 4px 24px rgba(30, 80, 60, 0.12), 0 1px 4px rgba(30,80,60,0.08)",
      }}
    >
      {/* Logo */}
      <a href="/" className="nav-logo">
        Ayusurance
      </a>

      {/* Center nav links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {NAV_LINKS.map((link) => (
          <a key={link.label} href={link.href} className="nav-link">
            {link.label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <button className="btn-primary btn-primary-sm">
        Book Consultation
      </button>
    </nav>
  );
}
