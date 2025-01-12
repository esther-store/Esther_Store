import { Dialog } from "primereact/dialog";
import React, { useContext } from "react";
import QueryFiltersContext from "../../context/filtersContext";
import "./index.css";
import PromotionCard from "./PromotionCard";

function PromotionsModal({ show, setShow, promotions, loadingPromotions }) {
  const { setFilter } = useContext(QueryFiltersContext);
  return (
    <Dialog
      visible={show}
      onHide={() => setShow(false)}
      position="top"
      draggable={false}
      resizable={false}
      style={{ width: "90vw", maxWidth: "850px" }}
      header = {"Ofertas"}
    >
      <section className="store-promotions-grid">
        {promotions.map((promotion) => (
          <PromotionCard    
          key = {promotion.id}
            promotion={promotion} 
            handleOnclick={() =>
              {
                setFilter({ name: "promotion", value: promotion.id })
                setShow(false)
              }}
          />

        ))}
      </section>
    </Dialog>
  );
}

export default PromotionsModal;
