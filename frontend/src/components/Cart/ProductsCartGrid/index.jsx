import ProductQuantityController from "../ProductQuantityController";
import CartContext from "../../../context/cartContext";
import TrashIcon from '../../../assets/trash-icon.svg'
import React, {useContext } from "react";
import './index.css'

function ProductsCartGrid() {
    const {
        productsCart,
        addProductToCart,
        restProductFromCart,
        deleteProductFromCart,
        calculateTotal
      } = useContext(CartContext);
    return ( 
        <>
            <section className = "products-cart-grid">
                {productsCart.map(product => <article key = {product.id} className = "products-cart-grid-card">
                    <button className = "remove-product-from-cart-grid-view" onClick = {() => deleteProductFromCart(product.id)}>
                        <img alt = "trash" src = {TrashIcon.src}/>
                    </button>
                    <header>
                        <img alt = {product.productName} src = {product.img1}/>
                    </header>
                    <section>
                        <p>{product.productName}</p>
                        <div>${product.price.toFixed(2)}</div>
                        <h4>${product.subtotal.toFixed(2)}</h4>
                    </section>
                    <footer>
                        <ProductQuantityController item = {product} quantity={product.quantity} add = {addProductToCart} rest={restProductFromCart}/>
                    </footer>
                </article>)}
            </section>
            <div className = "cart-grid-view-total">Total: ${calculateTotal().toFixed(2)}</div>
        </>
     );
}

export default ProductsCartGrid;