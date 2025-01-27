import { URL_MANAGE_CATEGORIES } from "@/settings";

export function getCategoriesToManage({token}) {
  return fetch(URL_MANAGE_CATEGORIES, {
    method: "GET",
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    }
  })
    .then((response) => {
      if(response.status === 200) {
        return response.json()
      }
      else{
        throw new Error("Error getting categories")
      }
    })
}
