import React from "react";
import { Phone, Mail, Clock, Anchor, ShieldCheck } from "lucide-react";

export function TopBar() {
  return (
    <div className="bg-[#0A1B35] text-slate-200 text-xs border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-2 gap-2 sm:gap-0">
          {/* Left: Port and Certification badges */}
          <div className="flex items-center space-x-4 overflow-x-auto w-full sm:w-auto">
            <span className="inline-flex items-center text-slate-300 font-medium whitespace-nowrap">
              <Anchor className="w-3.5 h-3.5 text-[#D97706] mr-1.5 shrink-0" />
              Primary Port: <strong className="ml-1 text-white font-mono">Chennai Port (INMAA)</strong>
            </span>
            <span className="hidden md:inline-flex items-center text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 mr-1 shrink-0" />
              APEDA &bull; FSSAI &bull; ISO 9001:2015 &bull; Chennai, India
            </span>
          </div>

          {/* Right: Direct Desk Contact & Timings */}
          <div className="flex items-center space-x-4 sm:space-x-6 text-slate-300 w-full sm:w-auto justify-end">
            <span className="hidden lg:inline-flex items-center text-slate-400">
              <Clock className="w-3.5 h-3.5 text-[#0284C7] mr-1.5 shrink-0" />
              Mon - Sat: 10:00 AM - 10:00 PM
            </span>
            <a
              href="mailto:info@jayimpex.com"
              className="inline-flex items-center hover:text-white transition-colors"
              title="Direct commercial desk email"
            >
              <Mail className="w-3.5 h-3.5 text-[#D97706] mr-1.5 shrink-0" />
              <span className="font-mono">info@jayimpex.com</span>
            </a>
            <a
              href="tel:+919444042275"
              className="inline-flex items-center hover:text-white transition-colors font-medium"
              title="Call commercial export desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#0284C7] mr-1.5 shrink-0" />
              <span className="font-mono">+91 94440 42275</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
