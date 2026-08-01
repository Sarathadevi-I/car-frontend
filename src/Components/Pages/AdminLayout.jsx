import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Car, LogOut } from "lucide-react";
import Logo from "../../assets/logo.png";

const NAV_ITEMS = [
  { label: "Bookings", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Vehicles", to: "/admin/vehicles", icon: Car },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* ── Sidebar ── */}
      <div style={{ width: 240, background: "#0C2340", display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "22px 20px" }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <img src={Logo} alt="DA Cars" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 15, color: "#fff", margin: 0 }}>DA Cars</p>
            <p style={{ fontSize: 10, color: "#93C5FD", margin: 0, fontWeight: 600 }}>ADMIN PANEL</p>
          </div>
        </div>

        <div style={{ flex: 1, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV_ITEMS.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
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
  );
}