import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-orange text-white hover:bg-brand-deep active:scale-95 font-semibold",
  secondary:
    "bg-brand-black text-white hover:bg-brand-black/80 active:scale-95 font-semibold",
  outline:
    "border-2 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white active:scale-95 font-semibold",
  ghost:
    "text-brand-black hover:bg-brand-black/5 active:scale-95",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:scale-95 font-semibold",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded",
  md: "px-6 py-3 text-base rounded-lg",
  lg: "px-8 py-4 text-lg rounded-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-body",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
