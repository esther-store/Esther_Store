import CartContext from "@/context/cartContext";
import React, { useContext } from "react";
import ProductQuantityController from "../ProductQuantityController";

const AddToCartButton = React.memo(function AddToCartButton({product}){
  const {
    productsCart,
    addProductToCart,
    checkProductInCart,
    restProductFromCart,
  } = useContext(CartContext);

  return (
    <div className="add-to-cart-section">
      {checkProductInCart(product.id) ? (
        <ProductQuantityController
          item={{
            id: product.id,
            productName: product.product_name,
            price: product.price_with_discounts || product.precio,
            img1: product.product_img1,
          }}
          add={addProductToCart}
          rest={restProductFromCart}
          quantity={productsCart.find((prod) => prod.id == product.id)?.quantity}
        />
      ) : (
        <button
          className="add-to-cart-button"
          onClick={() =>
            addProductToCart({
              id: product.id,
              productName: product.product_name,
              price: product.price_with_discounts || product.precio,
              img1: product.product_img1,
            })
          }
        >
          <i className="pi pi-cart-plus"></i>
          <span>Agregar al carrito</span>
        </button>
      )}
    </div>
  );
})

export default AddToCartButton;
