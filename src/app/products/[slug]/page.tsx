import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Anchor,
  Clock,
  Package,
  FileCheck2,
  PhoneCall,
  CheckCircle,
} from "lucide-react";
import { PRODUCTS } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: "Commodity Not Found | Jay Impex",
      description: "The requested commodity specification could not be located.",
    };
  }

  return {
    title: `${product.name} - Technical Export Specifications | Jay Impex`,
    description: `${product.subtitle} Origin: ${product.origin}. HS Code: ${product.hsCode}. Certified global export from Chennai Port (INMAA).`,
    openGraph: {
      title: `${product.name} | Jay Impex Commodities Exports`,
      description: product.subtitle,
      url: `https://www.jayimpex.net/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Related products from same category or fallback to other products
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-[#0F284E] text-slate-300 py-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <nav className="flex items-center space-x-2 overflow-x-auto">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-amber-400 transition-colors">
              Catalogue
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-medium truncate max-w-xs">
              {product.name}
            </span>
          </nav>

          <Link
            href="/products"
            className="inline-flex items-center text-slate-300 hover:text-white transition-colors shrink-0 ml-4"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Catalogue</span>
          </Link>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 lg:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Visual Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative overflow-hidden flex flex-col items-center">
              {product.featured && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-md text-xs font-bold bg-[#D97706] text-slate-950 uppercase tracking-wider shadow-sm">
                  Flagship Commodity
                </span>
              )}
              <div className="relative w-full h-80 sm:h-96 flex items-center justify-center p-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="max-h-80 w-auto object-contain drop-shadow-xl"
                  priority
                />
              </div>

              {/* Quality & Certification Trust Badges */}
              <div className="w-full pt-4 border-t border-slate-100 flex flex-wrap gap-2 justify-center text-xs">
                {product.certifications.map((cert, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium text-[11px]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 mr-1" />
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Port & Dispatch Metadata Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-3 text-xs">
              <h4 className="font-semibold text-slate-900 uppercase tracking-wider text-[11px]">
                Shipping &amp; Logistics Overview
              </h4>
              <div className="grid grid-cols-2 gap-3 text-slate-600">
                <div className="border-r border-slate-100 pr-2">
                  <span className="text-slate-400 block text-[10px] uppercase">Primary Port</span>
                  <span className="font-semibold text-slate-800 flex items-center mt-0.5">
                    <Anchor className="w-3.5 h-3.5 text-[#0284C7] mr-1" />
                    Chennai (INMAA)
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Alternate Ports</span>
                  <span className="font-semibold text-slate-800 block mt-0.5">
                    Kamarajar (Ennore) &bull; Tuticorin
                  </span>
                </div>
                <div className="border-r border-slate-100 pr-2 pt-2 border-t">
                  <span className="text-slate-400 block text-[10px] uppercase">Supported Incoterms</span>
                  <span className="font-mono font-semibold text-slate-800 block mt-0.5">
                    FOB, CIF, CFR, EXW
                  </span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-slate-400 block text-[10px] uppercase">Shelf Stability</span>
                  <span className="font-semibold text-slate-800 flex items-center mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-[#D97706] mr-1" />
                    {product.shelfLife}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Specifications & RFQ Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-[#0F284E] text-white font-semibold uppercase tracking-wider">
                  {product.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-mono font-semibold">
                  HS: {product.hsCode}
                </span>
                <span className="text-slate-500 font-medium">
                  Origin: <strong>{product.origin}</strong>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0F284E] tracking-tight">
                {product.name}
              </h1>

              <p className="text-base text-slate-600 leading-relaxed">
                {product.subtitle}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all group"
              >
                <span>Request FOB / CIF Quotation</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+919444042275"
                className="inline-flex items-center justify-center px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm border border-slate-300 shadow-xs transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#0284C7] mr-2" />
                <span>Call Commercial Desk</span>
              </a>
            </div>

            {/* Commercial Parameters Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white rounded-xl p-5 border border-slate-200">
              <div>
                <span className="text-xs text-slate-400 block uppercase font-medium">
                  Minimum Order Quantity (MOQ)
                </span>
                <span className="font-semibold text-sm text-slate-800 block mt-1">
                  {product.minOrderQuantity}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block uppercase font-medium">
                  Quality Inspection
                </span>
                <span className="font-semibold text-sm text-slate-800 block mt-1">
                  SGS / Geo-Chem / Buyer Inspection
                </span>
              </div>
            </div>

            {/* In-depth Narrative */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-[#0F284E]">
                Product Overview &amp; Sourcing Provenance
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Full Technical Specifications Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0F284E] flex items-center">
                  <FileCheck2 className="w-4 h-4 text-[#0284C7] mr-2" />
                  Technical Quality Specifications
                </h3>
                <span className="text-xs font-mono text-slate-500">APEDA &amp; ISO Standard</span>
              </div>
              <div className="divide-y divide-slate-100">
                {product.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-medium text-slate-600">{spec.label}</span>
                    <span className="font-mono font-semibold text-slate-900 mt-1 sm:mt-0">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Packaging Solutions */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-[#D97706]" />
                <h3 className="text-base font-bold text-[#0F284E]">
                  Available Export Packaging Solutions
                </h3>
              </div>
              <ul className="space-y-2.5">
                {product.packagingOptions.map((opt, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 shrink-0 mt-0.5" />
                    <span>{opt}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 text-xs text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100">
                Custom branding, multilingual nutrition label printing, and barcode tagging available for private label accounts.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0F284E]">
                Complementary Commodities
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Explore related commodities available for combined container shipments.
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs sm:text-sm font-semibold text-[#D97706] hover:text-amber-700 inline-flex items-center"
            >
              <span>View Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <div
                key={rel.id}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs hover:shadow-md hover:border-amber-400 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative w-16 h-16 bg-slate-50 rounded-lg p-1 shrink-0 flex items-center justify-center">
                    <Image
                      src={rel.image}
                      alt={rel.name}
                      width={64}
                      height={64}
                      className="max-h-14 w-auto object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-[#0284C7] uppercase">
                      {rel.categoryLabel}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      <Link href={`/products/${rel.slug}`}>{rel.name}</Link>
                    </h3>
                  </div>
                </div>
                <Link
                  href={`/products/${rel.slug}`}
                  className="w-full py-2 rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 text-center transition-colors"
                >
                  View Details &rarr;
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
