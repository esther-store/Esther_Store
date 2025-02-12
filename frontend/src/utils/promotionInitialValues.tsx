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
        name: promotion.name,
        description: promotion.description,
        discount_in_percent: promotion.discount_in_percent,
        img: promotion.img,
        active: promotion.active,
        is_special: promotion.is_special,
  })
}

export function validatePromotionValues({promotion}:{promotion:PromotionType}){
    return true
}