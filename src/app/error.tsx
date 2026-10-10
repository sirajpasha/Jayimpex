"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
      <h1 className="text-3xl font-extrabold text-[#0F284E]">Something went wrong</h1>
      <p className="text-slate-600">
        We could not load this page. Please try again, or reach our commercial desk on
        WhatsApp or phone at +91 94440 42275 or info@jayimpex.com.
      </p>
      <button
        type="button"
        onClick={reset}
        className="px-5 py-3 rounded-xl bg-[#0F284E] text-white text-sm font-semibold"
      >
        Try again
      </button>
    </div>
  );
}
