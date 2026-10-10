import Link from "next/link";

export default function OrdersPage() {
  const orders = [
    { id: "ord_12345", status: "Preparing", total: 730, date: "2026-10-10" }
  ];

  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
            <div>
              <p className="font-bold">Order #{order.id}</p>
              <p className="text-sm text-gray-500">Date: {order.date}</p>
              <p className="text-sm font-medium text-blue-600 mt-1">Status: {order.status}</p>
            </div>
            <div className="text-right">
              <p className="font-bold mb-2">{order.total} ETB</p>
              <Link href={`/orders/${order.id}`} className="px-4 py-2 bg-gray-100 text-sm rounded-lg hover:bg-gray-200">
                Track Status
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}