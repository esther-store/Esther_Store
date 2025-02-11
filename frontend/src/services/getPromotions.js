import { URL_GET_PROMOTIONS } from "../settings";

export function getPromotions({searchParams = ""}) {
  return fetch(`${URL_GET_PROMOTIONS}?${searchParams}`)
  .then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Not Found");
    }
  })
  .catch(err => {throw new Error(err)})
}
