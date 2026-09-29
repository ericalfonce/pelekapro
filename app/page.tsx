import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Truck, Shield, Headphones, Zap } from "lucide-react";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryTile } from "@/components/ui/CategoryTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PriceTag } from "@/components/ui/PriceTag";
import { ProductArtwork } from "@/components/ui/ProductArtwork";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { categories } from "@/lib/data/categories";
import {
  getFeaturedProducts,
  getFlashDeals,
  getBestSellers,
} from "@/lib/data/products";

export const metadata: Metadata = {
  title: "PelekaPro — Premium Phone Accessories | Delivery Arusha, Moshi, Dar",
};

export default function HomePage() {
  const flashDeals = getFlashDeals().slice(0, 4);
  const bestSellers = getBestSellers().slice(0, 4);
  const featured = getFeaturedProducts().slice(0, 2);

  return (
    <>
      {/* HERO */}
      <section className="bg-brand-black overflow-hidden relative min-h-[85vh] flex items-center">
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 text-white/[0.03] font-display font-black text-[30rem] leading-none select-none pointer-events-none"
        >
          P
        </span>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-6 items-center">
            <div className="relative z-10 max-w-xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="deal-badge">Arusha &middot; Tanzania</span>
                <span className="text-white/40 text-xs font-body">
                  Same-day delivery available
                </span>
              </div>

              <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight mb-6">
                Your phone{" "}
                <span className="text-brand-orange relative inline-block">
                  deserves
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-orange/30"
                  />
                </span>
                <br />
                better.
              </h1>

              <p className="text-white/65 font-body text-lg leading-relaxed mb-10 max-w-md">
                Premium accessories — cases that protect, chargers that are fast,
                audio that surprises. Delivered to your door across Arusha,
                bila wasiwasi.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-brand-orange text-white font-display font-bold text-base px-7 py-4 rounded hover:bg-brand-deep transition-colors"
                >
                  Shop Now
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/shop?category=bundles"
                  className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-display font-semibold text-base px-7 py-4 rounded hover:border-brand-orange hover:text-brand-orange transition-colors"
                >
                  Today&apos;s Bundles
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 border-t border-white/10 pt-6">
                <div>
                  <p className="font-display font-black text-white text-2xl">4,200+</p>
                  <p className="text-white/40 text-xs font-body">Happy customers</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display font-black text-white text-2xl">TSh 3,000</p>
                  <p className="text-white/40 text-xs font-body">Delivery Arusha CBD</p>
                </div>
                <div className="w-px h-8 bg-white/10" />
                <div>
                  <p className="font-display font-black text-white text-2xl">&lt;4h</p>
                  <p className="text-white/40 text-xs font-body">Delivery time (CBD)</p>
                </div>
              </div>
            </div>

            {/* Right — featured product cards */}
            <div className="relative lg:translate-x-8 xl:translate-x-16">
              <div className="grid grid-cols-2 gap-4">
                {featured.map((product, i) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    className={`group bg-white/5 border border-white/10 p-5 hover:border-brand-orange/50 transition-colors ${i === 0 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <div className="aspect-square mb-4 overflow-hidden border border-white/10">
                      <ProductArtwork
                        image={product.image}
                        category={product.category}
                        slug={product.slug}
                        alt={product.imageAlt ?? product.name}
                        className="h-full w-full"
                      />
                    </div>
                    <p className="text-white/50 text-xs font-body uppercase tracking-wider mb-1">
                      {product.category.replace("-", " ")}
                    </p>
                    <p className="font-display font-semibold text-white text-sm leading-snug mb-3 group-hover:text-brand-orange transition-colors">
                      {product.name}
                    </p>
                    <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
                  </Link>
                ))}
                <Link
                  href="/shop"
                  className="group bg-brand-orange/10 border border-brand-orange/30 p-5 flex flex-col items-start justify-between hover:bg-brand-orange/20 transition-colors"
                >
                  <span className="text-brand-orange font-display font-bold text-2xl">+12</span>
                  <div>
                    <p className="font-display font-semibold text-white text-sm">More products</p>
                    <p className="text-white/50 text-xs font-body mt-0.5 group-hover:text-brand-orange transition-colors">View all &rarr;</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLASH DEALS */}
      <section className="bg-brand-black py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <SectionHeading
              title="Flash Deals"
              subtitle="Limited-time prices — bei iliyopunguzwa"
              titleClassName="text-white [&::before]:bg-brand-orange"
              className="[&_p]:!text-white/50"
            />
            <Link href="/shop?filter=flash-deal" className="text-brand-orange text-sm font-display font-semibold hover:text-brand-deep transition-colors flex items-center gap-1 pb-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {flashDeals.map((product) => (
              <ProductCard key={product.id} product={product} className="bg-white" />
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-brand-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Shop by Category"
            subtitle="Everything your phone needs — in one place"
            className="mb-10"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <CategoryTile key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-y border-black/8 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <TrustItem icon={<Truck className="w-6 h-6" />} title="Fast Delivery" body="Arusha CBD within 4 hours. Moshi, Dar, and Mwanza in 2-3 days." />
            <TrustItem icon={<Zap className="w-6 h-6" />} title="Lipa kwa M-Pesa" body="M-Pesa, Tigo Pesa, Airtel Money, or cash on delivery." />
            <TrustItem icon={<Shield className="w-6 h-6" />} title="Quality Guaranteed" body="Every product is tested. 7-day hassle-free returns, no questions asked." />
            <TrustItem icon={<Headphones className="w-6 h-6" />} title="Always Here" body="WhatsApp support 12 hours a day. We reply within 30 minutes." />
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-brand-warm py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <SectionHeading title="Best Sellers" subtitle="The favourites of our 4,200+ customers across Tanzania" />
            <Link href="/shop?sort=best-seller" className="text-brand-orange text-sm font-display font-semibold hover:text-brand-deep transition-colors flex items-center gap-1 pb-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} className="bg-white" />
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY BANNER */}
      <section className="bg-brand-orange relative overflow-hidden">
        <span aria-hidden="true" className="absolute -right-10 top-1/2 -translate-y-1/2 font-display font-black text-[20rem] text-white/10 leading-none select-none pointer-events-none">A</span>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block bg-brand-black text-brand-orange text-xs font-display font-bold uppercase tracking-widest px-3 py-1.5 mb-6">
              PelekaPro Academy
            </span>
            <h2 className="font-display font-black text-white text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
              Learn to import from China.<br />Start your own business.
            </h2>
            <p className="text-white/80 font-body text-lg leading-relaxed mb-8 max-w-lg">
              340+ graduates. 87% started a business within 6 months. Next seminar: Arusha, 19 July 2025. Nafasi ni chache — usikose.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/academy" className="inline-flex items-center gap-2 bg-brand-black text-white font-display font-bold text-base px-7 py-4 hover:bg-brand-black/80 transition-colors">
                Learn About the Academy <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppButton
                message="Hi! I want to know more about PelekaPro Academy."
                label="Ask on WhatsApp"
                className="border-2 border-white/30 !bg-transparent text-white hover:!bg-white/10 rounded-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="What Our Customers Say" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="bg-brand-warm p-6 border-l-4 border-brand-orange">
                <p className="font-body text-brand-black text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="font-display font-semibold text-brand-black text-sm">{t.name}</p>
                  <p className="text-brand-gray text-xs font-body">{t.location}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TrustItem({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-brand-orange">{icon}</div>
      <div>
        <p className="font-display font-bold text-brand-black text-sm mb-1">{title}</p>
        <p className="text-brand-gray text-xs font-body leading-relaxed">{body}</p>
      </div>
    </div>
  );
}


const testimonials = [
  {
    name: "Amina J.",
    location: "Arusha, Njiro",
    quote: "I ordered a power bank and GaN charger — both arrived at my door within 3 hours. PelekaPro ni waaminifu kweli kweli.",
  },
  {
    name: "David M.",
    location: "Moshi, Kilimanjaro",
    quote: "The ANC earbuds are way better than I expected at that price. And they shipped to Moshi with no issues — fast too.",
  },
  {
    name: "Fatuma R.",
    location: "Dar es Salaam, Kinondoni",
    quote: "I've tried many shops — PelekaPro is the best. Message them on WhatsApp with any question and they reply haraka sana.",
  },
];
