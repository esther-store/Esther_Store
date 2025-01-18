import FilterIcon from "@/assets/icons/filter-icon.svg";
import { Dialog } from "primereact/dialog";
import React, { useState, useContext, useEffect } from "react";
import OrderingProducts from "@/components/OrderingProducts";
import CategoriesFilter from "./CategoriesFilter";
import {Checkbox} from 'primereact/checkbox'
import QueryFiltersContext from "@/context/filtersContext";
import "./index.css";
import PromotionsFilter from "./PromotionsFilter";

function FiltersModal() {
  const [showModal, setShowModal] = useState(false);
  const [recommendedFilterCheck, setRecommendedFilterCheck] = useState(false)
  const [inactiveFilterCheck, setInactiveFilterCheck] = useState(false)
  const {searchParams, setFilter, removeFilter, getActiveFilter} = useContext(QueryFiltersContext)

  function updateRecommendedFilter(value){
    value == true? setFilter({name:"recommended", value:value}): removeFilter("recommended")
    setRecommendedFilterCheck(value)
  }

  function updateInactiveFilter(value){
    value == true? setFilter({name:"is_active", value:!value}): removeFilter("is_active")
    setInactiveFilterCheck(value)
  }

  //update the recommende and inactive filter by the searchParams 
  useEffect(() => {
    getActiveFilter("recommended") == ""?setRecommendedFilterCheck(false):setRecommendedFilterCheck(true)
    getActiveFilter("is_active") == ""?setInactiveFilterCheck(false):setInactiveFilterCheck(true)
  },[searchParams])

  return (
    <section>
      <button
        className="products-management-filters-bar-button btn-general-styles"
        onClick={() => setShowModal(true)}
      >
        <img src={FilterIcon.src} />
        <span>Filtros</span>
      </button>
      <Dialog
        contentClassName="categories-mobile-modal-content products-management-filters-modal"
        visible={showModal}
        position="top"
        showHeader={false}
        draggable={false}
        resizable={false}
      >
        <button
          className="close-modal-button btn-general-styles"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <OrderingProducts onOrdering = {() => setShowModal(false)}/>
        <div style = {{height:"10px"}}/>
        <CategoriesFilter onCategorySelect={() => setShowModal(false)}/>
        <div style = {{height:"10px"}}/>
        <PromotionsFilter onPromotionSelect={() => setShowModal(false)}/>
        {/*products recommended filter*/}
        <div className="recommended-products-checkbox">
          <Checkbox
            id="recommended"
            aria-describedby="recommended-help"
            checked={recommendedFilterCheck}
            onChange={(e) => updateRecommendedFilter(e.checked)}
          />
          <label htmlFor="active">Recommendados</label>
        </div>
        {/*inactive products filter*/}
        <div className="recommended-products-checkbox">
          <Checkbox
            id="inactive"
            aria-describedby="inactive-help"
            checked={inactiveFilterCheck}
            onChange={(e) => updateInactiveFilter(e.checked)}
          />
          <label htmlFor="active">No Visibles</label>
        </div>
      </Dialog>
    </section>
  );
}

export default FiltersModal;
