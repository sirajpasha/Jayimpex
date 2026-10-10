"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FileDown, X } from "lucide-react";

const inputCls =
  "w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#D97706] focus:border-transparent";
const labelCls = "block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5";

export function BrochureDownload() {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);
  const openedAt = useRef(0);
  const firstField = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    honeypot: "",
    consent: false,
  });

  useEffect(() => {
    if (!open) return;
    openedAt.current = Date.now();
    firstField.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.consent) {
      setError("Please accept the privacy notice to continue.");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, renderTimestamp: openedAt.current }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Could not process your request.");
      if (!data.downloadUrl) {
        setDone("Thank you. We will be in touch shortly.");
        return;
      }
      setDone("Thank you. Your download is starting.");
      window.location.assign(data.downloadUrl); // served as an attachment; the page stays open
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setDone(null);
          setError(null);
          setOpen(true);
        }}
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#D97706] hover:bg-amber-600 text-slate-950 text-sm font-semibold print:hidden"
      >
        <FileDown className="w-4 h-4" aria-hidden="true" />
        <span>Download Brochure</span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 print:hidden"
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="brochure-title"
            className="w-full max-w-md max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="brochure-title" className="text-lg font-bold text-[#0F284E]">
                  Download our brochure
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Tell us who you are and the download will start straight away.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {done ? (
              <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800" role="status">
                {done}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-3 block text-xs font-semibold text-emerald-900 underline"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-5 space-y-4" noValidate>
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bro-site">Leave this field blank</label>
                  <input
                    id="bro-site"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.honeypot}
                    onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="bro-name" className={labelCls}>
                    Full name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="bro-name"
                    ref={firstField}
                    required
                    autoComplete="name"
                    className={inputCls}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="bro-email" className={labelCls}>
                    Business email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="bro-email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputCls}
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="bro-company" className={labelCls}>Company</label>
                    <input
                      id="bro-company"
                      autoComplete="organization"
                      className={inputCls}
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="bro-country" className={labelCls}>Country</label>
                    <input
                      id="bro-country"
                      autoComplete="country-name"
                      className={inputCls}
                      value={form.country}
                      onChange={(e) => setForm({ ...form, country: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="bro-phone" className={labelCls}>Phone / WhatsApp</label>
                  <input
                    id="bro-phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputCls}
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                </div>
                <div className="flex items-start gap-2">
                  <input
                    id="bro-consent"
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-slate-300"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  />
                  <label htmlFor="bro-consent" className="text-xs text-slate-600 leading-snug">
                    I agree that Jay Impex may store these details and contact me about my enquiry, as described in the{" "}
                    <Link href="/privacy" className="text-[#0284C7] underline" target="_blank">
                      privacy notice
                    </Link>
                    .
                  </label>
                </div>
                {error && (
                  <p className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={busy}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F284E] hover:bg-[#1E3A8A] disabled:opacity-60 text-white text-sm font-semibold"
                >
                  <FileDown className="w-4 h-4" aria-hidden="true" />
                  <span>{busy ? "Please wait…" : "Download Brochure"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
