"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import SearchBox from "./SearchBox";
import fetcher from "@/lib/fetcher";

export default function PagedDishList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const handleSearch = useCallback((searchTerm) => {
    setQuery(searchTerm);
    setPage(1);
  }, []);

  const swrKey = `/api/dishes?q=${encodeURIComponent(query)}&page=${page}`;
  const { data, error, isLoading } = useSWR(swrKey, fetcher);

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBox onSearch={handleSearch} />

      {isLoading && <p className="text-gray-500 my-4">Loading dishes...</p>}
      {error && <p className="text-red-500 my-4">Failed to load dishes.</p>}

      {data && data.dishes && (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {data.dishes.length > 0 ? (
            data.dishes.map((dish) => (
              <div key={dish.id} className="p-4 border rounded-lg shadow-sm">
                <h3 className="font-bold text-lg">{dish.name}</h3>
                <p className="text-sm text-gray-600">{dish.description}</p>
                <span className="font-semibold text-orange-600">{dish.price} ETB</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-2 text-center">No dishes found.</p>
          )}
        </div>
      )}

      <div className="flex gap-4 items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1 || isLoading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="font-medium">Page {page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!data || data.hasMore === false || isLoading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}