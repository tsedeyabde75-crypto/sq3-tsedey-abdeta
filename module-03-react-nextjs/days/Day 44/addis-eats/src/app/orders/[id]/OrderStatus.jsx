"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ id, initialData }) {
  const { data, error } = useSWR(id ? `/api/orders/${id}` : null, fetcher, {
    fallbackData: initialData,
    refreshInterval: 5000,
  });

  if (error) return <p className="text-red-500">Could not load the order.</p>;

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold">Order #{id}</h2>
      <p className="mt-2">
        Status: <span className="font-semibold text-green-600">{data?.status}</span>
      </p>
    </div>
  );
}