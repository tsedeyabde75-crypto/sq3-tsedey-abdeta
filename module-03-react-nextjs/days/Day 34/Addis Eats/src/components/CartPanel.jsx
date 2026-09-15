import React from "react";

export default function CartPanel({ cartItems = [], onRemoveFromCart }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart-container">
      <h3>Your Cart</h3>
      {cartItems.length === 0 ? (
        <p>No items in cart yet.</p>
      ) : (
        <div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cartItems.map((item, index) => (
              <li
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <div>
                  <strong>{item.name}</strong> - {item.price} ETB
                </div>
                <button
                  onClick={() => onRemoveFromCart(index)}
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    padding: "0.2rem 0.5rem",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
            <strong>Total:</strong>
            <strong style={{ color: "#16a34a" }}>{total} ETB</strong>
          </div>
        </div>
      )}
    </div>
  );
}