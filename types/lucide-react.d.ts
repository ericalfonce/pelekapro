declare module "lucide-react" {
  import { FC, SVGProps } from "react";

  export interface LucideProps extends SVGProps<SVGSVGElement> {
    size?: number | string;
    strokeWidth?: number | string;
    absoluteStrokeWidth?: boolean;
  }

  type Icon = FC<LucideProps>;

  export const ArrowRight: Icon;
  export const Check: Icon;
  export const ChevronRight: Icon;
  export const Clock: Icon;
  export const HeadphonesIcon: Icon;
  export const Headphones: Icon;
  export const Mail: Icon;
  export const MapPin: Icon;
  export const Menu: Icon;
  export const MessageCircle: Icon;
  export const Minus: Icon;
  export const Package: Icon;
  export const Phone: Icon;
  export const Plus: Icon;
  export const RotateCcw: Icon;
  export const Search: Icon;
  export const Shield: Icon;
  export const ShoppingBag: Icon;
  export const ShoppingCart: Icon;
  export const SlidersHorizontal: Icon;
  export const Star: Icon;
  export const Truck: Icon;
  export const Users: Icon;
  export const X: Icon;
  export const Zap: Icon;
  export const Loader2: Icon;
  export const Calendar: Icon;
  export const AlertCircle: Icon;
  export const CheckCircle: Icon;
  export const ChevronDown: Icon;
  export const ExternalLink: Icon;
  export const Globe: Icon;
  export const Home: Icon;
  export const Info: Icon;
  export const Trash2: Icon;
}
