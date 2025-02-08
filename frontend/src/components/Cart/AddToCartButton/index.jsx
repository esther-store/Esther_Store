import CartContext from "@/context/cartContext";
import React, { useContext } from "react";
import { PlusIcon } from "@/icons/PlusIcon.tsx";
import { CheckIcon } from "@/icons/CheckIcon.tsx";
import "./index.css";
import { showToast } from "@/utils/showToast";

const AddToCartButton = React.memo(function AddToCartButton({
  product,
  toastRef,
}) {
  const { addProductToCart, checkProductInCart } = useContext(CartContext);
  const productInCart = checkProductInCart(product.id);
  return (
    <button
      className="add-product-to-cart-button"
      style={
        productInCart
          ? { backgroundColor: "rgba(0, 0, 0, 0.35)", opacity: 1 }
          : { backgroundColor: "white" }
      }
      onClick={() => {
        addProductToCart({
          id: product.id,
          productName: product.product_name,
          price: product.price_with_discounts || product.precio,
          img1: product.product_img1,
        });
        showToast({
          severity: "success",
          summary: "Success",
          detail: `Producto agregado al carrito exitosamente`,
          toastRef:toastRef,
          life: 1000
        });
      }}
    >
      <span
        className={productInCart ? "show-icon" : "display-none"}
        title={`${product.product_name} ya en el carrito`}
      >
        <CheckIcon color={"rgba(255, 255, 255, 0.8)"} />
      </span>
      <span
        className={productInCart? "display-none": ''}
        title={`Agregar ${product.product_name} al carrito`}
      >
        <PlusIcon color={"rgba(0, 0, 0, 0.8)"} />
      </span>
    </button>
  );
});

export default AddToCartButton;
