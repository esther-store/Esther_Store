import {URL_MANAGE_PRODUCTS} from "../../settings"

export function updateProduct({id, values, token}){
    let formData = new FormData()
    formData.append('product_name', values.product_name)
    formData.append('product_description', values.product_description)
    formData.append('precio', values.precio)
    formData.append('descuento', values.descuento)
    formData.append('in_stock', values.in_stock)
    formData.append('is_active', values.is_active) 
    formData.append('recommended', values.recommended) 
    formData.append('categoria', values.categoria)
    formData.append('promotion', values.promotion)

    if(values.product_img1 !== undefined && values.product_img1 !== null){
        formData.append('product_img1', values.product_img1)
    }
    if(values.product_img2 !== undefined && values.product_img2 !== null){
        formData.append('product_img2', values.product_img2)
    }
    if(values.product_img3 !== undefined && values.product_img3 !== null){
        formData.append('product_img3', values.product_img3)
    }

    return(
        fetch(`${URL_MANAGE_PRODUCTS}${id}/`,{
            method: 'PUT',
            headers: {
                Authorization: `Token ${token}`,
            },
            body:formData
        })
        .then(response => {
            if(response.status == 200){
                return response
            }
            else{
                response.json()
                .then(data => {
                })
                throw new Error("Errror al editar el producto")
            }
        })
    )
}