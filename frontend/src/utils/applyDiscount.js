export function applyDiscount({price, promotionDiscountInPercent, discount}){
    //descuento normal sin descuento por promocion
    if(discount > 0 && discount != null && promotionDiscountInPercent == null){
        return price - (price * discount/100)
    }
    //descuento por promocion sin descuento normal
    if(discount == 0 && promotionDiscountInPercent != null){
        return price - (price * promotionDiscountInPercent/100)
    }
    //descuento por promocion y descuento normal
    if(discount > 0 && discount != null && promotionDiscountInPercent != null){
        return price - (price * promotionDiscountInPercent/100) - (price * discount/100)
    }
    //sin descuento
    return price    
}