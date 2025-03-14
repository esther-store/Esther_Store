import { URL_MANAGE_PROMOTIONS } from "@/settings"

export function getPromotions({token}) {
  return fetch(`${URL_MANAGE_PROMOTIONS}`,{
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
