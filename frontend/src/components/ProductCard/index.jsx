import "./index.css";
import InOffertIcon from "@/assets/icons/in-offert-icon.svg";
import React from "react";
import AddToCartButton from "../Cart/AddToCartButton";

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
        {product.price_with_discounts? (
          <p className="card-text price price-with-discount">
            <span className="new-price">
              ${product.price_with_discounts.toFixed(2)}
            </span>
            <span className="original-price">${product.precio.toFixed(2)}</span>
          </p>
        ) : (
          <p className="card-text price">${product.precio.toFixed(2)}</p>
        )}
      </div>
      <AddToCartButton product = {product}/>
    </section>
  );
})

export default ProductCard;
