import React, { useState, useEffect, useContext } from "react";
import QueryFilterContext from "@/context/filtersContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import Loader from "@/components/Loader";

const CategorieSideBar = React.memo(function CategorieSideBar() {
  const [activeCategory, setActiveCategory] = useState(null);
  const { searchParams, setFilter, getActiveFilter } =
    useContext(QueryFilterContext);
  const {
    categories,
    loading,
    isError: errorGettingCategories,
    refetch: refetchCategories,
  } = useGetCategories();
  const { promotions, loadingPromotions } = useGetPromotions();
  const {pathname} = useLocation()
  const navigate = useNavigate()

  //everytime the categories change, update the active category
  useEffect(() => {
    setActiveCategory(getActiveFilter("categoria"));
  }, [categories, searchParams]);

  return (
    <>
      {errorGettingCategories && !loading ? (
        <RetryQueryComponent
          message={
            "Error obteniendo las categorías. Revisa tu conexión a internet"
          }
          refetch={refetchCategories}
        />
      ) : (
        <section className="categories-side-bar">
          <h2>Categorías</h2>
          <ul>
            {categories.map((category) => (
              <li
                className={
                  parseInt(category.id) === parseInt(activeCategory)
                    ? "category-selected"
                    : null
                }
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  if(pathname === "/"){
                    return navigate(`/store?categoria=${category.id}`)
                  }
                  setFilter({ name: "categoria", value: category.id });
                }}
              >
                <span>{category.nombre}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
});

export default CategorieSideBar;
