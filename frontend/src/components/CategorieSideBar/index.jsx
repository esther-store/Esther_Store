import React, { useState, useEffect, useContext, Suspense } from "react";
import QueryFilterContext from "../../context/filtersContext";
import CategoryIcon from "../../assets/category-icon.svg";
import CategoriesList from "./CategoriesList";
import { Dialog } from "primereact/dialog";
import { useIsMobileMode } from "../../hooks/useIsMobileMode";
import PromotionsModal from "../PromotionsModal";
import "./index.css";

function CategorieSideBar({forceMobileMode = false, loading, categories, promotions, loadingPromotions}) {
  const {mobileMode} = useIsMobileMode({forceMobileMode:forceMobileMode})
  const [showModal, setShowModal] = useState(false);
  const [showPromotionsModal, setShowPromotionsModal] = useState(false)
  const [activeCategory, setActiveCategory] = useState(null);
  const { searchParams, setFilter, getActiveFilter, removeFilter } = useContext(QueryFilterContext);

  function handleSetActiveCategory(category) {
    setActiveCategory(category);
    setShowModal(false);
  }

  //everytime the categories change, update the active category
  useEffect(() => {
    setActiveCategory(getActiveFilter("categoria"));
  },[categories, searchParams])

  function getActiveCategoryName(){
    const matchedCategory = categories.find(category => category.id == getActiveFilter("categoria"));
    return matchedCategory !== undefined && matchedCategory !== null ? matchedCategory.nombre : "Categorias"
  }

  return (
    <>
      <PromotionsModal
          show={showPromotionsModal}
          setShow={setShowPromotionsModal}
          promotions={promotions}
          loadingPromotions={loadingPromotions}
        />
      {forceMobileMode === true || mobileMode === true? (
        <section className="mobile-mode-categories-container">
          <h3 className="h3-title">Productos</h3>
          <button
            onClick={() => setShowModal(true)}
            className="show-categories-modal-button btn-general-styles"
          >
            <span>{getActiveCategoryName()}</span>
            <img src={CategoryIcon.src} />
          </button>
            <Dialog
              contentClassName="categories-mobile-modal-content"
              visible={showModal}
              position="top"
              showHeader={false}
              draggable = {false}
              resizable = {false}
            >
              <button
                className="modal-close-button btn-general-styles"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
                <CategoriesList
                  categories={categories}
                  loading={loading}
                  setActiveCategory={handleSetActiveCategory}
                  setFilter={setFilter}
                  removeFilter={removeFilter}
                  activeCategory={activeCategory}
                  showPromotionsModal = {setShowPromotionsModal}
                  getActiveFilter = {getActiveFilter}
                />
            </Dialog>
        </section>
      ) :(
          <CategoriesList
            categories={categories}
            loading={loading}
            setActiveCategory={handleSetActiveCategory}
            setFilter={setFilter}
            removeFilter={removeFilter}
            activeCategory={activeCategory}
            showPromotionsModal = {setShowPromotionsModal}
            getActiveFilter = {getActiveFilter}
          />
      )}
    </>
  );
}

export default CategorieSideBar;
