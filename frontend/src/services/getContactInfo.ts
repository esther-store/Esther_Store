import {CONTACT_INFO_URL} from '@/settings'

export function getContactInfo(){
    return fetch(CONTACT_INFO_URL, {
        method: "GET",
        headers: {
            'Content-Type': "application/json",
        }
    })
    .then(response => {
        if(response.status == 200){
            return response.json()
            .then(data => {
                return data[0]? data[0]: {}
            })
        }else{
            throw new Error('Error al obtener la info de contacto')
        }
    })
    
}