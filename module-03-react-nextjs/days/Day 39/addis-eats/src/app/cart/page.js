"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart } = useCart();
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
      <p className="text-gray-600 mb-6">
        Review items in your cart before checking out.
      </p>

      {cart.length === 0 ? (
        <div className="bg-gray-50 border rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-4">Your cart is currently empty.</p>
          <Link
            href="/menu"
            className="inline-block bg-amber-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-amber-700 transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="border rounded-lg divide-y bg-white shadow-sm">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    {item.price} ETB × {item.quantity}
                  </p>
                </div>
                <span className="font-semibold text-amber-700">
                  {item.price * item.quantity} ETB
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-bold text-amber-700">
              {totalAmount} ETB
            </span>
          </div>

          <div className="flex justify-end gap-4">
            <Link
              href="/checkout"
              className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}