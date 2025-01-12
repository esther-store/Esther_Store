import {URL_MANAGE_CATEGORIES} from "../../settings"

export function deleteCategories({categories, token = ""}){
    return(
        fetch(URL_MANAGE_CATEGORIES,{
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({categories_to_delete:categories})
        })
        .then(response => {
            if(response.status == 200){
                return response
            }
            else{
                throw new Error("Error deleting categories")
            }
        })
    )
}