import {USER_PROFILE_URL} from '../../settings'

export function getUserProfile(token) {
  return fetch(USER_PROFILE_URL, {
    method: "GET",
    headers: { 
        Authorization: `Token ${token}`, 
        "Content-Type": "application/json" 
    },
  })
  .then(res => {
    if(res.status != 200){
        return null
    }
    else{
        return res.json()
        .then(data => {return data})
    }
  })
}
