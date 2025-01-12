import React, { useState, useEffect } from "react";
import { getContactInfo } from "../services/ManageContact/contact_info_management";

export function useGetContactInfo() {
    const [contactInfo, setContactInfo] = useState(null)

    useEffect(() => {
        getContactInfo()
        .then(data => {
            setContactInfo(data)
        })
        .catch(err => {})
    },[])

    return ( {contactInfo} );
}

