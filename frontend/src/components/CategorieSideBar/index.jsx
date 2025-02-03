import React, { useState, useEffect, useContext } from "react";
import QueryFilterContext from "@/context/filtersContext";
import { useIsMobileMode } from "@/hooks/useIsMobileMode";
import PromotionsModal from "../PromotionsModal";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import RetryQueryComponent from "../RetryQueryComponent";
import "./index.css";
import Loader from "../Loader";

const CategorieSideBar = React.memo(function CategorieSideBar() {
  const [showPromotionsModal, setShowPromotionsModal] = useState(false);
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

  //everytime the categories change, update the active category
  useEffect(() => {
    setActiveCategory(getActiveFilter("categoria"));
  }, [categories, searchParams]);

  function getActiveCategoryName() {
    const matchedCategory = categories.find(
      (category) => category.id == getActiveFilter("categoria")
    );
    return matchedCategory !== undefined && matchedCategory !== null
      ? matchedCategory.nombre
      : "Categorias";
  }

  return (
    <>
      <PromotionsModal
        show={showPromotionsModal}
        setShow={setShowPromotionsModal}
        promotions={promotions}
        loadingPromotions={loadingPromotions}
      />
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
