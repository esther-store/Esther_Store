import { unstable_batchedUpdates } from "react-dom";
import "./index.css";
import InOffertIcon from "../../assets/in-offert-icon.svg";
import { applyDiscount } from "../../utils/applyDiscount";
import CartContext from "../../context/cartContext";
import React, { useContext } from "react";
import ProductQuantityController from "../Cart/ProductQuantityController";

function ProductCard({
  id,
  isInStore = false,
  product_name,
  precio,
  descuento,
  promotion,
  promotion_full_info,
  product_img1,
  onClick,
  location,
}) {
  const {
    productsCart,
    addProductToCart,
    checkProductInCart,
    restProductFromCart,
  } = useContext(CartContext);
  return (
    <section
      className={
        location == "home-mobile"
          ? "product-card product-card-mobile-location"
          : "product-card"
      }
      id={id}
    >
      <div className={
        location == "home-mobile"
          ? "img-container img-container-mobile"
          : "img-container"
      } onClick={onClick}>
        <img loading="lazy" src={product_img1} alt={product_name} />
      </div>
      {promotion ? (
        <abbr title="En oferta">
          <img className="in-offert-icon" src={InOffertIcon.src} alt="En Oferta" />
        </abbr>
      ) : null}
      <div className={
        location == "home-mobile"
          ? "name-and-price-container p-details-mobile"
          : "name-and-price-container"
      } onClick={onClick}>
        <p title={product_name} className="product-card-name">{product_name}</p>
        {promotion || descuento > 0 ? (
          <p className="card-text price price-with-discount">
            <span className="new-price">
              $
              {applyDiscount({
                price: precio,
                promotion: promotion_full_info,
                discount: descuento,
              }).toFixed(2)}
            </span>
            <span className="original-price">${precio.toFixed(2)}</span>
          </p>
        ) : (
          <p className="card-text price">${precio.toFixed(2)}</p>
        )}
      </div>
      {isInStore ? (
        <div className="add-to-cart-section">
          {checkProductInCart(id) ? (
            <ProductQuantityController
              item={{
                id: id,
                productName: product_name,
                price: applyDiscount({
                  price: precio,
                  promotion: promotion_full_info,
                  discount: descuento,
                }),
                img1: product_img1,
              }}
              add={addProductToCart}
              rest={restProductFromCart}
              quantity={
                productsCart.find((product) => product.id == id)?.quantity
              }
            />
          ) : (
            <button
              className="add-to-cart-button"
              onClick={() =>
                addProductToCart({
                  id: id,
                  productName: product_name,
                  price: applyDiscount({
                    price: precio,
                    promotion: promotion_full_info,
                    discount: descuento,
                  }),
                  img1: product_img1,
                })
              }
            >
              <i className="pi pi-cart-plus"></i>
              <span>Agregar al carrito</span>
            </button>
          )}
        </div>
      ) : null}
    </section>
  );
}

export default ProductCard;
