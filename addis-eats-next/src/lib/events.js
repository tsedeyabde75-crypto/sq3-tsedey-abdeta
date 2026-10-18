export function dispatchOrderUpdate(orderId, status) {
  if (typeof window === "undefined") return;
  const event = new CustomEvent("order:updated", {
    detail: { orderId, status },
  });
  window.dispatchEvent(event);
}

export function subscribeOrderUpdates(callback) {
  if (typeof window === "undefined") return () => {};
  const handler = (event) => callback(event.detail);
  window.addEventListener("order:updated", handler);
  return () => window.removeEventListener("order:updated", handler);
}