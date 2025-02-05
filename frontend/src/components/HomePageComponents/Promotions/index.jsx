import './index.css'
import { useGetPromotions } from '@/hooks/useGetPromotionsFromProducts'
import { useGetProducts } from '@/hooks/useGetProducts'
import ProductCard from '@/components/StorePageComponents/ProductsGrid/ProductCard'
import { useRef } from 'react'
import { Toast } from 'primereact/toast'

export function HomePagePromotions(){
    const toastRef = useRef()
    const {promotions, loadingPromotions} = useGetPromotions()
    const {products} = useGetProducts({searchParams:`promotion=${promotions[0].id}&page_size=3`})
    return(
        <article className = "homepage-promotions-section">
            <Toast ref = {toastRef} position="bottom-center"/>
            <h1>Promociones</h1>
            <section className = "cards-container">
                {products.map(product => <ProductCard key = {product.id} product = {product} toastRef = {toastRef} onClick = {() => {}}/>)}
            </section>
        </article>
    )
}