'use client';

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading dashboard analytics...</div>;

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || o.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : 0;

  const statusCounts = orders.reduce((acc, order) => {
    const status = order.status || 'Pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const itemCounts = {};
  orders.forEach((o) => {
    if (Array.isArray(o.items)) {
      o.items.forEach((item) => {
        itemCounts[item.name] = (itemCounts[item.name] || 0) + (item.quantity || 1);
      });
    }
  });

  const topDishes = Object.entries(itemCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Analytics</h1>
        <p className="text-slate-500 text-sm mt-1">Overview of sales and order activity</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Revenue</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalRevenue.toLocaleString()} ETB</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Total Orders</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{totalOrders}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-500">Average Order Value</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{avgOrderValue} ETB</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Top Selling Dishes</h2>
          {topDishes.length === 0 ? (
            <p className="text-slate-500 text-sm">No dish sales recorded yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {topDishes.map(([dishName, count]) => (
                <li key={dishName} className="py-3 flex justify-between items-center text-sm">
                  <span className="font-medium text-slate-800">{dishName}</span>
                  <span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold">
                    {count} sold
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Order Status Distribution</h2>
          <div className="space-y-3">
            {Object.entries(statusCounts).map(([status, count]) => (
              <div key={status} className="flex justify-between items-center text-sm">
                <span className="capitalize font-medium text-slate-700">{status}</span>
                <span className="font-bold text-slate-900">{count} orders</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}