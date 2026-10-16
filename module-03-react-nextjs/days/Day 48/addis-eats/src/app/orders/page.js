import { getOrdersForSession } from "@/lib/orders";
import ExportButton from "./ExportButton";

export default async function OrdersPage() {
  const { rows: orders } = await getOrdersForSession({ take: 100 });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Your Orders</h1>
            <p className="text-sm text-slate-500 mt-1">Your orders, most recent first</p>
          </div>
          <ExportButton orders={orders} />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600 text-sm">
                <th scope="col" className="py-3 px-4 font-semibold">Order ID</th>
                <th scope="col" className="py-3 px-4 font-semibold">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 text-slate-800 text-sm">
                  <td className="py-3 px-4 font-medium">{order.id}</td>
                  <td className="py-3 px-4">
                    ETB {(order.totalAmount ?? order.total ?? order.amount ?? 0).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}