import React, { useEffect } from "react";
import {getProducts} from '../services/getProducts'
import { useQuery } from "@tanstack/react-query";

export function useGetProducts({searchParams, setNumOfProducts, updateProductList}) {
    const { data, isLoading: loading, isError } = useQuery({
        queryKey: ["products", searchParams.toString(), updateProductList], // Include searchParams in the queryKey to refetch when it changes
        queryFn: () => getProducts(searchParams.toString()),
        staleTime: 1000 * 60 * 10
    });
    const products = data?.results || []
    const next = data?.next || ""
    const previous = data?.previous || ""
    
   // Update the number of products when data changes
   useEffect(() => {
    if (data) {
        setNumOfProducts(data.count);
    }
}, [data]);

    return ({products, loading, next, previous});
}

