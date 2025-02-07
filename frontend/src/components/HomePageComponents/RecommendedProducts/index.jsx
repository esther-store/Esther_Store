import "./index.css";
import { useGetProducts } from "@/hooks/useGetProducts";
import ImageSlider from "@/components/ImageSlider";

export function RecommendedProducts() {
  const { products, loading, isError } = useGetProducts({
    searchParams: "recommended=true&page_size=4",
  });
  return (
    <article className="homepage-recommended-products">
      <aside>
        <ImageSlider
          images={products.map((product) => ({
            src: product.product_img1,
            alt: product.product_name,
          }))}
        />
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
