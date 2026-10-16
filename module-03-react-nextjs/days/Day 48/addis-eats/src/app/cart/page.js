"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Add some delicious dishes from the menu to get started.</p>
        <Link href="/menu" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
          Browse Menu
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-xl shadow-sm border divide-y mb-6">
        {cart.map((item) => (
          <div key={item.id} className="p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold">{item.price * item.quantity} ETB</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center mb-6">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-2xl font-extrabold text-blue-600">{total} ETB</span>
      </div>
      <div className="flex justify-between">
        <button onClick={clearCart} className="px-6 py-2 border text-gray-600 rounded-lg hover:bg-gray-50">
          Clear Cart
        </button>
        <Link href="/checkout" className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
          Proceed to Checkout
        </Link>
      </div>
    </main>
  );
}