"use client";

import { useCartStore } from "@/lib/store/cart";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import Link from "next/link";
import { PriceTag } from "@/components/ui/PriceTag";

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, subtotal } = useCartStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div
        className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 flex flex-col shadow-2xl"
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/8">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-orange" />
            <span className="font-display font-bold text-brand-black">
              Cart ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 text-brand-gray hover:text-brand-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <ShoppingBag className="w-12 h-12 text-black/15" />
              <div>
                <p className="font-display font-bold text-brand-black">Your cart is empty</p>
                <p className="text-sm text-brand-gray font-body mt-1">Add something — kuna deals nzuri leo!</p>
              </div>
              <button
                onClick={closeCart}
                className="bg-brand-orange text-white px-6 py-2.5 font-display font-semibold text-sm hover:bg-brand-deep transition-colors"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.selectedVariant ?? ""}`} className="flex gap-3">
                  <div className="w-16 h-16 bg-brand-warm flex-shrink-0 flex items-center justify-center text-2xl rounded-sm">
                    {item.product.image || "📦"}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-display font-semibold text-sm text-brand-black leading-tight truncate">
                      {item.product.name}
                    </p>
                    {item.selectedVariant && (
                      <p className="text-xs text-brand-gray font-body mt-0.5">{item.selectedVariant}</p>
                    )}
                    <PriceTag price={item.product.price} size="sm" className="mt-1" />

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                        aria-label="Decrease quantity"
                        className="w-6 h-6 border border-black/15 flex items-center justify-center text-brand-black hover:border-brand-orange hover:text-brand-orange transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-display font-bold text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                        aria-label="Increase quantity"
                        className="w-6 h-6 border border-black/15 flex items-center justify-center text-brand-black hover:border-brand-orange hover:text-brand-orange transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.product.id, item.selectedVariant)}
                        aria-label="Remove item"
                        className="ml-auto text-brand-gray hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-black/8 px-5 py-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="font-body text-sm text-brand-gray">Subtotal</span>
              <PriceTag price={subtotal()} size="md" />
            </div>
            <p className="text-xs text-brand-gray font-body">Delivery fee calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-brand-orange text-white text-center py-3.5 font-display font-bold text-sm hover:bg-brand-deep transition-colors"
            >
              Checkout &rarr;
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full border border-black/15 text-brand-black text-center py-3 font-display font-semibold text-sm hover:border-brand-orange hover:text-brand-orange transition-colors"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
