import {URL_MANAGEMENT_USERS} from '../../settings.js'

export function changePassword({newPassword,user_id, token}){
    return fetch(`${URL_MANAGEMENT_USERS}${user_id}/change_password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "Authorization":`Token ${token}`
        },
        body: JSON.stringify({new_password: newPassword})
    })
    .then(res => {
        if(res.status == 200){ // hay que comprobar data.status == 200
            return "Password change successfuly"
        }
        else{
            return "Password Error"
        }
    })
    
}