export function sendWhatsappMessage({phone, message}) {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

export function prepareProductsCartToBeSentByWhatsapp({productsCart, total, deliveryInfo}){
    let message = "*Gracias por realizar su pedido en Esther Store. Le responderemos en breve.*\n\n*Pedido:*\n"

    productsCart.forEach(product => {
        message += 
        `-----------------------------------\n${product.productName}\nID de Producto: ${product.id}\n${product.quantity} x $${product.price.toFixed(2)}\nSubtotal: $${product.subtotal.toFixed(2)}\n`
    })

    message += `-----------------------------------\nTotal: $${total}\n`
    message += `\n\n*Detalles de Envío:*\n`
    message += `-----------------------------------\n`
    message +=`Nombre: ${deliveryInfo.name}\n`
    message +=`Teléfono: ${deliveryInfo.phone}\n`
    message +=`Email: ${deliveryInfo.email}\n`
    message += `Dirección: ${deliveryInfo.address}`
    message += `\n\nNota: El costo del envío dependerá de la distancia.`

    return message
}