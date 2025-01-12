import { URL_MANAGEMENT_USERS } from "../../settings"

export function getUsers(filters='',token) {
  return fetch(`${URL_MANAGEMENT_USERS}?${filters}`,{
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
