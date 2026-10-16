"use client";
import dynamic from "next/dynamic";

const DeliveryMap = dynamic(
  () => import("./DeliveryMap"),
  {
    ssr: false,
    loading: () => <div className="h-80 bg-slate-100 flex items-center justify-center text-slate-400">Loading map...</div>,
  }
);

export default function MapPanel(props) {
  return <DeliveryMap {...props} />;
}