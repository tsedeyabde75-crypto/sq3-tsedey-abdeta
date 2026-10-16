"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const etb = (v) => 
  new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
    maximumFractionDigits: 0,
  }).format(v);

export default function RevenueChart({ data }) {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="area" />
          <YAxis tickFormatter={etb} width={80} />
          <Tooltip formatter={(v) => [etb(v), "Revenue"]} />
          <Bar dataKey="revenue" fill="#1B4D8E" name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}