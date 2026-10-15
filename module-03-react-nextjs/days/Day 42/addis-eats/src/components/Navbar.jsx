"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { cart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted && cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  return (
    <header className="bg-emerald-50 text-emerald-950 border-b border-emerald-200 px-8 py-4 flex justify-between items-center shadow-sm">
      <Link href="/" className="text-xl font-bold tracking-wide hover:text-emerald-700 transition-colors">
        Addis Eats
      </Link>
      
      <nav className="flex items-center gap-6 font-medium text-sm text-emerald-900">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <Link href="/menu" className="hover:text-emerald-600 transition-colors">
          Menu
        </Link>
        <Link href="/cart" className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
          Cart {mounted && totalItems > 0 && (
            <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded-full ml-1">
              {totalItems}
            </span>
          )}
        </Link>
        <Link href="/checkout" className="hover:text-emerald-600 transition-colors">
          Checkout
        </Link>
      </nav>
    </header>
  );
}
