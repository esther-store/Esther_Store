import CartContext from "@/context/cartContext";
import React, { useContext } from "react";
import "./index.css";
import ProductCard from "./ProductCard";

const ProductsCartGrid = React.memo(function ProductsCartGrid() {
  const {
    productsCart,
    addProductToCart,
    restProductFromCart,
    deleteProductFromCart,
  } = useContext(CartContext);
  return (
    <>
      <section className="products-cart-grid">
        {productsCart.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            deleteProductFromCart={deleteProductFromCart}
            addProductToCart={addProductToCart}
            restProductFromCart={restProductFromCart}
          />
        ))}
      </section>
    </>
  );
});

export default ProductsCartGrid;
