"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Anchor,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ExternalLink,
  Loader2,
  Map,
} from "lucide-react";

const commodityOptions = [
  "Deity 1121 Steam Basmati Rice",
  "Deity 1509 Golden Sella Basmati Rice",
  "Sugandha / Sharbati Long Grain Rice",
  "Salem Pure Turmeric Fingers & Powder",
  "Guntur Sannam / Teja Red Chilli",
  "Malabar Black Pepper (TGSEB)",
  "Indian Cumin Seeds (Jeera)",
  "Green Cardamom (Alleppey Bold)",
  "Coriander Seeds (Dhaniya)",
  "Toor Dhal (Yellow Split Pigeon Peas)",
  "Green Moong (Whole & Split Lentils)",
  "Black Urid Dhal (Gota & Split)",
  "Channa Dal (Bengal Gram Split)",
  "FMCG Branded Food & Provisions",
  "Private Label Custom Packaging (OEM)",
  "Mixed Container Multi-Commodity Consignment",
  "Other Agro Commodity Specification",
];

function ContactFormContent() {
  const searchParams = useSearchParams();
  const prefillProduct = searchParams.get("product") || "";
  const prefillSubject = searchParams.get("subject") || "";

  const renderTimestampRef = React.useRef<number>(0);

  useEffect(() => {
    renderTimestampRef.current = Date.now();
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    country: "",
    commodity: prefillProduct || (prefillSubject ? "Private Label Custom Packaging (OEM)" : "Deity 1121 Steam Basmati Rice"),
    volume: "",
    incoterm: "FOB",
    message: prefillProduct
      ? `We would like to request an export quotation for ${prefillProduct}. Please provide CIF / FOB pricing, available packaging, and shipping timeline.`
      : "",
    honeypot: "", // hidden spam trap
    consent: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.consent) {
      setErrorMessage("Please accept the commercial privacy notice to submit your inquiry.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          renderTimestamp: renderTimestampRef.current,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quotation request.");
      }

      setSuccessMessage(
        data.message ||
          "Your commercial quotation request has been successfully transmitted to the export desk."
      );

      // Reset form after successful submission
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        country: "",
        commodity: "Deity 1121 Steam Basmati Rice",
        volume: "",
        incoterm: "FOB",
        message: "",
        honeypot: "",
        consent: false,
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please contact export@jayimpex.net directly.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-24">
      {/* Header Banner */}
      <section className="bg-gradient-to-r from-[#0F284E] via-[#0E2445] to-[#0A1B35] text-white py-14 lg:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs text-slate-400 mb-4 flex items-center space-x-2">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-amber-400 font-medium">Commercial Desk &amp; Contact</span>
          </nav>

          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Direct Commercial Quotations &bull; Mon - Sat 09:30 - 18:30 IST</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Commercial Export Desk &amp; RFQ Portal
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Connect directly with our international trade desk in Mumbai. Submit
              specifications for Deity Basmati Rice, spices, pulses, or mixed container
              freight to receive tailored FOB / CIF quotation sheets.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Info + Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Commercial Headquarters & Hotlines (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Headquarters Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] block">
                  Registered Commercial Office
                </span>
                <h2 className="text-xl font-bold text-[#0F284E] mt-1">Jay Impex</h2>
                <p className="text-xs text-slate-500">Govt. Recognized Agro Export House</p>
              </div>

              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-[#D97706] mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-400">
                      Office Address
                    </strong>
                    <address className="not-italic text-slate-700 leading-relaxed mt-0.5">
                      202, Marine Chambers, 11,
                      <br />
                      New Marine Lines, Churchgate,
                      <br />
                      Mumbai - 400 020, Maharashtra, India.
                    </address>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-[#0284C7] mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-400">
                      Commercial Desk Lines
                    </strong>
                    <div className="space-y-0.5 mt-0.5 font-mono text-slate-800">
                      <a href="tel:+919820124748" className="hover:text-[#0284C7] block transition-colors">
                        +91 98201 24748
                      </a>
                      <a href="tel:+919322275151" className="hover:text-[#0284C7] block transition-colors">
                        +91 93222 75151
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-[#D97706] mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-400">
                      Trade Desk Inquiries
                    </strong>
                    <a
                      href="mailto:export@jayimpex.net"
                      className="text-[#0F284E] hover:text-[#0284C7] font-mono font-medium block mt-0.5 transition-colors"
                    >
                      export@jayimpex.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-slate-400 mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-400">
                      Operating Hours
                    </strong>
                    <div className="text-slate-700 mt-0.5 text-xs">
                      Monday &ndash; Saturday: 09:30 &ndash; 18:30 IST (UTC +5:30)
                      <br />
                      Sunday: Closed (Emergency dispatch available)
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Anchor className="w-5 h-5 text-[#0284C7] mr-3 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 block text-xs uppercase text-slate-400">
                      Primary Marine Terminals
                    </strong>
                    <div className="text-slate-700 mt-0.5 text-xs">
                      JNPT / Nhava Sheva (INNSA) &bull; Mundra (INMUN)
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919820124748?text=Hello%20Jay%20Impex%20Trade%20Desk,%20I%20would%20like%20to%20inquire%20about%20agro%20commodity%20exports."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  <span>Chat via WhatsApp (+91 98201 24748)</span>
                </a>
              </div>
            </div>

            {/* Location Map Card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-[#0F284E] font-bold text-sm">
                  <Map className="w-4 h-4 text-[#D97706]" />
                  <span>Mumbai Port Office Map</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Marine+Chambers+New+Marine+Lines+Churchgate+Mumbai+400020"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0284C7] hover:underline inline-flex items-center"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>

              {mapLoaded ? (
                <div className="relative h-60 w-full rounded-xl overflow-hidden border border-slate-200">
                  <iframe
                    title="Jay Impex Office Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.847154245638!2d72.8252!3d18.9372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1de4582f3ef%3A0x6b8c8d8b63a968a!2sMarine%20Chambers%2C%20New%20Marine%20Lines%2C%20Churchgate%2C%20Mumbai%2C%20Maharashtra%20400020!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : (
                <div className="h-44 w-full rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center p-4 text-center space-y-3">
                  <MapPin className="w-8 h-8 text-[#D97706]" />
                  <p className="text-xs text-slate-600 max-w-xs">
                    Located in Marine Chambers, Churchgate, Mumbai. 40km from JNPT Port Container Freight Station.
                  </p>
                  <button
                    onClick={() => setMapLoaded(true)}
                    className="px-4 py-2 rounded-lg bg-[#0F284E] text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Load Interactive Map
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Commercial RFQ Submission Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-md">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
                  Commercial Submission
                </span>
                <h2 className="text-2xl font-bold text-[#0F284E] tracking-tight">
                  Request an Export Quotation (RFQ)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Fill in your commercial requirements below. Responses provided within 24 business hours.
                </p>
              </div>

              {/* Status Alert Banners */}
              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block font-semibold">RFQ Transmitted Successfully</strong>
                    <p className="text-xs text-emerald-800 leading-relaxed">{successMessage}</p>
                  </div>
                </div>
              )}

              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-sm flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <strong className="block font-semibold">Submission Incomplete</strong>
                    <p className="text-xs text-rose-800 leading-relaxed">{errorMessage}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Anti-spam Honeypot Field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website_url">Leave this field blank</label>
                  <input
                    type="text"
                    id="website_url"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.honeypot}
                    onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                  />
                </div>

                {/* Name & Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Company / Importer Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Al-Noor Global Trading LLC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Business Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. trade@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Phone / WhatsApp (with country code) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +971 50 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                    />
                  </div>
                </div>

                {/* Country / Destination Seaport */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Destination Seaport &amp; Country <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jebel Ali Port (Dubai, UAE) or Rotterdam (Netherlands)"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Commodity & Incoterms */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Commodity Sector <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={formData.commodity}
                      onChange={(e) => setFormData({ ...formData, commodity: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                    >
                      {commodityOptions.map((opt, i) => (
                        <option key={i} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Incoterm
                    </label>
                    <select
                      value={formData.incoterm}
                      onChange={(e) => setFormData({ ...formData, incoterm: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                    >
                      <option value="FOB">FOB (JNPT / Mumbai)</option>
                      <option value="CIF">CIF (Port of Discharge)</option>
                      <option value="CFR">CFR (Cost &amp; Freight)</option>
                      <option value="EXW">EXW (Factory gate)</option>
                    </select>
                  </div>
                </div>

                {/* Required Volume / Packaging */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Estimated Volume &amp; Packaging Preference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 2 x 20ft FCL in 10kg BOPP bags or 50 MT in bulk PP sacks"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Detailed Specifications / Message */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Detailed Specifications &amp; Commercial Notes <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Specify target grain length, moisture content, purity %, required inspection agency (SGS, Geo-Chem), or target dispatch timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent text-slate-900 bg-slate-50/50"
                  />
                </div>

                {/* Privacy Consent Checkbox */}
                <div className="flex items-start space-x-2 pt-1">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-[#D97706] focus:ring-[#D97706]"
                  />
                  <label htmlFor="consent" className="text-xs text-slate-600 leading-snug">
                    I acknowledge that the submitted contact and trade parameters will be processed
                    exclusively for formulating commercial price quotations in accordance with the{" "}
                    <Link href="/privacy" target="_blank" className="text-[#0284C7] underline hover:text-[#0369A1]">
                      Privacy Policy &amp; Trade Data Notice
                    </Link>
                    .
                  </label>
                </div>

                {/* Submit Action Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#0F284E] hover:bg-[#1E3A8A] active:bg-[#0A1B35] disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all group"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        <span>Transmitting RFQ to Commercial Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                        <span>Submit Request for Quotation (RFQ)</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-sm font-semibold text-slate-600 animate-pulse">
            Loading Commercial Desk...
          </div>
        </div>
      }
    >
      <ContactFormContent />
    </Suspense>
  );
}
