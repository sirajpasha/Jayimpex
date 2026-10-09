import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Ship,
  ShieldCheck,
  Globe2,
  ArrowRight,
  Sparkles,
  PhoneCall,
  FileCheck2,
  Anchor,
  Boxes,
} from "lucide-react";

const capabilities = [
  {
    title: "Govt. Recognized Exporter",
    subtitle: "Global Seaport Containerization",
    desc: "Exporting certified agricultural commodities, Deity Basmati Rice, and Indian spices directly to international ports via JNPT Nhava Sheva under FOB, CIF, and CFR Incoterms.",
    image: "/images/Exporter.jpg",
    badge: "International Trade",
    linkText: "Export Credentials",
    href: "/about",
  },
  {
    title: "Agro Commodities Wholesaler",
    subtitle: "Direct Farm-Gate Procurement",
    desc: "Procuring bulk agricultural harvests directly from premier mandis and farmer collectives across Punjab, Andhra Pradesh, Gujarat, and Tamil Nadu with zero intermediary margins.",
    image: "/images/wholesaler.jpg",
    badge: "Bulk Sourcing",
    linkText: "Sourcing Epicenters",
    href: "/about#sourcing",
  },
  {
    title: "Distribution & Private Labeling",
    subtitle: "Turnkey Supermarket Packing",
    desc: "Facilitating bespoke packaging in BOPP, non-woven zipper, and jute bags under your proprietary brand. Multilingual nutritional compliance and barcoding ready for shelf display.",
    image: "/images/Retailers.jpg",
    badge: "Custom OEM",
    linkText: "Private Label Solutions",
    href: "/about#private-label",
  },
];

const exportProcessSteps = [
  {
    step: "01",
    title: "Commercial RFQ & Formulation",
    desc: "Buyer submits commodity specifications (purity, moisture, grain length/curcumin %), required packaging, and destination port. Desk responds with detailed FOB/CIF pricing within 24 hours.",
    icon: FileCheck2,
  },
  {
    step: "02",
    title: "Sortex Grading & Lab Testing",
    desc: "Commodities undergo multi-deck optical Sortex sorting to eliminate foreign matter. SGS or Geo-Chem executes pre-shipment laboratory assays verifying chemical and microbial purity.",
    icon: ShieldCheck,
  },
  {
    step: "03",
    title: "Export Packing & Staging",
    desc: "Products are hermetically sealed in food-grade multi-wall bags, laminated BOPP pouches, or jute sacks. Palletized and containerized with desiccant protection against maritime humidity.",
    icon: Boxes,
  },
  {
    step: "04",
    title: "JNPT Port Dispatch & Clearance",
    desc: "Direct transit to JNPT Nhava Sheva (INNSA) Container Freight Station. Customs clearance, phytosanitary fumigation, and issuance of original Bill of Lading and Certificate of Origin.",
    icon: Anchor,
  },
];

const tradeCorridors = [
  { region: "Middle East & GCC", countries: "UAE, Saudi Arabia, Kuwait, Oman, Qatar, Bahrain" },
  { region: "Europe & UK", countries: "United Kingdom, Netherlands, Germany, France, Belgium" },
  { region: "Africa", countries: "Kenya, Tanzania, South Africa, Nigeria, Ghana" },
  { region: "North America", countries: "United States, Canada" },
  { region: "Southeast Asia", countries: "Malaysia, Singapore, Vietnam, Indonesia" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0F284E] via-[#0E2445] to-[#0A1B35] text-white py-16 lg:py-24 overflow-hidden">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Govt. Recognized Export House &bull; Est. 2005 &bull; Mumbai</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                India&apos;s Trusted Exporter of{" "}
                <span className="text-amber-400">Deity Basmati Rice</span>,{" "}
                <span className="text-sky-400">Spices &amp; Agro Commodities</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Supplying international importers, supermarket chains, and food distributors
                with laboratory-certified Deity Basmati Rice, hand-selected Indian spices, pulses,
                and FMCG commodities from JNPT Nhava Sheva to worldwide seaports.
              </p>

              {/* Trust Pill Bar */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/80">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ISO 9001:2015 &amp; APEDA</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/80">
                  <Ship className="w-4 h-4 text-[#0284C7]" />
                  <span>Port JNPT / Nhava Sheva</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-2 rounded-lg border border-slate-700/80">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <span>35+ Global Markets</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all group"
                >
                  <span>Request Export Quotation</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 transition-all"
                >
                  <span>Browse Export Catalogue</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Flagship Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl text-center group">
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-xs font-bold bg-[#D97706] text-slate-950 uppercase tracking-wider shadow-sm">
                  Flagship Brand
                </span>

                <div className="relative h-64 sm:h-72 w-full mb-4 rounded-xl overflow-hidden bg-slate-900/40 flex items-center justify-center p-4">
                  <Image
                    src="/images/Deity_Rice.png"
                    alt="Deity Basmati Rice Package"
                    width={320}
                    height={320}
                    className="max-h-60 w-auto object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>

                <div className="text-left space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-400 font-semibold">1121 STEAM BASMATI</span>
                    <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      8.35mm+ AGL
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Deity Basmati Rice</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Naturally aged extra-long slender grains, aromatic richness, non-sticky elongation up to 22mm upon cooking.
                  </p>
                  <div className="pt-2 flex justify-between items-center text-xs">
                    <Link
                      href="/products/deity-1121-steam-basmati-rice"
                      className="text-amber-400 hover:text-amber-300 font-semibold inline-flex items-center"
                    >
                      <span>View Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                    <span className="text-slate-400 text-[11px]">MOQ: 1x20ft FCL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Three Core Business Capabilities Section */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] block mb-2">
              Our Capabilities &amp; Business Roles
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F284E] tracking-tight">
              Integrated Agricultural Export Operations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              From direct farm gate procurement to modern containerized marine freight,
              we deliver end-to-end reliability for international commodity trade.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-amber-400 transition-all flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <Image
                    src={cap.image}
                    alt={cap.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#0F284E]/90 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-xs">
                    {cap.badge}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-xs font-semibold text-[#0284C7] uppercase tracking-wide">
                      {cap.subtitle}
                    </span>
                    <h3 className="text-xl font-bold text-[#0F284E] mt-1 group-hover:text-[#0284C7] transition-colors">
                      {cap.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {cap.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <Link
                      href={cap.href}
                      className="inline-flex items-center text-xs font-bold text-[#D97706] hover:text-amber-700 transition-colors"
                    >
                      <span>{cap.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Commodity Division Showcase */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] block mb-2">
                Export Commodity Divisions
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F284E] tracking-tight">
                Premium Sourced Agricultural Sectors
              </h2>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-[#0F284E] hover:bg-slate-800 text-white text-xs font-semibold transition-colors shrink-0"
            >
              <span>Explore All Commodities</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Division 1: Deity Basmati Rice */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative h-44 w-full bg-slate-50 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                  <Image
                    src="/images/Rotate-Rice.png"
                    alt="Basmati Rice Division"
                    width={200}
                    height={160}
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#D97706] uppercase tracking-wider">
                    Flagship Grains
                  </span>
                  <h3 className="text-lg font-bold text-[#0F284E] mt-1">
                    Deity Basmati &amp; Long Grain Rice
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    1121 Steam, 1509 Golden Sella, Sugandha, and Sharbati grain varieties aged for aroma and elongation.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/products?category=rice"
                  className="text-xs font-bold text-[#0F284E] group-hover:text-[#0284C7] inline-flex items-center"
                >
                  <span>Browse Rice Specs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>

            {/* Division 2: Spices */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative h-44 w-full bg-slate-50 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                  <Image
                    src="/images/Rotate-Spices.png"
                    alt="Spices Division"
                    width={200}
                    height={160}
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-orange-600 uppercase tracking-wider">
                    Pure Seasonings
                  </span>
                  <h3 className="text-lg font-bold text-[#0F284E] mt-1">
                    Whole &amp; Ground Indian Spices
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Salem Turmeric, Guntur Teja Chilli, Malabar Black Pepper, Unjha Cumin, and Alleppey Cardamom.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/products?category=spices"
                  className="text-xs font-bold text-[#0F284E] group-hover:text-[#0284C7] inline-flex items-center"
                >
                  <span>Browse Spices Specs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>

            {/* Division 3: Pulses */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative h-44 w-full bg-slate-50 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                  <Image
                    src="/images/Rotate-Dals.jpg"
                    alt="Pulses Division"
                    width={200}
                    height={160}
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                    High Protein Dals
                  </span>
                  <h3 className="text-lg font-bold text-[#0F284E] mt-1">
                    Agro Pulses &amp; Lentils
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Sortex-cleaned Toor Dhal, Green Moong, Black Urad Gota, Bengal Channa, and Moth Dhal.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/products?category=pulses"
                  className="text-xs font-bold text-[#0F284E] group-hover:text-[#0284C7] inline-flex items-center"
                >
                  <span>Browse Pulses Specs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>

            {/* Division 4: FMCG */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative h-44 w-full bg-slate-50 rounded-xl flex items-center justify-center p-2 overflow-hidden">
                  <Image
                    src="/images/Rotate-FMCG.png"
                    alt="FMCG Division"
                    width={200}
                    height={160}
                    className="max-h-36 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-semibold text-[#0284C7] uppercase tracking-wider">
                    Provisions &amp; Groceries
                  </span>
                  <h3 className="text-lg font-bold text-[#0F284E] mt-1">
                    FMCG Commodities &amp; Provisions
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Packaged consumer groceries, flours, blended masalas, and turnkey private label OEM packaging.
                  </p>
                </div>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  href="/products?category=fmcg"
                  className="text-xs font-bold text-[#0F284E] group-hover:text-[#0284C7] inline-flex items-center"
                >
                  <span>Browse FMCG Specs</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Four-Step Export Process Workflow */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#059669] block mb-2">
              Traceability &amp; Execution
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F284E] tracking-tight">
              The Jay Impex Export Workflow
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Every containerized consignment is governed by transparent procedural milestones
              ensuring on-time delivery, accurate phytosanitary certification, and flawless quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {exportProcessSteps.map((step, idx) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#F8FAFC] rounded-2xl p-6 border border-slate-200 relative flex flex-col justify-between space-y-4 hover:border-amber-400 hover:bg-white transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-3xl font-extrabold text-amber-500/80">
                        {step.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-[#0F284E] text-amber-400 flex items-center justify-center shadow-xs">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-bold text-base text-[#0F284E]">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                      Verified Standard
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Global Trade Corridors Map & Seaports */}
      <section className="py-16 bg-[#0A1B35] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                Global Footprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Exporting to 35+ International Destinations
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Operating out of our Mumbai trade desk, we manage direct container lines to major
                commercial ports across the Middle East, Europe, Africa, and the Americas.
              </p>

              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center text-slate-300">
                  <Anchor className="w-4 h-4 text-[#0284C7] mr-2 shrink-0" />
                  <span>Primary Loading Port: <strong>JNPT / Nhava Sheva (INNSA)</strong></span>
                </div>
                <div className="flex items-center text-slate-300">
                  <Ship className="w-4 h-4 text-[#D97706] mr-2 shrink-0" />
                  <span>Alternate Terminals: <strong>Mundra (INMUN) &bull; Pipavav (INPAV)</strong></span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-5 py-3 rounded-xl bg-[#D97706] hover:bg-amber-600 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                >
                  <span>Request Port-Specific Quotation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Link>
              </div>
            </div>

            {/* Right: Destination Corridors Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tradeCorridors.map((corridor, idx) => (
                <div
                  key={idx}
                  className="bg-slate-900/40 rounded-xl p-4 border border-slate-800 space-y-1.5"
                >
                  <div className="text-sm font-bold text-amber-400 flex items-center">
                    <Globe2 className="w-4 h-4 mr-1.5 text-[#0284C7]" />
                    {corridor.region}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {corridor.countries}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Direct Commercial RFQ Callout */}
      <section className="bg-gradient-to-r from-[#D97706] to-[#B45309] text-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Ready to Formulate Your Export Consignment?
            </h3>
            <p className="text-sm text-slate-900 font-medium">
              Commercial Desk provides prompt FOB / CIF quotations with full SGS certification specs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919820124748"
              className="inline-flex items-center px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-mono text-sm shadow-md transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400 mr-2" />
              <span>+91 98201 24748</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-extrabold text-sm shadow-md transition-colors"
            >
              <span>Submit RFQ Form &rarr;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
