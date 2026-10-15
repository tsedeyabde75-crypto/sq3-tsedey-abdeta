"use client";

import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import fetcher from "@/lib/fetcher";

export default function PagedDishList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useSWR(
    `/api/dishes?page=${page}`,
    fetcher,
    { keepPreviousData: true }
  );

  const handlePageChange = (newPage) => {
    router.push(`/menu?page=${newPage}`);
  };

  return (
    <div className="p-4 border rounded space-y-4">
      <h2 className="text-xl font-bold">Menu Page {page}</h2>

      {isLoading && <p className="text-gray-500">Loading page...</p>}

      <ul className="divide-y">
        {data?.dishes?.map((dish) => (
          <li key={dish.id} className="py-2">
            {dish.name} - ${dish.price}
          </li>
        ))}
      </ul>

      <div className="flex gap-2 pt-2">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={!data?.hasMore}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}