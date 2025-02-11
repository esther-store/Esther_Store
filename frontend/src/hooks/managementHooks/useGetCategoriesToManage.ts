import { useQuery } from "@tanstack/react-query";
import { getCategoriesToManage } from "@/services/ManageCategories/getCategoriesToManage.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import React, { useContext } from "react";
import type { CategoryType } from "@/Types.js";

export function useGetCategoriesToManage() {
  const { auth } = useContext<any>(AuthenticationContext);
  const {
    data,
    isLoading: loading,
    isError: errorGettingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories-to-manage", auth?.token],
    queryFn: () => getCategoriesToManage({ token: auth?.token }),
    staleTime: 1000 * 60 * 10,
    retry: (failuresCount) => {
      if (failuresCount >= 2) return false;
      return true;
    },
  });

  const categories: CategoryType[] = data || [];
  return ({ categories, loading, errorGettingCategories, refetchCategories });
}
