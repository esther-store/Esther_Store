import Loader from "../Loader";
import ProductCard from "../ProductCard";
import React, { useContext } from "react";
import "./index.css";
import QueryFiltersContext from "@/context/filtersContext";
import Paginator from "../Paginator";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useNavigate } from "react-router-dom";
import RetryQueryComponent from "../RetryQueryComponent";

export const ProductsGrid = React.memo(function ProductsGrid() {
  const { searchParams, getActiveFilter, setFilter, removeFilter } =
    useContext(QueryFiltersContext);
  const { products, count, loading, isError, refetch } = useGetProducts({
    searchParams: searchParams,
  });
  const navigate = useNavigate();

  return (
    <>
      {loading ? (
        <Loader />
      ) : isError ? (
        <RetryQueryComponent
          message={
            "Error obteniendo los productos. Revisa tu conexión a internet"
          }
          refetch={refetch}
        />
      ) : (
        <section className="products-grid-and-paginator-container">
          {products == null || products?.length === 0 ? (
            <div className="products-grid-not-found-message">
              <strong>No hay productos</strong>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => navigate(`product/${product.id}`)}
                  />
                ))}
              </div>
              <Paginator
                count={count}
                itemsLength={products.length}
                getActiveFilter={getActiveFilter}
                setFilter={setFilter}
                removeFilter={removeFilter}
              />
            </>
          )}
        </section>
      )}
    </>
  );
});

export default ProductsGrid;
