import { URL_GET_PRODUCTS_PROMOTION } from "../../settings"

export function getProductsOfert(id,page=1,token) {
  return fetch(`${URL_GET_PRODUCTS_PROMOTION}${id}&page=${page}`,{
    method: "GET",
    headers: {
      'Content-Type': "application/json",
      //'Authorization': `Token ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}