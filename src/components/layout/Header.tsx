"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, FileText, ChevronDown } from "lucide-react";
import { MobileDrawer } from "./MobileDrawer";

interface NavItem {
  href: string;
  label: string;
  badge?: string;
  children?: { href: string; label: string; desc: string }[];
}

const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/products",
    label: "Products & Catalogue",
    children: [
      {
        href: "/products?category=rice",
        label: "Deity Basmati Rice",
        desc: "1121, 1509, 1401 Steam, Sella & Golden varieties",
      },
      {
        href: "/products?category=spices",
        label: "Spices & Seasonings",
        desc: "Whole & ground turmeric, chilli, cumin, cardamom, pepper",
      },
      {
        href: "/products?category=pulses",
        label: "Agro Pulses & Dals",
        desc: "Toor, moong, urad, channa & green gram exports",
      },
      {
        href: "/products?category=fmcg",
        label: "FMCG Commodities",
        desc: "Processed consumer packaged food & grocery exports",
      },
      {
        href: "/products?category=textiles",
        label: "Textiles & Garments",
        desc: "Cotton apparel, fabrics, home linens & custom sourcing",
      },
      {
        href: "/products?category=machinery",
        label: "Machinery & Equipment",
        desc: "Agro processing machines & industrial milling equipment",
      },
      {
        href: "/products?category=utensils",
        label: "Utensils & Cookware",
        desc: "Stainless steel kitchenware, commercial vessels & brassware",
      },
      {
        href: "/products?category=fruits",
        label: "Seasonal Fruits & Sweets",
        desc: "Export mangoes, fresh fruits & authentic Indian confectionery",
      },
      {
        href: "/products?category=mats",
        label: "Door Mats & Floor Coverings",
        desc: "Natural coir entrance mats, rubber mats & custom rugs",
      },
    ],
  },
  { href: "/about", label: "Sourcing & Quality" },
  { href: "/contact", label: "Commercial Desk" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo & Brand Identity */}
            <Link
              href="/"
              className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-[#D97706] rounded-lg p-1"
              aria-label="Jay Impex Home"
            >
              <div className="relative w-12 h-12 flex-shrink-0 bg-slate-50 border border-slate-200 rounded-lg p-1 overflow-hidden shadow-xs group-hover:border-[#D97706] transition-colors">
                <Image
                  src="/images/Jayimpex-Logo-min.PNG"
                  alt="Jay Impex Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-1.5">
                  <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0F284E] leading-none group-hover:text-[#0284C7] transition-colors">
                    JAY IMPEX
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-amber-100 text-amber-800 rounded">
                    EST. 1990
                  </span>
                </div>
                <span className="text-[11px] font-medium text-slate-500 tracking-wider uppercase mt-0.5">
                  Leading Commodities Exporter &bull; Sourcing Partner
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                if (item.children) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className={`inline-flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                          isActive
                            ? "text-[#0F284E] font-semibold bg-slate-100"
                            : "text-slate-700 hover:text-[#0F284E] hover:bg-slate-50"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="w-4 h-4 ml-1 text-slate-400" />
                      </Link>

                      {/* Dropdown Menu */}
                      {productsDropdownOpen && (
                        <div className="absolute left-0 top-full pt-2 w-80 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                          <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-2 space-y-1">
                            <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
                              Commodity Divisions
                            </div>
                            {item.children.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors group/sub"
                              >
                                <div className="text-sm font-medium text-slate-900 group-hover/sub:text-[#0284C7] transition-colors">
                                  {sub.label}
                                </div>
                                <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                                  {sub.desc}
                                </div>
                              </Link>
                            ))}
                            <div className="pt-2 border-t border-slate-100">
                              <Link
                                href="/products"
                                className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-[#D97706] hover:text-[#B45309]"
                              >
                                <span>Browse Full Catalogue</span>
                                <span>&rarr;</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "text-[#0F284E] font-semibold bg-slate-100"
                        : "text-slate-700 hover:text-[#0F284E] hover:bg-slate-50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Header Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link
                href="/catalogue"
                className="inline-flex items-center text-xs font-medium text-slate-600 hover:text-[#0F284E] px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors"
                title="Export catalogue and brochure"
              >
                <FileText className="w-3.5 h-3.5 text-[#0284C7] mr-1.5" />
                <span>Brochure</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#0F284E] hover:bg-[#1E3A8A] active:bg-[#0A1B35] shadow-xs hover:shadow transition-all group"
              >
                <span>Request Export Quote</span>
                <span className="ml-1.5 text-amber-400 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden space-x-2">
              <Link
                href="/contact"
                className="inline-flex items-center text-xs font-semibold px-3 py-1.5 rounded-md bg-[#D97706] text-slate-950"
              >
                RFQ
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 rounded-lg text-slate-700 hover:text-[#0F284E] hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile Navigation Drawer */}
      <MobileDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
}
