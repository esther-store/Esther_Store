import { URL_MANAGE_PRODUCTS } from "../../settings";

export function getProductsToManage({filters = "", token}) {
  return fetch(`${URL_MANAGE_PRODUCTS}?${filters}`, {
    method: "GET",
    headers: {
      'Content-Type': "application/json",
      'Authorization': `Token ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}
