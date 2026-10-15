import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/jpeg";

async function getDish(id) {
  const res = await fetch(`https://cdn.addiseats.et/dishes/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function Image({ params }) {
  const dish = await getDish(params.id);
  const name = dish ? dish.name : "Addis Eats Dish";
  const price = dish ? `${dish.price} ETB` : "Traditional Food";

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: "#0A1F3D",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          color: "white",
        }}
      >
        <div style={{ fontSize: 32, color: "#10B981", marginBottom: "20px", fontWeight: 600 }}>
          Addis Eats Delivery
        </div>
        <div style={{ fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
          {name}
        </div>
        <div style={{ fontSize: 40, color: "#94A3B8" }}>
          {price}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}