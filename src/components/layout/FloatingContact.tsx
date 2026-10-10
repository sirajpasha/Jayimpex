import Link from "next/link";
import { MessageCircle, Phone, FileText } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/919444042275?text=Hello%20Jay%20Impex%20Trade%20Desk,%20I%20would%20like%20to%20inquire%20about%20commodities%20export.";

export function FloatingContact() {
  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 lg:inset-x-auto lg:right-5 lg:bottom-5 print:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="flex lg:flex-col gap-px lg:gap-2 bg-slate-200 lg:bg-transparent border-t border-slate-200 lg:border-0 shadow-[0_-4px_12px_rgba(15,40,78,0.12)] lg:shadow-none">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 lg:rounded-full lg:shadow-lg"
          aria-label="Chat with Jay Impex on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          <span>WhatsApp</span>
        </a>
        <a
          href="tel:+919444042275"
          className="flex-1 lg:hidden inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-[#0284C7] hover:bg-sky-700"
          aria-label="Call Jay Impex"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span>Call</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-slate-950 bg-[#D97706] hover:bg-amber-600 lg:rounded-full lg:shadow-lg"
        >
          <FileText className="w-4 h-4" aria-hidden="true" />
          <span>Get Quote</span>
        </Link>
      </div>
    </div>
  );
}
