import {URL_ADD_PRODUCTS_PROMOTION} from "../../settings"

export function addProductsToPromotion({products,id, token}){
    return(
        fetch(`${URL_ADD_PRODUCTS_PROMOTION}${id}/add_products_to_promotion/`,{
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