import OrderStatus from "./OrderStatus";

export default async function OrderPage({ params }) {
  const { id } = await params;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Live Order Tracker</h1>
      <OrderStatus id={id} initialData={null} />
    </main>
  );
}