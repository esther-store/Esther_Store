import "./index.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useGetCategoriesToManage } from "@/hooks/managementHooks/useGetCategoriesToManage";

export function AddProductsToCategory() {
  const [showModal, setShowModal] = useState(false);
  const {categories} = useGetCategoriesToManage()
  return (
    <>
      <Dialog
        visible={showModal}
        onHide={() => setShowModal(false)}
        position="center"
        draggable={false}
        resizable={false}
      >
        
      </Dialog>
      <button className="btn-general-styles products-management-filters-bar-button" onClick={() => setShowModal(true)}>
        Agregar a Categoría
      </button>
    </>
  );
}
