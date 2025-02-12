import type { PromotionType } from "@/Types"

export function getPromotionFormInitialValues(){
    return ({
          name: '',
          description: '',
          discount_in_percent: 0,
          img: null,
          active: true,
          is_special: false,
    })
}

export function createPromotionValues({promotion}:{promotion:PromotionType}){
    return ({
        id: promotion.id,
        name: promotion.name,
        description: promotion.description,
        discount_in_percent: promotion.discount_in_percent,
        img: promotion.img,
        active: promotion.active,
        is_special: promotion.is_special,
  })
}

export function validatePromotionValues({promotion}:{promotion:PromotionType}){
    if(promotion.name == null || promotion.name == ""){
        throw new Error("El nombre de la promoción es requerido")
    }
    if(promotion.discount_in_percent == null){
        throw new Error("El descuento de la promoción es requerido")
    }
    if(promotion.discount_in_percent < 0 || promotion.discount_in_percent > 100){
        throw new Error("El descuento de la promoción debe ser mayor que 0 y menor que 100")
    }
    return true
}