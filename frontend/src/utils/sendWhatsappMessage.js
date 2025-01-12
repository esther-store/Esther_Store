export function sendWhatsappMessage({phone, message}){
    window.open(`whatsapp://send?phone=${phone}&text=${encodeURI(message)}&app_absent=0`)
}

export function prepareProductsCartToBeSentByWhatsapp({productsCart, total, deliveryInfo}){
    let message = "Pedido:\n"

    productsCart.forEach(product => {
        message += 
        `-----------------------------------\n${product.productName}\n${product.quantity} x $${product.price.toFixed(2)}\nSubtotal: $${product.subtotal.toFixed(2)}\n`
    })

    message += `-----------------------------------\nTotal: $${total}\n`
    message += `\n\nDetalles de Envío:\n`
    message += `-----------------------------------\nNombre: ${deliveryInfo.name}\n`
    message +=`\nTeléfono: ${deliveryInfo.phone}\n`
    message += `\nDirección: ${deliveryInfo.address}`

    return message
}