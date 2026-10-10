"use client";

import { Download } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F284E] hover:bg-[#1E3A8A] text-white text-sm font-semibold print:hidden"
    >
      <Download className="w-4 h-4" aria-hidden="true" />
      <span>Save as PDF / Print</span>
    </button>
  );
}
