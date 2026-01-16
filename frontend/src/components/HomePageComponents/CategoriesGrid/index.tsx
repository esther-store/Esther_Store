import "./index.css";
import React, { Suspense } from "react";
import { useGetCategories } from "@/hooks/useGetCategories";
import { Link } from "react-router-dom";
import Loader from "@/components/Loaders/Loader";
import { GridSkeleton } from "@/components/Loaders/GridSkeleton";
const RetryQueryComponent = React.lazy(
  () => import("@/components/RetryQueryComponent")
);

export function CategoriesGrid() {
  const { categories, loading, isError, refetch } = useGetCategories();
  return (
    <article className="homepage-categories-grid-container">
      <header>
        <h1>------- Categorías ------</h1>
      </header>
      {loading ? (
        <LoaderContainer>
          <GridSkeleton />
        </LoaderContainer>
      ) : isError ? (
        <Suspense
          fallback={
            <LoaderContainer>
              <GridSkeleton />
            </LoaderContainer>
          }
        >
          <RetryQueryComponent
            refetch={refetch}
            message={"Error obteniendo las categorías"}
          />
        </Suspense>
      ) : categories.length === 0?
      <Suspense
          fallback={
            <LoaderContainer>
              <GridSkeleton />
            </LoaderContainer>
          }
        >
          <RetryQueryComponent
            refetch={refetch}
            message={"No hay categorías para mostrar"}
          />
        </Suspense>
      :(
        <main className="homepage-categories-grid">
          {categories.map((category) => (
            <Link key={category.id} to={`/store?categoria=${category.id}`}>
              <img src={category.img} alt = {category.nombre}/>
              <div>{category.nombre}</div>
            </Link>
          ))}
        </main>
      )}
    </article>
  );
}

const LoaderContainer = ({ children }) => (
  <div style={{ minHeight: "200px", display: "flex", alignItems: "center" }}>
    {children}
  </div>
);
