export const orderingValues = [
    {code: "", name : "No Ordenar"},
    {code: "precio", name : "Menor Precio"},
    {code: "-precio", name : "Mayor Precio"},
    {code: "-updated_at", name : "Más Recientes"},
    {code: "updated_at", name : "Más Antiguos"},
    {code: "product_name", name : "[A-Z]"},
    {code: "-product_name", name : "[Z-A]"},
]

export const pageLoaderId = "page-loader"

export const pagesTitle = {
    home: 'Esther Store - Home',
    store: 'Esther Store - Products',
    productDetail: (productName) => `Esther Store - ${productName}`,
    contact: 'Esther Store - Contact'
}

export const productsToManagePageSize = 14