import { useParams } from "react-router-dom";
import "@/store_pages/pagesStyles/ProductDetail.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import Page404 from "./Page404";
import Loader from "@/components/Loader";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import { pagesTitle } from "@/constants";
import NavBar from "@/components/NavBar";
import { Toast } from "primereact/toast";
import { ProductDetailsSection } from "@/components/ProductDetailPageComponents/ProductDetailsSection";
import { useRef } from "react";
import { LeftArrow } from "@/icons/LeftArrow";

export default function ProductDetailPage({}) {
  const { productId } = useParams();
  const { products, loading, isError, refetch } = useGetProducts({
    searchParams: `id=${productId}`,
  });
  const product = products[0];
  const toastRef = useRef()

  return (
    <main className="product-detail-page">
      <NavBar />
      <title>{pagesTitle.productDetail(product?.product_name)}</title>
      {loading ? (
        <Loader />
      ) : isError ? (
        <RetryQueryComponent
          refetch={refetch}
          message={
            "Error obteniendo la información del producto. Revisa tu conexón a internet"
          }
        />
      ) : product == null ? (
        <Page404 />
      ) : (
        <>
        <Toast ref = {toastRef} position="bottom-center"/>
        <button className = "product-detail-page-button-go-back" onClick={() => history.back()}><LeftArrow/></button>
        <ProductDetailsSection product={product} toastRef = {toastRef}/>
        </>
      )}
    </main>
  );
}
