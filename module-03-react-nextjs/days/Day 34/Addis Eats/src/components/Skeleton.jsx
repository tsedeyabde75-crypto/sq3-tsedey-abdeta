import React from "react";

export default function Skeleton() {
  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ height: "30px", backgroundColor: "#e5e7eb", marginBottom: "1rem", borderRadius: "4px" }} />
      <div style={{ height: "150px", backgroundColor: "#f3f4f6", marginBottom: "1rem", borderRadius: "4px" }} />
      <div style={{ height: "40px", backgroundColor: "#e5e7eb", borderRadius: "4px" }} />
    </div>
  );
}