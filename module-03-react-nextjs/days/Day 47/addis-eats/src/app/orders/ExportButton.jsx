"use client";
import { toCsv, downloadCsv } from "@/lib/csv";

export default function ExportButton({ orders }) {
  const handleExport = () => {
    const csvData = toCsv(orders);
    downloadCsv(csvData, "addis-eats-orders.csv");
  };

  return (
    <button
      onClick={handleExport}
      className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
    >
      Export CSV
    </button>
  );
}