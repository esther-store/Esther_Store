import "./index.css";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import React, { useRef, useState, Suspense } from "react";
import { Toast } from "primereact/toast";
import { NavigationPoints } from "./NavigationPoints";
import { Link } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";
const RetryQueryComponent = React.lazy(() =>
  import("@/components/RetryQueryComponent")
);

export function HomePagePromotions() {
  const toastRef = useRef();
  const { promotions, loadingPromotions, isError, refetch } =
    useGetPromotions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentPromotion = promotions[currentIndex];
  const {
    products,
    loading: loadingProducts,
    isError: errorGettingProducts,
  } = useGetProducts({
    searchParams: `promotion=${currentPromotion?.id}&page_size=3`,
  });
  const error = isError || errorGettingProducts;
  const loading = loadingProducts || loadingPromotions;

  return (
    <article className="homepage-promotions-section">
      <Toast ref={toastRef} position="bottom-center" />
      <h1>Promociones</h1>
      {loadingPromotions ? (
        <div
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <Skeleton width="150px" height="25px" />
        </div>
      ) : !isError ? (
        <h2>{currentPromotion?.name}</h2>
      ) : null}
      {loading ? (
        <CardsSkeleton/>
      ) : error ? (
        <Suspense
          fallback={
            <CardsSkeleton/>
          }
        >
          <div style={styles.loaderContainer}>
            <RetryQueryComponent
              message={"Error obteniendo las Promociones"}
              refetch={refetch}
            />
          </div>
        </Suspense>
      ) : (
        <section className="cards-container">
          {products.map((product) => (
            <Link key={product.id} to={`/store/product/${product.id}`}>
              <ProductCard
                product={product}
                toastRef={toastRef}
                showAddToCartButton={false}
              />
            </Link>
          ))}
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
};
