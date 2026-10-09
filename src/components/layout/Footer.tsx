import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Anchor,
  ShieldCheck,
  Award,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1B35] text-slate-300 border-t border-slate-800">
      {/* Pre-footer Key Metrics Banner */}
      <div className="border-b border-slate-800/80 bg-[#071326]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D97706]">2005</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Established In</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#0284C7]">35+</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Export Destinations</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">100%</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">APEDA & FSSAI Compliant</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">JNPT</div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Primary Marine Port</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Column 1: Brand & Compliance (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 bg-white rounded-lg p-1 overflow-hidden shrink-0 shadow-md">
                <Image
                  src="/images/Jayimpex-Logo-min.PNG"
                  alt="Jay Impex Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white block">
                  JAY IMPEX
                </span>
                <span className="text-xs text-amber-400 font-medium tracking-wider uppercase">
                  Global Agro Exporters
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Govt. Recognized Export House specializing in premium Deity Basmati
              Rice, authentic Indian whole & ground spices, agro pulses, and FMCG
              commodities. Serving global food importers, supermarket chains, and
              distributors across the Middle East, Europe, Africa, and North America.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-800/80 text-emerald-400 border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                ISO 9001:2015
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-800/80 text-amber-400 border border-slate-700">
                <Award className="w-3.5 h-3.5 mr-1" />
                APEDA Certified
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded bg-slate-800/80 text-sky-400 border border-slate-700">
                <Award className="w-3.5 h-3.5 mr-1" />
                Spices Board India
              </span>
            </div>
          </div>

          {/* Column 2: Commodities (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Export Sectors
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/products?category=rice"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span>Deity Basmati Rice (1121 / 1509)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=spices"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span>Whole & Ground Spices</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=pulses"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span>Agro Pulses & Dals (Lentils)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=fmcg"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span>FMCG Provisions & Provisions</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about#private-label"
                  className="hover:text-amber-400 transition-colors flex items-center justify-between group"
                >
                  <span>Private Label Custom Packaging</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-amber-400 font-medium hover:underline inline-block pt-1"
                >
                  View All Catalogue &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Ports & Shipping (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Logistics Hub
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-start">
                <Anchor className="w-4 h-4 text-[#0284C7] mr-2 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">JNPT / Nhava Sheva</strong>
                  <br />
                  <span className="text-xs">Primary Terminal (INNSA)</span>
                </span>
              </li>
              <li className="flex items-start">
                <Anchor className="w-4 h-4 text-[#0284C7] mr-2 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Mundra & Pipavav</strong>
                  <br />
                  <span className="text-xs">Alternate Terminals</span>
                </span>
              </li>
              <li className="pt-1 text-xs">
                <span className="text-slate-400">Incoterms Supported:</span>
                <div className="font-mono text-slate-200 mt-0.5">FOB &bull; CIF &bull; CFR</div>
              </li>
              <li className="text-xs">
                <span className="text-slate-400">Third-Party Inspection:</span>
                <div className="text-slate-200 mt-0.5">SGS &bull; Geo-Chem &bull; Bureau Veritas</div>
              </li>
            </ul>
          </div>

          {/* Column 4: Commercial Office & Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider border-b border-slate-800 pb-2">
              Commercial Desk
            </h3>
            <div className="space-y-3 text-sm text-slate-400">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-[#D97706] mr-2.5 shrink-0 mt-1" />
                <address className="not-italic text-xs sm:text-sm text-slate-300 leading-snug">
                  <strong>Registered Office:</strong>
                  <br />
                  202, Marine Chambers, 11,
                  <br />
                  New Marine Lines, Churchgate,
                  <br />
                  Mumbai - 400 020, Maharashtra, India.
                </address>
              </div>

              <div className="flex items-center">
                <Phone className="w-4 h-4 text-[#0284C7] mr-2.5 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <a
                    href="tel:+919820124748"
                    className="hover:text-white font-mono transition-colors block"
                  >
                    +91 98201 24748
                  </a>
                  <a
                    href="tel:+919322275151"
                    className="hover:text-white font-mono transition-colors block"
                  >
                    +91 93222 75151
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <Mail className="w-4 h-4 text-[#D97706] mr-2.5 shrink-0" />
                <a
                  href="mailto:export@jayimpex.net"
                  className="hover:text-white font-mono text-xs sm:text-sm transition-colors"
                >
                  export@jayimpex.net
                </a>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-[#D97706] hover:bg-amber-600 text-slate-950 font-semibold text-xs tracking-wide uppercase transition-colors"
                >
                  Direct Inquiry / RFQ Desk
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-footer Legal & Copyright */}
      <div className="border-t border-slate-800/80 bg-[#050D1A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div className="flex items-center space-x-2 text-center sm:text-left">
            <span>
              &copy; {currentYear} <strong>Jay Impex</strong>. All rights reserved.
            </span>
            <span className="hidden md:inline">&bull;</span>
            <span className="hidden md:inline text-slate-400">
              Govt. of India Recognized Agro Commodities Export House
            </span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <Link href="/about" className="hover:text-white transition-colors">
              Quality Assurance
            </Link>
            <span>&bull;</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              Trade Desks
            </Link>
            <span>&bull;</span>
            <a
              href="https://www.jayimpex.net"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:text-amber-300 font-mono inline-flex items-center"
            >
              jayimpex.net
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
