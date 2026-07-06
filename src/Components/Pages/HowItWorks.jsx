import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  {
    num: "01",
    title: "Call or Book Online",
    desc: "Call us or fill the booking form. Tell us which car you need, your location in Pondicherry, and the dates.",
    icon: (
      <svg viewBox="0 0 64 64" style={{ width: 36, height: 36 }}>
        <path d="M8 40 L12 26 Q14 20 22 20 H42 Q50 20 52 26 L56 40 Z" fill="#4B3FD4"/>
        <rect x="6" y="38" width="52" height="10" rx="4" fill="#0C2340"/>
        <rect x="18" y="24" width="12" height="9" rx="2" fill="#C7D2FE" opacity="0.9"/>
        <rect x="34" y="24" width="12" height="9" rx="2" fill="#C7D2FE" opacity="0.9"/>
        <circle cx="18" cy="49" r="6" fill="#0C2340"/>
        <circle cx="18" cy="49" r="2.4" fill="#C7D2FE"/>
        <circle cx="46" cy="49" r="6" fill="#0C2340"/>
        <circle cx="46" cy="49" r="2.4" fill="#C7D2FE"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "We Deliver to You",
    desc: "Our team brings the car directly to your doorstep anywhere in Pondicherry — no need to visit us.",
    icon: (
      <svg viewBox="0 0 64 64" style={{ width: 36, height: 36 }}>
        <rect x="10" y="14" width="44" height="40" rx="6" fill="#C7D2FE"/>
        <rect x="10" y="14" width="44" height="12" rx="6" fill="#4B3FD4"/>
        <rect x="18" y="8" width="4" height="10" rx="2" fill="#0C2340"/>
        <rect x="42" y="8" width="4" height="10" rx="2" fill="#0C2340"/>
        <rect x="17" y="32" width="8" height="8" rx="2" fill="#4B3FD4"/>
        <rect x="28" y="32" width="8" height="8" rx="2" fill="#4B3FD4" opacity="0.5"/>
        <rect x="39" y="32" width="8" height="8" rx="2" fill="#4B3FD4" opacity="0.5"/>
        <rect x="17" y="43" width="8" height="8" rx="2" fill="#4B3FD4" opacity="0.5"/>
        <rect x="28" y="43" width="8" height="8" rx="2" fill="#FF6B2B"/>
        <rect x="39" y="43" width="8" height="8" rx="2" fill="#4B3FD4" opacity="0.5"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Drive at Your Own Pace",
    desc: "The car is fully yours for the day. No driver, no restrictions — just you and the road.",
    icon: (
      <svg viewBox="0 0 64 64" style={{ width: 36, height: 36 }}>
        <rect x="6" y="14" width="52" height="36" rx="6" fill="#C7D2FE"/>
        <rect x="6" y="22" width="52" height="8" fill="#4B3FD4"/>
        <rect x="12" y="38" width="16" height="5" rx="2.5" fill="#0C2340"/>
        <rect x="32" y="38" width="10" height="5" rx="2.5" fill="#FF6B2B"/>
        <circle cx="50" cy="40" r="6" fill="#FF6B2B"/>
        <path d="M47 40 l2 2 l4 -5" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "We Pick It Up",
    desc: "When your rental period ends, we come to your location and collect the car. Simple and hassle-free.",
    icon: (
      <svg viewBox="0 0 64 64" style={{ width: 36, height: 36 }}>
        <circle cx="32" cy="22" r="6" fill="none" stroke="#4B3FD4" strokeWidth="4"/>
        <rect x="30" y="26" width="4" height="16" rx="2" fill="#4B3FD4"/>
        <path d="M34 30 L46 22" stroke="#FF6B2B" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="48" cy="20" r="3" fill="#FF6B2B"/>
        <rect x="14" y="46" width="36" height="4" rx="2" fill="#C7D2FE"/>
        <path d="M22 46 q10 -16 20 0" fill="none" stroke="#0C2340" strokeWidth="3" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const REVIEWS = [
  {
    text: "Called DA Cars in the morning and the car was at my doorstep within the hour. Super clean, full tank, zero paperwork. Best rental experience in Pondicherry.",
    company: "Solo Trip · Pondicherry",
    name: "Arjun Mehta",
    initials: "AM",
  },
  {
    text: "Used DA Cars for a family outing. They delivered an SUV right to our hotel. On return, they came and picked it up — we didn't have to go anywhere. Brilliant service.",
    company: "Family Trip · Pondicherry",
    name: "Priya Nair",
    initials: "PN",
  },
  {
    text: "Rented for 3 days for a business visit. The car was spotless and the team was very responsive on WhatsApp. Pickup and drop handled by them — loved it.",
    company: "Business Travel · Pondicherry",
    name: "Karthik Sundaram",
    initials: "KS",
  },
  {
    text: "Price was very reasonable and no hidden charges at the end. They picked up the car from my Airbnb. Will definitely book again next time I visit Pondy.",
    company: "Weekend Getaway · Pondicherry",
    name: "Sneha Rao",
    initials: "SR",
  },
  {
    text: "First time renting and DA Cars made it very easy. One call, car delivered, car collected. The whole process was smooth from start to finish.",
    company: "First-time Renter · Pondicherry",
    name: "Vikram Iyer",
    initials: "VI",
  },
  {
    text: "Compared multiple rental services in Pondicherry — DA Cars had the best pricing and the only one that delivers to your location. No brainer choice.",
    company: "Frequent Renter · Pondicherry",
    name: "Divya Krishnan",
    initials: "DK",
  },
];

const FAQS = [
  {
    question: "Do you deliver the car to my location?",
    answer: "Yes! That is our core service. We deliver the car to your hotel, home, or any location within Pondicherry. No need to visit our office.",
  },
  {
    question: "What documents do I need?",
    answer: "A valid driving licence and a government-issued photo ID such as Aadhaar or Passport. We keep it simple — no unnecessary paperwork.",
  },
  {
    question: "What is the rental charge?",
    answer: "We charge on a per-day basis. Prices start from ₹1300/day depending on the car. The price you see is what you pay — no hidden fees.",
  },
  {
    question: "What is the fuel policy?",
    answer: "The car is delivered with a full fuel tank. Please return it at the same level. Any difference will be charged at current market rates.",
  },
  {
    question: "Do you pick up the car when the rental ends?",
    answer: "Yes. When your rental period is over, our team comes to your location and collects the car. You don't need to drop it off anywhere.",
  },
  {
    question: "What if I need the car for multiple days?",
    answer: "No problem at all. Just let us know when booking. We offer flexible multi-day rentals — the car stays with you until your rental period ends.",
  },
];

const REVIEWS_DOUBLED = [...REVIEWS, ...REVIEWS];

// ── Shared motion variants ──
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function HowItWorks() {
  const [openFaq, setOpenFaq] = useState(0);
  const [paused, setPaused] = useState(false);

  return (
    <div className="bg-white overflow-hidden">

      {/* ── Hero Banner ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="pt-24 pb-10 px-6 text-center border-b border-slate-100"
      >
        <p className="text-[13px] text-slate-400">
          Home / <span className="text-[#0C2340] font-medium">How It Works</span>
        </p>
      </motion.div>

      {/* ── How It Works ── */}
      <div className="py-20 px-6">
        <div className="max-w-[1200px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
          >
            <div>
              <p className="text-[12px] font-bold tracking-widest text-[#4B3FD4] mb-2">
                GETTING STARTED
              </p>
              <h2 className="text-[34px] font-extrabold text-[#0C2340] tracking-tight leading-tight">
                How it works
              </h2>
            </div>
            <p className="text-[14px] text-slate-400 max-w-[360px]">
              No office visits, no waiting. Call us and we handle everything from delivery to pickup
            </p>
          </motion.div>

          <motion.div
            className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory -mx-6 px-6 scrollbar-hide"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                variants={fadeUp}
                whileHover={{ y: -6, boxShadow: "0 16px 36px rgba(12,35,64,0.10)" }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="relative snap-start shrink-0 w-[260px] sm:w-[270px] rounded-3xl border border-slate-100 bg-white p-6 flex flex-col overflow-hidden"
              >
                <span className="absolute -top-6 -right-2 text-[90px] font-extrabold leading-none select-none pointer-events-none text-[#EEF4FF]">
                  {step.num}
                </span>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-[#EEF4FF]"
                >
                  {step.icon}
                </motion.div>
                <h3 className="relative text-[17px] font-bold text-[#0C2340] mb-2 leading-snug">
                  {step.title}
                </h3>
                <p className="relative text-[13px] text-slate-400 leading-relaxed flex-1">
                  {step.desc}
                </p>
                <div className="relative flex items-center gap-1.5 mt-6">
                  {STEPS.map((_, dotIdx) => (
                    <span
                      key={dotIdx}
                      className="h-1.5 rounded-full transition-all"
                      style={{
                        width: dotIdx === i ? "20px" : "6px",
                        backgroundColor: dotIdx === i ? "#4B3FD4" : "#E5E7EB",
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 rounded-3xl bg-[#0C2340] px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          >
            <div>
              <h3 className="text-[20px] sm:text-[24px] font-extrabold text-white mb-1">
                Ready to ride? Just give us a call
              </h3>
              <p className="text-[13px] text-slate-400">
                We deliver to your door across Pondicherry. No office visit needed.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="bg-[#FF6B2B] hover:bg-[#f25d1a] text-white text-[13px] font-semibold px-8 py-3 rounded-full whitespace-nowrap"
            >
              Browse vehicles →
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* ── Reviews Infinite Marquee ── */}
      <div className="py-16 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1200px] mx-auto px-6"
        >
          <p className="text-[12px] font-bold tracking-widest text-[#4B3FD4] text-center mb-2">
            CUSTOMER STORIES
          </p>
          <h2 className="text-[28px] font-extrabold text-[#0C2340] text-center mb-1">
            What our renters say
          </h2>
          <p className="text-[13px] text-slate-400 text-center mb-10">
            Real experiences from people who've driven with us.
          </p>
        </motion.div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-5"
            style={{
              width: "max-content",
              animation: "marquee 50s linear infinite",
              animationPlayState: paused ? "paused" : "running",
            }}
          >
            {REVIEWS_DOUBLED.map((r, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(12,35,64,0.12)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="shrink-0 rounded-2xl border border-slate-100 bg-white flex flex-col overflow-hidden shadow-sm"
                style={{ width: "280px" }}
              >
                {/* Quote icon */}
                <div className="px-6 pt-6 pb-2">
                  <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
                    <path
                      d="M0 22V13.4C0 9.8 0.966667 6.76667 2.9 4.3C4.83333 1.76667 7.6 0.166667 11.2 0L12.6 2.2C10.2 2.8 8.33333 3.96667 7 5.7C5.73333 7.36667 5.1 9.23333 5.1 11.3H10.5V22H0ZM15.4 22V13.4C15.4 9.8 16.3667 6.76667 18.3 4.3C20.2333 1.76667 23 0.166667 26.6 0L28 2.2C25.6 2.8 23.7333 3.96667 22.4 5.7C21.1333 7.36667 20.5 9.23333 20.5 11.3H25.9V22H15.4Z"
                      fill="#4B3FD4"
                    />
                  </svg>
                </div>

                {/* Review text */}
                <div className="px-6 pb-6 flex-1">
                  <p className="text-[13px] text-slate-500 leading-relaxed">{r.text}</p>
                </div>

                {/* Footer — initials circle instead of avatar image */}
                <div className="bg-[#4B3FD4] px-5 py-4 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full shrink-0 flex items-center justify-center border-2 border-white font-bold text-[13px]"
                    style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
                  >
                    {r.initials}
                  </div>
                  <div>
                    <p className="text-[11px] text-indigo-300">{r.company}</p>
                    <p className="text-[13px] font-semibold text-white">{r.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ ── */}
      <div className="py-24 px-6" style={{ background: "linear-gradient(180deg, #fff 0%, #F5F5FF 100%)" }}>
        <div className="max-w-[860px] mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-14"
          >
            <div>
              <p className="text-[11px] font-bold tracking-[0.18em] text-[#4B3FD4] mb-3">
                NEED HELP?
              </p>
              <h2 className="text-[36px] font-extrabold text-[#0C2340] leading-tight">
                Frequently asked<br />questions
              </h2>
            </div>
            <p className="text-[13px] text-slate-400 whitespace-nowrap">
              Can't find what you're looking for?{" "}
              <a href="#" className="text-[#4B3FD4] font-semibold hover:underline">
                Contact us
              </a>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col gap-4"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  layout
                  transition={{ layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    border: isOpen ? "1.5px solid #4B3FD4" : "1.5px solid #E8E8F0",
                    background: isOpen
                      ? "linear-gradient(135deg, #FAFAFF 0%, #F0EFFF 100%)"
                      : "#fff",
                    boxShadow: isOpen
                      ? "0 4px 24px rgba(75,63,212,0.10)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                    transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-7 py-5 text-left gap-4"
                  >
                    <div className="flex items-center gap-5">
                      <span
                        className="text-[11px] font-bold shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{
                          background: isOpen ? "#4B3FD4" : "#EDEDF8",
                          color: isOpen ? "#fff" : "#9896C8",
                        }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-[14.5px] font-semibold transition-colors duration-200"
                        style={{ color: isOpen ? "#4B3FD4" : "#0C2340" }}
                      >
                        {faq.question}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{
                        background: isOpen ? "#4B3FD4" : "#EDEDF8",
                        color: isOpen ? "#fff" : "#9896C8",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-7 pb-6" style={{ paddingLeft: "80px" }}>
                          <div
                            className="rounded-xl px-5 py-4"
                            style={{ background: "rgba(75,63,212,0.05)" }}
                          >
                            <p className="text-[13px] leading-relaxed" style={{ color: "#5A5A7A" }}>
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
            style={{ background: "#0C2340" }}
          >
            <div>
              <p className="text-white font-bold text-[15px]">Still have questions?</p>
              <p className="text-slate-400 text-[12px] mt-0.5">We're online now — usually reply in minutes.</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="shrink-0 px-6 py-2.5 rounded-full text-[13px] font-semibold"
              style={{ background: "#4B3FD4", color: "#fff" }}
            >
              Chat with us →
            </motion.button>
          </motion.div>

        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-280px * 6 - 20px * 6)); }
        }
      `}</style>
    </div>
  );
}