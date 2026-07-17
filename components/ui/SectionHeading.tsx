import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "right";
  className?: string;
  titleClassName?: string;
  action?: React.ReactNode;
}

export function SectionHeading({
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  action,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        align === "right" && "items-end text-right",
        className
      )}
    >
      <div
        className={cn(
          "flex items-end justify-between gap-4",
          align === "right" && "flex-row-reverse"
        )}
      >
        <h2
          className={cn(
            "orange-rule font-display font-bold text-2xl md:text-3xl text-brand-black",
            titleClassName
          )}
        >
          {title}
        </h2>
        {action && <div className="flex-shrink-0 pb-1">{action}</div>}
      </div>
      {subtitle && (
        <p className="text-brand-gray text-sm md:text-base font-body">
          {subtitle}
        </p>
      )}
    </div>
  );
}
