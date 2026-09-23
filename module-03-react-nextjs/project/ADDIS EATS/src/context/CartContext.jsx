import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('addis_eats_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('addis_eats_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === dish.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === dish.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (dishId, amount) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === dishId) {
            const newQuantity = (item.quantity || 1) + amount;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (dishId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== dishId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);