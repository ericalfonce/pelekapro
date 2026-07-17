"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { PriceTag } from "./PriceTag";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const badgeLabels: Record<string, string> = {
  flash: "Flash Deal",
  bestseller: "Best Seller",
  new: "New",
  bundle: "Bundle",
};

const badgeColors: Record<string, string> = {
  flash: "bg-brand-orange text-white",
  bestseller: "bg-brand-black text-brand-orange",
  new: "bg-brand-black text-white",
  bundle: "bg-brand-deep text-white",
};

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, 1);
    openCart();
  }

  return (
    <div
      className={cn(
        "product-card group bg-white flex flex-col relative overflow-hidden",
        className
      )}
    >
      {/* Badge */}
      {product.badge && (
        <span
          className={cn(
            "absolute top-3 left-3 z-10 text-[0.65rem] font-display font-bold uppercase tracking-widest px-2 py-1",
            badgeColors[product.badge]
          )}
        >
          {badgeLabels[product.badge]}
        </span>
      )}

      {/* Product image */}
      <Link
        href={`/shop/${product.slug}`}
        className="block aspect-square bg-[#F5F5F3] overflow-hidden"
      >
        {/* Placeholder — swap src with real product image */}
        <div className="w-full h-full flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-105">
          {getCategoryEmoji(product.category)}
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Category */}
        <span className="text-brand-gray text-xs font-body uppercase tracking-wider">
          {product.category.replace("-", " ")}
        </span>

        {/* Name */}
        <Link
          href={`/shop/${product.slug}`}
          className="font-display font-semibold text-brand-black text-sm leading-snug hover:text-brand-orange transition-colors line-clamp-2"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star className="w-3 h-3 fill-brand-orange text-brand-orange" />
          <span className="text-xs text-brand-black font-semibold">
            {product.rating}
          </span>
          <span className="text-xs text-brand-gray">
            ({product.reviews})
          </span>
        </div>

        {/* Price + Add to cart */}
        <div className="mt-auto pt-3 flex items-end justify-between gap-2">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />

          <button
            onClick={handleAddToCart}
            aria-label={`Ongeza ${product.name} kwenye mkoba`}
            className="flex-shrink-0 bg-brand-orange text-white p-2 rounded hover:bg-brand-deep transition-colors active:scale-95"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getCategoryEmoji(cat: string): string {
  const map: Record<string, string> = {
    cases: "📱",
    chargers: "⚡",
    "power-banks": "🔋",
    audio: "🎧",
    "screen-protectors": "🛡️",
    smartwatches: "⌚",
    speakers: "🔊",
    bundles: "📦",
  };
  return map[cat] ?? "📦";
}
