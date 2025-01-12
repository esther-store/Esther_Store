import "./index.css";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect } from "react";
import QueryFiltersContext from "../../context/filtersContext";
import { orderingValues } from "../../constants";

function OrderingProducts() {
  const { searchParams, setFilter, getActiveFilter, removeFilter } = useContext(QueryFiltersContext);
  const [ordering, setOrdering] = useState();

  //update the ordering filter value
  function handleSetOrdering(value) {
    value.code == ""?removeFilter("ordering"):setFilter({ name: "ordering", value: value.code });
  }

  //get the currrent ordering filter value from the searchParams context
  useEffect(() => {
    setOrdering(orderingValues.find((value) => value.code == getActiveFilter("ordering")))
  },[searchParams])

  return (
    <Dropdown
      value={ordering}
      onChange={(e) => handleSetOrdering(e.value)}
      options={orderingValues}
      optionLabel="name"
      placeholder="Ordenar"
      className="w-full md:w-14rem order-button"
    />
  );
}

export default OrderingProducts;
