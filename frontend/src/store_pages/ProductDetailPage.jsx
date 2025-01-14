import { useParams } from "react-router-dom";
import "@/store_pages/pagesStyles/ProductDetail.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Page404 } from "./Page404";
import ProductDetails from "@/components/ProductDetails";
import Loader from "@/components/Loader";

export function ProductDetailPage({}) {
  const { productId } = useParams();
  const { products, loading } = useGetProducts({
    searchParams: `id=${productId}`,
  });
  return (
    <main className="product-detail-page">
      {loading ? (
        <Loader />
      ) : products.length === 0 ? (
        <Page404 />
      ) : (
        <ProductDetails data={products[0]} />
      )}
    </main>
  );
}
