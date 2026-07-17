import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeMap = {
  sm: { price: "text-base", original: "text-xs", currency: "text-xs" },
  md: { price: "text-xl", original: "text-sm", currency: "text-sm" },
  lg: { price: "text-2xl", original: "text-base", currency: "text-sm" },
  xl: { price: "text-4xl", original: "text-lg", currency: "text-base" },
};

export function PriceTag({
  price,
  originalPrice,
  size = "md",
  className,
}: PriceTagProps) {
  const s = sizeMap[size];
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  return (
    <div className={cn("flex items-baseline gap-2 flex-wrap", className)}>
      {/* Current price — TSh in orange, number in black */}
      <span
        className={cn("font-display font-bold text-brand-black leading-none", s.price)}
      >
        <span className={cn("price-tsh mr-0.5", s.currency)}>TSh</span>
        {formatPrice(price)}
      </span>

      {originalPrice && (
        <>
          <span
            className={cn(
              "text-brand-gray line-through font-body leading-none",
              s.original
            )}
          >
            {formatPrice(originalPrice)}
          </span>
          {discount && (
            <span className="deal-badge text-[0.6rem]">−{discount}%</span>
          )}
        </>
      )}
    </div>
  );
}
