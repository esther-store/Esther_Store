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
  const { addProductToCart } = useContext(CartContext);
  return (
    <button
      className="add-product-to-cart-button"
      style={{ backgroundColor: "white" }}
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
          detail: `Producto agregado correctamente`,
          toastRef: toastRef,
          life: 800,
        });
      }}
    >
      <span title={`Agregar ${product.product_name} al carrito`}>
        <PlusIcon color={"rgba(0, 0, 0, 0.8)"} />
      </span>
    </button>
  );
});

export default AddToCartButton;
