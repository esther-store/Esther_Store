import type { ProductIdType, ProductType } from "@/Types";
import "./index.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import { Skeleton } from "primereact/skeleton";
import { useNavigate } from "react-router-dom";
import React, { Suspense } from "react";
const RetryQueryComponent = React.lazy(
  () => import("@/components/RetryQueryComponent")
);

export function SimilarProductsSection({
  currentProductId,
  filter,
  toastRef,
}: {
  currentProductId: ProductIdType;
  filter: string;
  toastRef: any;
}) {
  const { products, loading, isError, refetch } = useGetProducts({
    searchParams: filter,
  });
  const navigate = useNavigate();
  return (
    <article className="similar-products-section">
      <header>
        <h1>Productos Similares</h1>
      </header>
      <section>
        {loading ? (
          <CardsSkeleton />
        ) : isError ? (
          <Suspense fallback={<CardsSkeleton />}>
            <div style = {styles.container}>
              <RetryQueryComponent
                message={
                  "Error obteniendo los productos. Revisa tu conexión a internet"
                }
                refetch={refetch}
              />
            </div>
          </Suspense>
        ) : (
          products.map((product: ProductType) => {
            if (product.id != currentProductId) {
              return (
                <ProductCard
                  key={product?.id}
                  product={product}
                  toastRef={toastRef}
                  onClick={() => navigate(`/store/product/${product?.id}`)}
                />
              );
            }
          })
        )}
      </section>
    </article>
  );
}

const CardsSkeleton = () => (
  <>
    <Skeleton height="280px" />
    <Skeleton height="280px" />
    <Skeleton height="280px" />
    <Skeleton height="280px" />
  </>
);

const styles = {
  container: {
    width: "95%",
    minHeight: "200px",
    position: "absolute",
    top: "50%",
    left:"50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    alignItems: "center",
  },
};
