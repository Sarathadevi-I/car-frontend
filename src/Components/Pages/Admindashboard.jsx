import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API = `${import.meta.env.VITE_API_URL}/api/admin`;

const STATUS_COLORS = {
  pending:   { bg: "#FEF9C3", color: "#854D0E" },
  contacted: { bg: "#DBEAFE", color: "#1E40AF" },
  confirmed: { bg: "#DCFCE7", color: "#166534" },
  cancelled: { bg: "#FEE2E2", color: "#991B1B" },
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [editModal, setEditModal] = useState(null); // booking being edited
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) { navigate("/admin/login"); return; }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401 || res.status === 403) { logout(); return; }
      const data = await res.json();
      setBookings(data);
    } catch { alert("Failed to fetch bookings"); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/bookings/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(p => p.filter(b => b._id !== id));
      setDeleteId(null);
    } catch { alert("Delete failed"); }
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`${API}/bookings/${editModal._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editModal),
      });
      const data = await res.json();
      setBookings(p => p.map(b => b._id === data.booking._id ? data.booking : b));
      setEditModal(null);
    } catch { alert("Update failed"); }
  };

  const logout = () => {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const filtered = filter === "all" ? bookings : bookings.filter(b => b.source === filter);

  const counts = {
    all: bookings.length,
    home: bookings.filter(b => b.source === "home").length,
    contact: bookings.filter(b => b.source === "contact").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        table { border-collapse: collapse; width: 100%; }
        th { background: #F1F5F9; color: #64748B; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; padding: 10px 14px; text-align: left; }
        td { padding: 12px 14px; font-size: 13px; color: #334155; border-bottom: 1px solid #F1F5F9; }
        tr:hover td { background: #F8FAFC; }
      `}</style>

      {/* ── Header ── */}
      <div style={{ background: "#0C2340", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "#1A6FD4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🚗</div>
          <div>
            <p style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 16, color: "#fff", margin: 0 }}>DriveX</p>
            <p style={{ fontSize: 10, color: "#93C5FD", margin: 0, fontWeight: 600 }}>ADMIN DASHBOARD</p>
          </div>
        </div>
        <button onClick={logout} style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 8, padding: "8px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Logout
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 24px" }}>

        {/* ── Stats ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total Bookings", val: bookings.length, color: "#1A6FD4" },
            { label: "Pending",        val: bookings.filter(b => b.status === "pending").length,   color: "#F59E0B" },
            { label: "Confirmed",      val: bookings.filter(b => b.status === "confirmed").length, color: "#10B981" },
            { label: "Cancelled",      val: bookings.filter(b => b.status === "cancelled").length, color: "#EF4444" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: 11, color: "#94A3B8", margin: "0 0 6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</p>
              <p style={{ fontSize: 28, fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>

        {/* ── Filter tabs + Refresh ── */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {[["all", "All"], ["home", "Homepage"], ["contact", "Contact Us"]].map(([val, label]) => (
              <button key={val} onClick={() => setFilter(val)} style={{
                padding: "7px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600,
                background: filter === val ? "#0C2340" : "#E2E8F0",
                color: filter === val ? "#fff" : "#64748B",
              }}>
                {label} ({counts[val] ?? 0})
              </button>
            ))}
          </div>
          <button onClick={fetchBookings} style={{ padding: "7px 16px", borderRadius: 20, border: "1.5px solid #E2E8F0", background: "#fff", fontSize: 13, fontWeight: 600, color: "#0C2340", cursor: "pointer" }}>
            ↻ Refresh
          </button>
        </div>

        {/* ── Table ── */}
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {loading ? (
            <p style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>Loading bookings...</p>
          ) : filtered.length === 0 ? (
            <p style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>No bookings found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Car Type</th>
                  <th>Service</th>
                  <th>Pickup</th>
                  <th>Drop</th>
                  <th>Rental Date</th>
                  <th>Return Date</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b, i) => (
                  <tr key={b._id}>
                    <td style={{ color: "#94A3B8", fontSize: 11 }}>{i + 1}</td>
                    <td style={{ fontWeight: 600, color: "#0C2340" }}>{b.name || "—"}</td>
                    <td>{b.phone || "—"}</td>
                    <td>{b.carType || "—"}</td>
                    <td>{b.serviceType || "—"}</td>
                    <td>{b.pickupLocation || "—"}</td>
                    <td>{b.dropLocation || "—"}</td>
                    <td>{b.rentalDate || "—"}</td>
                    <td>{b.returnDate || "—"}</td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                        background: b.source === "home" ? "#EEF4FF" : "#FFF7ED",
                        color: b.source === "home" ? "#1A6FD4" : "#FF6B2B" }}>
                        {b.source}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20,
                        ...(STATUS_COLORS[b.status] || { bg: "#F1F5F9", color: "#64748B" }),
                        background: STATUS_COLORS[b.status]?.bg }}>
                        {b.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setEditModal({ ...b })} style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: "#EEF4FF", color: "#1A6FD4", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Edit</button>
                        <button onClick={() => setDeleteId(b._id)} style={{ padding: "5px 12px", borderRadius: 8, border: "none", background: "#FEE2E2", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Edit Modal ── */}
      {editModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto" }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color: "#0C2340", margin: "0 0 20px" }}>Edit Booking</h3>
            {[
              ["name", "Name"], ["phone", "Phone"], ["carType", "Car Type"],
              ["serviceType", "Service Type"], ["pickupLocation", "Pickup"], ["dropLocation", "Drop"],
              ["rentalDate", "Rental Date"], ["returnDate", "Return Date"],
            ].map(([key, label]) => (
              <div key={key} style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>{label}</label>
                <input
                  value={editModal[key] || ""}
                  onChange={e => setEditModal(p => ({ ...p, [key]: e.target.value }))}
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, boxSizing: "border-box", outline: "none" }}
                />
              </div>
            ))}
            {/* Status */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>Status</label>
              <select value={editModal.status} onChange={e => setEditModal(p => ({ ...p, status: e.target.value }))}
                style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }}>
                {["pending", "contacted", "confirmed", "cancelled"].map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleEdit} style={{ flex: 1, padding: "11px", background: "#0C2340", color: "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Save Changes</button>
              <button onClick={() => setEditModal(null)} style={{ flex: 1, padding: "11px", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm ── */}
      {deleteId && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", width: "100%", maxWidth: 380, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color: "#0C2340", margin: "0 0 8px" }}>Delete Booking?</h3>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 24px" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: "11px", background: "#EF4444", color: "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Yes, Delete</button>
              <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "11px", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}