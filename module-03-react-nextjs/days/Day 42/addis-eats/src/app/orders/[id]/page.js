import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function OrderDetailPage({ params }) {
  const user = await getSession();
  if (!user) redirect(`/signin?next=/orders/${params.id}`);

  const order = await getOrder(params.id);
  if (!order) return <div>Order not found</div>;

  if (order.userId !== user.id) {
    throw new Error("Unauthorized access to this order");
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Order Details: {order.id}</h1>
      <p>Total: {order.total}</p>
    </div>
  );
}

async function getOrder(id) {
  return { id, userId: "usr_1", total: 450 };
}