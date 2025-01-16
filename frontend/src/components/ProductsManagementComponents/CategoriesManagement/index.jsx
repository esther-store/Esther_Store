import { Dialog } from "primereact/dialog";
import Loader from "../../Loader";
import { ConfirmDialog } from "primereact/confirmdialog";
import React, { useState } from "react";
import CategoriesForm from "./CategoriesForm";
import CategoriesDatatable from "./CategoriesDatatable";
import CategoriesGrid from './CategoriesGrid'
import ButtonsAddAndDelete from "./ButtonsAddAndDelete";
import TagIcon from "@/assets/icons/tag-icon.svg";
import {useIsMobileMode} from '@/hooks/useIsMobileMode'
import "./index.css";

const CategoriesManagement = React.memo(function CategoriesManagement({
  loadingCategories,
  categories,
  selectedCategories,
  setSelectedCategories,
  categoryFormProperties,
  setCategoryFormProperties,
  handleCreateCategory,
  handleUpdateCategory,
  handleDeleteCategory,
  handleDeleteMultipleCategories
}) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [show, setShow] = useState(false);
  const {mobileMode} = useIsMobileMode({forceMobileMode: false})

  function processUpdateCategory({ id, nombre, img }) {
    setCategoryFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      initialValues: {
        id: id,
        name: nombre,
        img:img
      },
      disabled: false,
    }));
  }

  function processDetailCategory({ id, nombre, img }) {
    setCategoryFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      initialValues: {
        id: id,
        name: nombre,
        img:img
      },
      disabled: true,
    }));
  }

  return (
    <section className = "categories-management">
      <button
        className="products-management-filters-bar-button btn-general-styles"
        onClick={() => setShow(true)}
      >
        <img src={TagIcon.src} />
        <span>Categorias</span>
      </button>
      <Dialog
        header={"Administrar Categorías"}
        visible={show}
        position={"top"}
        onHide={() => setShow(false)}
        style={{ maxWidth: "100vw", minWidth:"350px" }}
        draggable={false}
        resizable={false}
      >
        <section className="categories-management-modal-content-container">
          {loadingCategories ? (
            <section className="categories-management-list-loader-container">
                <Loader />
            </section>
          ) : null}
          <section>
            <ConfirmDialog
              visible={showConfirmDialog}
              onHide={() => setShowConfirmDialog(false)}
              acceptClassName="p-button-danger"
              acceptLabel="Aceptar"
              rejectLabel="Cancelar"
              message="Deseas continuar con la operación?"
              header="Confirmación"
              icon="pi pi-exclamation-triangle"
              accept={() => handleDeleteMultipleCategories(selectedCategories)}
              style={{maxWidth:"90%"}}
            />
            <CategoriesForm
              categoryFormProperties={categoryFormProperties}
              setCategoryFormProperties={setCategoryFormProperties}
              handleCreateCategory={handleCreateCategory}
              handleUpdateCategory={handleUpdateCategory}
              loading={loadingCategories}
            />
            <ButtonsAddAndDelete
              setCategoryFormProperties={setCategoryFormProperties}
              setShowConfirmDialog={setShowConfirmDialog}
            />
            {mobileMode?
            <CategoriesGrid
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              handleDeleteCategory={handleDeleteCategory}
              processUpdateCategory={processUpdateCategory}
              processDetailCategory={processDetailCategory}
            />
            :
            <CategoriesDatatable
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              handleDeleteCategory={handleDeleteCategory}
              processUpdateCategory={processUpdateCategory}
              processDetailCategory={processDetailCategory}
            />
          }
          </section>
        </section>
      </Dialog>
    </section>
  );
})

export default CategoriesManagement;
