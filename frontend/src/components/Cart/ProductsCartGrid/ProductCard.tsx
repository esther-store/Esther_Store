import { TrashIcon } from "@/icons/TrashIcon";
import ProductQuantityController from "../ProductQuantityController";
import React from "react";
import type { CartProductType, ProductIdType } from "@/Types";

const ProductCard = React.memo(function ProductCard({
  product,
  deleteProductFromCart,
  addProductToCart,
  restProductFromCart,
}: {
  product: CartProductType;
  deleteProductFromCart: (productId: ProductIdType) => void;
  addProductToCart: (product: CartProductType) => void;
  restProductFromCart: (productId: ProductIdType) => void;
}) {
  return (
    <article className="products-cart-grid-card">
      <button
        className="remove-product-from-cart"
        onClick={() => deleteProductFromCart(product.id)}
      >
        <TrashIcon color="#000" />
      </button>
      <header>
        <img alt={product.productName} src={product.img1} />
      </header>
      <section>
        <p>{product.productName}</p>
        <h4>${product?.subtotal?.toFixed(2)}</h4>
      </section>
      <footer>
        <ProductQuantityController
          item={product}
          quantity={product.quantity}
          add={addProductToCart}
          rest={restProductFromCart}
        />
      </footer>
    </article>
  );
});

export default ProductCard;
