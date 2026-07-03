import { Link } from "react-router-dom";
import { FaCar, FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

// Single source of truth for the contact number (used for both Call & WhatsApp)
const PHONE_DISPLAY = "+91 90802 02798";
const PHONE_TEL = "+919080202798";       // for tel: link
const PHONE_WA = "919080202798";         // for wa.me link (no + sign)
const EMAIL = "ajithgymboy@gmail.com";

const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`;
const INFO_ITEMS = [
  {
    icon: <MapPinIcon className="w-5 h-5 text-white" />,
    label: "Address",
    value: "45, SH 49, Kottakuppam, Puducherry 605104",
  },
  {
    icon: <EnvelopeIcon className="w-5 h-5 text-white" />,
    label: "Email",
    value: EMAIL,
    href: GMAIL_COMPOSE_URL,
  },
  {
    icon: <PhoneIcon className="w-5 h-5 text-white" />,
    label: "Phone",
    value: PHONE_DISPLAY,
    href: `tel:${PHONE_TEL}`,
  },
];

// Matches Navbar's NAV_LINKS exactly — only routes that actually exist in the app
const USEFUL_LINKS = [
  { label: "Home",         to: "/" },
  { label: "Vehicles",     to: "/vehicles" },
  { label: "How It Works", to: "/how-it-works" },
  { label: "About Us",     to: "/about" },
  { label: "Contact Us",   to: "/contact" },
];

// All vehicle types route to the Vehicles listing page, filtered by type
const VEHICLES = ["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"];

// Social / quick-contact actions — each one is a real functional link now
const SOCIALS = [
  { icon: <FaInstagram />, label: "Instagram", href: "https://instagram.com" },
  { icon: <FaWhatsapp />,  label: "WhatsApp",   href: `https://wa.me/${PHONE_WA}` },
{ icon: <EnvelopeIcon className="w-4 h-4" />, label: "Email", href: GMAIL_COMPOSE_URL },
  { icon: <PhoneIcon className="w-4 h-4" />,    label: "Call",  href: `tel:${PHONE_TEL}` },
];

const MAP_URL =
  "https://www.google.com/maps?q=DA+Cars+Self+Drive+Car+Rental+Pondicherry";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans">

      {/* ── Top info bar ── */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-8 border-b border-gray-100">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 mr-auto no-underline group">
          <FaCar className="text-2xl text-[#0C2340] group-hover:text-[#FF6B2B] transition-colors" />
          <span className="text-base font-semibold text-[#0C2340] tracking-tight">
            Car Rental
          </span>
        </Link>

        {/* Info chips */}
        {INFO_ITEMS.map(({ icon, label, value, href }) => {
          const content = (
            <>
              <div className="w-10 h-10 rounded-full bg-[#FF6B2B] flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-xs text-gray-400 leading-none mb-0.5">{label}</p>
                <p className="text-sm font-medium text-[#0C2340]">{value}</p>
              </div>
            </>
          );
          return href ? (
            <a key={label} href={href} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              {content}
            </a>
          ) : (
            <div key={label} className="flex items-center gap-3">
              {content}
            </div>
          );
        })}
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand + socials */}
        <div className="col-span-2 lg:col-span-1">
          <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[200px]">
            Pondicherry's trusted self-drive car rental. Clean cars, transparent
            pricing, 24/7 support.
          </p>
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="w-8 h-8 rounded-full border-[1.5px] border-[#FF6B2B] flex items-center justify-center hover:bg-[#FF6B2B] hover:text-white transition-colors text-sm"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2 — Useful links */}
        <div>
          <h3 className="text-sm font-bold text-[#0C2340] mb-4">
            Useful links
          </h3>
          <ul className="space-y-2.5">
            {USEFUL_LINKS.map(({ label, to }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="text-sm text-gray-500 hover:text-[#1A6FD4] transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Vehicles */}
        <div>
          <h3 className="text-sm font-bold text-[#0C2340] mb-4">
            Vehicles
          </h3>
          <ul className="space-y-2.5">
            {VEHICLES.map((v) => (
              <li key={v}>
                <Link
                  to={`/vehicles?type=${encodeURIComponent(v)}`}
                  className="text-sm text-gray-500 hover:text-[#1A6FD4] transition-colors"
                >
                  {v}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Map */}
        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-bold text-[#0C2340] mb-4">Find us</h3>

          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl overflow-hidden border border-gray-200 relative h-36 group"
            aria-label="Open location in Google Maps"
          >
            <div className="absolute inset-0 bg-[#e8edf2]">
              <div className="absolute top-1/3 left-0 right-0 h-[6px] bg-white" />
              <div className="absolute top-2/3 left-0 right-0 h-[3px] bg-white opacity-60" />
              <div className="absolute left-1/2 top-0 bottom-0 w-[6px] bg-white" />
              <div className="absolute left-1/4 top-0 bottom-0 w-[3px] bg-white opacity-60" />
              <div className="absolute top-[4px] left-[4px] w-[22%] h-[28%] bg-[#d4dce6] rounded-sm" />
              <div className="absolute top-[4px] right-[4px] w-[40%] h-[28%] bg-[#d4dce6] rounded-sm" />
              <div className="absolute bottom-[4px] left-[4px] w-[35%] h-[24%] bg-[#d4dce6] rounded-sm" />
              <div className="absolute bottom-[4px] right-[4px] w-[26%] h-[24%] bg-[#d4dce6] rounded-sm" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-[#FF6B2B] border-2 border-white flex items-center justify-center shadow-sm">
                  <MapPinIcon className="w-5 h-5 text-white" />
                </div>
                <div className="mt-1.5 bg-white rounded-md px-2 py-0.5 shadow-sm border border-gray-100">
                  <p className="text-[10px] font-semibold text-[#0C2340]">
                    DA Cars, Kottakuppam
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 bg-[#FF6B2B] rounded-md px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-white" />
              <span className="text-[10px] text-white font-semibold">
                Open Maps
              </span>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-[#EEF4FF] rounded-lg px-3 py-2 border border-[#E8EFF8]">
              <p className="text-[10px] text-slate-400 mb-0.5">Address</p>
              <p className="text-xs text-[#0C2340] font-semibold leading-snug">
                45, SH 49,
                <br />
                Kottakuppam, Puducherry
              </p>
            </div>
            <div className="bg-[#EEF4FF] rounded-lg px-3 py-2 border border-[#E8EFF8]">
              <p className="text-[10px] text-slate-400 mb-0.5">Phone</p>
              <p className="text-xs text-[#0C2340] font-semibold leading-snug">
                +91 90802
                <br />
                02798
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="border-t border-gray-100 py-4 text-center ">
        <p className="text-x text-black/50">
          © Copyright DA Cars 2026. All rights reserved.
        </p>
      </div>
    </footer>
  );
}