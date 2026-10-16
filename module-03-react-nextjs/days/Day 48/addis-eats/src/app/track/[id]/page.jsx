import MapPanel from "./MapPanel";
import { getOrdersForSession } from "@/lib/orders";

export default async function TrackPage({ params }) {
  const { id } = await params;
  const ordersData = await getOrdersForSession({ take: 100 });
  const order = ordersData.rows.find((o) => o.id === id) || { id, totalAmount: 0, status: "On the way" };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Tracking Order: {order.id}</h1>
        <p className="text-sm text-slate-600 mb-4">Status: <span className="font-semibold text-blue-600">{order.status}</span></p>
        
        <div className="mb-6">
          <MapPanel />
        </div>

        <div className="text-sm text-slate-700 space-y-1">
          <p><span className="font-medium">Destination Address:</span> Bole, Addis Ababa</p>
          <p><span className="font-medium">Estimated Delivery:</span> 15-20 minutes</p>
        </div>
      </div>
    </div>
  );
}