"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold tracking-wide hover:text-gray-300 transition-colors">
        Addis Eats
      </Link>
      
      <nav className="flex items-center gap-6 font-medium text-sm">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Home
        </Link>
        <Link href="/menu" className="hover:text-amber-400 transition-colors">
          Menu
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
          Cart {totalItems > 0 && <span className="bg-amber-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">{totalItems}</span>}
        </Link>
        <Link href="/checkout" className="hover:text-amber-400 transition-colors">
          Checkout
        </Link>
      </nav>
    </header>
  );
}