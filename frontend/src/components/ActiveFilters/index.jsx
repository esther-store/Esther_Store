import React, { useContext } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { CloseIcon } from "@/icons/CloseIcon";
import { showActiveFilter } from "@/utils/showActiveFilter";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import "./index.css";

function ActiveFilters() {
  const { searchParams, removeFilter, allActiveFilters, getActiveFilter } =
    useContext(QueryFiltersContext);

  //evoid showing active filters bar when searching is the only filter
  const showActiveFiltersBar =
    searchParams.size > 0 &&
    !(searchParams.size === 1 && getActiveFilter('search') !== "");

  const { categories } = useGetCategories();
  const { promotions } = useGetPromotions();

  return (
    <section
      style={{ display: showActiveFiltersBar ? "flex" : "none" }}
      className="active-filters-container"
    >
      <h5>Filtros Activos</h5>
      <ul className="active-filters-list">
        {allActiveFilters.map((filter) =>
          filter.name === "search" ? null : (
            <li key={filter.name}>
              <span>
                {showActiveFilter({
                  name: filter.name,
                  value: filter.value,
                  categories: categories,
                  promotions: promotions,
                })}
              </span>
              <button onClick={() => removeFilter(filter.name)}>
                <CloseIcon width={22} height={22} />
              </button>
            </li>
          )
        )}
      </ul>
    </section>
  );
}

export default ActiveFilters;
