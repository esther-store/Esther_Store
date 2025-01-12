export function createProductInitialValues({product}){
  return {
    id:product.id,
    product_name: product.product_name,
    product_description: product.product_description,
    precio: product.precio,
    categoria: product.categoria,
    promotion: product.promotion,
    is_active: product.is_active,
    recommended: product.recommended,
    in_stock: product.in_stock,
    descuento: product.descuento,
    product_img1: product.product_img1,
    product_img2: product.product_img2,
    product_img3: product.product_img3,
  }
}

export function getInitialValues(){
    return {
        id:null,
        product_name: "",
        product_description: "",
        precio: 0,
        categoria: null,
        promotion:null,
        is_active: true,
        recommended:false,
        in_stock: 0,
        descuento: 0,
        product_img1: null,
        product_img2: null,
        product_img3: null,
      }
}

export function normalizeProductFormInfo({e, categorySelected, promotionSelected, activeStatusChecked, recommendedCheck}){
  return {
        product_name: e.target["name"].value,
        product_description: e.target["description"].value,
        precio: e.target["price"].value,
        categoria: categorySelected.code,
        promotion: promotionSelected.code,
        is_active: activeStatusChecked,
        recommended:recommendedCheck,
        in_stock: e.target["stock"].value,
        descuento: e.target["discount"].value,
        product_img1: e.target["img1"].files[0],
        product_img2: e.target["img2"].files[0],
        product_img3: e.target["img3"].files[0],
      }
}