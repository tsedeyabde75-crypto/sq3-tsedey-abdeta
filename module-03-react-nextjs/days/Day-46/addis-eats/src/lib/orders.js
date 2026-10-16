const mockOrders = [
  { id: "ORD-001", area: "Bole", total: 14200, date: "2026-06-01T10:30:00Z" },
  { id: "ORD-002", area: "Kazanchis", total: 8500, date: "2026-06-01T12:15:00Z" },
  { id: "ORD-003", area: "Megenagna", total: 11000, date: "2026-06-02T14:20:00Z" },
  { id: "ORD-004", area: "Bole", total: 23000, date: "2026-06-03T09:45:00Z" },
  { id: "ORD-005", area: "Kazanchis", total: 6400, date: "2026-06-04T16:10:00Z" },
  { id: "ORD-006", area: "Megenagna", total: 19500, date: "2026-06-05T11:00:00Z" },
  { id: "ORD-007", area: "Bole", total: 12100, date: "2026-06-06T13:30:00Z" },
];

export async function getOrders() {
  return mockOrders;
}

export async function getOrdersForSession({ skip = 0, take = 20, sort = "date", dir = "desc" } = {}) {
  let sorted = [...mockOrders];
  
  sorted.sort((a, b) => {
    let valA = a[sort];
    let valB = b[sort];
    if (sort === "date") {
      valA = new Date(a.date).getTime();
      valB = new Date(b.date).getTime();
    }
    if (dir === "asc") {
      return valA > valB ? 1 : -1;
    } else {
      return valA < valB ? 1 : -1;
    }
  });

  const rows = sorted.slice(skip, skip + take);
  return { rows, total: mockOrders.length };
}