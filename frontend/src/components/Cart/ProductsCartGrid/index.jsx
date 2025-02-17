import ProductQuantityController from "../ProductQuantityController";
import CartContext from "@/context/cartContext";
import {TrashIcon} from '@/icons/TrashIcon'
import React, { useContext } from "react";
import './index.css'

const ProductsCartGrid = React.memo(function ProductsCartGrid() {
    const {
        productsCart,
        addProductToCart,
        restProductFromCart,
        deleteProductFromCart,
      } = useContext(CartContext);
    return ( 
        <>
            <section className = "products-cart-grid">
                {productsCart.map(product => 
                <ProductsCartGridCard
                    key = {product.id}
                    product = {product}
                    deleteProductFromCart = {deleteProductFromCart}
                    addProductToCart = {addProductToCart}
                    restProductFromCart = {restProductFromCart}
                />
            )}
            </section>
        </>
     );
})

const ProductsCartGridCard = React.memo(
    function ProductsCartGridCard({product, deleteProductFromCart, addProductToCart, restProductFromCart}){
        return(
            <article key = {product.id} className = "products-cart-grid-card">
                    <button className = "remove-product-from-cart-grid-view" onClick = {() => deleteProductFromCart(product.id)}>
                        <TrashIcon color = "#000"/>
                    </button>
                    <header>
                        <img alt = {product.productName} src = {product.img1}/>
                    </header>
                    <section>
                        <p>{product.productName}</p>
                        <div>${product?.price?.toFixed(2)}</div>
                        <h4>${product?.subtotal?.toFixed(2)}</h4>
                    </section>
                    <footer>
                        <ProductQuantityController item = {product} quantity={product.quantity} add = {addProductToCart} rest={restProductFromCart}/>
                    </footer>
                </article>
        )
    }
)

export default ProductsCartGrid;