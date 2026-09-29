"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/data/products";
import { getDiscountPercent } from "@/lib/data/products";
import { badgeStyles } from "@/components/ui/ProductArtwork";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";
import { PriceTag } from "./PriceTag";
import { ProductArtwork } from "./ProductArtwork";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const [justAdded, setJustAdded] = useState(false);

  const discount = getDiscountPercent(product);

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    addItem(product, 1);
    setJustAdded(true);
    if (!justAdded) openCart();
    setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <article
      className={cn(
        "product-card group relative flex flex-col overflow-hidden bg-white",
        className
      )}
    >
      {/* Media */}
      <div className="relative">
        <Link
          href={`/shop/${product.slug}`}
          className="block aspect-square overflow-hidden"
          tabIndex={-1}
          aria-hidden="true"
        >
          <ProductArtwork
            image={product.image}
            category={product.category}
            slug={product.slug}
            alt={product.imageAlt ?? product.name}
            className="h-full w-full"
          />
        </Link>

        {/* Badges */}
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 z-10 border px-2 py-1 font-display text-[0.6rem] font-bold uppercase tracking-widest",
              badgeStyles[product.badge].className
            )}
          >
            {badgeStyles[product.badge].label}
          </span>
        )}

        {discount && (
          <span className="absolute top-3 right-3 z-10 bg-zinc-900 px-2 py-1 font-display text-[0.6rem] font-bold text-white">
            &minus;{discount}%
          </span>
        )}

        {!product.inStock && (
          <span className="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
            <span className="bg-zinc-900 px-3 py-1.5 font-display text-[0.65rem] font-bold uppercase tracking-wider text-white">
              Out of Stock
            </span>
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Brand / category */}
        <span className="text-[0.65rem] font-body uppercase tracking-wider text-brand-gray">
          {product.brand ?? product.category.replace(/-/g, " ")}
        </span>

        {/* Name */}
        <h3 className="font-display text-sm font-semibold leading-snug text-brand-black">
          <Link
            href={`/shop/${product.slug}`}
            className="line-clamp-2 transition-colors after:absolute after:inset-0 hover:text-brand-orange"
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 20 20" className="h-3 w-3 fill-brand-orange text-brand-orange" aria-hidden="true">
            <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
          </svg>
          <span className="text-xs font-semibold text-brand-black">{product.rating}</span>
          <span className="text-xs text-brand-gray">({product.reviews})</span>
        </div>

        {/* Price + add */}
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <PriceTag
            price={product.price}
            originalPrice={product.originalPrice}
            size="sm"
          />

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            aria-label={`Ongeza ${product.name} kwenye mkoba`}
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center transition-all duration-150 active:scale-95",
              "disabled:pointer-events-none disabled:opacity-40",
              justAdded
                ? "bg-green-600 text-white"
                : "bg-brand-black text-white hover:bg-brand-orange"
            )}
          >
            {justAdded ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
