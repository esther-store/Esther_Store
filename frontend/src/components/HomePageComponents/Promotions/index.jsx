import "./index.css";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import Loader from "@/components/Loader";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import { NavigationPoints } from "./NavigationPoints";

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
      {loading ? (
        <div
          style={{
            width: "100%",
            minHeight: "200px",
            position: "absolute",
            top:"50%",
            transform:"translateY(-50%)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Loader />
        </div>
      ) : null}
      {error ? (
        <RetryQueryComponent
          message={"Error obteniendo las Promociones"}
          refetch={refetch}
        />
      ) : (
        <>
          <h2>{currentPromotion?.name}</h2>
          <section className="cards-container">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                toastRef={toastRef}
                onClick={() => {}}
                showAddToCartButton={false}
              />
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
