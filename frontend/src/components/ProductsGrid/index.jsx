import Loader from "../Loader";
import ProductCard from "../ProductCard";
import React, { useState, useContext } from "react";
import "./index.css";
import QueryFiltersContext from "../../context/filtersContext";
import Paginator from "../Paginator";
import {useGetProducts} from '../../hooks/useGetProducts'

export const ProductsGrid = React.memo(function ProductsGrid({activateProductdetails}) {
  const {searchParams, getActiveFilter, setFilter} = useContext(QueryFiltersContext)
  const {products, count, loading} = useGetProducts({searchParams:searchParams})

  return (
    <>
      {loading ? (
        <section className="products-loader-container">
            <div>
                <Loader />
            </div>
        </section>
      ) : 
      <section className = "products-grid-and-paginator-container">
        <div className="products-grid">
          {products !== null && products !== undefined ? (
            <>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} {...product} isInStore = {true}  onClick = {()=>activateProductdetails(product)} />
                ))
              ) : (
                <div className="products-grid-not-found-message">
                  <strong>No hay productos</strong>
                </div>
              )}
            </>
          ) : (
            <div className="products-grid-not-found-message">
              <strong>No hay productos</strong>
            </div>
          )}
        </div>
        <Paginator 
          count={count}
          itemsLength={products.length}
          getActiveFilter = {getActiveFilter}
          setFilter = {setFilter}
          />
      </section>
      }
    </>
  );
})

export default ProductsGrid
