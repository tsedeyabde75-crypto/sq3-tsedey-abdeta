import Link from "next/link";
import { getOrdersForSession } from "@/lib/orders";

const etb = (v) => 
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default async function OrderTable({ searchParams }) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page ?? 1);
  const sort = resolvedParams?.sort ?? "date";
  const dir = resolvedParams?.dir ?? "desc";

  const { rows = [], total = 0 } = await getOrdersForSession({
    skip: (page - 1) * 20,
    take: 20,
    sort,
    dir,
  });

  if (!rows || rows.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-800 font-medium">No orders yet</p>
        <p className="text-slate-500 text-sm mt-1">Browse the menu to place your first.</p>
        <Link href="/menu" className="text-blue-600 underline text-sm mt-2 inline-block">
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto border border-slate-200 rounded-lg shadow-sm bg-white">
      <table className="w-full text-left border-collapse">
        <caption className="p-4 text-sm font-medium text-slate-500 text-left">
          Your orders, most recent first
        </caption>
        <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
          <tr>
            <th scope="col" className="p-3 font-semibold">Order ID</th>
            <th scope="col" className="p-3 font-semibold">Total Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((o) => (
            <tr key={o.id} className="hover:bg-slate-50 transition-colors">
              <td className="p-3 text-slate-800 font-medium">{o.id}</td>
              <td className="p-3 text-slate-600">{etb(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}