import { URL_STORE_GET_CATEGORIES } from "../settings";

export function getCategories() {
  return fetch(URL_STORE_GET_CATEGORIES)
    .then((response) => {
      if(response.status === 200) {
        return response.json()
      }
      else{
        throw new Error("Error getting categories")
      }
    })
}
