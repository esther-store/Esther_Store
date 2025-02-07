import "./index.css";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { orderingValues } from "@/constants";

const OrderingProducts = React.memo(function OrderingProducts({
  onOrdering = () => {},
  dropdownIcon = () => {},
  fixedPlaceholder = false,
  placeholder = "Ordenar",
  style = {}
}) {
  const { searchParams, setFilter, getActiveFilter, removeFilter } =
    useContext(QueryFiltersContext);
  const [ordering, setOrdering] = useState();

  //update the ordering filter value
  function handleSetOrdering(value) {
    value.code == ""
      ? removeFilter("ordering")
      : setFilter({ name: "ordering", value: value.code });
  }

  //get the currrent ordering filter value from the searchParams context
  useEffect(() => {
    if(!fixedPlaceholder){
      setOrdering(
        orderingValues.find((value) => value.code == getActiveFilter("ordering"))
      );
    }
  }, [searchParams]);

  return (
    <Dropdown
      value={ordering}
      style = {style}
      onChange={(e) => {
        handleSetOrdering(e.value);
        onOrdering();
      }}
      options={orderingValues}
      optionLabel="name"
      placeholder={placeholder}
      className="w-full md:w-14rem order-button"
      dropdownIcon={dropdownIcon()}
      collapseIcon={dropdownIcon()}
    />
  );
});

export default OrderingProducts;
