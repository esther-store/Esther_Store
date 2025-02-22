export function sendWhatsappMessage({phone, message}) {
    const whatsappUrl = `whatsapp://send?phone=${phone}&text=${encodeURI(message)}&app_absent=0`;
    const whatsappWebUrl = `https://web.whatsapp.com/send?phone=${phone}&text=${encodeURI(message)}`;

    try {
        window.open(whatsappUrl);
    } catch (error) {
        window.open(whatsappWebUrl);
    }
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