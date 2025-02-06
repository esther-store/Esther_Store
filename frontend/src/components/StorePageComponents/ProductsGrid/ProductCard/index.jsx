import "./index.css";
import React from "react";
import AddToCartButton from "@/components/Cart/AddToCartButton";
import ProductPrice from "./ProductPrice";

const ProductCard = React.memo(function ProductCard({
  toastRef,
  product,
  onClick = () => {},
  showAddToCartButton = true,
}) {
  return (
    <article className="product-card">
      <header className="img-container" onClick={onClick}>
        <img src={product.product_img1} alt={product.product_name} />
      </header>
      <section className="name-and-price-container" onClick={onClick}>
        <h1 className="product-card-name"> {product.product_name} </h1>
        <div className="product-card-punctuation"></div>
        <ProductPrice
          precio={product.precio}
          price_with_discounts={product.price_with_discounts}
        />
      </section>
      <div className="add-to-cart-button-container">
        {showAddToCartButton === true ? (
          <AddToCartButton product={product} toastRef={toastRef} />
        ) : null}
      </div>
    </article>
  );
});

export default ProductCard;
