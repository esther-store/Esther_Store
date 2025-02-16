import {URL_MANAGE_PRODUCTS} from "@/settings"

export function bulkRemoveProductsPromotion({products, token}){
    return(
        fetch(`${URL_MANAGE_PRODUCTS}quit_products_promotion/`,{
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