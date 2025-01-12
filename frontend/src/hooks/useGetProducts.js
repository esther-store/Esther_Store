import React, { useState, useEffect } from "react";
import {getProducts} from '../services/getProducts'

export function useGetProducts({searchParams, setNumOfProducts,updateProductList}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [next, setNext] = useState("")
    const [previous, setPrevious] = useState("")
    
    //get products of store
    useEffect(() => {
        setLoading(true);
        getProducts(searchParams)
        .then((data) => {
            setProducts(data.results);
            setNext(data.next);
            setPrevious(data.previous);
            setNumOfProducts(data.count)
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            setNumOfProducts(0)
        });
    }, [searchParams,updateProductList]);

    return ({products,loading,next,previous});
}

