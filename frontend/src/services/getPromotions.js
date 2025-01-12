import { URL_GET_PROMOTIONS } from "../settings";

export function getPromotions() {
  return fetch(`${URL_GET_PROMOTIONS}`).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  });
}
