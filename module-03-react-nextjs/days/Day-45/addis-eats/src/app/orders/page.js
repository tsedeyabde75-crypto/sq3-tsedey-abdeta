import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");

  if (!sessionCookie) {
    redirect("/signin");
  }

  const sessionData = JSON.parse(sessionCookie.value);
  const userEmail = sessionData.email;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      <p className="text-green-600 font-medium mb-4">Scoped securely for: {userEmail}</p>
    </div>
  );
}