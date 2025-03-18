import "./index.css";
import { useGetPromotions } from "@/hooks/useGetPromotions";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import React, { useState, Suspense } from "react";
import { NavigationPoints } from "./NavigationPoints";
import { Link } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
const RetryQueryComponent = React.lazy(
  () => import("@/components/RetryQueryComponent")
);

export function HomePagePromotions() {
  const { promotions, loadingPromotions, isError, refetch } = useGetPromotions({
    searchParams: "is_special=true",
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPromotion = promotions[currentIndex];
  const {
    products,
    loading: loadingProducts,
    isError: errorGettingProducts,
  } = useGetProducts({
    searchParams: currentPromotion?.id
      ? `promotion=${currentPromotion?.id}&page_size=3`
      : "page_size=0",
  });
  const error = isError || errorGettingProducts;
  const loading = loadingProducts || loadingPromotions;

  return (
    <article className="homepage-promotions-section">
      <h1>Promociones</h1>
      {loadingPromotions ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Skeleton width="150px" height="25px" />
        </div>
      ) : !isError ? (
        <Link to = {`/store?promotion=${currentPromotion?.id}`}><h2>{currentPromotion?.name}</h2></Link>
      ) : null}
      {loading ? (
        <CardsSkeleton />
      ) : error ? (
        <Suspense fallback={<CardsSkeleton />}>
          <div style={styles.loaderContainer}>
            <RetryQueryComponent
              message={"Error obteniendo las Promociones"}
              refetch={refetch}
            />
          </div>
        </Suspense>
      ) : promotions.length === 0 ? (
        <div style={styles.loaderContainer}>
          <RetryQueryComponent
            message={"No hay promociones para mostrar"}
            refetch={refetch}
          />
        </div>
      ) : (
        <section className="cards-container">
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                toastRef={null}
                showAddToCartButton={false}
                to={`/store/product/${product.id}`}
              />
            ))
          ) : (
            <div style={styles.noProductsCard}>
              No hay productos en esta promoción
            </div>
          )}
        </section>
      )}
      {loadingPromotions || isError ? null : (
        <section className="points-container">
          <NavigationPoints
            currentIndex={currentIndex}
            items={promotions}
            onChange={(index) => setCurrentIndex(index)}
          />
        </section>
      )}
    </article>
  );
}

const CardsSkeleton = () => (
  <section className="cards-container">
    <Skeleton width="100%" height="100%" />
    <Skeleton width="100%" height="100%" />
    <Skeleton width="100%" height="100%" />
  </section>
);

const styles = {
  loaderContainer: {
    width: "100%",
    minHeight: "200px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
  },
  noProductsCard: {
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    boxShadow: " 1px 1px 3px rgb(202, 201, 201)",
  },
};
