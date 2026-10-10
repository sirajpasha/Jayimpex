"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Phone, Mail, ShieldCheck, ChevronRight, MessageSquare, Anchor } from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Export Catalogue & Products" },
  { href: "/about", label: "Company & Quality Assurance" },
  { href: "/contact", label: "Commercial Desk & RFQ" },
];

const categoryLinks = [
  { href: "/products?category=rice", label: "Deity Basmati & Non-Basmati Rice" },
  { href: "/products?category=spices", label: "Whole & Ground Indian Spices" },
  { href: "/products?category=pulses", label: "Agro Pulses & Lentils (Dals)" },
  { href: "/products?category=fmcg", label: "FMCG & Branded Provisions" },
  { href: "/products?category=textiles", label: "Textiles, Fabrics & Garments" },
  { href: "/products?category=machinery", label: "Machinery & Agro Processing" },
  { href: "/products?category=utensils", label: "Stainless Steel Utensils & Cookware" },
  { href: "/products?category=fruits", label: "Seasonal Fruits & Indian Sweets" },
  { href: "/products?category=mats", label: "Door Mats & Floor Coverings" },
];

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0F284E] text-white shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-700/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded bg-[#D97706] flex items-center justify-center font-bold text-slate-900 text-lg shadow">
              JI
            </div>
            <div>
              <div className="font-bold tracking-tight text-white leading-tight">JAY IMPEX</div>
              <div className="text-[10px] text-slate-300 uppercase tracking-wider">Export Desk</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-3">
              Navigation
            </div>
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-[#D97706] text-slate-950 font-semibold"
                        : "text-slate-200 hover:bg-slate-800/80 hover:text-white"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-slate-400"}`} />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Export Product Categories */}
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 px-3">
              Commodity Sectors
            </div>
            <div className="space-y-1">
              {categoryLinks.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-3 py-2 rounded-md text-xs text-slate-300 hover:bg-slate-800/60 hover:text-amber-300 transition-colors"
                >
                  <span>{cat.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              ))}
            </div>
          </div>

          {/* Port & Compliance Info */}
          <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700/60 text-xs space-y-2">
            <div className="flex items-center text-slate-300">
              <Anchor className="w-4 h-4 text-[#0284C7] mr-2 shrink-0" />
              <span>Port: <strong>Chennai Port (INMAA) &bull; Ennore</strong></span>
            </div>
            <div className="flex items-center text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
              <span>APEDA &bull; FSSAI &bull; ISO 9001:2015</span>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 border-t border-slate-700/60 bg-slate-900/60 space-y-2">
          <Link
            href="/contact"
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 bg-[#D97706] hover:bg-amber-600 text-slate-950 font-semibold text-sm py-2.5 px-4 rounded-lg shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Request Export Quote</span>
          </Link>
          <div className="grid grid-cols-2 gap-2 text-xs pt-1">
            <a
              href="tel:+919444042275"
              className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#0284C7]" />
              <span>Call Desk</span>
            </a>
            <a
              href="mailto:info@jayimpex.com"
              className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
