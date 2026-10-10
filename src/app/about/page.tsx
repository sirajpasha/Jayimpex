import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  MapPin,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us & Sourcing Capabilities | Jay Impex Exporters",
  description:
    "Learn about Jay Impex: Established in 1990 in Chennai, India. Certified exporter of Deity Basmati Rice, spices, pulses, FMCG, and custom sourcing of textiles, machineries, utensils, sweets, seasonal fruits, and door mats.",
};

const sourcingHubs = [
  {
    region: "Chennai & South India Gateway",
    badge: "Headquarters & Logistics",
    items: "Chennai Port (INMAA), FMCG Consolidation, Multi-Commodity Export Desk",
    desc: "Headquartered in Anna Nagar West, Chennai. Proximity to Chennai Port and Kamarajar Port for rapid container stuffing, customs clearance, and global ocean sailings.",
  },
  {
    region: "Tamil Nadu Industrial & Textile Belts",
    badge: "Textiles, Machinery & Utensils",
    items: "Tirupur (Apparel), Coimbatore (Machinery), Salem (SS Utensils), Karur (Mats)",
    desc: "Direct procurement of cotton garments, agro processing machinery, stainless steel cookware, and coir door mats manufactured to client technical specifications.",
  },
  {
    region: "Punjab & Haryana",
    badge: "Basmati Paddy Belt",
    items: "Deity 1121 & 1509 Basmati Rice, Traditional Aromatic Grains",
    desc: "Direct partnership with farmer collectives in the fertile Indo-Gangetic plains. Automated steam processing and modern milling infrastructure.",
  },
  {
    region: "Andhra Pradesh & Telangana",
    badge: "Chilli & Turmeric Hub",
    items: "Guntur Sannam S4, Teja Red Chilli, Nizamabad Turmeric, Urid Dal",
    desc: "Procured directly from Asia's largest spice market in Guntur. Climate-controlled cold storage preservation and cryogenic grinding.",
  },
  {
    region: "Tamil Nadu (Salem & Erode)",
    badge: "Curcumin Epicenter",
    items: "Salem Turmeric Fingers & High-Curcumin Golden Powder",
    desc: "Direct procurement of naturally cured turmeric rhizomes with guaranteed 3.5%+ active curcuminoid concentration.",
  },
  {
    region: "Gujarat & Rajasthan",
    badge: "Seed Spices & Pulses",
    items: "Unjha Cumin (Jeera), Coriander Seeds, Moong Dal, Channa Dal",
    desc: "Multi-tier optical sortex cleaning and destoning facilities near Unjha to ensure 99.5% Europe-grade seed purity.",
  },
  {
    region: "Kerala (Malabar Coast & Alleppey)",
    badge: "Rainforest Spices & Coir",
    items: "Tellicherry Black Pepper, Cardamom, Alleppey Natural Coir Mats",
    desc: "Highland spices hand-picked from the biodiverse Western Ghats, alongside high-durability natural coconut coir door mats from traditional weaving hubs.",
  },
  {
    region: "Southern Horticultural Belts",
    badge: "Fresh Fruits & Sweets",
    items: "Export Mangoes (Banganapalli & Alphonso), Bananas, Traditional Ghee Sweets",
    desc: "APEDA cold-chain certified export of seasonal fresh fruits and nitrogen-packed authentic Indian sweets with extended shelf life.",
  },
];

const accreditations = [
  {
    name: "APEDA Certified",
    authority: "Ministry of Commerce, Govt. of India",
    desc: "Recognized export compliance for grains, cereals, fresh fruits, and processed food products.",
  },
  {
    name: "Spices Board of India",
    authority: "Statutory Spice Export Registration",
    desc: "Strict adherence to international hygiene, aflatoxin limits, and pesticide controls.",
  },
  {
    name: "FSSAI License",
    authority: "Food Safety and Standards Authority of India",
    desc: "Certified hygiene processing and safe food handling standards.",
  },
  {
    name: "ISO 9001:2015",
    authority: "Quality Management System Certification",
    desc: "Standardized quality control workflows from farm-gate and factory to container seal.",
  },
  {
    name: "DGFT IEC Registered",
    authority: "Directorate General of Foreign Trade",
    desc: "Valid statutory Import-Export authorization code since 1990.",
  },
  {
    name: "SGS / Geo-Chem Partnered",
    authority: "Independent Third-Party Verification",
    desc: "Pre-shipment batch inspection, certificate of analysis, and draft survey reports.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F284E] via-[#0E2445] to-[#0A1B35] text-white py-16 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-4 flex items-center space-x-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">About Us &amp; Sourcing</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Over Three Decades of Global Export Heritage &bull; Est. 1990</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Connecting India&apos;s Commodities &amp; Manufacturing to Worldwide Markets
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Jay Impex is a Govt. Recognized Export House headquartered in Chennai, Tamil Nadu, India.
              We are a leading commodities exporter: from staple agro commodities (Deity Basmati Rice,
              spices, pulses, FMCG) to bespoke client-driven procurement of textiles, machineries,
              utensils, traditional sweets, seasonal fruits, and door mats.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Overview & Heritage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7]">
              Company Provenance
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F284E] tracking-tight">
              Reliable Commodities Sourcing &amp; Export Partner Since 1990
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Established in 1990 in Chennai, Tamil Nadu, Jay Impex has evolved over more than
              three decades from a premier domestic commodities wholesaler into a diversified
              international export house trusted across 35+ countries — including Australia,
              the Middle East, North America, Europe, and Africa.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Our core strength lies in our pan-India network of direct farm-gate and factory relationships.
              Whether delivering full container loads of Sortex-cleaned Deity Basmati Rice and high-curcumin
              turmeric, or sourcing custom orders of cotton textiles, food processing machinery, stainless steel
              kitchenware, fresh seasonal mangoes, or natural coir door mats, we tailor each consignment
              strictly to the client&apos;s technical specifications, packaging, and delivery schedule.
            </p>

            {/* Key Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                <div className="text-2xl font-bold font-mono text-[#D97706]">35+ Yrs</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Export &amp; Trade Heritage</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                <div className="text-2xl font-bold font-mono text-[#0284C7]">35+</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Countries Served (Incl. Australia)</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-xs">
                <div className="text-2xl font-bold font-mono text-emerald-600">100%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">Inspection Verified</div>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-md relative overflow-hidden space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-[#0F284E] text-white flex items-center justify-center font-bold text-xl shadow">
                  JI
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-[#0F284E]">JAY IMPEX</h3>
                  <p className="text-xs text-slate-500">Commercial Export Desk &bull; Chennai, India</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Farm-Gate &amp; Factory Procurement:</strong> Direct sourcing from prime mandis and manufacturing clusters.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Multi-Commodity Merchant Sourcing:</strong> Agros, textiles, machineries, utensils, sweets, fruits, and mats.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Chennai Port Proximity:</strong> Container staging facilities adjacent to Chennai Port (INMAA) &amp; Kamarajar terminals.
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                  <span>
                    <strong>Turnkey Export Documentation:</strong> Bill of Lading, Certificate of Origin, Phytosanitary, and SGS lab assays.
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Incoterms: <strong>FOB / CIF / CFR / EXW</strong></span>
                <Link
                  href="/contact"
                  className="font-bold text-[#D97706] hover:underline"
                >
                  Contact Desk &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Sourcing Epicenters */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0284C7] block mb-2">
              Pan-India Supply Network
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F284E] tracking-tight">
              Regional Agro Sourcing Epicenters
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every commodity is procured from its geographical origin of optimal soil,
              climate, and traditional agricultural expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sourcingHubs.map((hub, idx) => (
              <div
                key={idx}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-amber-400 hover:bg-white transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0F284E] text-base flex items-center">
                    <MapPin className="w-4 h-4 text-[#D97706] mr-1.5" />
                    {hub.region}
                  </span>
                  <span className="text-[10px] font-semibold bg-sky-100 text-[#0284C7] px-2 py-0.5 rounded">
                    {hub.badge}
                  </span>
                </div>

                <div className="text-xs font-semibold text-slate-800">
                  {hub.items}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {hub.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance & Statutory Accreditations */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#059669] block mb-2">
            Compliance &amp; Inspection
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F284E] tracking-tight">
            Statutory Certifications &amp; Quality Mandates
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            We operate in total conformity with Indian export statutory bodies and
            international food safety regulatory regimes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accreditations.map((acc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow space-y-2"
            >
              <div className="flex items-center space-x-2 text-emerald-600">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-base text-slate-900">{acc.name}</h3>
              </div>
              <div className="text-[11px] font-mono text-[#0284C7] uppercase font-semibold">
                {acc.authority}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {acc.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Private Labeling Section */}
      <section id="private-label" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-[#0F284E] to-[#1E3A8A] rounded-3xl text-white p-8 sm:p-12 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20 inline-block">
                Custom OEM &amp; Supermarket Solutions
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Private Label Packaging &amp; Tailored Brand Specifications
              </h2>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Looking to market premium Indian Basmati Rice, ground spices, or pulses
                under your own company or supermarket brand? We provide turnkey packaging,
                custom artwork plate production, food-grade barrier films, and barcode
                integration with rapid turnaround.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
                <div>&bull; BOPP Laminated Pouches</div>
                <div>&bull; Non-Woven Zipper Bags</div>
                <div>&bull; Heavy Duty Jute Sacks</div>
                <div>&bull; Multi-Wall Paper Bags</div>
                <div>&bull; Vacuum Packed Nitrogen Sacks</div>
                <div>&bull; Barcoded Master Cartons</div>
              </div>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <Link
                href="/contact?subject=Private+Label+Inquiry"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-lg transition-all"
              >
                <span>Inquire for Private Label</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
