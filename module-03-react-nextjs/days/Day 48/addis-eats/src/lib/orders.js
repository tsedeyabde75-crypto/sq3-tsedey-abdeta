export async function getOrdersForSession() {
  return [
    {
      id: "ORD-101",
      date: "2026-10-15",
      total: 950,
      status: "Delivered",
      items: [{ name: "Doro Wat" }, { name: "Special Tibs" }],
    },
    {
      id: "ORD-102",
      date: "2026-10-16",
      total: 300,
      status: "Delivered",
      items: [{ name: "Yetsom Beyaynetu" }],
    },
  ];
}