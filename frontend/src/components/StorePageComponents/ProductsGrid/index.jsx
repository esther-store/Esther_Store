import ProductCard from "./ProductCard";
import React, { useContext, useRef, Suspense } from "react";
import "./index.css";
import QueryFiltersContext from "@/context/filtersContext";
import Paginator from "@/components/StorePageComponents/Paginator";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useNavigate } from "react-router-dom";
const RetryQueryComponent = React.lazy(() =>
  import("@/components/RetryQueryComponent")
);
import { Toast } from "primereact/toast";
import { Skeleton } from "primereact/skeleton";

export const ProductsGrid = React.memo(function ProductsGrid() {
  const { searchParams, getActiveFilter, setFilter, removeFilter } =
    useContext(QueryFiltersContext);
  const { products, count, loading, isError, refetch } = useGetProducts({
    searchParams: searchParams,
  });
  const navigate = useNavigate();
  const toastRef = useRef();

  return (
    <>
      {loading ? (
        <ProductsGridSkeleton />
      ) : isError ? (
        <Suspense fallback={<ProductsGridSkeleton />}>
          <div style={styles.container}>
            <RetryQueryComponent
              message={
                "Error obteniendo los productos. Revisa tu conexión a internet"
              }
              refetch={refetch}
            />
          </div>
        </Suspense>
      ) : (
        <section className="products-grid-and-paginator-container">
          <Toast ref={toastRef} position="bottom-center" className="toast-mobile-styles" style={{zIndex:"999"}}/>
          {products == null || products?.length === 0 ? (
            <div className="products-grid-not-found-message">
              <strong>No hay productos</strong>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <div key={product.id} className="card-container">
                    <ProductCard
                      toastRef={toastRef}
                      product={product}
                      onClick={() => navigate(`product/${product.id}`)}
                    />
                  </div>
                ))}
              </div>
              <Paginator
                count={count}
                itemsLength={products.length}
                getActiveFilter={getActiveFilter}
                setFilter={setFilter}
                removeFilter={removeFilter}
              />
            </>
          )}
        </section>
      )}
    </>
  );
});

export default ProductsGrid;

const ProductsGridSkeleton = () => (
  <div className="products-grid">
    {new Array(10).fill("").map((_, index) => (
      <Skeleton key = {`card-skeleton-${index}`} width="100%" height="250px" />
    ))}
  </div>
);

const styles = {
  container: {
    width: "100%",
    minHeight: "200px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
  },
};
