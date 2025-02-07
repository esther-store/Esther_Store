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
      <section>
        <h1>Productos Recomendados</h1>
        <p>
          Lore Ipsum asdasdasd asdasdgdfd fgdj ngd gdjfgdkjfgkld fg dfjgkdfj gdf
          jgdkf bkdfg k
        </p>
      </section>
    </article>
  );
}
