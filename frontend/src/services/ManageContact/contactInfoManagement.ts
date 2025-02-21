import { MANAGE_CONTACT_INFO_URL } from "@/settings";

export function getContactInfo({ token }) {
  return fetch(MANAGE_CONTACT_INFO_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
  }).then((response) => {
    if (response.status == 200) {
      return response.json().then((data) => {
        return data[0]? data[0]: {};
      });
    } else {
      throw new Error("Error al obtener la info de contacto");
    }
  });
}

export function editContactInfo({ id, info, token }) {
  return fetch(`${MANAGE_CONTACT_INFO_URL}${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(info),
  }).then((res) => {
    if (res.status == 200) {
      return res.json().then((data) => {
        return data;
      });
    } else {
      return res.json().then((data) => {
        if(data?.whatsapp == 'Country code must be included'){
          throw new Error("El # de Whatsapp debe incluir el código de país")
        }else if(data?.whatsapp == "Number can't include spaces"){
          throw new Error("El # de Whatsapp no puede tener espacios en blanco")
        }else if(data?.whatsapp){
          throw new Error(data?.whatsapp)
        }else{
          throw new Error("Error al editar la info de contacto");
        }
      });
    }
  });
}
