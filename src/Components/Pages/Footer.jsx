import { FaCar, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ArrowTopRightOnSquareIcon,
} from "@heroicons/react/24/outline";

const INFO_ITEMS = [
  {
    icon: <MapPinIcon className="w-5 h-5 text-white" />,
    label: "Address",
    value: "45, SH 49, Kottakuppam, Puducherry 605104",
  },
  {
    icon: <EnvelopeIcon className="w-5 h-5 text-white" />,
    label: "Email",
    value: "drivex@gmail.com",
  },
  {
    icon: <PhoneIcon className="w-5 h-5 text-white" />,
    label: "Phone",
    value: "+91 90802 02798",
  },
];

const USEFUL_LINKS = ["About us", "Contact us", "Gallery", "Blog", "F.A.Q"];
const VEHICLES = ["Sedan", "Cabriolet", "Pickup", "Minivan", "SUV"];

const MAP_URL =
  "https://www.google.com/maps?q=DA+Cars+Self+Drive+Car+Rental+Pondicherry";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 font-sans">

      {/* ── Top info bar ── */}
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center gap-8 border-b border-gray-100">

        {/* Brand */}
        <div className="flex items-center gap-2 mr-auto">
          <FaCar className="text-2xl text-gray-900" />
          <span className="text-base font-semibold text-gray-900 tracking-tight">
            Car Rental
          </span>
        </div>

        {/* Info chips */}
        {INFO_ITEMS.map(({ icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-400 flex items-center justify-center flex-shrink-0">
              {icon}
            </div>
            <div>
              <p className="text-xs text-gray-400 leading-none mb-0.5">{label}</p>
              <p className="text-sm font-medium text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Col 1 — Brand + socials */}
        <div>
          <p className="text-sm text-gray-500 leading-relaxed mb-6 max-w-[200px]">
            Pondicherry's trusted self-drive car rental. Clean cars, transparent
            pricing, 24/7 support.
          </p>
          <div className="flex items-center gap-3">
            {[
              { icon: <FaFacebookF />, label: "Facebook" },
              { icon: <FaInstagram />, label: "Instagram" },
              { icon: <FaXTwitter />, label: "X (Twitter)" },
              { icon: <FaYoutube />, label: "YouTube" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm"
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Col 2 — Useful links */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Useful links
          </h3>
          <ul className="space-y-2.5">
            {USEFUL_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Vehicles */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Vehicles
          </h3>
          <ul className="space-y-2.5">
            {VEHICLES.map((v) => (
              <li key={v}>
                <a
                  href="#"
                  className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                >
                  {v}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Map */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Find us</h3>

          {/* ✅ Fixed: was missing the opening <a tag */}
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
                <div className="w-9 h-9 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center shadow-sm">
                  <MapPinIcon className="w-5 h-5 text-white" />
                </div>
                <div className="mt-1.5 bg-white rounded-md px-2 py-0.5 shadow-sm border border-gray-100">
                  <p className="text-[10px] font-semibold text-gray-800">
                    DA Cars, Kottakuppam
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute bottom-2 right-2 bg-orange-400 rounded-md px-2 py-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowTopRightOnSquareIcon className="w-3 h-3 text-white" />
              <span className="text-[10px] text-white font-semibold">
                Open Maps
              </span>
            </div>
          </a>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <p className="text-[10px] text-gray-400 mb-0.5">Address</p>
              <p className="text-xs text-gray-700 font-medium leading-snug">
                45, SH 49,
                <br />
                Kottakuppam, Puducherry
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
              <p className="text-[10px] text-gray-400 mb-0.5">Phone</p>
              <p className="text-xs text-gray-700 font-medium leading-snug">
                +91 90802
                <br />
                02798
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom copyright bar ── */}
      <div className="border-t border-gray-100 py-4 text-center">
        <p className="text-xs text-gray-400">
          © Copyright DA Cars 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
}