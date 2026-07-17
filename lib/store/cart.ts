"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;

  addItem: (product: Product, quantity?: number, variant?: string) => void;
  removeItem: (productId: string, variant?: string) => void;
  updateQuantity: (productId: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Computed
  totalItems: () => number;
  subtotal: () => number;
}

function itemKey(productId: string, variant?: string) {
  return variant ? `${productId}__${variant}` : productId;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const key = itemKey(product.id, variant);
          const existing = state.items.find(
            (i) => itemKey(i.product.id, i.selectedVariant) === key
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                itemKey(i.product.id, i.selectedVariant) === key
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity, selectedVariant: variant }],
          };
        });
      },

      removeItem: (productId, variant) => {
        const key = itemKey(productId, variant);
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.product.id, i.selectedVariant) !== key
          ),
        }));
      },

      updateQuantity: (productId, quantity, variant) => {
        const key = itemKey(productId, variant);
        if (quantity <= 0) {
          get().removeItem(productId, variant);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.product.id, i.selectedVariant) === key
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    {
      name: "pelekapro-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
