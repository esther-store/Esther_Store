import "./index.css";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { useGetPromotionsToManage } from "@/hooks/managementHooks/useGetPromotionsToManage";

function PromotionsFilter({onPromotionSelect = () => {}}) {
  const { searchParams, setFilter, getActiveFilter, removeFilter } = useContext(QueryFiltersContext);
  const [promotion, setPromotion] = useState();
  const {promotions} = useGetPromotionsToManage()
  const promotionsValues = [{name:"Promoción: Todas", code:""}].concat(promotions.map(promotion => ({name:promotion.name, code: promotion.id})))
  
  //update the promotion filter value
  function handleSetPromotion(value) {
    value.code == ""?removeFilter("promotion"):setFilter({ name: "promotion", value: value.code });
  }

  //get the currrent promotion filter value from the searchParams context
  useEffect(() => {
    setPromotion(promotionsValues.find((value) => value.code == getActiveFilter("promotion")))
  },[searchParams, promotions])

  return (
    <Dropdown
      value={promotion}
      onChange={(e) => {
        handleSetPromotion(e.value)
        onPromotionSelect()
      }}
      options={promotionsValues}
      optionLabel="name"
      placeholder="Promoción"
      className="w-full md:w-14rem products-management-promotions-filter-button"
    />
  );
}

export default PromotionsFilter;
