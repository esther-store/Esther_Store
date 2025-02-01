import CartContext from "@/context/cartContext";
import React, { useContext } from "react";
import {PlusIcon} from '@/icons/PlusIcon.tsx'
import {CheckIcon} from '@/icons/CheckIcon.tsx'
import './index.css'

const AddToCartButton = React.memo(function AddToCartButton({product}){
  const {
    addProductToCart,
    checkProductInCart,
  } = useContext(CartContext);

  return (
    <button 
    className="add-product-to-cart-button"
    onClick={() =>
      addProductToCart({
        id: product.id,
        productName: product.product_name,
        price: product.price_with_discounts || product.precio,
        img1: product.product_img1,
      })
    }
    >
      <span>{checkProductInCart(product.id) ? <CheckIcon color = {"rgba(0, 0, 0, 0.8)"}/>:<PlusIcon color = {"rgba(0, 0, 0, 0.8)"}/>}</span>
    </button>
  );
})

export default AddToCartButton; 
