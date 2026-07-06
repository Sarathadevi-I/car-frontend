import { motion } from "framer-motion";
import Dacar from "../../assets/dacar.png"
import Customer from "../../assets/customercare.png"
import Road from "../../assets/road.png"
import Rental from "../../assets/rental.png"
import Clean from "../../assets/clean.png"
import Parking from "../../assets/parking.png"
import Insurance from "../../assets/insurance.png"
import {Link} from 'react-router-dom'
const features = [
  {
    num:   "01",
    label: "24 / 7 Customer Support",
    pill:  "Always on",
    img:  Customer,
    overlay: "purple",
  },
{
  num:   "02",
  label: "Doorstep Car Delivery",
  pill:  "Anywhere in Pondy",
  img:  Road,
  overlay: "navy",
},
  {
    num:   "03",
    label: "Sanitized & Clean Cars",
    pill:  "Every ride",
    img:   Clean,
    overlay: "navy",
  },
  {
    num:   "04",
    label: "Flexible Rental Plans",
    pill:  "Daily · Weekly · Monthly",
    img:  Rental,
    overlay: "navy",
  },
 {
  num:   "05",
  label: "2 Branches in Pondicherry",
  pill:  "Kottakuppam & more",
  img:  Parking,
  overlay: "navy",
},
  {
    num:   "06",
    label: "Comprehensive Insurance",
    pill:  "100% covered",
    img:   Insurance,
    overlay: "purple",
  },
];

const overlayStyles = {
  navy:   "linear-gradient(to top, rgba(12,35,64,0.97) 0%, rgba(12,35,64,0.55) 65%, transparent 100%)",
  purple: "linear-gradient(to top, rgba(75,63,212,0.97) 0%, rgba(75,63,212,0.6) 65%, transparent 100%)",
};

// ── Shared motion variants (same as HowItWorks) ──
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6 overflow-x-hidden">
      <div className="max-w-[1100px] mx-auto">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-16"
      >
        <p className="text-[13px] text-slate-400">
          Home / <span className="text-[#0C2340] font-medium">About Us</span>
        </p>
      </motion.div>

     {/* ── Top section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1fr] gap-10 mb-16"
      >
        <h2 className="text-[26px] font-extrabold text-gray-900 leading-snug">
          Pondicherry's car rental that comes to you
        </h2>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Wide Fleet Selection</h3>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              From compact hatchbacks to spacious SUVs — 7 well-maintained cars ready to be
              delivered anywhere in Pondicherry.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Doorstep Delivery</h3>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Just call us and we bring the car to your hotel, home, or any location in
              Pondicherry. No office visit needed.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="space-y-8"
        >
          <motion.div variants={fadeUp}>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Always-On Support</h3>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Our team is available via call or WhatsApp around the clock. Last-minute booking
              or mid-trip help — we're always reachable.
            </p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <h3 className="text-[15px] font-bold text-gray-900 mb-2">Transparent Pricing</h3>
            <p className="text-[13px] text-gray-400 leading-relaxed">
              Fixed daily rates with zero hidden charges. The price confirmed at booking is
              exactly what you pay — nothing more.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

        {/* ── Video section ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-2xl overflow-hidden mb-16"
          style={{ paddingTop: "42%" }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/tEYDMPOFBzY?autoplay=0&rel=0&modestbranding=1"
            title="Explore Pondicherry by road"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ border: "none" }}
          />
        </motion.div>

        {/* ── Stats ── */}
        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-3 gap-4 sm:gap-10 text-center mb-8 sm:mb-24"
        >
          <motion.div variants={fadeUp}>
            <p className="text-[24px] sm:text-[32px] font-extrabold text-[#4B3FD4]">500+</p>
            <p className="text-[11px] sm:text-[13px] text-gray-400 mt-1">Happy customers</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-[24px] sm:text-[32px] font-extrabold text-[#4B3FD4]">7</p>
            <p className="text-[11px] sm:text-[13px] text-gray-400 mt-1">Cars in fleet</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-[24px] sm:text-[32px] font-extrabold text-[#4B3FD4]">2</p>
            <p className="text-[11px] sm:text-[13px] text-gray-400 mt-1">Branches in Pondicherry</p>
          </motion.div>
        </motion.div>

        {/* ── Why DriveX feature cards ── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6"
          >
            <div>
              <p className="text-[11px] font-bold tracking-[.2em] uppercase text-[#4B3FD4] mb-3">
              Why DA Cars
              </p>
              <h2
                className="text-[28px] sm:text-[36px] font-black text-[#0C2340] leading-[1.08]"
                style={{ letterSpacing: "-1.5px" }}
              >
                We don't just rent cars.<br />
                <span className="text-[#4B3FD4]">We own the experience.</span>
              </h2>
            </div>
            <p className="text-[12px] text-slate-400 sm:max-w-[160px] sm:text-right leading-[1.8] shrink-0">
              From first booking to last kilometre — every detail is handled.
            </p>
          </motion.div>

          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {features.map(({ num, label, pill, img, overlay }) => (
              <motion.div
                key={num}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 16px 36px rgba(12,35,64,0.18)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative h-[180px] sm:h-[260px] rounded-2xl overflow-hidden"
              >
                <motion.img
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 sm:p-4"
                  style={{ background: overlayStyles[overlay] }}
                >
                  <p className="text-[10px] font-bold tracking-[.12em] text-white/35 mb-1">{num}</p>
                  <p className="text-[12px] sm:text-[14px] font-black text-white leading-snug tracking-tight mb-2">{label}</p>
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[.05em] px-2 sm:px-3 py-1 rounded-full bg-[#EA580C] text-white inline-block">
                    {pill}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

{/* ── DA Cars Magazine Section ── */}
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
  className="mt-4 grid grid-cols-1 lg:grid-cols-[55%_45%] items-start relative"
>
  {/* Left — Image */}
  <div style={{ position: "relative", zIndex: 2 }}>

    {/* Title — left image overlap, right content மேலே — DESKTOP ONLY (original style untouched) */}
    <div
      className="hidden lg:block"
      style={{
     position: "absolute",
top: "24px",
left: "79%",
right: "-70%",   // ← இதை மாத்துங்க, value குறைக்க குறைக்க right-ல shift ஆகும்
zIndex: 3,
pointerEvents: "none",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "72px",
          fontWeight: 900,
          color: "#0C2340",
          letterSpacing: "-3px",
          lineHeight: 1,
          fontFamily: "Georgia, serif",
        }}
      >
        DA CARS
      </h1>
    </div>

    {/* Mobile-only title (replaces broken absolute overlay below lg) */}
    <h1
      className="lg:hidden mb-3"
      style={{
        margin: 0,
        fontSize: "40px",
        fontWeight: 900,
        color: "#0C2340",
        letterSpacing: "-1.5px",
        lineHeight: 1,
        fontFamily: "Georgia, serif",
      }}
    >
      DA CARS
    </h1>

    {/* Image */}
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-[220px] sm:h-[300px] lg:h-[420px]"
      style={{
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        src={Dacar}
        alt="DA Cars Pondicherry"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </motion.div>
  </div>

  {/* Right — White content */}
  <div
    className="px-5 sm:px-6 lg:pl-12 lg:pr-6 pt-6 sm:pt-8 lg:pt-[140px] pb-8"
    style={{
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    }}
  >
    {/* Eyebrow */}
    <p
      style={{
        margin: 0,
        color: "#888",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}
    >
      DA Cars — Pondicherry
    </p>

    {/* Features */}
    <motion.div
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      style={{ display: "flex", flexDirection: "column", gap: "14px" }}
    >
      {[
        "Doorstep delivery available across Pondicherry",
        "All cars sanitized and inspected before every trip",
        "No hidden charges — price confirmed at booking",
        "24/7 support via WhatsApp & phone",
      ].map((text, i) => (
        <motion.div key={i} variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#FF6B2B",
              color: "#fff",
              fontSize: "11px",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          <p style={{ margin: 0, color: "#444", fontSize: "13px" }}>{text}</p>
        </motion.div>
      ))}
    </motion.div>

    {/* CTA */}
    <div className="flex flex-wrap items-center gap-4 sm:gap-6" style={{ marginTop: "8px" }}>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
        <Link
          to="/contact"
          style={{
            display: "inline-block",
            background: "#FF6B2B",
            color: "#fff",
            border: "none",
            borderRadius: "999px",
            padding: "12px 28px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          Book a car →
        </Link>
      </motion.div>
      <div>


      </div>
    </div>
  </div>
</motion.div>
      </div>
    </div>
  );
}