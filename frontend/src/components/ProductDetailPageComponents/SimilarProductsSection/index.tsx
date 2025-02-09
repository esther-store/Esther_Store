import type { ProductIdType, ProductType } from "@/Types";
import "./index.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import ProductCard from "@/components/StorePageComponents/ProductsGrid/ProductCard";
import { Skeleton } from "primereact/skeleton";
import { useNavigate } from "react-router-dom";

export function SimilarProductsSection({
  currentProductId,
  filter,
  toastRef,
}: {
  currentProductId: ProductIdType
  filter: string;
  toastRef: any;
}) {
  const { products, loading, isError } = useGetProducts({
    searchParams: filter,
  });
  const navigate = useNavigate()
  return (
    <article className = "similar-products-section">
      <header>
        <h1>Productos Similares</h1>
      </header>
      <section>
        {loading?
        <>
            <Skeleton style = {{maxWidth: '280px', maxHeight: '420px'}}/>
            <Skeleton style = {{maxWidth: '280px', maxHeight: '420px'}}/>
            <Skeleton style = {{maxWidth: '280px', maxHeight: '420px'}}/>
            <Skeleton style = {{maxWidth: '280px', maxHeight: '420px'}}/>
        </>
        :
        products.map((product: ProductType) => {
          if(product.id != currentProductId){
            return (<ProductCard key={product?.id} product = {product} toastRef={toastRef} onClick = {() => navigate(`/store/product/${product?.id}`)}/>)
          }
      })
        }
      </section>
    </article>
  );
}
