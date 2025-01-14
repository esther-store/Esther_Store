import CartContext from "../../../context/cartContext";
import React, { useContext } from "react";
import ProductQuantityController from "../../Cart/ProductQuantityController";
import { applyDiscount } from "../../../utils/applyDiscount";

function CartButtton(
  productCar
) {
  const {
    productsCart,
    addProductToCart,
    checkProductInCart,
    restProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="add-to-cart-section">
      {checkProductInCart(productCar.id) ? (
        <ProductQuantityController
          item={{
            id: productCar.id,
            productName: productCar.product_name,
            price: applyDiscount({
              price: productCar.precio,
              discount: productCar.descuento,
              promotionDiscountInPercent: productCar.promotion_full_info?.discount_in_percent,
            }),
            img1: productCar.product_img1,
          }}
          add={addProductToCart}
          rest={restProductFromCart}
          quantity={productsCart.find((product) => product.id == productCar.id)?.quantity}
        />
      ) : (
        productCar.id?
        <button
          className="add-to-cart-button"
          onClick={() =>
            addProductToCart({
              id: productCar.id,
              productName: productCar.product_name,
              price: applyDiscount({
                price: productCar.precio,
                discount: productCar.descuento,
                promotionDiscountInPercent: productCar.promotion_full_info?.discount_in_percent,
              }),
              img1: productCar.product_img1,
            })
          }
        >
          <i className="pi pi-cart-plus"></i>
          <span>Agregar al carrito</span>
        </button>
        :
        <button className="add-to-cart-button"></button>
      )}
    </div>
  );
}

export default CartButtton;
