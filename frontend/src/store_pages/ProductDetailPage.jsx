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

  return (
    <main className="product-detail-page">
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
          <Toast ref={toastRef} position="bottom-center" />
          <button
            className="product-detail-page-button-go-back"
            onClick={() => history.back()}
          >
            <LeftArrow color="rgba(0, 0, 0, 0.8)" />
          </button>
          <ProductDetailsSection loading = {loading} product={product} toastRef={toastRef} />
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
