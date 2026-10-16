import { getOrdersForSession } from "@/lib/orders";

export async function GET(request, { params }) {
  const { id } = await params;
  
  const stream = new ReadableStream({
    async start(controller) {
      const send = (data) => {
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      };

      const ordersData = await getOrdersForSession({ take: 100 });
      const order = ordersData.rows.find((o) => o.id === id) || { id, status: "On the way" };
      
      send(order);

      const interval = setInterval(async () => {
        order.status = "Delivered";
        send(order);
      }, 5000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}