import React, { Suspense, useRef } from "react";
import { useParams } from "react-router-dom";
import "@/store_pages/pagesStyles/ProductDetail.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import Loader from "@/components/Loaders/Loader";
import { pagesTitle } from "@/constants";
import NavBar from "@/components/NavBar";
import { Toast } from "primereact/toast";
import ProductDetailsSection from "@/components/ProductDetailPageComponents/ProductDetailsSection";
import { LeftArrow } from "@/icons/LeftArrow";
import { SimilarProductsSection } from "@/components/ProductDetailPageComponents/SimilarProductsSection";
import { RemovePageLoader } from "@/components/RemovePageLoader";

// Importación lazy de los componentes
const Page404 = React.lazy(() => import("./Page404"));
const RetryQueryComponent = React.lazy(() =>
  import("@/components/RetryQueryComponent")
);

export default function ProductDetailPage({}) {
  const { productId } = useParams();
  const { products, loading, isError, refetch } = useGetProducts({
    searchParams: `id=${productId}`,
  });
  const product = products[0];
  const toastRef = useRef();

  function getSimilarProductsFilter(){
    if(product?.categoria != null) return `categoria=${product?.categoria}&page_size=5`
    if(product?.promotion != null) return `promotion=${product?.promotion}&page_size=5`
    return "page_size=5"
  }

  return (
    <main className="product-detail-page">
      <RemovePageLoader/>
      <NavBar />
      <title>{pagesTitle.productDetail(product?.product_name)}</title>
      {isError && !loading? (
        <div style={styles.container}>
          <Suspense
            fallback={
              <CustomizedLoader/>
            }
          >
            <RetryQueryComponent
              refetch={refetch}
              message={
                "Error obteniendo la información del producto. Revisa tu conexión a internet"
              }
            />
          </Suspense>
        </div>
      ) : product == null && !loading? (
        <Suspense
          fallback={
            <CustomizedLoader/>
          }
        >
          <Page404 />
        </Suspense>
      ) : (
        <>
          <Toast ref={toastRef} position="bottom-center" style={{zIndex:"999"}} className="toast-mobile-styles"/>
          <button
            className="product-detail-page-button-go-back"
            onClick={() => history.back()}
          >
            <LeftArrow color="rgba(0, 0, 0, 0.8)" />
          </button>
          <ProductDetailsSection loading = {loading} product={product} toastRef={toastRef} />
          <SimilarProductsSection filter={getSimilarProductsFilter()} toastRef={toastRef} currentProductId={product?.id}/>
        </>
      )}
    </main>
  );
}

const CustomizedLoader = () => (
  <div style={styles.container}>
    <Loader />
  </div>
);

const styles = {
  container: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};
