import React, { useState, useEffect,useContext } from "react";
import { getPromotions } from "../services/ManagePromotions/getPromotions";
import AuthenticationContext from '../context/authenticationContext.jsx'

export function useGetPromotions({searchParams, setNumOfPromotions,setPromotions}) {
    const {auth} = useContext(AuthenticationContext)
    const [loading, setLoading] = useState(false);
    const [promotions, changePromotions] = useState([])
    //get promotions of store
    useEffect(() => {
        setLoading(true);
        getPromotions(searchParams,auth.token)
        .then((data) => {
            setPromotions(data);
            changePromotions(data);
            setNumOfPromotions(data.count);
            setLoading(false);
        })
        .catch(() => {
            setLoading(false);
            setNumOfPromotions(0)   
        });
    }, [searchParams]);

    return({promotions,loading,setLoading})

}


