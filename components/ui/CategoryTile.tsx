import Link from "next/link";
import type { CategoryInfo } from "@/lib/data/categories";
import { cn } from "@/lib/utils";

interface CategoryTileProps {
  category: CategoryInfo;
  className?: string;
}

export function CategoryTile({ category, className }: CategoryTileProps) {
  return (
    <Link
      href={`/shop?category=${category.id}`}
      className={cn(
        "group block p-5 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        className
      )}
      style={{ backgroundColor: category.color }}
    >
      <div className="flex flex-col gap-3">
        <span className="text-3xl" role="img" aria-label={category.label}>
          {category.icon}
        </span>
        <div>
          <p className="font-display font-semibold text-brand-black text-sm leading-tight group-hover:text-brand-orange transition-colors">
            {category.label}
          </p>
          <p className="text-brand-gray text-xs font-body mt-0.5">
            {category.labelSwahili}
          </p>
        </div>
        <p className="text-brand-gray text-xs leading-snug hidden sm:block">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
