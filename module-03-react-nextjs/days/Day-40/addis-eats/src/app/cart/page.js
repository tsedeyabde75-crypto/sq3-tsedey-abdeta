"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-6">Explore our delicious Ethiopian dishes and add them to your cart.</p>
        <Link href="/menu" className="bg-amber-600 text-white px-5 py-2.5 rounded hover:bg-amber-700 font-medium">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
      <p className="text-gray-600 mb-6">Review items in your cart before checking out.</p>

      <div className="border rounded-lg p-4 bg-white shadow-sm space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-4 last:border-0 last:pb-0">
            <div>
              <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.price} ETB × {item.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-3 py-1 font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <span className="font-bold text-amber-700 w-24 text-right">{item.price * item.quantity} ETB</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 text-sm font-medium"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-2 border-t text-xl font-bold mb-6">
        <span>Total:</span>
        <span className="text-amber-700">{total} ETB</span>
      </div>

      <div className="flex justify-end">
        <Link href="/checkout" className="bg-amber-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-amber-700">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}