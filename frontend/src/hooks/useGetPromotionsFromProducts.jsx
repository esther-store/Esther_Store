import { getPromotions } from "../services/getPromotions";
import { useQuery } from "@tanstack/react-query";

export function useGetPromotions() {
  const {
    data,
    isLoading: loadingPromotions,
    isError,
  } = useQuery({
    queryKey: ["get-promotions"],
    queryFn:getPromotions,
    staleTime: 1000 * 60 * 30,
  });
  const promotions = data || []

  return { promotions, loadingPromotions };
}
