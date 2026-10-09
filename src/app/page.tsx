import Link from "next/link";
import Image from "next/image";
import {
  Ship,
  ShieldCheck,
  Award,
  Globe2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  PhoneCall,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0F284E] via-[#0E2445] to-[#0A1B35] text-white py-16 lg:py-24 overflow-hidden">
        {/* Subtle decorative background grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Govt. Recognized Export House &bull; Est. 2005</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                India&apos;s Trusted Exporter of{" "}
                <span className="text-amber-400">Deity Basmati Rice</span> &amp;{" "}
                <span className="text-sky-400">Agro Commodities</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Supplying global importers, wholesalers, and retail distributors with
                hand-graded Indian basmati rice, pure authentic spices, pulses, and
                FMCG provisions from JNPT Nhava Sheva to worldwide seaports.
              </p>

              {/* Badges */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>ISO 9001:2015 &amp; APEDA</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Ship className="w-4 h-4 text-[#0284C7]" />
                  <span>JNPT Port Direct Dispatch</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                  <Globe2 className="w-4 h-4 text-amber-400" />
                  <span>35+ Global Markets</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#D97706] hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold text-sm shadow-lg hover:shadow-xl transition-all"
                >
                  <span>Request Export Quotation</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-600 transition-all"
                >
                  <span>Explore Export Catalogue</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Hero Product Visual Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl text-center">
                <div className="relative h-64 w-full mb-4 rounded-xl overflow-hidden bg-slate-900/40 flex items-center justify-center">
                  <Image
                    src="/images/Deity_Rice.png"
                    alt="Deity Basmati Rice Package"
                    width={320}
                    height={320}
                    className="max-h-56 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                <div className="text-left space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-amber-400 font-semibold tracking-wider">
                      Flagship Brand
                    </span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                      Export Grade
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Deity Basmati Rice</h3>
                  <p className="text-xs text-slate-300">
                    Aged extra-long slender grains, aromatic perfection, premium 1121 &amp; 1509 Steam varieties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commodity Division Highlights */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#0284C7] mb-2">
              Export Specializations
            </h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-[#0F284E] tracking-tight">
              Commodities Exported Worldwide
            </p>
            <p className="text-sm text-slate-600 mt-2">
              Rigorous laboratory quality checks, certified phytosanitary inspection, and custom packaging.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Division 1: Deity Rice */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-amber-50 text-[#D97706] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F284E] mb-2">Basmati &amp; Non-Basmati Rice</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Flagship Deity brand, 1121 Steam, 1509 Golden Sella, Sugandha, and Sharbati grain selections.
              </p>
              <Link
                href="/products?category=rice"
                className="text-xs font-semibold text-[#D97706] hover:text-amber-700 inline-flex items-center"
              >
                <span>View Rice Specs</span>
                <span className="ml-1">&rarr;</span>
              </Link>
            </div>

            {/* Division 2: Spices */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F284E] mb-2">Whole &amp; Ground Spices</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Salem Turmeric fingers, Guntur red chillies, Malabar black pepper, coriander seeds &amp; blends.
              </p>
              <Link
                href="/products?category=spices"
                className="text-xs font-semibold text-[#D97706] hover:text-amber-700 inline-flex items-center"
              >
                <span>View Spices Specs</span>
                <span className="ml-1">&rarr;</span>
              </Link>
            </div>

            {/* Division 3: Pulses */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F284E] mb-2">Agro Pulses &amp; Lentils</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Sortex-cleaned Toor dhal, Green Moong, Black Urad whole &amp; split, Bengal Channa dhal.
              </p>
              <Link
                href="/products?category=pulses"
                className="text-xs font-semibold text-[#D97706] hover:text-amber-700 inline-flex items-center"
              >
                <span>View Pulses Specs</span>
                <span className="ml-1">&rarr;</span>
              </Link>
            </div>

            {/* Division 4: FMCG */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-amber-400 transition-all group">
              <div className="w-12 h-12 rounded-lg bg-sky-50 text-[#0284C7] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0F284E] mb-2">FMCG Commodities</h3>
              <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                Consumer packaged groceries, ready spices, blended flours, and custom private label packaging.
              </p>
              <Link
                href="/products?category=fmcg"
                className="text-xs font-semibold text-[#D97706] hover:text-amber-700 inline-flex items-center"
              >
                <span>View FMCG Specs</span>
                <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Commercial Hotline Callout */}
      <section className="bg-[#0F284E] text-white py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">
              Require Containerized Bulk Quotes or Custom Packing?
            </h3>
            <p className="text-sm text-slate-300">
              Commercial Desk provides prompt FOB / CIF quotations with full SGS certification specs.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:+919820124748"
              className="inline-flex items-center px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-sm border border-slate-700 transition-colors"
            >
              <PhoneCall className="w-4 h-4 text-amber-400 mr-2" />
              <span>+91 98201 24748</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center px-5 py-2.5 rounded-lg bg-[#D97706] hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-colors"
            >
              <span>Submit RFQ Form</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
