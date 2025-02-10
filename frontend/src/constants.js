export const orderingValues = [
    {code: "", name : "Ordenar"},
    {code: "precio", name : "- Precio"},
    {code: "-precio", name : "+ Precio"},
    {code: "-updated_at", name : "Recientes"},
    {code: "updated_at", name : "Antiguos"},
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
