import "./index.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import ImageSlider from "@/components/ImageSlider";
import { useNavigate } from "react-router-dom";
import { Skeleton } from 'primereact/skeleton';
import { lazy, Suspense } from "react";
const RetryQueryComponent = lazy(() => import("@/components/RetryQueryComponent"));

export function RecommendedProducts() {
  const { products, loading, isError, refetch } = useGetProducts({
    searchParams: "recommended=true&page_size=4",
  });
  const navigate = useNavigate();
  return (
    <article className="homepage-recommended-products">
      <aside>
        {loading ? (
          <Skeleton width="100%" height="400px" className="mr-2"/>
        ) : null}
        {isError && !loading ? (
          <Suspense fallback = {<Skeleton width="100%" height="400px" className="mr-2"/>}>
            <RetryQueryComponent message = "Error obteniendo los productos" refetch = {refetch}/>
          </Suspense>
        ) : (
          <ImageSlider
            images={products.map((product) => ({
              src: product.product_img1,
              alt: product.product_name,
              id: product.id,
            }))}
            onImageClick={(productId) =>
              navigate(`/store/product/${productId}`)
            }
          />
        )}
      </aside>
      <header>
        <h1>Productos Recomendados</h1>
      </header>
      <section>
        <p>
          Lorem ipsum dolor sit amet consectetur. Viverra at at lorem sed quam
          tempor ac donec. Suspendisse nullam dignissim massa dui rhoncus diam
          egestas urna consectetur. Mauris arcu nulla egestas aliquet fermentum.
          Ut pretium suspendisse adipiscing eu ac.
        </p>
      </section>
    </article>
  );
}
