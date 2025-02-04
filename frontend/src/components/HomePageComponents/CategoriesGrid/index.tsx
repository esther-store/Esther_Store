import './index.css'
import { useGetCategories } from '@/hooks/useGetCategories'
import RetryQueryComponent from '@/components/RetryQueryComponent'
import { Link } from 'react-router-dom'

export function CategoriesGrid(){
    const {categories, loading, isError, refetch} = useGetCategories()
    return(
        <article className = "homepage-categories-grid-container">
            <main className = "homepage-categories-grid">
                {categories.map(category => 
                <Link to = {`/store?categoria=${category.id}`}>
                    <img src = {category.img}/>
                </Link>
                )}
            </main>
        </article>
    )
}