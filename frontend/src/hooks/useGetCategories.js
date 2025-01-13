import React, { useState, useEffect } from "react";
import { getCategories } from "../services/getCategories";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  const { data, isLoading: loading } = useQuery({
    queryKey: ["cateogories"],
    queryFn: () => getCategories(),
    staleTime: 1000 * 60 * 30
  });
  const categories = data || [];
  return { categories, loading };
}
