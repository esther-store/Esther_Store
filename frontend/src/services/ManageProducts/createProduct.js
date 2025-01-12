import {URL_MANAGE_PRODUCTS} from "../../settings"

export function createProduct({values, token}){
    let formData = new FormData()
    formData.append('product_name', values.product_name)
    formData.append('product_description', values.product_description)
    formData.append('precio', values.precio)
    formData.append('descuento', values.descuento)
    formData.append('is_active', values.is_active)
    formData.append('recommended', values.recommended)
    formData.append('in_stock', values.in_stock)
    
    if(values.categoria !== undefined && values.categoria !== null){
        formData.append('categoria', values.categoria)
    }
    if(values.promotion !== undefined && values.promotion !== null){
        formData.append('promotion', values.promotion)
    }
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
        fetch(URL_MANAGE_PRODUCTS,{
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
            },
            body:formData
        })
        .then(response => {
            if(response.status == 201){
                return response
            }
            else{
                throw new Error("Error al crear el producto")
            }
        })
    )
}