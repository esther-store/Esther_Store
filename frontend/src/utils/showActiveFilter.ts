import { orderingValues } from "@/constants";
import type { PromotionType, CategoryType } from "@/Types";

export function showActiveFilter({
  name,
  value,
  promotions,
  categories,
}: {
  name: string;
  value: string;
  promotions: PromotionType[];
  categories: CategoryType[];
}) {
  switch (name) {
    case "categoria":
      return categories.find(({id}) => id.toString() == value)?.nombre
    case "ordering":
      return orderingValues.find(({ code }) => code == value)?.name;
    case "promotion":
      return promotions.find(({id}) => id.toString() == value)?.name;
    case "page":
      return `Página ${value}`;
    case "search":
      return `Buscar por: ${value}`;
    case "recommended":
      return "Recomendados";
    case "is_active":
      return "No visibles";
  }
}
