import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-73px)] bg-slate-50 flex flex-col justify-center items-center px-6 py-16 text-center">
      <div className="max-w-3xl mx-auto">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
          Authentic Ethiopian Cuisine
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mt-4 mb-6 leading-tight">
          Delicious Ethiopian Food Delivered to Your Door
        </h1>
        <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto leading-relaxed">
          Experience the rich flavors of traditional stews, freshly baked injera, and sizzling tibs delivered hot and fast across Addis Ababa.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/menu"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-xl transition-colors shadow-sm text-base"
          >
            Explore Menu
          </Link>
          <Link
            href="/checkout"
            className="bg-white hover:bg-slate-100 text-slate-800 font-semibold py-3 px-8 rounded-xl border border-slate-300 transition-colors shadow-sm text-base"
          >
            View Cart & Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
