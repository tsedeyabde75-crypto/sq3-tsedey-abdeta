import React, { useState } from "react";
import DishModal from "./DishModal";

const DISHES = [
  { id: "1", name: "Doro Wat", price: 350, description: "Traditional spicy chicken stew served with hard-boiled egg and injera." },
  { id: "2", name: "Beyaynetu", price: 200, description: "Assorted vegetarian platters featuring lentils, greens, and cabbage on injera." },
  { id: "3", name: "Special Kitfo", price: 400, description: "Minced beef seasoned with mitmita and niter kibbeh, served with ayib and gomen." },
  { id: "4", name: "Tibs", price: 320, description: "Sautéed beef strips with onions, garlic, and rosemary." },
];

export default function MenuList({ onAddToCart }) {
  const [selectedDish, setSelectedDish] = useState(null);

  const handleAddToCart = (dish) => {
    if (onAddToCart) {
      onAddToCart(dish);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Menu Items</h2>
      <div style={styles.grid}>
        {DISHES.map((dish) => (
          <div key={dish.id} style={styles.card}>
            <div>
              <h3 style={styles.dishTitle}>{dish.name}</h3>
              <p style={styles.dishPrice}>{dish.price} ETB</p>
            </div>
            <div style={styles.cardActions}>
              <button style={styles.viewBtn} onClick={() => setSelectedDish(dish)}>
                View Details
              </button>
              <button style={styles.addBtn} onClick={() => handleAddToCart(dish)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <DishModal
        isOpen={Boolean(selectedDish)}
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

const styles = {
  container: {
    padding: "1rem",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    backgroundColor: "#ffffff",
  },
  heading: {
    marginTop: 0,
    marginBottom: "1rem",
    fontSize: "1.25rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: "1rem",
  },
  card: {
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    padding: "1rem",
    backgroundColor: "#f8fafc",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dishTitle: {
    margin: "0 0 0.5rem 0",
    fontSize: "1rem",
  },
  dishPrice: {
    fontWeight: "bold",
    color: "#16a34a",
    margin: "0 0 1rem 0",
  },
  cardActions: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  viewBtn: {
    padding: "0.4rem",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  addBtn: {
    padding: "0.4rem",
    backgroundColor: "#16a34a",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};