import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold tracking-tight mb-6">
        Authentic Ethiopian Food, Delivered Fast
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-10">
        Order Doro Wat, Tibs, Kitfo, and Shiro from top kitchens in Bole, Kazanchis, and across Addis Ababa.
      </p>
      <div className="flex gap-4">
        <Link href="/menu" className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
          Explore Menu
        </Link>
        <Link href="/cart" className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100 transition">
          View Cart
        </Link>
      </div>
    </main>
  );
}