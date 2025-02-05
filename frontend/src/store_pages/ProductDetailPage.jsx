import { useParams } from "react-router-dom";
import "@/store_pages/pagesStyles/ProductDetail.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Page404 } from "./Page404";
import Loader from "@/components/Loader";
import { pagesTitle } from "@/constants";

export function ProductDetailPage({}) {
  const { productId } = useParams();
  const { products, loading } = useGetProducts({
    searchParams: `id=${productId}`,
  });
  return (
    <main className="product-detail-page">
      <title>{pagesTitle.productDetail(products[0].product_name)}</title>
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <Page404 />
      ) : (
        null
      )}
    </main>
  );
}
