"use client";

import { useActionState, useEffect } from "react";
import { placeOrder } from "@/app/actions";
import { useCart } from "@/context/CartContext";

export default function CheckoutForm() {
  const { cart, totalAmount, clearCart } = useCart();
  const [state, formAction, pending] = useActionState(placeOrder, null);

  useEffect(() => {
    if (state?.success && clearCart) {
      clearCart();
    }
  }, [state?.success, clearCart]);

  return (
    <form action={formAction} suppressHydrationWarning className="space-y-4 max-w-md mx-auto p-4">
      <input type="hidden" name="items" value={JSON.stringify(cart || [])} />
      <input type="hidden" name="total" value={totalAmount || 0} />

      <div>
        <label className="block text-sm font-medium text-black">Full Name</label>
        <input 
          type="text" 
          name="name" 
          placeholder="Tsedey Abdeta"
          suppressHydrationWarning
          className="w-full border p-2 rounded mt-1 text-black" 
        />
        {state?.fieldErrors?.name && (
          <p className="text-red-500 text-xs mt-1">{state.fieldErrors.name[0]}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Phone Number</label>
        <input 
          type="text" 
          name="phone" 
          placeholder="0911223344" 
          suppressHydrationWarning
          className="w-full border p-2 rounded mt-1 text-black" 
        />
        {state?.fieldErrors?.phone && (
          <p className="text-red-500 text-xs mt-1">{state.fieldErrors.phone[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-amber-600 text-white py-2 rounded font-semibold disabled:bg-gray-400"
      >
        {pending ? "Sending..." : "Place Order"}
      </button>

      {state?.success && (
        <div className="bg-green-100 border border-green-400 text-green-800 p-3 rounded mt-4">
          Order placed successfully! Order ID: <strong>{state.orderId}</strong>
        </div>
      )}
    </form>
  );
}