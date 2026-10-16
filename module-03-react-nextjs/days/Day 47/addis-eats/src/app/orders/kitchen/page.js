"use client";

import { useState } from "react";

const initialOrders = [
  { id: "ord_12345", items: ["Doro Wat x1", "Tibs x1"], status: "Preparing", total: 670 },
  { id: "ord_12346", items: ["Kitfo x2"], status: "Pending", total: 760 }
];

export default function KitchenPage() {
  const [orders, setOrders] = useState(initialOrders);

  const toggleStatus = (id) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const nextStatus = order.status === "Pending" ? "Preparing" : "Ready";
          return { ...order, status: nextStatus };
        }
        return order;
      })
    );
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Kitchen Display System</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-lg">{order.id}</p>
              <p className="text-sm text-gray-600 mb-2">{order.items.join(", ")}</p>
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                order.status === "Ready" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {order.status}
              </span>
            </div>
            <button
              onClick={() => toggleStatus(order.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
            >
              Advance Status
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}