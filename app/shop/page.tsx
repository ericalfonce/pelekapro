"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Search } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/lib/data/products";
import { categories } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

type Category = string;

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "best-seller", label: "Best Sellers" },
];

export default function ShopPage() {
  return (
    <Suspense>
      <ShopPageInner />
    </Suspense>
  );
}

function ShopPageInner() {
  const searchParams = useSearchParams();

  const initCategory = searchParams.get("category") ?? "all";
  const initSort = searchParams.get("sort") === "best-seller"
    ? "best-seller"
    : searchParams.get("sort") ?? "featured";
  const initFilter = searchParams.get("filter"); // e.g. "flash-deal"
  const initQuery = searchParams.get("q") ?? "";

  const [selectedCategory, setSelectedCategory] = useState<Category | "all">(initCategory);
  const [sortBy, setSortBy] = useState(initSort);
  const [maxPrice, setMaxPrice] = useState<number>(300000);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initQuery);

  // Re-sync filters when the URL changes (e.g. navigating from the homepage).
  // Adjusted during render rather than in an effect so results update in the
  // same paint instead of flashing stale content for a frame.
  const [lastParams, setLastParams] = useState(searchParams.toString());
  const currentParams = searchParams.toString();

  if (currentParams !== lastParams) {
    setLastParams(currentParams);
    setSelectedCategory(searchParams.get("category") ?? "all");
    setSortBy(
      searchParams.get("sort") === "best-seller"
        ? "best-seller"
        : searchParams.get("sort") ?? "featured"
    );
    setSearchQuery(searchParams.get("q") ?? "");
  }

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    } else {
      if (selectedCategory !== "all") {
        list = list.filter((p) => p.category === selectedCategory);
      }
      if (initFilter === "flash-deal") {
        list = list.filter((p) => p.badge === "flash");
      }
    }

    list = list.filter((p) => p.price <= maxPrice);

    switch (sortBy) {
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "best-seller": list.sort((a, b) => b.reviews - a.reviews); break;
      default: list.sort((a, b) => (b.badge === "bestseller" ? 1 : 0) - (a.badge === "bestseller" ? 1 : 0));
    }
    return list;
  }, [selectedCategory, sortBy, maxPrice, searchQuery, initFilter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-6">
        <SectionHeading
          title={searchQuery ? `Results for "${searchQuery}"` : "Shop"}
          subtitle="Premium phone accessories — everything your phone needs"
        />
      </div>

      {/* Search bar */}
      <div className="relative mb-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray pointer-events-none" />
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products…"
          className="w-full pl-9 pr-4 py-2.5 border border-black/15 rounded-sm text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-gray hover:text-brand-black"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setSelectedCategory("all")}
          className={cn(
            "text-xs font-display font-semibold px-4 py-2 transition-colors",
            selectedCategory === "all"
              ? "bg-brand-black text-white"
              : "bg-white text-brand-black border border-black/15 hover:border-brand-orange hover:text-brand-orange"
          )}
        >
          All ({products.length})
        </button>
        {categories.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                "text-xs font-display font-semibold px-4 py-2 transition-colors",
                selectedCategory === cat.id
                  ? "bg-brand-orange text-white"
                  : "bg-white text-brand-black border border-black/15 hover:border-brand-orange hover:text-brand-orange"
              )}
            >
              {cat.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 mb-6 border-b border-black/8 pb-4">
        <p className="text-brand-gray text-sm font-body">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
          {selectedCategory !== "all" ? ` in ${categories.find((c) => c.id === selectedCategory)?.label}` : ""}
        </p>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="lg:hidden flex items-center gap-2 text-sm font-display font-semibold text-brand-black border border-black/15 px-3 py-2 hover:border-brand-orange hover:text-brand-orange transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filter
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm font-body text-brand-black border border-black/15 px-3 py-2 rounded-sm bg-white focus:outline-none focus:border-brand-orange"
            aria-label="Sort products"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Sidebar filters */}
        <aside
          className={cn(
            "flex-shrink-0 w-60 hidden lg:block",
            filtersOpen && "!block fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl overflow-y-auto p-6 lg:relative lg:shadow-none lg:p-0"
          )}
        >
          {filtersOpen && (
            <div className="lg:hidden flex items-center justify-between mb-6">
              <p className="font-display font-bold text-brand-black">Filters</p>
              <button onClick={() => setFiltersOpen(false)} className="text-brand-gray hover:text-brand-black">
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Price filter */}
          <div className="mb-8">
            <p className="font-display font-bold text-brand-black text-sm mb-4 uppercase tracking-wider">Max Price</p>
            <input
              type="range"
              min={5000}
              max={300000}
              step={5000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-brand-orange"
              aria-label="Filter by price"
            />
            <div className="flex justify-between text-xs text-brand-gray font-body mt-2">
              <span>TSh 5,000</span>
              <span className="font-semibold text-brand-orange">
                TSh {maxPrice.toLocaleString()}
              </span>
            </div>
          </div>

          {(selectedCategory !== "all" || maxPrice < 300000) && (
            <button
              onClick={() => { setSelectedCategory("all"); setMaxPrice(300000); }}
              className="text-xs text-brand-orange font-display font-semibold hover:text-brand-deep transition-colors"
            >
              &times; Clear all filters
            </button>
          )}
        </aside>

        {filtersOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setFiltersOpen(false)} />
        )}

        {/* Product grid */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-display font-bold text-brand-black text-xl mb-2">
                No products match your filters
              </p>
              <p className="text-brand-gray font-body text-sm mb-6">
                {searchQuery
                  ? `No results for "${searchQuery}". Try a different term.`
                  : "Try adjusting your filters or raising the price limit."}
              </p>
              <button
                onClick={() => { setSelectedCategory("all"); setMaxPrice(300000); setSearchQuery(""); }}
                className="bg-brand-orange text-white font-display font-semibold px-6 py-3 rounded hover:bg-brand-deep transition-colors"
              >
                Show All Products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} className="bg-white" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
