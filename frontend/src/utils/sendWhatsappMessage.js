export function sendWhatsappMessage({phone, message}) {
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
}

export function prepareProductsCartToBeSentByWhatsapp({productsCart, total, deliveryInfo}){
    let message = "Pedido:\n"

    productsCart.forEach(product => {
        message += 
        `-----------------------------------\n${product.productName}\nID de Producto: ${product.id}\n${product.quantity} x $${product.price.toFixed(2)}\nSubtotal: $${product.subtotal.toFixed(2)}\n`
    })

    message += `-----------------------------------\nTotal: $${total}\n`
    message += `\n\nDetalles de Envío:\n`
    message += `-----------------------------------\nNombre: ${deliveryInfo.name}\n`
    message +=`\nTeléfono: ${deliveryInfo.phone}\n`
    message +=`\nEmail: ${deliveryInfo.email}\n`
    message += `\nDirección: ${deliveryInfo.address}`

    return message
}