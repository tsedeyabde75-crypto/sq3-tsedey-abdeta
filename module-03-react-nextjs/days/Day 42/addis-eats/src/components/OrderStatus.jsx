"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function OrderStatus({ id }) {
  const swrKey = id ? `/api/orders/${id}` : null;

  const { data, error, isLoading } = useSWR(swrKey, fetcher, {
    refreshInterval: 5000,
  });

  if (!id) return <p className="text-gray-500">No order ID provided.</p>;
  if (isLoading) return <p className="text-gray-500">Checking order status...</p>;
  if (error) return <p className="text-red-500">Failed to load status for Order #{id}.</p>;

  return (
    <div className="p-4 border rounded-lg bg-orange-50 my-4">
      <h2 className="text-lg font-bold">Order #{id}</h2>
      <p className="text-md">
        Status: <span className="font-semibold text-orange-600">{data?.status || "Processing"}</span>
      </p>
      <p className="text-xs text-gray-500 mt-2">Auto-refreshing every 5 seconds...</p>
    </div>
  );
}