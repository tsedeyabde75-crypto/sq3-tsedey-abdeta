"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Menu segment error:", error);
  }, [error]);

  return (
    <div className="p-4 border border-red-300 bg-red-50 rounded text-red-800">
      <h2 className="font-bold mb-2">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
      >
        Try Again
      </button>
    </div>
  );
}