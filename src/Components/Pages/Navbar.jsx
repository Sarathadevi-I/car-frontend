import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.png"

const NAV_LINKS = [
  { label: "Home",         to: "/" },
  { label: "Vehicles",     to: "/vehicles" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About Us",     to: "/about" },
  { label: "Contact Us",   to: "/contact" },
];

function useScrolled(threshold = 20) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);
  return scrolled;
}

function Navbar() {
  const scrolled = useScrolled();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  // ⬇️ NEW: auto scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleAdminClick = () => {
    setMenuOpen(false);
    navigate("/admin/login");
  };

  const isAdminActive = location.pathname.startsWith("/admin");

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "#fff", borderBottom: "1px solid #E8EFF8",
        boxShadow: scrolled ? "0 2px 20px rgba(12,35,64,0.07)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", height: 68, gap: 0,
      }}>

        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 0, textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: 90, height: 90, borderRadius: 10, 
            display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden",
          }}>
            <img src={Logo} alt="DA Cars" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: "#0C2340", letterSpacing: "-0.4px" }}>DA Cars</span>

          </div>
        </Link>

        <div style={{ flex: 1 }} />

        {/* Nav Links (desktop) */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 4, marginRight: 24, paddingTop: 6 }}>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link key={link.label} to={link.to} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
                color: isActive ? "#1A6FD4" : "#334155",
                textDecoration: "none", padding: "8px 14px", borderRadius: 8, transition: "0.2s",
                borderBottom: isActive ? "2px solid #1A6FD4" : "2px solid transparent",
              }}>
                {link.label}
              </Link>
            );
          })}

          {/* Admin — styled same as other nav links */}
          <button onClick={handleAdminClick} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500,
            color: isAdminActive ? "#1A6FD4" : "#334155",
            background: "none", border: "none", cursor: "pointer",
            padding: "8px 14px", borderRadius: 8, transition: "0.2s",
            borderBottom: isAdminActive ? "2px solid #1A6FD4" : "2px solid transparent",
          }}>
            Admin
          </button>
        </div>

        {/* Right: Phone + Book Now (desktop) */}
        <div className="hidden-mobile" style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <a href="tel:+919080202798"
            style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#EEF4FF", display: "flex", alignItems: "center", justifyContent: "center" }}>📞</div>
            <div>
              <p style={{ fontSize: 10, color: "#94A3B8", margin: 0 }}>Need help?</p>
              <p style={{ fontSize: 13, color: "#0C2340", margin: 0, fontWeight: 700 }}>+91 90802 02798</p>
            </div>
          </a>

        <Link to="/vehicles" style={{
  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13,
  background: "#FF6B2B", color: "#fff", padding: "10px 22px",
  borderRadius: 50, textDecoration: "none", whiteSpace: "nowrap",
  marginLeft: 12,
}}>
  Book Now
</Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(o => !o)}
          style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            flexDirection: "column", gap: 5, padding: 8, marginLeft: "auto",
          }}
          aria-label="Toggle menu"
        >
          <span style={{ width: 24, height: 2, background: "#0C2340", borderRadius: 2, transition: "0.2s", transform: menuOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
          <span style={{ width: 24, height: 2, background: "#0C2340", borderRadius: 2, transition: "0.2s", opacity: menuOpen ? 0 : 1 }} />
          <span style={{ width: 24, height: 2, background: "#0C2340", borderRadius: 2, transition: "0.2s", transform: menuOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="show-mobile" style={{
          background: "#fff", borderTop: "1px solid #E8EFF8",
          padding: "12px 24px 20px", display: "flex", flexDirection: "column", gap: 2,
        }}>
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link key={link.label} to={link.to} onClick={() => setMenuOpen(false)} style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500,
                color: isActive ? "#1A6FD4" : "#334155",
                textDecoration: "none", padding: "12px 8px", borderRadius: 8,
                background: isActive ? "#EEF4FF" : "transparent",
              }}>
                {link.label}
              </Link>
            );
          })}

          <button onClick={handleAdminClick} style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 500, textAlign: "left",
            color: isAdminActive ? "#1A6FD4" : "#334155",
            background: isAdminActive ? "#EEF4FF" : "transparent", border: "none", cursor: "pointer",
            padding: "12px 8px", borderRadius: 8,
          }}>
            Admin
          </button>

          <a href="tel:+919080202798" style={{
            display: "flex", alignItems: "center", gap: 8, textDecoration: "none",
            padding: "12px 8px", marginTop: 6, borderTop: "1px solid #F1F5F9",
          }}>
            <span style={{ fontSize: 13, color: "#0C2340", fontWeight: 700 }}>📞 +91 90802 02798</span>
          </a>

          <Link to="/vehicles" onClick={() => setMenuOpen(false)} style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14,
            background: "#FF6B2B", color: "#fff", padding: "12px", textAlign: "center",
            borderRadius: 50, textDecoration: "none", marginTop: 10,
          }}>
            Book Now
          </Link>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .show-mobile { display: none; }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;