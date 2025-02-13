import {URL_MANAGE_PROMOTIONS} from "@/settings"

export function addProductsToPromotion({products,id, token}){
    return(
        fetch(`${URL_MANAGE_PROMOTIONS}${id}/add_products_to_promotion/`,{
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