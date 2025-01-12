import {URL_GET_PRODUCTS} from "../settings"

export default function getRecommendedProducts(){
  return fetch(`${URL_GET_PRODUCTS}?recommended=true`)
  .then(res => res.json())
  .then(data => {return data})
}
