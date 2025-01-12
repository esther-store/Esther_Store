import { URL_MANAGEMENT_USERS } from "../../settings";

export function updateUser({id,info,token
}) {
  return fetch(`${URL_MANAGEMENT_USERS}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(info),
  }).then((response) => {
    if (response.status === 201) {
      return response.json();
    } else {
      return response.json()
      .then((responseData) => {
        if(responseData.email) {
          throw new Error(responseData.email);
        }
        else if(responseData.username){
          throw new Error(responseData.username);
        }
        else if(responseData.password){
          throw new Error(responseData.password);
        }

      });

    }
  });
}
