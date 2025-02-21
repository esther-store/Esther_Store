import { URL_MANAGE_PROMOTIONS } from "@/settings";

export function createPromotion({
  name,
  description,
  discount_in_percent,
  img,
  active,
  is_special,
  token,
}) {
  let formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("discount_in_percent", parseFloat(discount_in_percent).toFixed(2));
  active !== undefined ? formData.append("active", active) : false;
  is_special !== undefined ? formData.append("is_special", is_special) : false;
  img !== undefined ? formData.append("img", img) : null;

  return fetch(URL_MANAGE_PROMOTIONS, {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
    },
    body: formData,
  }).then((response) => {
    if (response.status == 201) {
      return response.json();
    } else {
      return response.json().then((res) => {
        if (res["nombre"]) {
          throw new Error("Ya existe una oferta con ese nombre");
        }
        if (res["img"]) {
          throw new Error("El formato de imagen no es correcto");
        } if(res['message'] == 'Maximun number of special promotions reached'){
          throw new Error("Máximo de Promociones especiales alcanzado(4)");
        }
        else {
          throw new Error("Error al crear la oferta");
        }
      });
    }
  });
}
