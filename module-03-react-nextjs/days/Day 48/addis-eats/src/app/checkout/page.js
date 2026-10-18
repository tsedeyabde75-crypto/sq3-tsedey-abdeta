'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart = [], clearCart } = useCart();
  const router = useRouter();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    paymentMethod: 'CASH',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  useEffect(() => {
    const userSession = localStorage.getItem('addis_eats_user');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    const hasCookieToken = document.cookie
      .split('; ')
      .some((row) => row.startsWith('session_token='));

    if (!userSession && !isLoggedIn && !hasCookieToken) {
      router.push('/signin?callbackUrl=/checkout');
      return;
    }

    setIsAuthenticated(true);

    if (userSession) {
      try {
        const user = JSON.parse(userSession);
        if (user) {
          setFormData((prev) => ({
            ...prev,
            name: user.name || user.email?.split('@')[0] || '',
            phone: user.phone || '',
          }));
        }
      } catch (e) {}
    } else {
      const savedEmail = localStorage.getItem('userEmail') || '';
      if (savedEmail) {
        setFormData((prev) => ({
          ...prev,
          name: savedEmail.split('@')[0],
        }));
      }
    }

    setLoading(false);
  }, [router]);

  const subtotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 1), 0)
    : 0;
  const deliveryFee = 50;
  const grandTotal = subtotal + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const newOrder = {
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      customer: formData.name,
      phone: formData.phone,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cart,
      total: grandTotal,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([newOrder, ...existingOrders]));

    clearCart();

    setPlacedOrderId(newOrder.id);
    setOrderPlaced(true);
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-slate-600">
        <p className="text-sm font-medium animate-pulse">Checking authentication status...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-xl border border-slate-200 shadow-sm text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
          ✓
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Order Placed Successfully!</h1>
          <p className="text-slate-600 text-sm">
            Thank you for your order. Your order ID is{' '}
            <span className="font-semibold text-slate-900">{placedOrderId}</span>.
          </p>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => router.push('/orders')}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
          >
            View Orders
          </button>
          <button
            onClick={() => router.push('/menu')}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-slate-900">Checkout</h1>
        <p className="text-slate-600">Provide your delivery details to complete your order.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-3">Delivery Information</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              placeholder="Tsedey Abdeta"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
            <input
              type="tel"
              required
              placeholder="0911223344"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Delivery Address</label>
            <input
              type="text"
              required
              placeholder="Bole, Addis Ababa"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            />
          </div>
        </div>

        <div className="border-t pt-6 space-y-4">
          <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
          <div className="flex justify-between text-slate-600 text-sm">
            <span>Subtotal</span>
            <span>{subtotal} ETB</span>
          </div>
          <div className="flex justify-between text-slate-600 text-sm">
            <span>Delivery Fee</span>
            <span>{deliveryFee} ETB</span>
          </div>
          <div className="flex justify-between text-slate-900 font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span>{grandTotal} ETB</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}