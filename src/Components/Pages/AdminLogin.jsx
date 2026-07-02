import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/logo.png"
import { Eye, EyeOff } from "lucide-react";
export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!form.username || !form.password) {
      setError("Please enter username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
 const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Invalid credentials");
      } else {
        sessionStorage.setItem("adminToken", data.token);
        navigate("/admin/dashboard");
      }
    } catch {
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f1f5f9",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: 100, paddingBottom: 40, paddingLeft: 16, paddingRight: 16,
      boxSizing: "border-box",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');`}</style>

      {/* Back to Home — sits above card, in normal flow */}
      <div style={{ width: "100%", maxWidth: 400, marginBottom: 16 }}>
        <Link to="/" style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, fontWeight: 600, color: "#64748B",
          textDecoration: "none", background: "#fff",
          padding: "8px 16px", borderRadius: 50,
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{
        background: "#fff", borderRadius: 20, padding: "40px 36px",
        width: "100%", maxWidth: 400,
        boxShadow: "0 8px 40px rgba(12,35,64,0.10)",
        boxSizing: "border-box",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28 }}>
         <img src={Logo} alt="DA Cars Logo" style={{
  width: 70, height: 70, borderRadius: 10, objectFit: "contain",
}} />
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 17, color: "#0C2340", margin: 0 }}>DA Cars</p>
            <p style={{ fontSize: 10, color: "#1A6FD4", margin: 0, fontWeight: 600, letterSpacing: "0.06em" }}>ADMIN PANEL</p>
          </div>
        </div>

        <h2 style={{ fontFamily: "'Plus Jakarta Sans'", fontSize: 22, fontWeight: 800, color: "#0C2340", margin: "0 0 4px" }}>
          Admin Login
        </h2>
        <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 24px" }}>Enter your credentials to continue</p>

        {/* Username */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6 }}>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            style={{
              width: "100%", padding: "10px 14px", borderRadius: 10,
              border: "1.5px solid #E2E8F0", fontSize: 14, color: "#0C2340",
              outline: "none", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Password */}
       {/* Password */}
<div style={{ marginBottom: 20 }}>
  <label style={{ fontSize: 12, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6 }}>Password</label>
  <div style={{ position: "relative" }}>
    <input
      type={showPassword ? "text" : "password"}
      placeholder="Enter password"
      value={form.password}
      onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
      onKeyDown={e => e.key === "Enter" && handleSubmit()}
      style={{
        width: "100%", padding: "10px 40px 10px 14px", borderRadius: 10,
        border: "1.5px solid #E2E8F0", fontSize: 14, color: "#0C2340",
        outline: "none", boxSizing: "border-box",
      }}
    />
 <button
  type="button"
  onClick={() => setShowPassword(p => !p)}
  style={{
    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
    background: "none", border: "none", cursor: "pointer", padding: 4,
    display: "flex", alignItems: "center", color: "#94A3B8",
  }}
  aria-label={showPassword ? "Hide password" : "Show password"}
>
  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
</button>
  </div>
</div>

        {/* Error */}
        {error && (
          <p style={{ fontSize: 12, color: "#EF4444", background: "#FEF2F2", padding: "8px 12px", borderRadius: 8, marginBottom: 14 }}>
            ⚠️ {error}
          </p>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            width: "100%", padding: "12px", background: loading ? "#94A3B8" : "#0C2340",
            color: "#fff", border: "none", borderRadius: 50,
            fontFamily: "'Plus Jakarta Sans'", fontWeight: 700, fontSize: 14,
            cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s",
          }}
        >
          {loading ? "Logging in..." : "Login →"}
        </button>

        <p style={{ textAlign: "center", fontSize: 11, color: "#CBD5E1", marginTop: 20 }}>
          🔒 Secured with JWT Authentication
        </p>
      </div>
    </div>
  );
}