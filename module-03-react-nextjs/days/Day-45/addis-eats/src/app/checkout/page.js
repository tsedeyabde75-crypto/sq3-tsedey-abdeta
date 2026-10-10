"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const { clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleCheckout = (e) => {
    e.preventDefault();
    clearCart();
    router.push("/orders/ord_12345");
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleCheckout} className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address (Addis Ababa)</label>
          <input
            type="text"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g., Bole Road, House No. 123"
            className="w-full border p-3 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">TeleBirr Phone Number</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0911234567"
            className="w-full border p-3 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 mt-4"
        >
          Complete Order
        </button>
      </form>
    </main>
  );
}