import { useState } from "react";
import { Settings2, Fuel, Wind, ChevronLeft, ChevronRight } from "lucide-react";
import Brezza from "../../assets/brezza.jpeg";
import Brezza1 from "../../assets/brezza1.jpeg";
import Brezza2 from "../../assets/brezza2.jpeg";
import Brezza3 from "../../assets/brezza3.jpeg";
import swift from "../../assets/swift.jpeg";
import swift1 from "../../assets/swift1.jpeg";
import swift2 from "../../assets/swift2.jpeg";
import swift3 from "../../assets/swift3.jpeg";
import grandI10 from "../../assets/grand.jpeg";
import grandI101 from "../../assets/grand1.jpeg";
import grandI102 from "../../assets/grand2.jpeg";
import grandI103 from "../../assets/grand3.jpeg";
import etiosLiva from "../../assets/etiosLiva.jpeg";
import etiosLiva1 from "../../assets/etiosLiva1.jpeg";
import etiosLiva2 from "../../assets/etiosLiva2.jpeg";
import etiosLiva3 from "../../assets/etiosLiva3.jpeg";
import baleno from "../../assets/baleno.jpeg";
import baleno1 from "../../assets/baleno1.jpeg";
import baleno2 from "../../assets/baleno2.jpeg";
import baleno3 from "../../assets/baleno3.jpeg";
import etios from "../../assets/etios.jpeg";
import etios1 from "../../assets/etios1.jpeg";
import etios2 from "../../assets/etios2.jpeg";
import etios3 from "../../assets/etios3.jpeg";

import tataZest1 from "../../assets/tataZest1.jpeg";
import tataZest2 from "../../assets/tataZest2.jpeg";
import tataZest3 from "../../assets/tataZest3.jpeg";

const CARS = [
  { id: 1, name: "Maruti Suzuki Vitara Brezza", type: "SUV",      price: 1699, trans: "Automatic", fuel: "Petrol", ac: "Air Conditioner", images: [Brezza, Brezza1, Brezza2, Brezza3] },
  { id: 2, name: "Maruti Suzuki Swift",          type: "Hatchback", price: 1500, trans: "Manual",    fuel: "Petrol", ac: "Air Conditioner", images: [swift, swift1, swift2, swift3] },
  { id: 3, name: "Hyundai Grand i10 Nios",       type: "Hatchback", price: 1300, trans: "Manual",    fuel: "Petrol", ac: "Air Conditioner", images: [grandI10, grandI101, grandI102, grandI103] },
  { id: 4, name: "Toyota Etios Liva",            type: "Hatchback", price: 1300, trans: "Manual",    fuel: "Petrol", ac: "Air Conditioner", images: [etiosLiva, etiosLiva1, etiosLiva2, etiosLiva3] },
  { id: 5, name: "Maruti Suzuki Baleno",         type: "Hatchback", price: 1800, trans: "Manual",    fuel: "Petrol", ac: "Air Conditioner", images: [baleno, baleno1, baleno2, baleno3] },
  { id: 6, name: "Toyota Etios",                 type: "Sedan",     price: 1500, trans: "Manual",    fuel: "Petrol", ac: "Air Conditioner", images: [etios, etios1, etios2, etios3] },
  { id: 7, name: "Tata Zest",                    type: "Sedan",     price: 1500, trans: "Manual",    fuel: "Petrol", ac: "Air Conditioner", images: [tataZest1, tataZest2, tataZest3] },
];

const TabIcon = ({ type }) => {
  const cls = "w-4 h-4 fill-current";
  if (type === "SUV")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M4 10.5l2-4.5h12l2 4.5H4zm-1 1.5h18v5H3v-5zm3.5 6a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>;
  if (type === "Sedan")
    return <svg viewBox="0 0 24 24" className={cls}><path d="M5 11l2-4h10l2 4H5zm-2 1h18v4H3v-4zm3.5 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>;
  return <svg viewBox="0 0 24 24" className={cls}><path d="M6 11l1.5-3.5h9L18 11H6zm-2 1h16v4H4v-4zm3 5a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm10 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" /></svg>;
};

const TABS = ["All", "Hatchback", "Sedan", "SUV"];

function Carousel({ images, name }) {
  const [current, setCurrent] = useState(0);

  const prev = (e) => {
    e.stopPropagation();
    setCurrent((p) => (p === 0 ? images.length - 1 : p - 1));
  };
  const next = (e) => {
    e.stopPropagation();
    setCurrent((p) => (p === images.length - 1 ? 0 : p + 1));
  };

  return (
 <div className="relative overflow-hidden bg-slate-100 group w-full cursor-pointer" style={{ aspectRatio: "4/3" }}>
      <div
        className="flex h-full"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: "transform 0.35s ease-in-out",
        }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full flex-shrink-0">
            <img
              src={img}
              alt={`${name} view ${i + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#0C2340] rounded-full p-1 shadow-md transition-opacity duration-200"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
      </button>

      <button
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 hover:bg-white text-[#0C2340] rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      >
        <ChevronRight size={18} strokeWidth={2.5} />
      </button>

      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            style={{
              width: i === current ? 16 : 6,
              height: 6,
              borderRadius: 9999,
              background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.2s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function VehicleCard({ car }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
      <Carousel images={car.images} name={car.name} />
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
        <button className="w-full bg-[#4B3FD4] hover:bg-[#3b30b8] text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
 Call to Book →
        </button>
      </div>
    </div>
  );
}

export default function VehicleGroupSelect() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? CARS : CARS.filter((c) => c.type === active);

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6">
      <div className="max-w-[1200px] mx-auto">
<div className="text-center mb-10">

  <p className="text-[13px] text-slate-400">
    Home / <span className="text-[#0C2340] font-medium">Vehicles</span>
  </p>
</div>
        <div className="text-center mb-10">
          <h1 className="text-[28px] font-extrabold text-[#0C2340] tracking-tight mb-2">
          Our Fleet in Pondicherry
          </h1>
          <p className="text-[14px] text-slate-400">
          We deliver any of these cars to your doorstep. Call us or book online — we'll handle the rest
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex items-center gap-1.5 px-4 py-[7px] rounded-full text-[13px] font-semibold transition-all
                ${active === tab
                  ? "bg-[#4B3FD4] text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:border-[#4B3FD4] hover:text-[#4B3FD4]"
                }`}
            >
              {tab !== "All" && <TabIcon type={tab} />}
              {tab === "All" ? "All Vehicles" : tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-slate-400 text-sm py-20">
         No vehicles in this category. Call us — we may have what you need!
          </p>
        )}
      </div>
    </div>
  );
}