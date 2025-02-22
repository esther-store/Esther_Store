import "./index.css";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useLocation, useNavigate } from "react-router-dom";

function CategoriesDropdown({ onCategorySelect = () => {} }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { searchParams, setFilter, getActiveFilter, removeFilter } =
    useContext(QueryFiltersContext);
  const [category, setCategory] = useState();
  const { categories, loading: loadingCategories } = useGetCategories();
  const categoriesValues = loadingCategories
    ? [{ name: "Cargando ...", code: null }]
    : [{ name: "Categorías", code: "" }].concat(
        categories.map((category) => ({
          name: category.nombre,
          code: category.id,
        }))
      );

  //update the category filter value
  function handleSetCategory(value) {
    if (value.code == "") return removeFilter("categoria");
    if (pathname !== "/store")
      return navigate(`/store?categoria=${value.code}`);
    setFilter({ name: "categoria", value: value.code });
  }

  //get the currrent category filter value from the searchParams context
  useEffect(() => {
    if (!loadingCategories) {
      setCategory(
        categoriesValues.find(
          (value) => value.code == getActiveFilter("categoria")
        )
      );
    }
  }, [searchParams, loadingCategories]);

  return (
    <Dropdown
      value={category}
      onChange={(e) => {
        if (e?.value?.code != null) {
          handleSetCategory(e.value);
          onCategorySelect();
        }
      }}
      panelClassName="navbar-categories-dropdown-panel"
      options={categoriesValues}
      optionLabel="name"
      placeholder="Categorías"
      className="w-full md:w-14rem navbar-categories-dropdown"
    />
  );
}

export default CategoriesDropdown;
