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
        return data[0];
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
      throw new Error("Error al editar la info de contacto");
    }
  });
}
