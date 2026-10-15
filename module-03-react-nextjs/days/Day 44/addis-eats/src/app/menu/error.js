"use client";

export default function Error({ error, reset }) {
  return (
    <div className="max-w-xl mx-auto p-6 my-10 text-center border rounded-lg bg-red-50">
      <h2 className="text-xl font-bold text-red-700 mb-2">Failed to load menu</h2>
      <p className="text-gray-600 mb-4">{error?.message || "Something went wrong while fetching items."}</p>
      <button
        onClick={() => reset()}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Try Again
      </button>
    </div>
  );
}