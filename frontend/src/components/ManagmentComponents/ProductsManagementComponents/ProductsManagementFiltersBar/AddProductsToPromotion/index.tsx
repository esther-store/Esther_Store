import "./index.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useGetPromotionsToManage } from "@/hooks/managementHooks/useGetPromotionsToManage";

export function AddProductsToPromotion() {
  const [showModal, setShowModal] = useState(false);
  const {promotions} = useGetPromotionsToManage()
  return (
    <>
      <Dialog
        visible={showModal}
        onHide={() => setShowModal(false)}
        position="center"
        draggable={false}
        resizable={false}
      ></Dialog>
      <button
        className="btn-general-styles products-management-filters-bar-button"
        onClick={() => setShowModal(true)}
      >
        Agregar a Promoción
      </button>
    </>
  );
}
