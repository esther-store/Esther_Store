import {URL_GET_PRODUCTS} from "../settings"

export default function getLastProducts(){
  return fetch(`${URL_GET_PRODUCTS}?ordering=-updated_at`)
  .then(res => res.json())
  .then(data => {return data})
}
