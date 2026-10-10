import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FileDown } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { PrintButton } from "@/components/layout/PrintButton";

export const metadata: Metadata = {
  title: "Export Catalogue & Specification Sheet",
  description:
    "Printable Jay Impex export catalogue: Basmati rice, spices, pulses, FMCG and custom-sourced commodities with HS codes, specifications, packaging and minimum order quantities.",
  alternates: { canonical: "/catalogue" },
};

export default function CataloguePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24 lg:pb-10">
      <header className="mb-8 space-y-3">
        <h1 className="text-3xl font-extrabold text-[#0F284E]">
          Jay Impex Export Catalogue
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Commodities exporters since 1990, Chennai, India. Specifications are indicative
          and tailored per shipment; request a quote for current grades, pricing and
          Incoterms (FOB, CIF, CFR, EXW). Contact: info@jayimpex.net · +91 94440 42275 ·
          www.jayimpex.net
        </p>
        <div className="flex flex-wrap items-center gap-3 print:hidden">
          <a
            href="/downloads/Jay_Impex_Export_Brochure.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D97706] hover:bg-amber-600 text-slate-950 text-sm font-semibold"
          >
            <FileDown className="w-4 h-4" aria-hidden="true" />
            <span>Download Brochure (PDF, 16 pages)</span>
          </a>
          <PrintButton />
        </div>
      </header>

      <div className="space-y-6">
        {PRODUCTS.map((p) => (
          <section
            key={p.id}
            className="print-avoid-break border border-slate-200 rounded-xl p-5 flex flex-col sm:flex-row gap-5"
          >
            <div className="sm:w-44 shrink-0">
              <div className="relative w-full sm:w-44 h-44 rounded-lg bg-white border border-slate-100 flex items-center justify-center overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  width={176}
                  height={176}
                  sizes="176px"
                  className="max-h-44 w-auto object-contain"
                />
              </div>
              {p.imageCredit && (
                <p className="mt-1 text-[9px] leading-tight text-slate-400">
                  Photo: {p.imageCredit.author}, {p.imageCredit.license}
                </p>
              )}
            </div>
            <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-lg font-bold text-[#0F284E]">{p.name}</h2>
              <span className="text-xs font-medium text-slate-500">{p.categoryLabel}</span>
            </div>
            <p className="text-sm text-slate-600 mt-1">{p.subtitle}</p>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 mt-3 text-sm">
              <div><dt className="inline font-semibold">HS Code: </dt><dd className="inline">{p.hsCode}</dd></div>
              <div><dt className="inline font-semibold">Origin: </dt><dd className="inline">{p.origin}</dd></div>
              <div><dt className="inline font-semibold">MOQ: </dt><dd className="inline">{p.minOrderQuantity}</dd></div>
              <div><dt className="inline font-semibold">Shelf life: </dt><dd className="inline">{p.shelfLife}</dd></div>
              {p.specifications.map((s) => (
                <div key={s.label}>
                  <dt className="inline font-semibold">{s.label}: </dt>
                  <dd className="inline">{s.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm mt-3">
              <span className="font-semibold">Packaging: </span>
              {p.packagingOptions.join("; ")}
            </p>
            <p className="text-sm mt-1">
              <span className="font-semibold">Certifications: </span>
              {p.certifications.join(", ")}
            </p>
            <p className="text-xs mt-2 print:hidden">
              <Link
                href={`/products/${p.slug}`}
                className="text-[#0284C7] hover:underline"
              >
                View product page
              </Link>
            </p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
