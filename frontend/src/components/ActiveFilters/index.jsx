import React, { useContext } from "react";
import QueryFiltersContext from "../../context/filtersContext";
import CloseIcon from "../../assets/close-icon.svg";
import { showActiveFilter } from "../../utils/showActiveFilter";
import "./index.css";

function ActiveFilters() {
  const { searchParams, removeFilter, getAllFilters } =
    useContext(QueryFiltersContext);

  return searchParams.size > 0 ? (
    <section className = "active-filters-container">
      <h5>Filtros Activos:</h5>
      <ul className="active-filters-list">
        {getAllFilters().map((filter) => (
          <li key={filter.name}>
            <span>{showActiveFilter({name: filter.name, value:filter.value})}</span>
            <button onClick={() => removeFilter(filter.name)}>
              <img src={CloseIcon.src} alt="close" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  ) : null;
}

export default ActiveFilters;
