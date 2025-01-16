import {URL_MANAGE_PRODUCTS} from "../../settings"

export function deleteProducts({products, token = ""}){
    console.log(products)
    return(
        fetch(URL_MANAGE_PRODUCTS,{
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({products_to_delete:products})
        })
        .then(response => {
            if(response.status == 200){
                return response
            }
            else{
                throw new Error("Error en la operación")
            }
        })
    )
}