import { useParams } from "react-router-dom";
import "@/store_pages/pagesStyles/ProductDetail.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import Page404 from "./Page404";
import Loader from "@/components/Loader";
import { pagesTitle } from "@/constants";
import NavBar from "@/components/NavBar";

export default function ProductDetailPage({}) {
  const { productId } = useParams();
  const { products, loading } = useGetProducts({
    searchParams: `id=${productId}`,
  });
  const product = products[0];
  return (
    <main className="product-detail-page">
      <NavBar/>
      <title>{pagesTitle.productDetail(product?.product_name)}</title>
      {loading ? (
        <Loader />
      ) : product == null ? (
        <Page404 />
      ) : (
        <>{product.product_name}</>
      )}
    </main>
  );
}
