"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-8 text-center text-slate-600">Loading cart...</div>;
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-600 mb-6">You have no items in your cart.</p>
        <Link
          href="/menu"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Your Cart</h1>
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center py-3 border-b border-slate-100">
            <div>
              <h3 className="font-semibold text-slate-900">{item.name}</h3>
              <p className="text-sm text-slate-600">{item.price} ETB × {item.quantity}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="pt-4 flex justify-between items-center">
          <span className="font-bold text-lg text-slate-900">Total:</span>
          <span className="font-extrabold text-emerald-700 text-xl">{total} ETB</span>
        </div>
        <div className="flex gap-4 pt-4">
          <button
            onClick={clearCart}
            className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Clear Cart
          </button>
          <Link
            href="/checkout"
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-semibold py-2 rounded-lg transition-colors shadow-sm"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}