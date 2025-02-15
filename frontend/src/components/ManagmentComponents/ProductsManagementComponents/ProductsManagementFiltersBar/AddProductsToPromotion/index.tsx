import "./index.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import type { PromotionType } from "@/Types";
import PerformMultipleButton from "../PerformMultipleButton";
import { showToast } from "@/utils/showToast";
import { CheckIcon } from "@/icons/CheckIcon";
import { useManagePromotions } from "@/hooks/managementHooks/useManagePromotions";

export function AddProductsToPromotion({
  selectedProducts,
  setSelectedProducts,
  showCheckboxes,
  setShowCheckboxes,
  toastRef,
}) {
  const [showModal, setShowModal] = useState(false);
  const { promotions, handleAddProductsToPromotion } = useManagePromotions({
    toastRef: toastRef,
    setPromotionFormProperties: () => {},
    setSelectedPromotions: setSelectedProducts,
  });
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionType>(null);
  const { confirmMultiple, performMultipleButton } = PerformMultipleButton();
  return (
    <>
      {confirmMultiple({
        onCancel: () => {
          setShowCheckboxes(false);
          setSelectedPromotion(null);
          setSelectedProducts([]);
        },
        onConfirm:() => {
          handleAddProductsToPromotion({promotionId:selectedPromotion?.id, products:selectedProducts})
          setShowCheckboxes(false)
          setSelectedPromotion(null)
        }
      })}
      <Dialog
        visible={showModal}
        onHide={() => setShowModal(false)}
        position="center"
        draggable={false}
        resizable={false}
        headerStyle={{ gap: "50px" }}
        header={"Selecciona una Promoción"}
      >
        <ul className="add-product-to-promotion-list">
          {promotions.map((promotion: PromotionType) => (
            <li
              key={promotion.id}
              style={
                selectedPromotion?.id == promotion.id
                  ? { borderWidth: "3px", borderColor: "green" }
                  : null
              }
              onClick={() => setSelectedPromotion(promotion)}
            >
              {promotion.name}
            </li>
          ))}
          {performMultipleButton({
            buttonText: "Seleccionar",
            Icon: <CheckIcon color = "#fff"/> ,
            onPress: () => {
              if(selectedPromotion == null){
                return showToast({
                  toastRef: toastRef,
                  summary: "Error",
                  detail: "Debes seleccionar alguna promoción",
                  severity: "error",
                  life: 1000,
                });
              }
              setShowModal(false);
              setShowCheckboxes(true);
            },
          })}
        </ul>
      </Dialog>
      <button
        className="btn-general-styles products-management-filters-bar-button"
        onClick={() => {
          if (showCheckboxes) {
            return showToast({
              toastRef: toastRef,
              summary: "Error",
              detail: "Ya hay una acción en proceso",
              severity: "error",
              life: 1000,
            });
          }
          setShowModal(true);
        }}
      >
        Agregar a
        {selectedPromotion && showModal === false ? (
          <span style={{ color: "red", display:'block' }}>{selectedPromotion.name}</span>
        ) : (
          " Promoción"
        )}
      </button>
    </>
  );
}
