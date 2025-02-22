import {getProducts} from '../services/getProducts'
import { useQuery } from "@tanstack/react-query";
import {type ProductType} from '@/Types.ts'

export function useGetProducts({searchParams, updateProductList = false}) {
    const { data, isLoading: loading, isError, refetch } = useQuery({
        queryKey: ["products", searchParams?.toString(), updateProductList], // Include searchParams in the queryKey to refetch when it changes
        queryFn: () => getProducts(searchParams?.toString()),
        staleTime: 1000 * 60 * 5,
        retry: (failuresCount) => {
            if(failuresCount >= 2) return false
            return true
          },
    });
    const products: ProductType[] = data?.results || []
    const next: string = data?.next || ""
    const previous: string = data?.previous || ""
    const count: number = data?.count || 0

    return ({products, count, loading, next, previous, isError, refetch});
}

