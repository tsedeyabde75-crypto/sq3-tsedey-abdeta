'use client';

import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { cart = [], removeFromCart, updateQuantity, clearCart } = useCart();

  const subtotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
    : 0;

  const deliveryFee = 50;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Your Cart</h1>
        <p className="text-slate-600">Review your selected items before proceeding to checkout.</p>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-4">
          <p className="text-slate-600 text-lg">Your cart is currently empty.</p>
          <Link
            href="/menu"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors"
          >
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-slate-900">{item.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm">{item.price} ETB</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() =>
                        updateQuantity
                          ? updateQuantity(item.id, (item.quantity || 1) - 1)
                          : null
                      }
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-sm font-semibold text-slate-800">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity
                          ? updateQuantity(item.id, (item.quantity || 1) + 1)
                          : null
                      }
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart && removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium px-2 py-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => clearCart && clearCart()}
                className="text-sm text-slate-500 hover:text-slate-800 underline"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Summary</h2>

            <div className="space-y-3">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{subtotal} ETB</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>{deliveryFee} ETB</span>
              </div>
              <div className="flex justify-between text-slate-900 font-bold text-lg pt-3 border-t">
                <span>Total</span>
                <span>{grandTotal} ETB</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}