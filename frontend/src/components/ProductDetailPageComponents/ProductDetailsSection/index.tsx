import type { ProductType } from "@/Types";
import "./index.css";
import ImageSlider from "@/components/ImageSlider";
import ProductPrice from "@/components/StorePageComponents/ProductsGrid/ProductCard/ProductPrice";
import { useContext, type ReactNode } from "react";
import CartContext from "@/context/cartContext";
import { showToast } from "@/utils/showToast";

export function ProductDetailsSection({
  product,
  toastRef,
}: {
  product: ProductType;
  toastRef: ReactNode;
}) {
  const { addProductToCart, checkProductInCart } = useContext<any>(CartContext);
  const images = [
    {
      src: product?.product_img1,
      alt: product?.product_name,
      id: 0,
    },
    {
      src: product?.product_img2,
      alt: product?.product_name,
      id: 1,
    },
    {
      src: product?.product_img3,
      alt: product?.product_name,
      id: 2,
    },
  ];
  const productInCart = checkProductInCart(product?.id);
  return (
    <article className="product-details-section">
      <aside>
        <ImageSlider images={images} />
      </aside>
      <header>
        <h1>{product?.product_name}</h1>
      </header>
      <section>
        <ProductPrice
          precio={product?.precio}
          price_with_discounts={product?.price_with_discounts}
        />
      </section>
      <main>
        <p>
          Lorem ipsum dolor sit amet consectetur. Viverra at at lorem sed quam
          tempor ac donec. Suspendisse nullam dignissim massa dui rhoncus diam
          egestas urna consectetur. Mauris arcu nulla egestas aliquet fermentum.
          Ut pretium suspendisse adipiscing eu ac.
        </p>
      </main>
      <footer>
        <button
          onClick={() => {
            if (!productInCart) {
              addProductToCart(product);
              showToast({
                toastRef: toastRef,
                severity: "success",
                summary: "",
                life:1000,
                detail: `Producto agregado correctamente`,
              });
            }
          }}
        >
          {productInCart ? "Agregado al carrito" : "Agregar al carrito"}
        </button>
      </footer>
    </article>
  );
}
