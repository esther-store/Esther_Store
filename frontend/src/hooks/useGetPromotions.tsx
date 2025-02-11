import type { PromotionType } from "@/Types";
import { getPromotions } from "../services/getPromotions";
import { useQuery } from "@tanstack/react-query";

export function useGetPromotions({searchParams = ""}:{searchParams?:string}) {
  
  const {
    data,
    isLoading: loadingPromotions,
    isError,
    refetch
  } = useQuery({
    queryKey: ["get-promotions", searchParams],
    queryFn:() => getPromotions({searchParams:searchParams}),
    staleTime: 1000 * 60 * 10,
  });
  const promotions: PromotionType[] = data || []

  return { promotions, loadingPromotions, isError, refetch };
}
