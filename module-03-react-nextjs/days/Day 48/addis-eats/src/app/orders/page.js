'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = () => {
    const primaryOrders = JSON.parse(localStorage.getItem('addis_eats_orders') || '[]');
    const userOrders = JSON.parse(localStorage.getItem('addis_eats_user_orders') || '[]');
    const generalOrders = JSON.parse(localStorage.getItem('orders') || '[]');

    const allOrdersMap = new Map();
    [...primaryOrders, ...userOrders, ...generalOrders].forEach((ord) => {
      if (ord && ord.id) {
        allOrdersMap.set(ord.id, ord);
      }
    });

    const combined = Array.from(allOrdersMap.values());
    setOrders(combined);
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();

    window.addEventListener('ordersUpdated', loadOrders);
    window.addEventListener('storage', loadOrders);

    return () => {
      window.removeEventListener('ordersUpdated', loadOrders);
      window.removeEventListener('storage', loadOrders);
    };
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Preparing':
        return <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">🍳 Preparing</span>;
      case 'Out for Delivery':
        return <span className="text-xs bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full font-medium">🛵 Out for Delivery</span>;
      case 'Delivered':
        return <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-medium">✅ Delivered</span>;
      default:
        return <span className="text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full font-medium">🕒 Pending</span>;
    }
  };

  const handleExportCSV = () => {
    if (orders.length === 0) return;
    const headers = ['Order ID,Date,Status,Total (ETB)\n'];
    const rows = orders.map(o => `${o.id},${o.date || ''},${o.status || 'Pending'},${o.total || 0}`);
    const blob = new Blob([headers.concat(rows.join('\n'))], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'addis_eats_order_history.csv';
    a.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        <p className="animate-pulse">Loading order history...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 md:p-12 space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">Order History</h1>
          <p className="text-slate-500 text-sm">Track and manage your past food orders.</p>
        </div>

        {orders.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Export CSV
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm">
          <p className="text-slate-500 text-sm">You haven't placed any orders yet.</p>
          <Link
            href="/menu"
            className="inline-block bg-blue-600 text-white text-xs font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Menu & Place Order
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-slate-900">Order #{order.id}</h3>
                  {getStatusBadge(order.status || 'Pending')}
                </div>
                <p className="text-xs text-slate-500">
                  {order.date || 'Recent'} • {(order.items || []).length} items
                </p>
                {order.items && order.items.length > 0 && (
                  <p className="text-xs text-slate-600 pt-1">
                    {order.items.map(i => `${i.quantity || 1}x ${i.name}`).join(', ')}
                  </p>
                )}
              </div>

              <div className="text-right flex flex-col items-end gap-1">
                <span className="text-lg font-extrabold text-blue-600">{order.total || 0} ETB</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}