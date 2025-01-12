import React, { useState, useEffect } from "react";
import { getCategories } from "../services/getCategories";

export function useGetCategories() {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false);


    //get categories
    useEffect(() => {
        setLoading(true);
        getCategories().then((data) => {
          setCategories(data);
          setLoading(false);
        });
      }, []);

    return ( {categories, loading} );
}

