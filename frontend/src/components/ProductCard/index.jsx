import "./index.css";
import InOffertIcon from "@/assets/icons/in-offert-icon.svg";
import React from "react";
import AddToCartButton from "../Cart/AddToCartButton";
import ProductPrice from "./ProductPrice";

const ProductCard = React.memo(function ProductCard({
  product,
  onClick
}) {
  return (
    <section
      className={
        location == "home-mobile"
          ? "product-card product-card-mobile-location"
          : "product-card"
      }
      id={product.id}
    >
      <div className={
        location == "home-mobile"
          ? "img-container img-container-mobile"
          : "img-container"
      } onClick={onClick}>
        <img src={product.product_img1} alt={product.product_name} />
      </div>
      {product.promotion ? (
        <abbr title="En oferta">
          <img className="in-offert-icon" src={InOffertIcon.src} alt="En Oferta" />
        </abbr>
      ) : null}
      <div className={
        location == "home-mobile"
          ? "name-and-price-container p-details-mobile"
          : "name-and-price-container"
      } onClick={onClick}>
        <p title={product.product_name} className="product-card-name">{product.product_name}</p>
        <ProductPrice precio={product.precio} price_with_discounts={product.price_with_discounts}/>
      </div>
      <AddToCartButton product = {product}/>
    </section>
  );
})

export default ProductCard;
