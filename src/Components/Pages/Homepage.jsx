import { useState, useEffect, useRef } from "react";
;
import { Settings2, Fuel, Wind, MapPin, CarFront, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import Brezza from "../../assets/brezza.jpeg"
import swift from "../../assets/swift.jpeg";
import grandI10 from "../../assets/grand.jpeg";
import etiosLiva from "../../assets/etiosLiva.jpeg";
import baleno from "../../assets/baleno.jpeg";
import etios from "../../assets/etios.jpeg";
import tataZest3 from "../../assets/tataZest3.jpeg";
const CARS = [
  {
    name: "Maruti Suzuki Vitara Brezza",
    type: "SUV",
    price: 1699,
    trans: "Automatic",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img: Brezza,
  },
  {
    name: "Maruti Suzuki Swift",
    type: "Hatchback",
    price: 1500,
    trans: "Manual",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img:swift,
  },
  {
    name: "Hyundai Grand i10 Nios",
    type: "Hatchback",
    price: 1300,
    trans: "Manual",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img: grandI10,
  },
  {
    name: "Toyota Etios Liva",
    type: "Hatchback",
    price: 1300,
    trans: "Manual",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img: etiosLiva,
  },
  {
    name: "Maruti Suzuki Baleno",
    type: "Hatchback",
    price: 1800,
    trans: "Manual",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img: baleno,
  },
  {
    name: "Toyota Etios",
    type: "Sedan",
    price: 1500,
    trans: "Manual",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img: etios,
  },
  {
    name: "Tata Zest",
    type: "Sedan",
    price: 1500,
    trans: "Manual",
    fuel: "Petrol",
    ac: "Air Conditioner",
    img: tataZest3,
  },
];



function FadeIn({ children, delay = 0, up = true }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : up ? "translateY(24px)" : "translateX(-20px)",
        transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Homepage() {
  
  const [form, setForm] = useState({
    
    carType: "",
    pickup: "",
    returnLoc: "",
    rental: "",
    returnDate: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: "" }

  const set = k => e => {
    setForm(p => ({ ...p, [k]: e.target.value }));
    setErrors(p => ({ ...p, [k]: false }));
  };

const handleSubmit = async () => {
  const newErrors = {};

  if (!form.pickup.trim()) newErrors.pickup = true;

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
        pickupLocation: form.pickup,
        dropLocation: form.returnLoc,
        carType: form.carType,
        rentalDate: form.rental,
        returnDate: form.returnDate,
        source: "home",
      }),
    });
      const data = await res.json();
      if (res.ok) {
        setMessage({ type: "success", text: "✅ Booking submitted! We'll contact you shortly." });
        setForm({ name: "", phone: "", carType: "", pickup: "", returnLoc: "", rental: "", returnDate: "" });
      } else {
        setMessage({ type: "error", text: "❌ " + (data.message || "Something went wrong") });
      }
    } catch {
      setMessage({ type: "error", text: "❌ Server error. Try again." });
    }
  };

  const errBorder = (key) => (errors[key] ? "1.5px solid #FF6B2B" : undefined);

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-white min-h-screen flex items-center pt-[68px]">
        <div className="max-w-[1200px] mx-auto px-6 py-16 w-full">

          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-[#EEF4FF] border border-[#C3D9F5] rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#1A6FD4] inline-block" />
              <span className="text-[13px] font-semibold text-[#1A6FD4]">
              2 branches across Pondicherry — Call & we deliver
              </span>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-14 items-center">

            {/* ── Left ── */}
            <FadeIn>
              <div>
                <h1
                  className="font-extrabold text-[#0C2340] leading-[1.1] mb-5"
                  style={{ fontSize: "clamp(40px,5vw,64px)", letterSpacing: "-2px" }}
                >
                Pondicherry's most trusted car rental<br />
                  <span className="text-[#1A6FD4]">delivered to</span>  your door.
                </h1>

                <p className="text-[17px] text-slate-500 leading-relaxed mb-10 max-w-[480px]">
                Just call us — we deliver the car to your doorstep anywhere in Pondicherry. No hassle, no paperwork, just drive.
                </p>

                <div className="flex gap-8 mb-10">
                  {[["500+", "Happy clients"], ["80+", "Cars available"], ["4.9★", "Rating"],["2", "Branches in Pondy"]].map(([val, lbl]) => (
                    <div key={lbl}>
                      <p className="text-[22px] font-extrabold text-[#0C2340] m-0">{val}</p>
                      <p className="text-[12px] text-slate-400 font-medium mt-0.5">{lbl}</p>
                    </div>
                  ))}
                </div>

                {/* Hero Car Image */}
                <div className="relative rounded-3xl overflow-hidden bg-[#0C2340]" style={{ minHeight: 260 }}>
                  <img
                    src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=900&q=85&fit=crop"
                    alt="Premium rental car"
                    className="w-full object-cover block"
                    style={{ height: 260, opacity: 0.82 }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(120deg, rgba(12,35,64,0.55) 0%, rgba(12,35,64,0.10) 60%, transparent 100%)" }}
                  />
                  <div className="absolute top-4 left-4 bg-white rounded-2xl px-4 py-2.5 shadow-lg" style={{ minWidth: 110 }}>
                    <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest m-0">Starting from</p>
                    <p className="text-[22px] font-extrabold text-[#0C2340] m-0 tracking-tight">
                      ₹1300<span className="text-[13px] font-medium text-slate-400">/day</span>
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#FF6B2B] rounded-2xl px-4 py-2.5 shadow-lg">
                    <p className="text-[10px] font-semibold text-white/80 uppercase tracking-widest m-0">All inclusive</p>
                    <p className="text-[14px] font-bold text-white m-0 mt-0.5">Doorstep Delivery ✓</p>
                  </div>
                  <div
                    className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full px-3.5 py-1.5"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.22)",
                    }}
                  >
                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block" style={{ boxShadow: "0 0 0 3px rgba(34,197,94,0.25)" }} />
                    <span className="text-[11px] font-semibold text-white tracking-wide">Available now</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* ── Right: Booking Card ── */}
            <FadeIn delay={0.15}>
              <div className="bg-white rounded-3xl p-8 border border-[#E8EFF8] sticky top-[88px]"
                style={{ boxShadow: "0 8px 48px rgba(12,35,64,0.12)" }}>
                <h2 className="text-[22px] font-extrabold text-[#0C2340] mb-1 tracking-tight">Book your car</h2>
                <p className="text-[13px] text-slate-400 mb-7">Fill in your details and confirm instantly</p>
                <div className="flex flex-col gap-4">

              

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Car type</label>
                    <select value={form.carType} onChange={set("carType")}
                      className="w-full px-3.5 py-2.5 border border-[#E8EFF8] rounded-xl text-[14px] text-[#0C2340] bg-white cursor-pointer focus:outline-none focus:border-[#1A6FD4]">
                      <option value="">Select car type</option>
                      {["Sedan", "SUV", "Hatchback"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Place of rental *</label>
                    <input
                      type="text"
                      placeholder="Enter pickup location"
                      value={form.pickup}
                      onChange={set("pickup")}
                      style={{ border: errBorder("pickup") }}
                      className="w-full px-3.5 py-2.5 border border-[#E8EFF8] rounded-xl text-[14px] text-[#0C2340] bg-white focus:outline-none focus:border-[#1A6FD4]"
                    />
                    {errors.pickup && (
                      <p className="text-[11px] text-[#FF6B2B] mt-1">Pickup location is required</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Place of return</label>
                    <input type="text" placeholder="Enter return location" value={form.returnLoc} onChange={set("returnLoc")}
                      className="w-full px-3.5 py-2.5 border border-[#E8EFF8] rounded-xl text-[14px] text-[#0C2340] bg-white focus:outline-none focus:border-[#1A6FD4]" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Rental date</label>
                      <input type="date" value={form.rental} onChange={set("rental")}
                        className="w-full px-3.5 py-2.5 border border-[#E8EFF8] rounded-xl text-[14px] text-[#0C2340] bg-white focus:outline-none focus:border-[#1A6FD4]" />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold text-slate-500 mb-1.5">Return date</label>
                      <input type="date" value={form.returnDate} onChange={set("returnDate")}
                        className="w-full px-3.5 py-2.5 border border-[#E8EFF8] rounded-xl text-[14px] text-[#0C2340] bg-white focus:outline-none focus:border-[#1A6FD4]" />
                    </div>
                  </div>

                <button className="bg-[#FF6B2B] hover:bg-[#e55f22] text-white font-bold px-8 py-4 rounded-full transition-all duration-300">
                  Book Your Car →
                </button>

                  {/* Inline success/error message instead of alert() */}
                  {message && (
                    <p
                      className="text-[12px] text-center font-semibold"
                      style={{ color: message.type === "success" ? "#16A34A" : "#FF6B2B", margin: "2px 0 0" }}
                    >
                      {message.text}
                    </p>
                  )}

                  <div className="flex justify-center gap-5 pt-1">
                    {["Free cancellation", "Instant confirm", "No hidden fees"].map(t => (
                      <span key={t} className="text-[11px] text-slate-400 flex items-center gap-1">
                        <span className="text-green-500">✓</span> {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
            {[
             { Icon: MapPin,   title: "Doorstep Delivery",  desc: "We bring the car to you anywhere in Pondicherry. No need to visit us." },
{ Icon: CarFront, title: "Well-Maintained Cars", desc: "Every vehicle is cleaned, inspected and ready before we deliver it to you." },
{ Icon: Wallet,   title: "No Hidden Charges",   desc: "Fixed daily rate. The price you see is exactly what you pay — nothing more." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} className="text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-[#EEF4FF] flex items-center justify-center mb-5">
                  <Icon size={28} strokeWidth={1.8} color="#1A6FD4" />
                </div>
                <h3 className="text-[18px] font-bold text-[#0C2340] mb-3">{title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed max-w-[220px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-10 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#1A6FD4]/5 rounded-[32px] blur-3xl" />
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
                alt="Premium Car"
                className="relative w-full h-[280px] sm:h-[380px] md:h-[500px] object-cover rounded-[32px]"
                style={{ boxShadow: "0 20px 60px rgba(12,35,64,0.12)" }}
              />
              <div className="absolute bottom-5 left-5 bg-white rounded-2xl px-5 py-4 shadow-lg border border-slate-100">
                <p className="text-2xl font-extrabold text-[#0C2340]">500+</p>
                <p className="text-sm text-slate-500">Happy Customers</p>
              </div>
            </div>
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF4FF] text-[#1A6FD4] text-sm font-semibold">
             How DA Cars Works
              </span>
            <h2 className="mt-5 text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#0C2340] leading-tight">
             Car at Your Door
                <span className="block text-[#1A6FD4]">In Just One Call</span>
              </h2>
              <div className="mt-10 space-y-8">
                {[
                  { title: "Call or Book Online",    desc: "Call us or fill the form. Tell us which car, where to deliver, and when." },
{ title: "We Deliver to You",      desc: "Our team brings the car to your location anywhere in Pondicherry." },
{ title: "Drive at Your Own Pace", desc: "Take the car for the day. No driver, no restrictions — fully yours." },
{ title: "We Pick It Up",          desc: "When your rental ends, we come to you and collect the car. Simple." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 rounded-full bg-[#1A6FD4] text-white flex items-center justify-center font-bold shadow-md">
                        {i + 1}
                      </div>
                      {i !== 3 && <div className="w-[2px] h-16 bg-slate-200 mt-2" />}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-[#0C2340] mb-2">{item.title}</h3>
                      <p className="text-slate-500 leading-7">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10">
              <Link
                  to="/contact"
                  className="inline-block bg-[#FF6B2B] hover:bg-[#e55f22] text-white font-bold px-8 py-4 rounded-full transition-all duration-300"
                >
                  Reserve Your Ride →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FLEET SECTION ─── */}
      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl font-bold text-[#0C2340] leading-snug">
  Find Your Perfect Ride
</h2>
         <Link to="/vehicles" className="flex items-center gap-1.5 px-5 py-2.5 bg-[#0C2340] hover:bg-[#1a3a5c] text-white text-sm font-semibold rounded-full transition-colors">
  View All →
</Link>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CARS.map((car, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Car image */}
                <div className="overflow-hidden bg-slate-100" style={{ height: 300 }}>
                  <img
                    src={car.img}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-[15px] font-bold text-[#0C2340] leading-snug">{car.name}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{car.type}</p>
                    </div>
                  
                  </div>



                   <Link
                    to="/vehicles"
                    className="w-full block text-center bg-[#4B3FD4] hover:bg-[#3b30b8] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Homepage;