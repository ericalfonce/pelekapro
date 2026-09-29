export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  variants?: string[];
  /**
   * Photo path, e.g. "/products/gan-65w.png".
   *
   * Optional. While undefined, `ProductArtwork` renders a vector product
   * render instead — so the layout is always complete. To add real photos
   * later, drop the files in `public/products/` and set this field.
   */
  image?: string;
  /** Alt text. Falls back to the product name. */
  imageAlt?: string;
  /**
   * Brand name for genuine branded stock, e.g. "Anker".
   * Leave undefined for generic white-label units — the UI then sells on
   * specs and warranty rather than brand recognition.
   */
  brand?: string;
  /** Warranty proof point, e.g. "1-year official warranty". */
  warranty?: string;
  badge?: "flash" | "new" | "bestseller" | "bundle";
  inStock: boolean;
  rating: number;
  reviews: number;
}

export const products: Product[] = [
  {
    id: "1",
    slug: "magsafe-leather-case-iphone-15",
    name: "MagSafe Leather Case – iPhone 15",
    category: "cases",
    price: 45000,
    originalPrice: 65000,
    description: "Premium full-grain leather case with MagSafe compatibility. Slim profile, drop protection, and a feel that improves with age. Available for iPhone 15, 15 Plus, 15 Pro, and 15 Pro Max.",
    features: [
      "Full-grain genuine leather",
      "MagSafe compatible (15W fast wireless charging)",
      "Military-grade drop protection",
      "Microfibre-lined interior",
      "Raised edges protect screen and camera",
    ],
    variants: ["iPhone 15", "iPhone 15 Plus", "iPhone 15 Pro", "iPhone 15 Pro Max"],
    badge: "flash",
    inStock: true,
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    slug: "gan-65w-usb-c-charger",
    name: "GaN 65W USB-C Fast Charger",
    category: "chargers",
    price: 35000,
    originalPrice: 55000,
    description: "Compact GaN charger that replaces your laptop and phone brick. Charges MacBook Pro, iPad, Samsung, and any USB-C device at full speed. Save space — one charger does everything.",
    features: [
      "65W GaN technology",
      "USB-C Power Delivery 3.0",
      "Supports MacBook, iPad, Samsung, Tecno, Infinix",
      "60% smaller than standard laptop chargers",
      "Built-in protection: over-voltage, over-current, temperature",
    ],
    badge: "bestseller",
    inStock: true,
    rating: 4.9,
    reviews: 203,
  },
  {
    id: "3",
    slug: "20000mah-slim-power-bank",
    name: "20,000mAh Slim Power Bank",
    category: "power-banks",
    price: 55000,
    originalPrice: 80000,
    description: "Ultra-slim 20,000mAh power bank that fits in your back pocket. Charges your phone 4-5 times and supports 22.5W fast charging. Perfect for travel, work, and long days out.",
    features: [
      "20,000mAh capacity — 4-5 full charges",
      "22.5W fast charging output",
      "Dual USB-A + USB-C output",
      "LED charge indicator",
      "Slim design: fits in jacket or trouser pocket",
    ],
    badge: "flash",
    inStock: true,
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "4",
    slug: "anc-wireless-earbuds-pro",
    name: "ANC Wireless Earbuds Pro",
    category: "audio",
    price: 75000,
    originalPrice: 120000,
    description: "True wireless earbuds with active noise cancellation. Crystal-clear calls, 30-hour battery life with the case, and IPX5 water resistance. Hear your music, not the matatu.",
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour total battery (6hr earbuds + 24hr case)",
      "IPX5 water and sweat resistant",
      "Bluetooth 5.3 — stable connection up to 10m",
      "USB-C fast charge: 10 min = 1 hour playback",
    ],
    badge: "new",
    inStock: true,
    rating: 4.6,
    reviews: 67,
  },
  {
    id: "5",
    slug: "tempered-glass-screen-protector-samsung-s24",
    name: "Tempered Glass – Samsung Galaxy S24",
    category: "screen-protectors",
    price: 12000,
    description: "9H hardness tempered glass that's nearly invisible on your screen. Case-friendly, bubble-free installation, and oleophobic coating keeps fingerprints off.",
    features: [
      "9H hardness — scratch and shatter resistant",
      "0.33mm ultra-thin",
      "Case-friendly design",
      "Oleophobic anti-fingerprint coating",
      "Includes alignment tool for bubble-free install",
    ],
    variants: ["Galaxy S24", "Galaxy S24+", "Galaxy S24 Ultra"],
    inStock: true,
    rating: 4.5,
    reviews: 156,
  },
  {
    id: "6",
    slug: "smart-watch-fitness-tracker",
    name: "FitPro Smartwatch X1",
    category: "smartwatches",
    price: 95000,
    originalPrice: 140000,
    description: "Track your fitness, read messages, and never miss a call — all from your wrist. 7-day battery, SpO2 monitoring, and 100+ workout modes. Compatible with Android and iPhone.",
    features: [
      "1.85-inch HD AMOLED display",
      "7-day battery life",
      "SpO2 blood oxygen + heart rate monitoring",
      "100+ sport modes",
      "IP68 waterproof — swim-safe",
      "Compatible with Android 6.0+ and iOS 12+",
    ],
    badge: "bestseller",
    inStock: true,
    rating: 4.4,
    reviews: 45,
  },
  {
    id: "7",
    slug: "magnetic-car-mount-wireless",
    name: "Magnetic Wireless Car Mount",
    category: "chargers",
    price: 28000,
    originalPrice: 42000,
    description: "Charge your phone wirelessly while navigating. Strong magnetic hold, 15W wireless charging, and universal compatibility. Install in seconds, remove even faster.",
    features: [
      "15W wireless fast charging",
      "Strong N52 magnets",
      "360-degree rotation",
      "Universal fit — iPhone 12+ MagSafe and all phones",
      "One-hand release mechanism",
    ],
    badge: "flash",
    inStock: true,
    rating: 4.7,
    reviews: 88,
  },
  {
    id: "8",
    slug: "usb-c-braided-cable-2m",
    name: "USB-C Braided Cable 2m",
    category: "chargers",
    price: 8500,
    description: "Heavy-duty braided nylon cable that won't fray or tangle. 100W Power Delivery, USB 3.1 data transfer, and long enough to charge comfortably from a distance.",
    features: [
      "100W Power Delivery",
      "USB 3.1 Gen 2 — 10Gbps data transfer",
      "Braided nylon — rated 30,000+ bends",
      "2-metre length",
      "Universal USB-C to USB-C",
    ],
    inStock: true,
    rating: 4.6,
    reviews: 211,
  },
  {
    id: "9",
    slug: "portable-bluetooth-speaker",
    name: "BoomBox Mini Bluetooth Speaker",
    category: "speakers",
    price: 68000,
    originalPrice: 95000,
    description: "Big sound in a small package. 360-degree stereo, 24-hour battery, and IPX7 waterproof rating means you can take it to the beach, poolside, or anywhere you go.",
    features: [
      "360-degree stereo sound, 20W output",
      "24-hour battery life",
      "IPX7 fully waterproof",
      "Bluetooth 5.0 — 30m range",
      "Built-in mic for speakerphone calls",
      "USB-C charging",
    ],
    badge: "new",
    inStock: true,
    rating: 4.8,
    reviews: 34,
  },
  {
    id: "10",
    slug: "phone-stand-adjustable-aluminium",
    name: "Adjustable Aluminium Phone Stand",
    category: "cases",
    price: 18000,
    description: "Solid aluminium stand for your desk, bedside, or kitchen. Adjustable angle, anti-slip base, and foldable for portability. Works with any phone, tablet, or small laptop.",
    features: [
      "Aircraft-grade aluminium alloy",
      "Adjustable viewing angle (0-90 degrees)",
      "Anti-slip silicone base and cradle",
      "Folds flat for travel",
      "Compatible with phones, tablets, and small laptops",
    ],
    inStock: true,
    rating: 4.5,
    reviews: 72,
  },
  {
    id: "11",
    slug: "privacy-screen-protector",
    name: "Privacy Screen Protector",
    category: "screen-protectors",
    price: 18000,
    originalPrice: 26000,
    description: "See your screen clearly. Nobody beside you can. 30-degree privacy filter keeps your banking, messages, and work private in public spaces like daladala, offices, and cafes.",
    features: [
      "30-degree privacy filter — side visibility blocked",
      "9H hardness",
      "Anti-glare matte finish",
      "Bubble-free installation",
      "Available for popular Samsung and iPhone models",
    ],
    variants: ["iPhone 14", "iPhone 15", "Samsung S23", "Samsung S24", "Tecno Camon 20"],
    badge: "bestseller",
    inStock: true,
    rating: 4.3,
    reviews: 94,
  },
  {
    id: "12",
    slug: "starter-bundle-protection",
    name: "Starter Protection Bundle",
    category: "bundles",
    price: 38000,
    originalPrice: 62000,
    description: "Everything your new phone needs, at once. This bundle includes a premium case, tempered glass screen protector, and a 2m braided cable — saving you TSh 24,000 vs. buying separately.",
    features: [
      "1x Premium slim case",
      "1x 9H tempered glass screen protector",
      "1x 2m braided USB-C cable",
      "Save TSh 24,000 vs. individual prices",
      "Available for most popular phone models",
    ],
    variants: ["iPhone 15", "Samsung Galaxy S24", "Tecno Camon 20"],
    badge: "bundle",
    inStock: true,
    rating: 4.9,
    reviews: 47,
  },
  {
    id: "13",
    slug: "travel-power-bundle",
    name: "Travel Power Bundle",
    category: "bundles",
    price: 85000,
    originalPrice: 130000,
    description: "Never run out of power on the road. Combines our GaN 65W charger, 20,000mAh slim power bank, and 2m braided cable — everything you need for a trip, packed in a gift box.",
    features: [
      "1x GaN 65W USB-C charger",
      "1x 20,000mAh slim power bank",
      "1x 2m braided USB-C cable",
      "Save TSh 45,000 vs. individual prices",
      "Gift box packaging included",
    ],
    badge: "bundle",
    inStock: true,
    rating: 4.9,
    reviews: 28,
  },
  {
    id: "14",
    slug: "audio-pro-bundle",
    name: "Audio Pro Bundle",
    category: "bundles",
    price: 120000,
    originalPrice: 175000,
    description: "Your ears deserve the best. The Audio Pro Bundle combines our ANC Wireless Earbuds Pro with the BoomBox Mini Speaker — personal listening and room-filling sound, one deal.",
    features: [
      "1x ANC Wireless Earbuds Pro",
      "1x BoomBox Mini Bluetooth Speaker",
      "Save TSh 55,000 vs. individual prices",
      "Both come in original packaging",
      "1-month warranty on both items",
    ],
    badge: "bundle",
    inStock: true,
    rating: 4.8,
    reviews: 19,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === "bestseller" || p.badge === "new");
}

export function getFlashDeals(): Product[] {
  return products.filter((p) => p.badge === "flash" && p.originalPrice);
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.badge === "bestseller");
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

/** Percentage saved versus `originalPrice`, or null when not discounted. */
export function getDiscountPercent(product: Product): number | null {
  if (!product.originalPrice || product.originalPrice <= product.price) return null;
  return Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
}

/** True when the product has a real photo rather than using the vector fallback. */
export function hasPhoto(product: Product): boolean {
  return Boolean(product.image);
}
