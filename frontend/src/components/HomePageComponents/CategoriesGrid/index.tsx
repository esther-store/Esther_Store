import './index.css'
import { useGetCategories } from '@/hooks/useGetCategories'
import RetryQueryComponent from '@/components/RetryQueryComponent'
import { Link } from 'react-router-dom'

export function CategoriesGrid(){
    const {categories, loading, isError, refetch} = useGetCategories()
    return(
        <article className = "homepage-categories-grid-container">
            <header>
                <h1>Categorias</h1>
                <h3>Encuentra facilmente lo que buscas</h3>
            </header>
            <main className = "homepage-categories-grid"> 
                {categories.map(category => 
                <Link key = {category.id} to = {`/store?categoria=${category.id}`}>
                    <img src = {category.img}/>
                    <div>{category.nombre}</div>
                </Link>
                )}
            </main>
        </article>
    )
}