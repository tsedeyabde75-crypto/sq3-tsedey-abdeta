"use client";

import { useActionState } from "react";
import { placeOrder } from "@/app/actions";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const initialState = {
  success: false,
  message: "",
  errors: {}
};

export default function CheckoutForm() {
  const { cart, clearCart, total } = useCart();
  const [state, formAction, isPending] = useActionState(async (prevState, formData) => {
    const result = await placeOrder(prevState, formData);
    if (result.success) {
      clearCart();
    }
    return result;
  }, initialState);

  if (state?.success) {
    return (
      <div className="max-w-md mx-auto p-6 bg-green-50 border border-green-200 rounded-lg text-center my-8">
        <h2 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h2>
        <p className="text-green-700 mb-2">{state.message}</p>
        <p className="text-sm font-mono text-gray-600 mb-6">Order ID: {state.orderId}</p>
        <Link href="/menu" className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 inline-block font-medium">
          Back to Menu
        </Link>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4 max-w-md mx-auto bg-white p-6 border rounded-lg shadow-sm">
      <input type="hidden" name="items" value={JSON.stringify(cart)} />

      {state?.message && !state.success && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200 mb-2">
          {state.message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="e.g., Tsedey Abdeta"
          className="w-full border p-2.5 rounded focus:ring-2 focus:ring-amber-500 outline-none"
        />
        {state?.errors?.name && (
          <p className="text-red-500 text-xs mt-1">{state.errors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Phone Number</label>
        <input
          type="text"
          name="phone"
          required
          placeholder="e.g., 0911223344"
          className="w-full border p-2.5 rounded focus:ring-2 focus:ring-amber-500 outline-none"
        />
        {state?.errors?.phone && (
          <p className="text-red-500 text-xs mt-1">{state.errors.phone[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Delivery Address</label>
        <input
          type="text"
          name="address"
          required
          placeholder="e.g., Akaki Kality, Woreda 07"
          className="w-full border p-2.5 rounded focus:ring-2 focus:ring-amber-500 outline-none"
        />
        {state?.errors?.address && (
          <p className="text-red-500 text-xs mt-1">{state.errors.address[0]}</p>
        )}
      </div>

      {state?.errors?.items && (
        <p className="text-red-500 text-xs mt-1">{state.errors.items[0]}</p>
      )}

      <div className="pt-2 border-t flex justify-between items-center text-lg font-bold">
        <span>Total:</span>
        <span className="text-amber-700">{total} ETB</span>
      </div>

      <button
        type="submit"
        disabled={isPending || cart.length === 0}
        className="w-full bg-amber-600 text-white py-3 rounded-lg font-bold hover:bg-amber-700 disabled:opacity-50 transition-colors"
      >
        {isPending ? "Processing Order..." : "Place Order"}
      </button>
    </form>
  );
}