import { createContext, useReducer, useMemo } from "react";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  // Calculate total price dynamically from current state
  const total = state.items.reduce((sum, dish) => sum + dish.price, 0);

  // Memoize value to prevent redundant consumer re-renders
  const value = useMemo(
    () => ({ items: state.items, dispatch, total }),
    [state.items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}