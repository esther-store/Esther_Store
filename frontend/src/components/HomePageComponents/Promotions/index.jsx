import "./index.css";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import { useRef } from "react";
import { Toast } from "primereact/toast";
import Loader from "@/components/Loader";
import RetryQueryComponent from "@/components/RetryQueryComponent";

export function HomePagePromotions() {
  const toastRef = useRef();
  const { promotions, loadingPromotions, isError, refetch } = useGetPromotions();
  const {
    products,
    loading: loadingProducts,
    isError: errorGettingProducts,
  } = useGetProducts({
    searchParams: `promotion=${promotions[0].id}&page_size=3`,
  });
  const loading = loadingProducts || loadingPromotions;
  const error = isError || errorGettingProducts;

  return (
    <article className="homepage-promotions-section">
      <Toast ref={toastRef} position="bottom-center" />
      <h1>Promociones</h1>
      {loading ? (
        <div
          style={{ minHeight: "200px", display: "flex", alignItems: "center" }}
        >
          <Loader />
        </div>
      ) : error ? (
        <RetryQueryComponent message = {"Error obteniendo las Promociones"} refetch = {refetch}/>
      ) : (
        <>
          <h2>{promotions[0].name}</h2>
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
        </>
      )}
    </article>
  );
}
