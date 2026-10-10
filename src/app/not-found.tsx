import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-5">
      <p className="text-sm font-semibold text-[#D97706]">Error 404</p>
      <h1 className="text-3xl font-extrabold text-[#0F284E]">Page not found</h1>
      <p className="text-slate-600">
        The page you are looking for has moved or does not exist. Browse our export
        catalogue or contact the commercial desk and we will help you directly.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/products" className="px-5 py-3 rounded-xl bg-[#0F284E] text-white text-sm font-semibold">
          Browse Products
        </Link>
        <Link href="/contact" className="px-5 py-3 rounded-xl bg-[#D97706] text-slate-950 text-sm font-semibold">
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
