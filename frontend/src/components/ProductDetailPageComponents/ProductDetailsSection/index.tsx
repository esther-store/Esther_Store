import type { ProductType } from "@/Types";
import "./index.css";
import ImageSlider from "@/components/ImageSlider";
import ProductPrice from "@/components/StorePageComponents/ProductsGrid/ProductCard/ProductPrice";
import React, { useContext, type ReactNode } from "react";
import CartContext from "@/context/cartContext";
import { showToast } from "@/utils/showToast";
import { Skeleton } from "primereact/skeleton";

const ProductDetailsSection = React.memo(function ProductDetailsSection({
  product,
  loading,
  toastRef,
}: {
  product: ProductType;
  loading: boolean;
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
        {loading ? (
          <Skeleton width="100%" height="400px" />
        ) : (
          <ImageSlider images={images} />
        )}
      </aside>
      <header>
        {loading ? (
          <Skeleton width="100%" height="25px" />
        ) : (
          <h1>{product?.product_name}</h1>
        )}
      </header>
      <section>
        {loading ? (
          <Skeleton width="100px" height="25px" />
        ) : (
          <ProductPrice
            precio={product?.precio}
            price_with_discounts={product?.price_with_discounts}
          />
        )}
      </section>
      <main>
        {loading ? (
          <div style={{ marginTop: "15px" }}>
            <Skeleton width="100%" height="200px" />
          </div>
        ) : (
          <p>{product?.product_description}</p>
        )}
      </main>
      <footer>
        {loading ? (
          <Skeleton width="100%" height="60px" />
        ) : (
          <button
            onClick={() => {
              if (!productInCart) {
                addProductToCart(product);
                showToast({
                  toastRef: toastRef,
                  severity: "success",
                  summary: "",
                  life: 1000,
                  detail: `Producto agregado correctamente`,
                });
              }
            }}
          >
            {productInCart ? "Agregado al carrito" : "Agregar al carrito"}
          </button>
        )}
      </footer>
    </article>
  );
});

export default ProductDetailsSection;
