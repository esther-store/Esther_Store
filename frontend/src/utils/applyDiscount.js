export function applyDiscount({price, promotionDiscountInPercent, discount}){
    //handle negative price
    if(price <= 0) return 0

    let priceWithDiscount = price

    //descuento normal
    if(discount > 0 && discount <= 100){
        priceWithDiscount -= (price * discount/100)
    }

    //descuento por promocion 
    if(promotionDiscountInPercent > 0 && promotionDiscountInPercent <= 100){
        priceWithDiscount -= (price * promotionDiscountInPercent/100)
    }

    return priceWithDiscount    
}