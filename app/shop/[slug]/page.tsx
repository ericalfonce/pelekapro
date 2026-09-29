"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, use } from "react";
import { Star, ShoppingCart, ChevronRight, Check, Package, Truck, RotateCcw, ShieldCheck } from "lucide-react";
import { getProductBySlug, products } from "@/lib/data/products";
import { ProductArtwork } from "@/components/ui/ProductArtwork";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductCard } from "@/components/ui/ProductCard";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

interface Props {
  // In the App Router, `params` is a Promise and must be unwrapped.
  params: Promise<{ slug: string }>;
}

export default function ProductPage({ params }: Props) {
  const { slug } = use(params);
  const maybeProduct = getProductBySlug(slug);
  if (!maybeProduct) notFound();
  const product = maybeProduct!;

  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    product.variants?.[0]
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);

  function handleAddToCart() {
    addItem(product, qty, selectedVariant);
    setAdded(true);
    openCart();
    setTimeout(() => setAdded(false), 2000);
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const badgeLabel = product.badge === "bestseller"
    ? "Best Seller"
    : product.badge === "flash"
    ? "Flash Deal"
    : product.badge === "new"
    ? "New"
    : product.badge === "bundle"
    ? "Bundle"
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-body text-brand-gray mb-8">
        <Link href="/" className="hover:text-brand-orange transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href="/shop" className="hover:text-brand-orange transition-colors">Shop</Link>
        <ChevronRight className="w-3 h-3" />
        <Link href={`/shop?category=${product.category}`} className="hover:text-brand-orange transition-colors capitalize">
          {product.category.replace("-", " ")}
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-brand-black truncate max-w-[200px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-20">
        {/* Gallery */}
        <div>
          <div className="mb-3 aspect-square overflow-hidden border border-black/8">
            <ProductArtwork
              image={product.image}
              category={product.category}
              slug={product.slug}
              alt={product.imageAlt ?? product.name}
              variant="stage"
              priority
              className="h-full w-full"
            />
          </div>

          {/* Thumbnails — the first reflects the real photo, the rest use the
              vector stand-in until additional angles are supplied. */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                aria-hidden="true"
                className={cn(
                  "h-16 w-16 overflow-hidden border transition-colors",
                  i === 0
                    ? "border-brand-orange"
                    : "border-black/8 opacity-70 hover:border-brand-orange/50 hover:opacity-100"
                )}
              >
                <ProductArtwork
                  image={i === 0 ? product.image : undefined}
                  category={product.category}
                  slug={product.slug}
                  alt=""
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>

          {product.warranty && (
            <p className="mt-4 inline-flex items-center gap-2 bg-brand-warm px-3 py-2 text-xs font-medium text-brand-black">
              <ShieldCheck className="h-4 w-4 text-brand-orange" aria-hidden="true" />
              {product.warranty}
            </p>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <span className="text-brand-gray text-xs font-body uppercase tracking-wider capitalize">
              {product.category.replace("-", " ")}
            </span>
            {badgeLabel && (
              <span className="deal-badge">{badgeLabel}</span>
            )}
          </div>

          <h1 className="font-display font-bold text-brand-black text-2xl md:text-3xl leading-snug">
            {product.name}
          </h1>

          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((n) => (
                <Star
                  key={n}
                  className={cn("w-4 h-4", n <= Math.round(product.rating) ? "fill-brand-orange text-brand-orange" : "fill-black/10 text-black/10")}
                />
              ))}
            </div>
            <span className="text-sm font-display font-semibold text-brand-black">{product.rating}</span>
            <span className="text-sm text-brand-gray font-body">({product.reviews} reviews)</span>
          </div>

          <div className="border-y border-black/8 py-4">
            <PriceTag price={product.price} originalPrice={product.originalPrice} size="xl" />
            {!product.inStock && (
              <p className="text-red-500 text-xs font-display font-semibold mt-2">Out of stock</p>
            )}
          </div>

          <p className="text-brand-black/75 font-body text-sm leading-relaxed">
            {product.description}
          </p>

          {product.variants && product.variants.length > 0 && (
            <div>
              <p className="font-display font-semibold text-brand-black text-sm mb-2">
                Select Model
              </p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v}
                    onClick={() => setSelectedVariant(v)}
                    className={cn(
                      "text-sm font-body px-4 py-2 border transition-colors",
                      selectedVariant === v
                        ? "border-brand-orange bg-brand-orange/5 text-brand-black font-semibold"
                        : "border-black/15 text-brand-gray hover:border-brand-orange hover:text-brand-black"
                    )}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="flex items-center border border-black/15">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-3 text-brand-black hover:bg-black/5 transition-colors font-display font-bold"
                aria-label="Decrease quantity"
              >
                &minus;
              </button>
              <span className="px-4 text-brand-black font-display font-semibold min-w-[2.5rem] text-center">
                {qty}
              </span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-3 text-brand-black hover:bg-black/5 transition-colors font-display font-bold"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 font-display font-bold text-base py-4 rounded transition-all",
                !product.inStock
                  ? "bg-black/10 text-brand-gray cursor-not-allowed"
                  : added
                  ? "bg-green-600 text-white"
                  : "bg-brand-orange text-white hover:bg-brand-deep"
              )}
            >
              {added ? (
                <><Check className="w-5 h-5" /> Added to Cart</>
              ) : (
                <><ShoppingCart className="w-5 h-5" /> Add to Cart</>
              )}
            </button>
          </div>

          <WhatsAppButton
            message={`Hi! I want to order: ${product.name} — TSh ${product.price.toLocaleString()}`}
            label="Order via WhatsApp"
            className="w-full justify-center"
          />

          <div className="grid grid-cols-3 gap-4 border-t border-black/8 pt-5">
            <div className="flex flex-col items-center text-center gap-1.5">
              <Truck className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-body text-brand-gray">Fast<br />Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <Package className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-body text-brand-gray">Genuine<br />Product</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1.5">
              <RotateCcw className="w-5 h-5 text-brand-orange" />
              <span className="text-xs font-body text-brand-gray">7-Day<br />Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white p-6 mb-12 border-l-4 border-brand-orange">
        <h2 className="font-display font-bold text-brand-black text-lg mb-4">Key Features</h2>
        <ul className="grid sm:grid-cols-2 gap-2">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm font-body text-brand-black/80">
              <Check className="w-4 h-4 text-brand-orange flex-shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div>
          <h2 className="orange-rule font-display font-bold text-2xl text-brand-black mb-6">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} className="bg-white" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
