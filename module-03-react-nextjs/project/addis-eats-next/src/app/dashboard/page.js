import RevenueChart from "./RevenueChart";
import { getOrders } from "@/lib/orders";

export default async function DashboardPage() {
  const orders = await getOrders();

  const byArea = ["Bole", "Kazanchis", "Megenagna"].map((area) => ({
    area,
    revenue: orders
      .filter((o) => o.area === area)
      .reduce((sum, o) => sum + o.total, 0),
  }));

  return <RevenueChart data={byArea} />;
}