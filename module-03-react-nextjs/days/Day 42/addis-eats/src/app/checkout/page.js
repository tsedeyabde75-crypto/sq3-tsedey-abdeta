"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { z } from "zod";
import Link from "next/link";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full Name must be at least 2 characters"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only numbers"),
  address: z.string().min(3, "Delivery Address must be at least 3 characters"),
});

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedDetails, setSubmittedDetails] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const total = mounted && cart ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0) : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: String(value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    const result = checkoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSubmittedDetails(formData);
    setIsSubmitted(true);
    if (clearCart) clearCart();
    setFormData({ fullName: "", phone: "", address: "" });
  };

  if (!mounted) {
    return <div className="p-8 text-center text-slate-600">Loading checkout...</div>;
  }

  if (isSubmitted && submittedDetails) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-emerald-200 rounded-xl shadow-sm text-center">
        <h2 className="text-2xl font-bold text-emerald-900 mb-2">Order Confirmed!</h2>
        <p className="text-slate-600 mb-6">
          Thank you, {submittedDetails.fullName}. Your order will be delivered to {submittedDetails.address}.
        </p>
        <Link
          href="/menu"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Order More Food
        </Link>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border border-slate-200 rounded-xl shadow-sm text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-600 mb-6">
          You need to add items to your cart before proceeding to checkout.
        </p>
        <Link
          href="/menu"
          className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto my-10 px-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900">Checkout</h1>
        <p className="text-slate-600 text-sm mt-1">Complete your delivery details below.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
            Validation failed. Please check your inputs.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g., Tsedey Abdeta"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.fullName && (
              <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              placeholder="e.g., 0911223344"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-1">
              Delivery Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="e.g., Akaki Kality, Woreda 07"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            {errors.address && (
              <p className="text-xs text-red-500 mt-1">{errors.address}</p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
            <span className="font-bold text-slate-900">Total:</span>
            <span className="font-extrabold text-emerald-700 text-lg">{total} ETB</span>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}