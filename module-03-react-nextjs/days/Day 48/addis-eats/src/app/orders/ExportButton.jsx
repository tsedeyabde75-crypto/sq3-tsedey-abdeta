"use client";

import { toCsv, downloadCsv } from "../../lib/csv";

export default function ExportButton({ orders }) {
  const handleExport = () => {
    if (!orders || orders.length === 0) {
      alert("No orders available to export.");
      return;
    }

    const csvData = toCsv(orders);
    downloadCsv(csvData, "orders-history.csv");
  };

  return (
    <button
      onClick={handleExport}
      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
    >
      Export CSV
    </button>
  );
}