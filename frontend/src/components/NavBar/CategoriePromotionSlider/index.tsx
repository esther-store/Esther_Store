import React, { useState, useEffect, useContext } from "react";
import QueryFilterContext from "@/context/filtersContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import type { CategoryType, PromotionType } from "@/Types";
import Loader from "@/components/Loader";

const CategoriePromotionSlider = React.memo(
  function CategoriePromotionSlider() {
    const [activeItem, setActiveItem] = useState(null);
    const { searchParams, getActiveFilter, bulkSetFilters } =
      useContext<any>(QueryFilterContext);
    const {
      categories,
      loading: loadingCategories,
      isError: errorGettingCategories,
      refetch: refetchCategories,
    } = useGetCategories();
    const { promotions, loadingPromotions } = useGetPromotions();
    const loading = loadingCategories || loadingPromotions;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    //everytime the categories or promotions change, update the active category
    useEffect(() => {
      let activeFilter = getActiveFilter("categoria");
      if (activeFilter !== "") {
        setActiveItem(getActiveFilter("categoria"));
      } else {
        setActiveItem(getActiveFilter("promotion"));
      }
    }, [categories, promotions, searchParams]);

    return (
      <>
        {loading ? <Loader /> : null}
        {errorGettingCategories && !loading ? (
          <RetryQueryComponent
            message={
              "Error obteniendo las categorías. Revisa tu conexión a internet"
            }
            refetch={refetchCategories}
          />
        ) : (
          <section className="categories-side-bar">
            <ul>
              {categories.map((category: CategoryType) => (
                <li
                  className={
                    category.id == activeItem ? "category-selected" : null
                  }
                  key={category.id}
                  onClick={() => {
                    setActiveItem(category.id);
                    if (pathname !== "/store") {
                      return navigate(`/store?categoria=${category.id}`);
                    }
                    bulkSetFilters([
                      { name: "promotion", value: "" },
                      { name: "categoria", value: category.id },
                    ]);
                  }}
                >
                  <span>{category.nombre}</span>
                </li>
              ))}
              {promotions.map((promotion: PromotionType) => (
                <li
                  className={
                    promotion.id == activeItem ? "category-selected" : null
                  }
                  key={promotion.id}
                  onClick={() => {
                    setActiveItem(promotion.id);
                    if (pathname !== "/store") {
                      return navigate(`/store?promotion=${promotion.id}`);
                    }
                    bulkSetFilters([
                      { name: "promotion", value: promotion.id },
                      { name: "categoria", value: "" },
                    ]);
                  }}
                >
                  <span>{promotion.name}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </>
    );
  }
);

export default CategoriePromotionSlider;
