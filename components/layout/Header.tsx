"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingCart, Search, Menu, X, MapPin, MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/store/cart";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?category=bundles", label: "Bundles" },
  { href: "/academy", label: "Academy" },
  { href: "/about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = useCartStore((s) => s.totalItems());
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-brand-black text-white text-xs font-body py-2 px-4 flex items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3 text-brand-orange" />
          Delivery: Arusha · Moshi · Dar es Salaam · Mwanza
        </span>
        <span className="hidden sm:inline text-brand-gray">|</span>
        <span className="hidden sm:inline">
          M-Pesa · Tigo Pesa · Airtel Money · Cash on Delivery
        </span>
      </div>

      {/* Main header */}
      <header className="bg-white border-b border-black/8 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-baseline gap-0.5">
              <span className="font-display font-black text-xl text-brand-black tracking-tight">
                Peleka
              </span>
              <span className="font-display font-black text-xl text-brand-orange tracking-tight">
                Pro
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-body text-sm font-medium transition-colors relative pb-0.5",
                    pathname === link.href || pathname.startsWith(link.href.split("?")[0] + "/")
                      ? "text-brand-orange after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-brand-orange"
                      : "text-brand-black hover:text-brand-orange"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search products"
                className="p-2 text-brand-black hover:text-brand-orange transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={openCart}
                aria-label={`Cart — ${totalItems} items`}
                className="relative p-2 text-brand-black hover:text-brand-orange transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-orange text-white text-[0.6rem] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalItems > 9 ? "9+" : totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                className="md:hidden p-2 text-brand-black hover:text-brand-orange transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4">
              <form action="/shop" method="get" role="search" className="flex gap-2">
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products… (e.g. 'iPhone case', 'GaN charger')"
                  autoFocus
                  className="flex-1 border border-black/15 rounded-sm px-4 py-2.5 text-sm font-body text-brand-black placeholder:text-brand-gray focus:outline-none focus:border-brand-orange"
                />
                <button
                  type="submit"
                  className="bg-brand-orange text-white px-5 py-2.5 text-sm font-semibold font-display rounded hover:bg-brand-deep transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-black/8">
            <nav className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "font-display font-semibold text-base py-3 border-b border-black/5 flex items-center justify-between",
                    pathname === link.href ? "text-brand-orange" : "text-brand-black"
                  )}
                >
                  {link.label}
                  <span className="text-brand-orange text-lg leading-none">›</span>
                </Link>
              ))}
              <div className="pt-3">
                <a
                  href="https://wa.me/255719363738"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#25D366] font-semibold font-display text-sm"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  WhatsApp: +255 719 363 738
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
