import React, { useState, useEffect, useContext } from "react";
import QueryFilterContext from "@/context/filtersContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetPromotions } from "@/hooks/useGetPromotions";
import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";
import type {
  CategoryIdType,
  CategoryType,
  PromotionIdType,
  PromotionType,
} from "@/Types";
import { Skeleton } from "primereact/skeleton";
import { CloseIcon } from "@/icons/CloseIcon";

const CategoriePromotionSlider = React.memo(
  function CategoriePromotionSlider() {
    const [activeItem, setActiveItem] = useState<{
      type: "category" | "promotion";
      value: PromotionIdType | CategoryIdType;
    }>({ type: null, value: null });
    const { searchParams, getActiveFilter, bulkSetFilters, removeFilter } =
      useContext<any>(QueryFilterContext);
    const { categories, loading: loadingCategories } = useGetCategories();
    const { promotions, loadingPromotions } = useGetPromotions({});
    const loading = loadingCategories || loadingPromotions;
    const { pathname } = useLocation();
    const navigate = useNavigate();

    //everytime the categories or promotions change, update the active category or promotion
    useEffect(() => {
      const activeCategory = getActiveFilter("categoria");
      const activePromotion = getActiveFilter("promotion");

      if (activeCategory !== "") {
        setActiveItem({
          type: "category",
          value: activeCategory,
        });
      } else if (activePromotion !== "") {
        setActiveItem({
          type: "promotion",
          value: activePromotion,
        });
      } else {
        setActiveItem({
          type: null,
          value: null,
        });
      }
    }, [searchParams]);

    return (
      <section className="categories-side-bar">
        <ul>
          {loading ? (
            <CategoriesPromotionsSkeleton />
          ) : (
            <>
              {categories.map((category: CategoryType) => (
                <li
                  className={
                    category?.id == activeItem?.value &&
                    activeItem?.type === "category"
                      ? "item-selected"
                      : 'item-no-selected'
                  }
                  key={category.id}
                >
                  {category.id == activeItem.value &&
                  activeItem.type === "category" ? (
                    <button
                      className="quit-active-item-button"
                      onClick={() => removeFilter("categoria")}
                    >
                      <CloseIcon color="#000" />
                    </button>
                  ) : null}
                  <span
                    onClick={() => {
                      if (pathname !== "/store") {
                        return navigate(`/store?categoria=${category.id}`);
                      }
                      bulkSetFilters([
                        { name: "promotion", value: "" },
                        { name: "categoria", value: category.id },
                      ]);
                    }}
                  >
                    {category.nombre}
                  </span>
                </li>
              ))}
              {promotions.map((promotion: PromotionType) => (
                <li
                  className={
                    promotion.id == activeItem?.value &&
                    activeItem?.type === "promotion"
                      ? "item-selected"
                      : null
                  }
                  key={promotion.id}
                >
                  {promotion.id == activeItem.value &&
                  activeItem.type === "promotion" ? (
                    <button
                      className="quit-active-item-button"
                      onClick={() => removeFilter("promotion")}
                    >
                      <CloseIcon color="#000" />
                    </button>
                  ) : null}
                  <span
                    onClick={() => {
                      if (pathname !== "/store") {
                        return navigate(`/store?promotion=${promotion.id}`);
                      }
                      bulkSetFilters([
                        { name: "promotion", value: promotion.id },
                        { name: "categoria", value: "" },
                      ]);
                    }}
                  >
                    {promotion.name}
                  </span>
                </li>
              ))}
            </>
          )}
        </ul>
      </section>
    );
  }
);

export default CategoriePromotionSlider;

const CategoriesPromotionsSkeleton = () => (
  <>
    <Skeleton width="100px" height="25px" />
    <Skeleton width="100px" height="25px" />
    <Skeleton width="100px" height="25px" />
    <Skeleton width="100px" height="25px" />
    <Skeleton width="100px" height="25px" />
  </>
);
