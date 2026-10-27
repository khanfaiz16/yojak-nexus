import { createContext, useCallback, useEffect, useMemo, useState } from "react";

export const CartContext = createContext(null);

const STORAGE_KEY = "yojak-demo-cart";

// Each cart line has a unique key: product id plus the chosen option (if any)
function lineKey(id, variant) {
  return variant ? `${id}::${variant}` : id;
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    // Older saved carts did not have a key, so add one
    return parsed.map((i) => ({ ...i, key: i.key || i.id, variant: i.variant || null }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable: the cart still works for this session.
    }
  }, [items]);

  const addItem = useCallback((product, qty = 1, variant = null) => {
    const key = lineKey(product.id, variant);
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          tone: product.tone,
          categoryId: product.categoryId,
          variant,
          qty,
        },
      ];
    });
  }, []);

  const updateQty = useCallback((key, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
    );
  }, []);

  const removeItem = useCallback((key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const value = useMemo(() => {
    const count = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    return { items, count, subtotal, addItem, updateQty, removeItem, clearCart };
  }, [items, addItem, updateQty, removeItem, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}