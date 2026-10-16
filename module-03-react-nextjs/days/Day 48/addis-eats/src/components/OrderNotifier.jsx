"use client";
import { useEffect, useState } from "react";
import { subscribeOrderUpdates } from "@/lib/events";

export default function OrderNotifier() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeOrderUpdates(({ orderId, status }) => {
      setNotification(`Order ${orderId} status changed to: ${status}`);
      setTimeout(() => setNotification(null), 4000);
    });

    return () => unsubscribe();
  }, []);

  if (!notification) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg text-sm transition-all z-50">
      {notification}
    </div>
  );
}