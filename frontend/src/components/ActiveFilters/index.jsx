import React, { useContext } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import {CloseIcon} from "@/icons/CloseIcon";
import { showActiveFilter } from "@/utils/showActiveFilter";
import "./index.css";

const ActiveFilters = React.memo(function ActiveFilters() {
  const { searchParams, removeFilter, allActiveFilters } =
    useContext(QueryFiltersContext);

  return searchParams.size > 0 ? (
    <section className = "active-filters-container">
      <h5>Filtros Activos:</h5>
      <ul className="active-filters-list">
        {allActiveFilters.map((filter) => (
          <li key={filter.name}>
            <span>{showActiveFilter({name: filter.name, value:filter.value})}</span>
            <button onClick={() => removeFilter(filter.name)}>
              <CloseIcon width={22} height={22}/>
            </button>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
})

export default ActiveFilters;
