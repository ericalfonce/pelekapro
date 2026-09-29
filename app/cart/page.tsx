"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductArtwork } from "@/components/ui/ProductArtwork";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/utils";

const DELIVERY_THRESHOLD = 50000;
const DELIVERY_FEE_ARUSHA = 3000;

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCartStore();
  const total = subtotal();
  const deliveryFree = total >= DELIVERY_THRESHOLD;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-md mx-auto text-center">
          <ShoppingBag className="w-16 h-16 text-black/10 mx-auto mb-6" />
          <h1 className="font-display font-bold text-2xl text-brand-black mb-2">
            Your cart is empty
          </h1>
          <p className="text-brand-gray font-body mb-8">
            You haven&apos;t added anything yet. Browse the shop to get started.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-brand-orange text-white font-display font-bold px-7 py-4 rounded hover:bg-brand-deep transition-colors"
          >
            Browse Shop <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeading title="Your Cart" subtitle={`${items.length} ${items.length === 1 ? "item" : "items"} ready to checkout`} className="mb-8" />

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white border border-black/8">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-black/8 text-xs font-display font-bold text-brand-gray uppercase tracking-wider">
              <span className="col-span-6">Product</span>
              <span className="col-span-2 text-center">Price</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {items.map((item) => (
              <div
                key={`${item.product.id}__${item.selectedVariant ?? ""}`}
                className="grid grid-cols-12 gap-4 items-center px-6 py-5 border-b border-black/5 last:border-b-0"
              >
                <div className="col-span-6 flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#F5F5F3] flex-shrink-0 flex items-center justify-center text-2xl">
                    <ProductArtwork
                      image={item.product.image}
                      category={item.product.category}
                      slug={item.product.slug}
                      alt={item.product.imageAlt ?? item.product.name}
                      className="h-full w-full"
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      className="font-display font-semibold text-sm text-brand-black hover:text-brand-orange transition-colors line-clamp-2 leading-snug"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedVariant && (
                      <p className="text-brand-gray text-xs font-body mt-0.5">{item.selectedVariant}</p>
                    )}
                    <button
                      onClick={() => removeItem(item.product.id, item.selectedVariant)}
                      className="text-xs text-brand-gray hover:text-red-500 transition-colors font-body mt-1 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-center">
                  <PriceTag price={item.product.price} size="sm" />
                </div>

                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex items-center border border-black/15">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant)}
                      className="px-2 py-1.5 text-brand-black hover:bg-black/5 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-sm font-display font-semibold text-brand-black min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant)}
                      className="px-2 py-1.5 text-brand-black hover:bg-black/5 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <PriceTag price={item.product.price * item.quantity} size="sm" />
                </div>
              </div>
            ))}

            <div className="px-6 py-4 border-t border-black/8">
              <button
                onClick={clearCart}
                className="text-xs text-brand-gray hover:text-red-500 transition-colors font-body"
              >
                &times; Clear all items
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border border-black/8 p-6 sticky top-24">
            <h2 className="font-display font-bold text-brand-black text-lg mb-5 pb-4 border-b border-black/8">
              Order Summary
            </h2>

            <div className="flex flex-col gap-3 text-sm font-body mb-5">
              <div className="flex justify-between">
                <span className="text-brand-gray">Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
                <span className="text-brand-black font-semibold">TSh {formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-gray">Delivery (Arusha CBD)</span>
                <span className={deliveryFree ? "text-green-600 font-semibold" : "text-brand-black font-semibold"}>
                  {deliveryFree ? "FREE" : `TSh ${formatPrice(DELIVERY_FEE_ARUSHA)}`}
                </span>
              </div>
              {!deliveryFree && (
                <p className="text-xs text-brand-gray bg-brand-warm p-2">
                  Add TSh {formatPrice(DELIVERY_THRESHOLD - total)} more for free delivery to Arusha CBD.
                </p>
              )}
            </div>

            <div className="border-t border-black/8 pt-4 mb-6">
              <div className="flex justify-between items-baseline">
                <span className="font-display font-bold text-brand-black">Total</span>
                <div className="text-right">
                  <PriceTag
                    price={deliveryFree ? total : total + DELIVERY_FEE_ARUSHA}
                    size="lg"
                  />
                  <p className="text-xs text-brand-gray font-body mt-0.5">
                    +delivery for other cities
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-brand-orange text-white font-display font-bold text-base py-4 rounded hover:bg-brand-deep transition-colors mb-3"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/shop"
              className="w-full text-center block text-sm text-brand-gray font-body hover:text-brand-black transition-colors"
            >
              &larr; Continue shopping
            </Link>

            <div className="mt-6 pt-4 border-t border-black/8">
              <p className="text-xs text-brand-gray font-body mb-3">We accept:</p>
              <div className="flex flex-wrap gap-1.5">
                {["M-Pesa", "Tigo Pesa", "Airtel Money", "Cash on Delivery"].map((m) => (
                  <span key={m} className="text-[0.6rem] font-display font-bold uppercase tracking-wider border border-black/15 text-brand-gray px-2 py-0.5">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
