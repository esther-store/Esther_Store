export function isProductInfoValid({ values, creating = true }) {
    if (
      values.product_name == "" ||
      values.product_name == null ||
      values.product_name == undefined
    ) {
      throw new Error("Debes ingresar un nombre válido")
    }
    if (
      values.precio == "" ||
      values.precio == null ||
      values.precio == undefined
    ) {
      throw new Error("Debes ingresar un precio válido")
    }
    if (
      creating == true &&
      (values.product_img1 == "" ||
        values.product_img1 == null ||
        values.product_img1 == undefined)
    ) {
      throw new Error("Debes ingresar al menos la primera imagen")
    }
    return true;
  }