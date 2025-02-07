import "./index.css";
import { Dropdown } from "primereact/dropdown";
import React, { useContext, useState, useEffect } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { useGetPromotions } from "@/hooks/useGetPromotionsFromProducts";
import type { PromotionType } from "@/Types";

function PromotionsDropdown({ onPromotionSelect = () => {} }) {
  const { searchParams, setFilter, getActiveFilter, removeFilter } =
    useContext<any>(QueryFiltersContext);
  const [promotion, setPromotion] = useState<{ name: string; code: string }>();
  const { promotions } = useGetPromotions();
  const promotionsValues = [{ name: "Promociones", code: "" }].concat(
    promotions.map((promotion: PromotionType) => ({
      name: promotion.name,
      code: promotion.id.toString(),
    }))
  );

  //update the promotion filter value
  function handlesetPromotion(value: { name: string; code: string }) {
    value.code == ""
      ? removeFilter("promotion")
      : setFilter({ name: "promotion", value: value.code });
  }

  //get the currrent promotion filter value from the searchParams context
  useEffect(() => {
    setPromotion(
      promotionsValues.find(
        (value) => value.code == getActiveFilter("promotion")
      )
    );
  }, [searchParams, promotions]);

  return (
    <Dropdown
      value={promotion}
      onChange={(e) => {
        handlesetPromotion(e.value);
        onPromotionSelect();
      }}
      panelClassName="navbar-promotions-dropdown-panel"
      options={promotionsValues}
      optionLabel="name"
      placeholder="Promociones"
      className="w-full md:w-14rem navbar-promotions-dropdown"
    />
  );
}

export default PromotionsDropdown;
