import Image from "next/image";
import {
  Smartphone,
  Plug,
  BatteryCharging,
  Headphones,
  ShieldCheck,
  Watch,
  Speaker,
  Package,
  Layers,
  Car,
  Cable,
  Lock,
  Plane,
  Music,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/** Per-category visual identity. Replaces the old emoji-per-category map. */
export interface CategoryVisual {
  icon: LucideIcon;
  /** Tailwind gradient stops for the tile backdrop. */
  gradient: string;
  /** Accent colour for the glyph. */
  accent: string;
  /** Colourway swatches offered on product cards. */
  swatches: string[];
}

export const categoryVisuals: Record<string, CategoryVisual> = {
  cases: {
    icon: Smartphone,
    gradient: "from-blue-500/12 to-blue-500/0",
    accent: "text-blue-400",
    swatches: ["#1c1c21", "#2d3748", "#7c5cff", "#d4af37"],
  },
  chargers: {
    icon: Plug,
    gradient: "from-amber-500/12 to-amber-500/0",
    accent: "text-amber-400",
    swatches: ["#fafafa", "#1c1c21", "#3b82f6"],
  },
  "power-banks": {
    icon: BatteryCharging,
    gradient: "from-emerald-500/12 to-emerald-500/0",
    accent: "text-emerald-400",
    swatches: ["#0f0f12", "#fafafa", "#3b82f6"],
  },
  audio: {
    icon: Headphones,
    gradient: "from-violet-500/12 to-violet-500/0",
    accent: "text-violet-400",
    swatches: ["#fafafa", "#1c1c21", "#7c5cff"],
  },
  "screen-protectors": {
    icon: ShieldCheck,
    gradient: "from-cyan-500/12 to-cyan-500/0",
    accent: "text-cyan-400",
    swatches: ["#fafafa", "#0f0f12"],
  },
  smartwatches: {
    icon: Watch,
    gradient: "from-rose-500/12 to-rose-500/0",
    accent: "text-rose-400",
    swatches: ["#1c1c21", "#fafafa", "#d4af37"],
  },
  speakers: {
    icon: Speaker,
    gradient: "from-teal-500/12 to-teal-500/0",
    accent: "text-teal-400",
    swatches: ["#1c1c21", "#fafafa", "#3b82f6"],
  },
  bundles: {
    icon: Package,
    gradient: "from-blue-500/14 to-violet-500/10",
    accent: "text-blue-400",
    swatches: ["#3b82f6", "#1c1c21", "#d4af37"],
  },
};

/**
 * Product-level overrides, where a generic category glyph would be wrong or
 * too vague. Keyed by product slug.
 */
const productIcons: Record<string, LucideIcon> = {
  "magsafe-leather-case-iphone-15": Lock,
  "magnetic-car-mount-wireless": Car,
  "usb-c-braided-cable-2m": Cable,
  "travel-power-bundle": Plane,
  "audio-pro-bundle": Music,
  "phone-stand-adjustable-aluminium": Layers,
};

export const fallbackVisual: CategoryVisual = {
  icon: Layers,
  gradient: "from-zinc-500/12 to-zinc-500/0",
  accent: "text-zinc-400",
  swatches: ["#1c1c21", "#fafafa"],
};

export function getCategoryVisual(category: string): CategoryVisual {
  return categoryVisuals[category] ?? fallbackVisual;
}

export function getProductIcon(slug: string, category: string): LucideIcon {
  return productIcons[slug] ?? getCategoryVisual(category).icon;
}

export type ProductBadge = "flash" | "new" | "bestseller" | "bundle";

export const badgeStyles: Record<ProductBadge, { label: string; className: string }> = {
  flash: {
    label: "Flash Deal",
    className: "bg-blue-500/15 text-blue-300 border border-blue-400/25",
  },
  bestseller: {
    label: "Best Seller",
    className: "bg-amber-500/15 text-amber-300 border border-amber-400/25",
  },
  new: {
    label: "New",
    className: "bg-white/10 text-white border border-white/15",
  },
  bundle: {
    label: "Bundle",
    className: "bg-violet-500/15 text-violet-300 border border-violet-400/25",
  },
};

/**
 * Static backdrop drawn behind the vector stand-in: a faint technical grid
 * plus a soft contact shadow that grounds the object.
 *
 * Extracted to its own component so the SVG/gradient elements are not
 * re-created on every parent render.
 */
function ArtworkBackdrop({
  gridId,
  shadowSize,
}: {
  gridId: string;
  shadowSize: "sm" | "lg";
}) {
  return (
    <>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full opacity-[0.05]">
        <defs>
          <pattern id={gridId} width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M 26 0 L 0 0 0 26" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${gridId})`} />
      </svg>

      <div
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 -translate-x-1/2 rounded-[50%] bg-slate-900/15 blur-xl",
          shadowSize === "lg" ? "bottom-[17%] h-3.5 w-[44%]" : "bottom-[15%] h-2.5 w-[40%]"
        )}
      />
    </>
  );
}

interface ProductArtworkProps {
  /** Photo path. Falls back to the vector render when absent. */
  category: string;
  slug?: string;
  alt: string;
  className?: string;
  /** `stage` adds the ambient glow + contact shadow used in the hero. */
  variant?: "card" | "stage";
  priority?: boolean;
}

/**
 * Renders a product photo, or a clean vector stand-in when none exists yet.
 *
 * PelekaPro has no product photography. Rather than shipping emoji, this
 * draws a lit product stage so the layout looks finished today — and swaps
 * to a real photo automatically once one is added to the product.
 */
interface ProductArtworkProps {
  /** Photo path, e.g. "/products/gan-65w.png". Falls back to the vector
   *  render when absent, so a missing image is never a broken image. */
  image?: string;
  category: string;
  /** Enables product-specific icon overrides (car mount, cable, bundles). */
  slug?: string;
  alt: string;
  className?: string;
  /** `stage` adds the ambient glow + contact shadow used in the hero. */
  variant?: "card" | "stage";
  priority?: boolean;
}

export function ProductArtwork({
  image,
  category,
  slug = "",
  alt,
  className,
  variant = "card",
  priority = false,
}: ProductArtworkProps) {
  const visual = getCategoryVisual(category);
  // Direct module-constant lookup rather than a function call: the React
  // Compiler rejects deriving a component from a call during render.
  const Icon =
    productIcons[slug] ?? categoryVisuals[category]?.icon ?? fallbackVisual.icon;

  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-zinc-100", className)}>
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-[1.06]"
        />
      </div>
    );
  }

  const gridId = `pa-grid-${slug || category}`;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-zinc-100",
        className
      )}
      role="img"
      aria-label={alt}
    >
      {/* Ambient accent wash */}
      <div
        aria-hidden="true"
        className={cn("absolute inset-0 bg-gradient-to-br to-transparent", visual.gradient)}
      />

      <ArtworkBackdrop gridId={gridId} shadowSize={variant === "stage" ? "lg" : "sm"} />

      <Icon
        aria-hidden="true"
        strokeWidth={1.25}
        className={cn(
          "relative transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-1",
          visual.accent,
          variant === "stage" ? "h-32 w-32 sm:h-40 sm:w-40" : "h-16 w-16 sm:h-20 sm:w-20"
        )}
      />
    </div>
  );
}
