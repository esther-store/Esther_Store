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
      return categories.find(category => category.id.toString() == value)?.nombre
    case "ordering":
      return orderingValues.find(({ code, name }) => code == value)?.name;
    case "promotion":
      return "Promoción";
    case "page":
      return `Página ${value}`;
    case "search":
      return `Buscar "${value}"`;
    case "recommended":
      return "Recomendados";
    case "is_active":
      return "No visibles";
  }
}
