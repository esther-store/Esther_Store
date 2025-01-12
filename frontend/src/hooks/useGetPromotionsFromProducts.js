import React, { useState, useEffect } from "react";
import { getPromotions } from "../services/getPromotions";

export function useGetPromotions() {
    const [promotions, setPromotions] = useState([])
    const [loadingPromotions, setLoading] = useState(false);

    //get promotions
    useEffect(() => {
        setLoading(true);
        getPromotions()
        .then((data) => {
          setPromotions(data);
          setLoading(false);
        })
        .catch((error) => {})
      }, []);

    return ( {promotions, loadingPromotions} );
}