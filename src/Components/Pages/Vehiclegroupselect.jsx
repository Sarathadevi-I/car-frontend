import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Fuel, Wind, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL;

const TabIcon = ({ type }) => {
  const cls = "w-4 h-4 fill-current";
  if (type === "SUV")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M4 10.5l2-4.5h12l2 4.5H4zm-1 1.5h18v5H3v-5zm3.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>;
  if (type === "Sedan")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M5 11l2-4h10l2 4H5zm-2 1h18v4H3v-4zm3.5 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>;
  return <svg viewBox="0 0 24 24" className={cls}><path d="M6 11l1.5-3.5h9L18 11H6zm-2 1h16v4H4v-4zm3 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>;
};

const TABS = ["All", "Hatchback", "Sedan", "SUV"];

// ── Motion variants (shared feel with Homepage) ──
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

function Carousel({ images, name }) {
  const [current, setCurrent] = useState(0);
  const safeImages = images && images.length > 0 ? images : ["https://placehold.co/600x450?text=No+Image"];

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((p) => (p === 0 ? safeImages.length - 1 : p - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrent((p) => (p === safeImages.length - 1 ? 0 : p + 1));
  };

  return (
    <div className="relative overflow-hidden bg-slate-100 group w-full cursor-pointer" style={{ aspectRatio: "4/3" }}>
      <motion.div
        className="flex h-full"
        animate={{ x: `-${current * 100}%` }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {safeImages.map((img, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0">
            <motion.img
              src={img}
              alt={`${name} view ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        ))}
      </motion.div>

      {safeImages.length > 1 && (
        <>
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#0C2340] rounded-full p-1 shadow-md transition-opacity duration-200"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </motion.button>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#0C2340] rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </motion.button>

          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
            {safeImages.map((_, i) => (
              <motion.button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                animate={{
                  width: i === current ? 16 : 6,
                  background: i === current ? "#ffffff" : "rgba(255,255,255,0.45)",
                }}
                transition={{ duration: 0.25 }}
                style={{
                  height: 6,
                  borderRadius: 9999,
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function VehicleCard({ car }) {
  const fullImages = (car.images || []).map((img) => `${API_BASE}${img}`);
  return (
    <motion.div
      layout
      variants={fadeUp}
      initial="hidden"
      animate="show"
      exit="exit"
      whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(12,35,64,0.14)" }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex flex-col"
    >
      <Carousel images={fullImages} name={car.name} />
      <div className="p-5 flex flex-col gap-4 flex-1 justify-between">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-[15px] font-bold text-[#0C2340] leading-snug">{car.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">{car.type}</p>
          </div>
          <div className="text-right shrink-0 ml-3">
            <span className="text-[16px] font-bold text-[#4B3FD4]">₹{car.price}</span>
            <p className="text-xs text-slate-400">per day</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1"><Settings2 size={13} strokeWidth={1.8} /> {car.trans}</span>
          <span className="flex items-center gap-1"><Fuel size={13} strokeWidth={1.8} /> {car.fuel}</span>
          <span className="flex items-center gap-1"><Wind size={13} strokeWidth={1.8} /> {car.ac}</span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            to="/contact"
            className="w-full block text-center bg-[#4B3FD4] hover:bg-[#3b30b8] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
          >
            Reserve This Car →
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function VehicleGroupSelect() {
  const [active, setActive] = useState("All");
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/api/vehicles`);
        const data = await res.json();
        setCars(data);
      } catch {
        setCars([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const filtered = active === "All" ? cars : cars.filter((c) => c.type === active);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <p className="text-[13px] text-slate-400">
            Home / <span className="text-[#0C2340] font-medium">Vehicles</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <h1 className="text-[28px] font-extrabold text-[#0C2340] tracking-tight mb-2">
            Our Fleet in Pondicherry
          </h1>
          <p className="text-[14px] text-slate-400">
            We deliver any of these cars to your doorstep. Call us or book online — we'll handle the rest
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {TABS.map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActive(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-1.5 px-4 py-[7px] rounded-full text-[13px] font-semibold transition-colors duration-200
                ${active === tab
                  ? "bg-[#4B3FD4] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[#4B3FD4] hover:text-[#4B3FD4]"
                }`}
            >
              {tab !== "All" && <TabIcon type={tab} />}
              {tab === "All" ? "All Vehicles" : tab}
            </motion.button>
          ))}
        </motion.div>

        {loading ? (
          <p className="text-center text-slate-400 text-sm py-20">Loading vehicles...</p>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={staggerParent}
            initial="hidden"
            animate="show"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((car) => (
                <VehicleCard key={car._id} car={car} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <AnimatePresence>
          {!loading && filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-slate-400 text-sm py-20"
            >
              No vehicles in this category. Call us — we may have what you need!
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}