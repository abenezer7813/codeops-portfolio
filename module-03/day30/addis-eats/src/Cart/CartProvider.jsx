
import { createContext, useMemo, useReducer } from "react";
import { cartReducer } from "./cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  const total = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const value = useMemo(() => {
    return {
      items,
      dispatch,
      total,
    };
  }, [items, total]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

