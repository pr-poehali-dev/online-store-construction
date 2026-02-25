import { useState, useEffect } from 'react';

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  unit: string;
  quantity: number;
  variantId?: string;
  variantName?: string;
  variantValue?: string;
}

const CART_KEY = 'stroymarket_cart';

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prev => {
      const key = `${item.productId}-${item.variantId || ''}`;
      const existing = prev.find(i => `${i.productId}-${i.variantId || ''}` === key);
      if (existing) {
        return prev.map(i =>
          `${i.productId}-${i.variantId || ''}` === key
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (productId: string, variantId?: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.variantId === variantId)));
  };

  const updateQuantity = (productId: string, variantId: string | undefined, quantity: number) => {
    if (quantity <= 0) { removeItem(productId, variantId); return; }
    setItems(prev => prev.map(i =>
      i.productId === productId && i.variantId === variantId ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);

  return { items, addItem, removeItem, updateQuantity, clearCart, total, count };
}
