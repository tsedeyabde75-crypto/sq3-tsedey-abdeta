import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders");

  const orders = await getOrdersForUser(user.id);

  return (
    <div>
      <h1 className="text-xl font-bold">My Orders</h1>
    </div>
  );
}

async function getOrdersForUser(userId) {
  return [];
}