import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import AdminLayout from "./AdminLayout";

const API = `${import.meta.env.VITE_API_URL}/api/vehicles`;
const FILE_BASE = import.meta.env.VITE_API_URL; // backend origin, images served from /uploads

const EMPTY_FORM = { name: "", type: "SUV", price: "", trans: "Manual", fuel: "Petrol", ac: "Air Conditioner" };

export default function AdminVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("adminToken");

  useEffect(() => {
    if (!token) { navigate("/admin/login"); return; }
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setVehicles(data);
    } catch { alert("Failed to fetch vehicles"); }
    finally { setLoading(false); }
  };

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFiles([]);
    setPreviews([]);
    setModalOpen(true);
  };

  const openEditModal = (v) => {
    setEditingId(v._id);
    setForm({ name: v.name, type: v.type, price: v.price, trans: v.trans, fuel: v.fuel, ac: v.ac });
    setFiles([]);
    setPreviews(v.images.map((img) => `${FILE_BASE}${img}`));
    setModalOpen(true);
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => {
      const combined = [...prev, ...selected].slice(0, 4);
      setPreviews(combined.map((f) => URL.createObjectURL(f)));
      return combined;
    });
    e.target.value = ""; // allow re-selecting the same file again
  };

  const removeImage = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.price) {
      alert("Name and price are required");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("images", f));

      const url = editingId ? `${API}/${editingId}` : API;
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Save failed"); return; }

      await fetchVehicles();
      setModalOpen(false);
    } catch { alert("Save failed"); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      setVehicles((p) => p.filter((v) => v._id !== id));
      setDeleteId(null);
    } catch { alert("Delete failed"); }
  };

  return (
    <AdminLayout>
      <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');

          .av-page-pad { padding: 24px 24px 0; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
          .av-content-pad { max-width: 1200px; margin: 0 auto; padding: 20px 24px; }
          .av-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 18px; }

          @media (max-width: 640px) {
            .av-page-pad { padding: 18px 16px 0; }
            .av-content-pad { padding: 16px; }
            .av-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        {/* ── Page header ── */}
        <div className="av-page-pad">
          <div>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, fontSize: 22, color: "#0C2340", margin: 0 }}>Vehicles</h1>
            <p style={{ fontSize: 13, color: "#94A3B8", margin: "4px 0 0" }}>Manage the fleet shown on the website</p>
          </div>
          <button
            onClick={openAddModal}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 18px", borderRadius: 50, border: "none", background: "#1A6FD4", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}
          >
            <Plus size={16} /> Add Vehicle
          </button>
        </div>

        <div className="av-content-pad">
          {loading ? (
            <p style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>Loading vehicles...</p>
          ) : vehicles.length === 0 ? (
            <p style={{ textAlign: "center", padding: 40, color: "#94A3B8" }}>No vehicles added yet. Click "Add Vehicle" to get started.</p>
          ) : (
            <div className="av-grid">
              {vehicles.map((v) => (
                <div key={v._id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                  <div style={{ height: 160, background: "#F1F5F9", overflow: "hidden" }}>
                    {v.images?.[0] ? (
                      <img src={`${FILE_BASE}${v.images[0]}`} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#CBD5E1", fontSize: 12 }}>No image</div>
                    )}
                  </div>
                  <div style={{ padding: 16 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: "#0C2340", margin: "0 0 2px" }}>{v.name}</p>
                    <p style={{ fontSize: 12, color: "#94A3B8", margin: "0 0 8px" }}>{v.type} · ₹{v.price}/day</p>
                    <p style={{ fontSize: 11, color: "#94A3B8", margin: "0 0 12px" }}>{v.images?.length || 0} image(s)</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => openEditModal(v)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px 0", borderRadius: 8, border: "none", background: "#EEF4FF", color: "#1A6FD4", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        <Pencil size={13} /> Edit
                      </button>
                      <button onClick={() => setDeleteId(v._id)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "7px 0", borderRadius: 8, border: "none", background: "#FEE2E2", color: "#EF4444", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Add/Edit Modal ── */}
        {modalOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "28px 22px", width: "100%", maxWidth: 460, maxHeight: "90vh", overflowY: "auto", boxSizing: "border-box" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color: "#0C2340", margin: 0 }}>
                  {editingId ? "Edit Vehicle" : "Add Vehicle"}
                </h3>
                <button onClick={() => setModalOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}>
                  <X size={20} />
                </button>
              </div>

              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>Vehicle Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  placeholder="e.g. Maruti Suzuki Swift"
                  style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, boxSizing: "border-box", outline: "none" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>Type</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }}
                  >
                    {["SUV", "Sedan", "Hatchback"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>Price / day (₹)</label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
                    placeholder="1500"
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, boxSizing: "border-box", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>Transmission</label>
                  <select
                    value={form.trans}
                    onChange={(e) => setForm((p) => ({ ...p, trans: e.target.value }))}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }}
                  >
                    {["Manual", "Automatic"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 4 }}>Fuel</label>
                  <select
                    value={form.fuel}
                    onChange={(e) => setForm((p) => ({ ...p, fuel: e.target.value }))}
                    style={{ width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #E2E8F0", fontSize: 13, outline: "none" }}
                  >
                    {["Petrol", "Diesel", "CNG", "Electric"].map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 18 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: "#64748B", display: "block", marginBottom: 6 }}>
                  Images {editingId ? "(leave empty to keep existing)" : "(up to 4, first = homepage image)"}
                </label>
                <label style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  border: "1.5px dashed #C3D9F5", borderRadius: 10, padding: "16px", cursor: "pointer",
                  color: "#1A6FD4", fontSize: 13, fontWeight: 600, background: "#F8FBFF",
                }}>
                  <Upload size={16} /> Choose images
                  <input type="file" accept="image/*" multiple onChange={handleFileChange} style={{ display: "none" }} />
                </label>

                {previews.length > 0 && (
                  <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
                    {previews.map((src, i) => (
                      <div key={i} style={{ position: "relative" }}>
                        <img src={src} alt={`preview ${i}`} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, border: i === 0 ? "2px solid #1A6FD4" : "1px solid #E2E8F0" }} />
                        {i === 0 && (
                          <span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", background: "#1A6FD4", color: "#fff", fontSize: 8, padding: "1px 5px", borderRadius: 4, whiteSpace: "nowrap" }}>
                            main
                          </span>
                        )}
                        {i < files.length && (
                          <button
                            onClick={() => removeImage(i)}
                            style={{ position: "absolute", top: -6, right: -6, width: 18, height: 18, borderRadius: "50%", border: "none", background: "#EF4444", color: "#fff", fontSize: 11, lineHeight: 1, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {previews.length < 4 && files.length > 0 && (
                  <p style={{ fontSize: 11, color: "#94A3B8", marginTop: 6 }}>
                    {4 - previews.length} more image(s) can be added
                  </p>
                )}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{ flex: 1, padding: "11px", background: "#0C2340", color: "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "Saving..." : "Save Vehicle"}
                </button>
                <button onClick={() => setModalOpen(false)} style={{ flex: 1, padding: "11px", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Delete Confirm ── */}
        {deleteId && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 999, padding: 16 }}>
            <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", width: "100%", maxWidth: 380, textAlign: "center", boxSizing: "border-box" }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>🗑️</div>
              <h3 style={{ fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, color: "#0C2340", margin: "0 0 8px" }}>Delete Vehicle?</h3>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: "0 0 24px" }}>This will remove it from the website immediately.</p>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => handleDelete(deleteId)} style={{ flex: 1, padding: "11px", background: "#EF4444", color: "#fff", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Yes, Delete</button>
                <button onClick={() => setDeleteId(null)} style={{ flex: 1, padding: "11px", background: "#F1F5F9", color: "#64748B", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}