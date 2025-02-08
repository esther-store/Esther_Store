import type { CategoryIdType, ProductType } from "@/Types";
import "./index.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";

export function SimilarProductsSection({
  filter,
  toastRef,
}: {
  filter: string;
  toastRef: any;
}) {
  const { products, loading, isError } = useGetProducts({
    searchParams: filter,
  });
  return (
    <article className = "similar-products-section">
      <header>
        <h1>Productos Similares</h1>
      </header>
      <section>
        {products.map((product: ProductType) => (
          <ProductCard key={product?.id} product = {product} toastRef={toastRef} />
        ))}
      </section>
    </article>
  );
}
