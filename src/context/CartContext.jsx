import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.selectedShade === action.payload.selectedShade
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id && i.selectedShade === action.payload.selectedShade
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.id === action.payload.id && i.selectedShade === action.payload.shade)
        ),
      };
    case "UPDATE_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.payload.id && i.selectedShade === action.payload.shade
            ? { ...i, qty: action.payload.qty }
            : i
        ).filter((i) => i.qty > 0),
      };
    case "CLEAR":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = (id, shade) => dispatch({ type: "REMOVE_ITEM", payload: { id, shade } });
  const updateQty = (id, shade, qty) => dispatch({ type: "UPDATE_QTY", payload: { id, shade, qty } });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const total = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = state.items.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
