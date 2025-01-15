import {getProducts} from '../services/getProducts'
import { useQuery } from "@tanstack/react-query";

export function useGetProducts({searchParams, updateProductList}) {
    const { data, isLoading: loading, isError, refetch } = useQuery({
        queryKey: ["products", searchParams.toString(), updateProductList], // Include searchParams in the queryKey to refetch when it changes
        queryFn: () => getProducts(searchParams.toString()),
        staleTime: 1000 * 60 * 10,
        retry: (failuresCount) => {
            if(failuresCount >= 2) return false
            return true
          },
    });
    const products = data?.results || []
    const next = data?.next || ""
    const previous = data?.previous || ""
    const count = data?.count || 0

    return ({products, count, loading, next, previous, isError, refetch});
}

