export type ProductIdType = number;
export type CategoryIdType = number;
export type PromotionIdType = number;

export type CategoryType = {
  readonly id: CategoryIdType;
  nombre: string;
  img: string;
  readonly cantidad_products: number;
  created_at: string;
  updated_at: string;
};
export type PromotionType = {
  readonly id: PromotionIdType;
  readonly cantidad_products: number;
  created_at: string;
  name: string;
  description?: string;
  discount_in_percent: number;
  img: string;
  active: boolean;
  is_special: boolean;
  updated_at: string;
};
export type ProductType = {
  readonly id: ProductIdType;
  product_name: string;
  categoria?: number;
  promotion?: number;
  puntuacion: number;
  cantidad_puntuaciones: number;
  product_description?: string;
  precio: number;
  price_with_discounts:number;
  is_active: boolean;
  recommended: boolean;
  in_stock: number;
  descuento: number;
  keywords: string;
  product_img1: string;
  product_img2?: string;
  product_img3?: string;
  updated_at: string;
  created_at: string;
};

export type CreateProductType = {
  readonly id?: ProductIdType;
  product_name: string;
  product_description?: string;
  precio: number;
  categoria?: CategoryIdType;
  promotion?: PromotionIdType;
  is_active?: boolean;
  recommended?: boolean;
  in_stock?: number;
  descuento?: number;
  product_img1: string;
  product_img2?: string;
  product_img3?: string;
};

export type ProductFormPropertiesType = {
  show: boolean;
  disabled: boolean;
  creatingMode: boolean;
  initialValues: CreateProductType;
};

export type FilterType = {
  name: string,
  value: string
}

export type CartProductType = {
  id: ProductIdType,
  img1: string,
  price: number,
  productName: string,
  quantity?: number,
  subtotal?: number
}

export type ContactInfoType = {
  phone1?: string 
  phone2?:string 
  whatsapp: string
  email1?: string 
  email2?: string 
  location?: string 
  facebook?: string 
  instagram?: string 
  telegram?: string 
}
