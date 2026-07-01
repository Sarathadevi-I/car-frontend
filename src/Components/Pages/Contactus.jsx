import React, { useState } from "react";

const INFO_CARDS = [
  {
    icon: "📍",
    label: "Address",
    value: "45, SH 49, Chinamudaliar Chavadi, Kottakuppam, Puducherry 605104",
    bg: "#FFF7ED",
    iconBg: "#FF6B2B",
  },
  {
    icon: "✉️",
    label: "Email",
    value: "drivex@gmail.com",
    bg: "#FFF7ED",
    iconBg: "#FF6B2B",
  },
  {
    icon: "📞",
    label: "Phone",
    value: "+91 90802 02798",
    bg: "#FFF7ED",
    iconBg: "#FF6B2B",
  },
  {
    icon: "🕐",
    label: "Opening Hours",
    value: "Open 24 Hours",
    bg: "#FFF7ED",
    iconBg: "#FF6B2B",
  },
];
const BLOG_POSTS = [
  {
    img: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80&fit=crop",
    title: "Best places to visit in Pondicherry by car",
    tag: "Travel",
    date: "10 June 2024",
  },
{
  img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80&fit=crop",
  title: "Why doorstep car delivery is the future of rentals",
  tag: "Tips",
  date: "5 June 2024",
},
{
  img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80&fit=crop",
  title: "How to plan a road trip from Pondicherry",
  tag: "Guide",
  date: "1 June 2024",
},]

const CAR_TYPES = ["Sedan", "SUV", "Hatchback", "Luxury"];
const SERVICE_TYPES = [
  "Doorstep Car Delivery",
  "Airport Pickup & Drop",
  "Tourist & Sightseeing Trip",
  "Outstation Trip",
  "Corporate Car Rental",
  "Event & Wedding Car",
]

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 10,
  border: "1.5px solid rgba(255,255,255,0.2)",
  background: "rgba(255,255,255,0.12)",
  color: "#fff",
  fontSize: 13,
  fontFamily: "'DM Sans', sans-serif",
  cursor: "pointer",
  colorScheme: "dark",
};

const placeholderColor = "rgba(255,255,255,0.55)";

export default function ContactUs() {
  const [form, setForm] = useState({
    carType: "",
    serviceType: "",
    pickupLocation: "",
    dropLocation: "",
    rentalDate: "",
    returnDate: "",
    name: "",
    phone: "",
  });

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const selectStyle = (val) => ({
    ...inputStyle,
    color: val ? "#fff" : placeholderColor,
  });

  const [errors, setErrors] = useState({});
  // ⬇️ CHANGE 1: new state to show inline message instead of alert()
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: "" }

  // ⬇️ CHANGE 2: handleSubmit fully replaced — no alert(), phone must be exactly 10 digits
  const handleSubmit = async () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = true;

    const phoneVal = form.phone.trim();
    if (!phoneVal) {
      newErrors.phone = true;
    } else if (!/^\d{10}$/.test(phoneVal)) {
      newErrors.phone = true;
    }

    setErrors(newErrors);
    setMessage(null);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          carType: form.carType,
          serviceType: form.serviceType,
          pickupLocation: form.pickupLocation,
          dropLocation: form.dropLocation,
          rentalDate: form.rentalDate,
          returnDate: form.returnDate,
          source: "contact",
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "✅ Booking confirmed!" });
        setForm({
          carType: "", serviceType: "", pickupLocation: "", dropLocation: "",
          rentalDate: "", returnDate: "", name: "", phone: "",
        });
      } else {
        setMessage({ type: "error", text: "❌ " + (data.message || "Something went wrong") });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Server error. Try again." });
    }
  };

  return (
    <div
      className="overflow-x-hidden"
      style={{
        minHeight: "100vh",
        background: "#fff",
        paddingTop: 88,
        paddingBottom: 64,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        select, input { outline: none; }
        select:focus, input:focus { border-color: rgba(255,255,255,0.6) !important; }
        .blog-card:hover img { transform: scale(1.04); }
        .book-btn:hover { background: #e05a20 !important; }
        input::placeholder { color: rgba(255,255,255,0.55); }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.6); cursor: pointer; }
      `}</style>

      <div className="px-4 sm:px-6" style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── Page Header ── */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          
          <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>
            Home / <span style={{ color: "#0C2340", fontWeight: 600 }}>Contact Us</span>
          </p>
        </div>

        {/* ── Main Grid: Booking Form + Map ── */}
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6"
          style={{
            marginBottom: 40,
            alignItems: "stretch",
          }}
        >
          {/* ── Booking Card ── */}
          <div
            style={{
              background: "linear-gradient(145deg, #4B3FD4 0%, #3730A3 100%)",
              borderRadius: 20,
              padding: "28px 24px",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div style={{ marginBottom: 8 }}>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 18,
                  fontWeight: 800,
                  margin: "0 0 4px",
                  letterSpacing: "-0.3px",
                }}
              >
                Book your car
              </h2>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", margin: 0 }}>
                Fill in the details and we'll confirm instantly
              </p>
            </div>

            <input
              type="text"
              placeholder="Your name *"
              value={form.name}
              onChange={e => { set("name")(e); setErrors(p => ({ ...p, name: false })); }}
              style={{
                ...inputStyle,
                border: errors.name
                  ? "1.5px solid #FF6B2B"
                  : "1.5px solid rgba(255,255,255,0.2)",
              }}
            />
            {errors.name && (
              <p style={{ fontSize: 11, color: "#FF6B2B", margin: "-8px 0 0", paddingLeft: 4 }}>
                Name is required
              </p>
            )}

            <input
              type="tel"
              placeholder="Phone number *"
              value={form.phone}
              // ⬇️ CHANGE 3: only allow digits while typing, max 10 chars
              onChange={e => {
                const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
                setForm(p => ({ ...p, phone: digitsOnly }));
                setErrors(p => ({ ...p, phone: false }));
              }}
              style={{
                ...inputStyle,
                border: errors.phone
                  ? "1.5px solid #FF6B2B"
                  : "1.5px solid rgba(255,255,255,0.2)",
              }}
            />
            {/* ⬇️ CHANGE 4: updated error text for 10-digit rule */}
            {errors.phone && (
              <p style={{ fontSize: 11, color: "#FF6B2B", margin: "-8px 0 0", paddingLeft: 4 }}>
                Enter a valid 10-digit phone number
              </p>
            )}

            {/* Car Type */}
            <select value={form.carType} onChange={set("carType")} style={selectStyle(form.carType)}>
              <option value="" style={{ color: "#333" }}>Car type</option>
              {CAR_TYPES.map((t) => (
                <option key={t} value={t} style={{ color: "#333" }}>{t}</option>
              ))}
            </select>

            {/* Service Type */}
            <select value={form.serviceType} onChange={set("serviceType")} style={selectStyle(form.serviceType)}>
              <option value="" style={{ color: "#333" }}>Service type</option>
              {SERVICE_TYPES.map((s) => (
                <option key={s} value={s} style={{ color: "#333" }}>{s}</option>
              ))}
            </select>

            {/* Pickup Location */}
            <input
              type="text"
              placeholder="Pickup location"
              value={form.pickupLocation}
              onChange={set("pickupLocation")}
              style={inputStyle}
            />

            {/* Drop Location */}
            <input
              type="text"
              placeholder="Drop location"
              value={form.dropLocation}
              onChange={set("dropLocation")}
              style={inputStyle}
            />

            {/* Dates row */}
            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "0 0 4px", fontWeight: 600 }}>
                  Rental date
                </p>
                <input
                  type="date"
                  value={form.rentalDate}
                  onChange={set("rentalDate")}
                  style={{ ...inputStyle, color: form.rentalDate ? "#fff" : placeholderColor }}
                />
              </div>
              <div>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", margin: "0 0 4px", fontWeight: 600 }}>
                  Return date
                </p>
                <input
                  type="date"
                  value={form.returnDate}
                  onChange={set("returnDate")}
                  style={{ ...inputStyle, color: form.returnDate ? "#fff" : placeholderColor }}
                />
              </div>
            </div>

            {/* Book Now */}
            <button
              className="book-btn"
              onClick={handleSubmit}
              style={{
                width: "100%",
                padding: "12px",
                background: "#FF6B2B",
                color: "#fff",
                border: "none",
                borderRadius: 50,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                transition: "background 0.2s",
                marginTop: 4,
              }}
            >
              Book Now →
            </button>

            {/* ⬇️ CHANGE 5: inline success/error message instead of alert() */}
            {message && (
              <p style={{
                fontSize: 12,
                textAlign: "center",
                margin: "2px 0 0",
                fontWeight: 600,
                color: message.type === "success" ? "#4ade80" : "#FF6B2B",
              }}>
                {message.text}
              </p>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4" style={{ marginTop: 4 }}>
              {["Doorstep delivery", "Call to confirm", "No hidden fees"].map((t) => (
                <span
                  key={t}
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 4 }}
                >
                  <span style={{ color: "#4ade80" }}>✓</span> {t}
                </span>
              ))}
            </div>
          </div>

          {/* ── Map ── */}
          <div
            className="min-h-[260px] lg:min-h-[360px]"
            style={{
              borderRadius: 20,
              overflow: "hidden",
              background: "#E8EFF8",
            }}
          >
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.5!2d79.8376643!3d11.9675094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a536183682f0733%3A0xada959e6ff965416!2sDA%20Cars%20-%20Self%20Drive%20Car%20Rental%20in%20Pondicherry!5e0!3m2!1sen!2sin!4v1680000000000"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              className="min-h-[260px] lg:min-h-[360px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* ── Info Cards ── */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          style={{
            marginBottom: 64,
          }}
        >
          {INFO_CARDS.map(({ icon, label, value, iconBg }) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: "#FFF7ED",
                borderRadius: 14,
                padding: "16px 18px",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: iconBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                {icon}
              </div>
              <div>
                <p style={{ fontSize: 10, color: "#94A3B8", margin: "0 0 2px", fontWeight: 600, letterSpacing: "0.04em" }}>
                  {label}
                </p>
                <p style={{ fontSize: 12, color: "#0C2340", margin: 0, fontWeight: 700, lineHeight: 1.4 }}>
                  {value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Blog Section ── */}
        <div>
          <h2
            className="text-[20px] sm:text-[24px]"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              color: "#0C2340",
              textAlign: "center",
              margin: "0 0 32px",
              letterSpacing: "-0.4px",
            }}
          >
            Latest blog posts &amp; news
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {BLOG_POSTS.map(({ img, title, tag, date }) => (
              <div key={title} className="blog-card" style={{ cursor: "pointer" }}>
                <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 12, height: 180 }}>
                  <img
                    src={img}
                    alt={title}
                    style={{
                      width: "100%", height: "100%", objectFit: "cover",
                      transition: "transform 0.35s ease", display: "block",
                    }}
                  />
                </div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#0C2340", margin: "0 0 6px", fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.2px" }}>
                  {title}
                </p>
                <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>
                  {tag} / <span>{date}</span>
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}