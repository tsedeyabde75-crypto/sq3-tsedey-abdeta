"use client";

import { useEffect, useState } from "react";
import { subscribeOrderUpdates } from "../lib/events";

export default function OrderNotifier() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeOrderUpdates((order) => {
      setNotification(`New order received: #${order.id || "101"}`);
      setTimeout(() => setNotification(null), 5000);
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg z-50 transition-all">
      <p className="font-semibold text-sm">{notification}</p>
    </div>
  );
}