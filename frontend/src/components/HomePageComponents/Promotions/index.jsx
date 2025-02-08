import "./index.css";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import React, { useRef, useState, Suspense } from "react";
import { Toast } from "primereact/toast";
import Loader from "@/components/Loaders/Loader";
import { NavigationPoints } from "./NavigationPoints";
import { Link } from "react-router-dom";
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
  const loading = loadingProducts || loadingPromotions;
  const error = isError || errorGettingProducts;

  return (
    <article className="homepage-promotions-section">
      <Toast ref={toastRef} position="bottom-center" />
      <h1>Promociones</h1>
      {loading ? <CustomizedLoader /> : null}
      {error && !loading ? (
        <div style={styles.loaderContainer}>
          <Suspense fallback={<CustomizedLoader />}>
            <RetryQueryComponent
              message={"Error obteniendo las Promociones"}
              refetch={refetch}
            />
          </Suspense>
        </div>
      ) : (
        <>
          <h2>{currentPromotion?.name}</h2>
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
          <section className="points-container">
            <NavigationPoints
              currentIndex={currentIndex}
              items={promotions}
              onChange={(index) => setCurrentIndex(index)}
            />
          </section>
        </>
      )}
    </article>
  );
}

const CustomizedLoader = () => (
  <div style={styles.loaderContainer}>
    <Loader />
  </div>
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
