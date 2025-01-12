import {URL_DELETE_PRODUCTS_PROMOTION} from "../../settings"

export function deleteProductsToPromotion({products,id, token}){
    return(
        fetch(`${URL_DELETE_PRODUCTS_PROMOTION}${id}/remove_products_from_promotion/`,{
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

