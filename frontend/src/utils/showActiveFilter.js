export function showActiveFilter({name, value}){
    switch(name){
        case 'categoria': return "categoría"
        case 'ordering': return "ordenar"
        case 'promotion': return "promoción"
        case 'page': return `página ${value}`
        case 'search': return `buscar "${value}"`
        case 'recommended': return "recomendados"
        case 'is_active': return "No visibles"
    }
}