import { getCategories } from "../services/getCategories";
import { useQuery } from "@tanstack/react-query";
import type { CategoryType } from "@/Types";

export function useGetCategories() {
  const { data, isLoading: loading, isError, refetch } = useQuery({
    queryKey: ["cateogories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 30,
    retry: (failuresCount) => {
      if(failuresCount >= 2) return false
      return true
    },
  });
  const categories:CategoryType[] = data || [];
  return { categories, loading, isError, refetch };
}
