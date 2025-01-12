import { URL_MANAGE_CATEGORIES } from "../../settings"

export function createCategory({name, img, token}){
    let formData = new FormData();
    formData.append('nombre', name);
    img !== undefined ? formData.append('img', img):null
    return(
        fetch(URL_MANAGE_CATEGORIES,{
            method: 'POST',
            headers: {
                Authorization: `Token ${token}`,
            },
            body:formData
        })
        .then(response => {
            if(response.status == 201){
                return response.json()
            }
            else{
                return response.json()
                .then(res => {
                    if (res["nombre"]){
                        throw new Error("Ya existe una categoría con ese nombre")
                    }
                    if (res["img"]){
                        throw new Error("El formato de imagen no es correcto")
                    }
                    else{
                        throw new Error("Error al crear la categoría")
                    }
                })
            }
        })
    )
}