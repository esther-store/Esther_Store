export function applyDiscount({price, promotion, discount}){
    //descuento normal sin descuento por promocion
    if(discount > 0 && discount != null && promotion == null){
        return price - (price * discount/100)
    }
    //descuento por promocion sin descuento normal
    if(discount == 0 && promotion != null){
        return price - (price * promotion.discount_in_percent/100)
    }
    //descuento por promocion y descuento normal
    if(discount > 0 && discount != null && promotion != null){
        return price - (price * promotion.discount_in_percent/100) - (price * discount/100)
    }
    //sin descuento
    return price    
}