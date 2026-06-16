import {
  ChefHat,
  Clock,
  Heart,
  Leaf,
  List,
  ShoppingCart,
  Utensils,
  type LucideIcon,
} from "lucide-react";

// Mappe les noms d'icônes (stockés en base / fixtures) vers les composants Lucide.
const ICONS: Record<string, LucideIcon> = {
  clock: Clock,
  heart: Heart,
  leaf: Leaf,
  list: List,
  "shopping-cart": ShoppingCart,
  "chef-hat": ChefHat,
  utensils: Utensils,
};

export function Icon({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) {
  const Cmp = name ? ICONS[name] : undefined;
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden />;
}
