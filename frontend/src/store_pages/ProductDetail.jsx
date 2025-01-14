import { useParams } from "react-router-dom";
import "@/store_pages/pagesStyles/ProductDetail.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import { Page404 } from "./Page404";

export function ProductDetail({}) {
  const { productId } = useParams();
  const { products, loading } = useGetProducts({
    searchParams: `id=${productId}`,
  });
  return products.length === 0 ? (
    <Page404 />
  ) : (
    <main className="product-detail-page"></main>
  );
}
