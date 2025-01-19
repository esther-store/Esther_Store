import React, { useEffect, useContext } from "react";
import { getPromotions } from "../services/ManagePromotions/getPromotions.js";
import AuthenticationContext from "../context/authenticationContext.jsx";
import { useQuery } from "@tanstack/react-query";
import type { PromotionType } from "@/Types.js";

export function useGetPromotions({
  searchParams,
  setNumOfPromotions,
  setPromotions,
}) {

  const { auth } = useContext(AuthenticationContext);

  const {
    data,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["promotions", searchParams.toString(), auth.token],
    queryFn: () => getPromotions(searchParams.toString(), auth.token),
    staleTime: 1000 * 60 * 30
  });

  const promotions: PromotionType[] = data || [];

  //get promotions of store
  useEffect(() => {
    if (data) {
      setPromotions(data);
      setNumOfPromotions(data.count);
    }
  }, [data]);

  return { promotions, loading, setLoading: () => {} };
}
