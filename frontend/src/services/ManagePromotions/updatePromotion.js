import { URL_MANAGE_PROMOTIONS } from "../../settings"

export function updatePromotion({id,name,description,discount_in_percent, img,active,is_special,token}){
    let formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('discount_in_percent', discount_in_percent);
    formData.append('active', active);
    formData.append('is_special', is_special);
    img !== undefined ? formData.append('img', img):null
    return(
        fetch(`${URL_MANAGE_PROMOTIONS}${id}/`,{
            method: 'PUT',
            headers: {
                Authorization: `Token ${token}`,
            },
            body:formData
        })
        .then(response => {
            if(response.status == 200){
                return response.json()
            }
            else{
                return response.json()
                .then(res => {
                    if (res["nombre"]){
                        throw new Error("Ya existe una oferta con ese nombre")
                    }
                    if (res["img"]){
                        throw new Error("El formato de imagen no es correcto")
                    }
                    else{
                        throw new Error("Error al editar la oferta")
                    }
                })
            }
        })
    )
}