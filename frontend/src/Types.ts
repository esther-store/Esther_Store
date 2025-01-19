type CategoryType = {
    id: number,
    nombre: string,
    img: string,
    created_at: string,
    updated_at: string
}
type PromotionType = {
    id: number,
    cantidad_products: number,
    created_at: string,
    name: string,
    description?: string,
    discount_in_percent: number,
    img: string,
    active: boolean,
    is_special: boolean,
    updated_at: string
}
type ProductType = {
    id: number,
    product_name: string,
    categoria?: number,
    promotion?: number,
    categoria_full_info: CategoryType,
    promotion_full_info: ProductType,
    puntuacion: number,
    cantidad_puntuaciones: number,
    product_description?: string,
    precio: number,
    is_active: boolean,
    recommended: boolean,
    in_stock: number,
    descuento: number,
    product_img1: string,
    product_img2?: string,
    product_img3?: string,
    updated_at: string,
    created_at: string
}