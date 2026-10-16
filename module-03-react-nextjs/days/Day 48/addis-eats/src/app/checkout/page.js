'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('telebirr');
  const [accountNumber, setAccountNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState(null);

  const totalAmount = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) || 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) return;

    setIsSubmitting(true);

    const orderData = {
      items: cart,
      totalAmount,
      deliveryAddress: address,
      telebirrPhone: accountNumber || 'N/A',
      paymentMethod,
      paymentAccount: accountNumber,
      specialInstructions,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        clearCart();
        setPlacedOrderId(data.order?.id || 'New Order');
        setOrderSuccess(true);
      } else {
        alert('Failed to place order. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during checkout.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <main className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Order Confirmed!</h1>
          <p className="text-gray-600">
            Thank you for ordering with Addis Eats! Your order <span className="font-semibold text-gray-800">#{placedOrderId}</span> has been received and sent to the kitchen.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => router.push('/orders')}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Track Orders
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!cart || cart.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Checkout</h1>
        <p className="text-gray-600 mb-6">Your cart is empty. Add some delicious dishes before checking out!</p>
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <form onSubmit={handleSubmit} className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Delivery Address (Addis Ababa)
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Bole Road, House No. 123"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Payment Method
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'telebirr', label: 'Telebirr' },
                { id: 'cbe_birr', label: 'CBE Birr' },
                { id: 'chapa', label: 'Chapa Card' },
                { id: 'cod', label: 'Cash on Delivery' },
              ].map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-all ${
                    paymentMethod === method.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 font-semibold shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {paymentMethod !== 'cod' && (
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-1">
                {paymentMethod === 'telebirr' && 'Telebirr Phone Number'}
                {paymentMethod === 'cbe_birr' && 'CBE Birr Account / Phone Number'}
                {paymentMethod === 'chapa' && 'Chapa Card / Account Number'}
              </label>
              <input
                type="text"
                required
                placeholder="0911234567"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              Special Order Instructions (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="e.g., Extra mitmita, call upon arrival"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'Processing Order...' : `Complete Order (${totalAmount} ETB)`}
          </button>
        </form>

        <div className="md:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-fit space-y-4">
          <h2 className="text-lg font-bold text-gray-900 border-b pb-2">Order Summary</h2>
          
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-700">{item.price * item.quantity} ETB</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{totalAmount} ETB</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 border-t pt-2">
              <span>Total</span>
              <span className="text-blue-600">{totalAmount} ETB</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}