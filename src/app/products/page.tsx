"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  ArrowRight,
  CheckCircle,
  Package,
} from "lucide-react";
import { PRODUCTS, CATEGORIES, type Product } from "@/data/products";

function CatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "name">("featured");

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.subtitle.toLowerCase().includes(q) ||
        product.description.toLowerCase().includes(q) ||
        product.hsCode.toLowerCase().includes(q) ||
        product.origin.toLowerCase().includes(q) ||
        product.specifications.some(
          (s) =>
            s.label.toLowerCase().includes(q) || s.value.toLowerCase().includes(q)
        );

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      // Featured first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Catalogue Header Banner */}
      <section className="bg-gradient-to-r from-[#0F284E] via-[#0E2445] to-[#0A1B35] text-white py-12 lg:py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-slate-400 mb-4 flex items-center space-x-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">Export Catalogue</span>
          </nav>

          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <span>Verified APEDA &amp; FSSAI Sourced Commodities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Global Agro Export Catalogue
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Explore our laboratory-certified commodities: Deity Basmati Rice,
              pure whole &amp; ground Indian spices, sorted pulses, and FMCG provisions.
              Containerized dispatch from JNPT Port (Mumbai) to 35+ global seaports.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar Section */}
      <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by commodity, HS code, or origin..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort & Count */}
            <div className="flex items-center justify-between w-full md:w-auto gap-4 text-xs sm:text-sm">
              <span className="text-slate-500 font-medium">
                Showing <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> commodities
              </span>

              <div className="flex items-center space-x-2">
                <span className="text-slate-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "featured" | "name")}
                  className="rounded-lg border border-slate-300 py-1.5 px-3 text-xs sm:text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706]"
                >
                  <option value="featured">Featured First</option>
                  <option value="name">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex items-center space-x-2 ${
                    isSelected
                      ? "bg-[#0F284E] text-white shadow-sm ring-2 ring-[#0F284E]/20"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? "bg-[#D97706] text-slate-950 font-bold"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commodity Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No commodities matched</h3>
            <p className="text-xs text-slate-500">
              We couldn&apos;t find any commodities matching &ldquo;{searchQuery}&rdquo;.
              Try resetting your search filters or contact our commercial desk directly.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="px-4 py-2 rounded-lg bg-[#0F284E] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Global Trade & Packing Services Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="space-y-3 lg:col-span-2">
              <div className="inline-flex items-center text-xs font-semibold text-[#0284C7] bg-sky-50 px-2.5 py-1 rounded">
                <Package className="w-3.5 h-3.5 mr-1" />
                Custom Private Labeling &amp; Supermarket Packing
              </div>
              <h2 className="text-2xl font-bold text-[#0F284E] tracking-tight">
                Need Custom Brand Packaging or Mixed Container Shipments?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Jay Impex facilitates end-to-end OEM and private label packaging for
                international supermarket chains, diaspora food distributors, and institutional
                caterers. We consolidate multiple agro-commodities into single 20ft/40ft
                containers under your proprietary label with complete multilingual compliance.
              </p>
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-600">
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5" />
                  SGS / Geo-Chem Inspection
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5" />
                  BOPP, Non-Woven &amp; Jute Bags
                </span>
                <span className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-1.5" />
                  FOB / CIF Global Seaports
                </span>
              </div>
            </div>

            <div className="text-center lg:text-right">
              <Link
                href="/contact?subject=Custom+Packaging+Inquiry"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#D97706] hover:bg-amber-600 text-slate-950 font-bold text-sm shadow-md transition-all group"
              >
                <span>Request Custom Quote</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-lg hover:border-amber-400 transition-all flex flex-col overflow-hidden group">
      {/* Product Image Stage */}
      <div className="relative h-56 w-full bg-slate-50 border-b border-slate-100 flex items-center justify-center p-4 overflow-hidden">
        {product.featured && (
          <span className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-[#D97706] text-slate-950 uppercase tracking-wider shadow-xs">
            Flagship Export
          </span>
        )}
        <span className="absolute top-3 right-3 z-10 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-200/80 text-slate-700">
          HS: {product.hsCode}
        </span>
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={product.image}
            alt={product.name}
            width={280}
            height={220}
            className="max-h-48 w-auto object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
          />
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#0284C7] font-semibold uppercase tracking-wider">
              {product.categoryLabel}
            </span>
            <span className="text-slate-400 text-[11px]">{product.origin}</span>
          </div>

          <h3 className="text-lg font-bold text-[#0F284E] group-hover:text-[#0284C7] transition-colors leading-snug">
            <Link href={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Key Specifications preview */}
          <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-1 text-xs">
            {product.specifications.slice(0, 3).map((spec, i) => (
              <div key={i} className="flex justify-between text-[11px]">
                <span className="text-slate-500">{spec.label}:</span>
                <span className="font-mono font-semibold text-slate-800">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center text-xs font-semibold text-[#0F284E] hover:text-[#0284C7] transition-colors py-2 px-1"
          >
            <span>Full Specs</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          <Link
            href={`/contact?product=${encodeURIComponent(product.name)}`}
            className="inline-flex items-center justify-center px-3.5 py-2 rounded-lg bg-[#0F284E] hover:bg-[#1E3A8A] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Request RFQ
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-sm font-semibold text-slate-600 animate-pulse">
            Loading Export Catalogue...
          </div>
        </div>
      }
    >
      <CatalogueContent />
    </Suspense>
  );
}
