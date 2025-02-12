import { useQuery } from "@tanstack/react-query";
import { getPromotions } from "@/services/ManagePromotions/getPromotions.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import React, { useContext } from "react";
import type { PromotionType } from "@/Types.js";

export function useGetPromotionsToManage() {
  const { auth } = useContext<any>(AuthenticationContext);
  const {
    data,
    isLoading: loading,
    isError: errorGettingPromotions,
    refetch: refetchPromotions,
  } = useQuery({
    queryKey: ["promotions-to-manage", auth?.token],
    queryFn: () => getPromotions({token: auth?.token}),
    staleTime: 1000 * 60 * 10,
    retry: (failuresCount) => {
      if (failuresCount >= 2) return false;
      return true;
    },
  });

  const promotions: PromotionType[] = data || [];
  return ({ promotions, loading, errorGettingPromotions, refetchPromotions });
}
