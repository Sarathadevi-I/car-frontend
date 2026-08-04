import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, LogOut, Menu, X } from "lucide-react";
import Logo from "../../assets/logo.png";

const NAV_ITEMS = [
  { label: "Bookings", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Vehicles", to: "/admin/vehicles", icon: Car },
];

const MOBILE_BREAKPOINT = 768;

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // if the window is resized back to desktop while the drawer is open, close it
  useEffect(() => {
    if (!isMobile) setSidebarOpen(false);
  }, [isMobile]);

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  const sidebarStyle = isMobile
    ? {
        width: 240,
        background: "#0C2340",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 1000,
        transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.25s ease",
      }
    : {
        width: 240,
        background: "#0C2340",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
      };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>

        {/* ── Mobile top bar (JS-controlled, only rendered on mobile) ── */}
        {isMobile && (
          <div
            style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "14px 16px", background: "#0C2340",
              position: "sticky", top: 0, zIndex: 900, width: "100%", boxSizing: "border-box",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, overflow: "hidden", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <img src={Logo} alt="DA Cars" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 14, color: "#fff", margin: 0 }}>DA Cars Admin</p>
            </div>
            <button
              onClick={() => setSidebarOpen(true)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        )}

        {/* ── Overlay (mobile only, closes sidebar on tap) ── */}
        {isMobile && sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999 }}
          />
        )}

        {/* ── Sidebar + Main content row ── */}
        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>

          {/* ── Sidebar ── */}
          <div style={sidebarStyle}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <img src={Logo} alt="DA Cars" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: "#fff", margin: 0 }}>DA Cars</p>
                  <p style={{ fontSize: 10, color: "#93C5FD", margin: 0, fontWeight: 600 }}>ADMIN PANEL</p>
                </div>
              </div>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  style={{ background: "none", border: "none", color: "#B9C6DC", cursor: "pointer" }}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
              {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
                const active = location.pathname === to;
                return (
                  <Link
                    key={to}
                    to={to}
                    onClick={() => setSidebarOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "11px 14px", borderRadius: 10, textDecoration: "none",
                      background: active ? "#1A6FD4" : "transparent",
                      color: active ? "#fff" : "#B9C6DC",
                      fontSize: 14, fontWeight: 600, transition: "background 0.2s",
                    }}
                  >
                    <Icon size={17} />
                    {label}
                  </Link>
                );
              })}
            </div>

            <div style={{ padding: 12 }}>
              <button
                onClick={logout}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 10,
                  padding: "11px 14px", borderRadius: 10, border: "none", cursor: "pointer",
                  background: "#EF4444", color: "#fff", fontSize: 14, fontWeight: 600,
                }}
              >
                <LogOut size={17} /> Logout
              </button>
            </div>
          </div>

          {/* ── Main content ── */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}