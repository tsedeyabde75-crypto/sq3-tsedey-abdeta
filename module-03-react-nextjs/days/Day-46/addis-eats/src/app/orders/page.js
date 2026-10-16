import OrderTable from "./OrderTable";

export default async function OrdersPage({ searchParams }) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Your Orders</h1>
      <p className="text-sm text-green-600 font-medium">
        Scoped securely for user session
      </p>
      
      <OrderTable searchParams={searchParams} />
    </div>
  );
}