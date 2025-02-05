import type { PromotionType } from "@/Types";
import { getPromotions } from "../services/getPromotions";
import { useQuery } from "@tanstack/react-query";

export function useGetPromotions() {
  const {
    data,
    isLoading: loadingPromotions,
    isError,
    refetch
  } = useQuery({
    queryKey: ["get-promotions"],
    queryFn:getPromotions,
    staleTime: 1000 * 60 * 10,
  });
  const promotions: PromotionType[] = data || []

  return { promotions, loadingPromotions, isError, refetch };
}
