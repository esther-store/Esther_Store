import { URL_MANAGEMENT_USERS } from "../../settings";

export function addUsers({info,token
}) {
  return fetch(URL_MANAGEMENT_USERS, {
    method: "POST",
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
        if(responseData.username){
          throw new Error(responseData.username);
        }
        if(responseData.password){
          throw new Error(responseData.password);
        }
        else{
          throw new Error(responseData);
        }
      });

    }
  });
}
