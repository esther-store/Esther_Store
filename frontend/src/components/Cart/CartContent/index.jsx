import React, { Suspense } from "react";
const ProductsCartGrid = React.lazy(() =>
  import("@/components/Cart/ProductsCartGrid")
);
import { Skeleton } from "primereact/skeleton";
import "./index.css";

const CartContent = React.memo(function CartContext({
  handleSendPedido,
  children,
  total,
}) {
  return (
    <>
      <div className="table-grid-container">
        <Suspense fallback={<GridSkeleton />}>
          <ProductsCartGrid />
        </Suspense>
      </div>
      <footer className="cart-footer">
        <section className = "price-container">
          <span>Total:</span> <span>${total?.toFixed(2)}</span>
        </section>
        <section className="buttons-container">
          <div>{children}</div>
          <button
            className="btn-general-styles"
            onClick={() => handleSendPedido()}
          >
            Procesar Pedido
          </button>
        </section>
      </footer>
    </>
  );
});

export default CartContent;

const GridSkeleton = () => (
  <section style={styles.gridSkeletonContainer}>
    <Skeleton width="100%" height="40px" />
    <Skeleton width="100%" height="40px" />
    <Skeleton width="100%" height="40px" />
    <Skeleton width="100%" height="40px" />
  </section>
);

const styles = {
  gridSkeletonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
};
