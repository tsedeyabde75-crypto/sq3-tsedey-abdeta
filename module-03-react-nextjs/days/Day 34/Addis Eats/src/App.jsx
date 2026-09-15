import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import Skeleton from "./components/Skeleton";
import MenuList from "./components/MenuList";
import CartPanel from "./components/CartPanel";

const Checkout = lazy(() => import("./pages/Checkout"));

export default function App() {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (dish) => {
    setCartItems((prevItems) => [...prevItems, dish]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <BrowserRouter>
      <ErrorBoundary
        fallback={
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>Application Crashed</h1>
            <p>Something critical went wrong. Please reload the page.</p>
          </div>
        }
      >
        <nav style={{ padding: "1rem", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
          <Link to="/" style={{ marginRight: "1rem" }}>Menu</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>

        <main style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
          <Suspense fallback={<Skeleton />}>
            <Routes>
              <Route
                path="/"
                element={
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
                    <ErrorBoundary
                      fallback={
                        <div style={{ padding: "1rem", backgroundColor: "#fee2e2", borderRadius: "6px" }}>
                          <h3>Menu Unavailable</h3>
                          <p>Failed to render dish items. The rest of the app remains usable.</p>
                        </div>
                      }
                    >
                      <MenuList onAddToCart={handleAddToCart} />
                    </ErrorBoundary>

                    <ErrorBoundary
                      fallback={
                        <div style={{ padding: "1rem", backgroundColor: "#fef3c7", borderRadius: "6px" }}>
                          <h3>Cart Panel Unavailable</h3>
                          <p>Could not display cart. Try refreshing this section.</p>
                        </div>
                      }
                    >
                      <CartPanel 
                        cartItems={cartItems} 
                        onRemoveFromCart={handleRemoveFromCart} 
                      />
                    </ErrorBoundary>
                  </div>
                }
              />
              <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            </Routes>
          </Suspense>
        </main>
      </ErrorBoundary>
    </BrowserRouter>
  );
}