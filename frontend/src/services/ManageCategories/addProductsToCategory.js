import {URL_MANAGE_CATEGORIES} from "@/settings"

export function addProductsToCategory({products, id, token}){
    return(
        fetch(`${URL_MANAGE_CATEGORIES}${id}/add_products_to_category/`,{
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({products:products})
        })
        .then(response => {
            if(response.status == 200){
                return response
            }
            else{
                throw new Error("Error")
            }
        })
    )
}