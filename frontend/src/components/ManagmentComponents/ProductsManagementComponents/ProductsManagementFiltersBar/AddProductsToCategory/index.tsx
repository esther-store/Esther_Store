import "./index.css";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import type { CategoryType } from "@/Types";
import PerformMultipleButton from "../PerformMultipleButton";
import { showToast } from "@/utils/showToast";
import { useManageCategories } from "@/hooks/managementHooks/useManageCategories";
import { CheckIcon } from "@/icons/CheckIcon";

export function AddProductsToCategory({
  selectedProducts,
  setSelectedProducts,
  showCheckboxes,
  setShowCheckboxes,
  toastRef,
}) {
  const [showModal, setShowModal] = useState(false);
  const { categories, handleAddProductsToCategory } = useManageCategories({
    toastRef: toastRef,
    setCategoryFormProperties: () => {},
    setSelectedCategories: setSelectedProducts,
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(null);
  const { confirmMultiple, performMultipleButton } = PerformMultipleButton();
  return (
    <>
      {confirmMultiple({
        onCancel: () => {
          setShowCheckboxes(false);
          setSelectedCategory(null);
          setSelectedProducts([]);
        },
        onConfirm:() => {
          handleAddProductsToCategory({categoryId:selectedCategory?.id, products:selectedProducts})
          setShowCheckboxes(false)
          setSelectedCategory(null)
        }
      })}
      <Dialog
        visible={showModal}
        onHide={() => {
          setShowModal(false)
          setSelectedCategory(null)
        }}
        position="center"
        draggable={false}
        resizable={false}
        headerStyle={{ gap: "50px" }}
        header={"Selecciona una Categría"}
      >
        <ul className="add-product-to-category-list">
          {categories.map((category: CategoryType) => (
            <li
              key={category.id}
              style={
                selectedCategory?.id == category.id
                  ? { borderWidth: "3px", borderColor: "green" }
                  : null
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category.nombre}
            </li>
          ))}
          {performMultipleButton({
            buttonText: "Seleccionar",
            Icon: <CheckIcon color = "#fff"/> ,
            onPress: () => {
              if(selectedCategory == null){
                return showToast({
                  toastRef: toastRef,
                  summary: "Error",
                  detail: "Debes seleccionar alguna categoría",
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
        {selectedCategory && showModal === false ? (
          <span style={{ color: "red", display:'block' }}>{selectedCategory.nombre}</span>
        ) : (
          " Categoría"
        )}
      </button>
    </>
  );
}
