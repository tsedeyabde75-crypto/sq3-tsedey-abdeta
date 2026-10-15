"use client";

import { useState } from "react";
import { useDebounce } from "use-debounce";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function SearchBox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm] = useDebounce(searchTerm, 300);

  const { data, isLoading } = useSWR(
    debouncedTerm ? `/api/dishes?q=${encodeURIComponent(debouncedTerm)}` : null,
    fetcher,
    { keepPreviousData: true }
  );

  return (
    <div className="p-4 border rounded space-y-4">
      <input
        type="text"
        placeholder="Search dishes (e.g., Tibs)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded"
      />

      {isLoading && <p className="text-gray-500">Searching...</p>}

      <ul className="divide-y">
        {data?.map((dish) => (
          <li key={dish.id} className="py-2">
            {dish.name} - ${dish.price}
          </li>
        ))}
      </ul>
    </div>
  );
}