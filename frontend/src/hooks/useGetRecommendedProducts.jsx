import getRecommendedProducts from "../services/getRecommendedProducts";
import { useQuery } from "@tanstack/react-query";

export function useGetRecommendedProducts() {
  const {
    data,
    isLoading: loadingRecommendedProducts,
    isError,
  } = useQuery({
    queryKey: ["get-recommended-products"],
    queryFn: getRecommendedProducts,
    staleTime: 1000 * 60 * 10
  });

  const recommendedProducts = data?.results || []

  return {recommendedProducts, loadingRecommendedProducts}
}
