import { useManageCategories } from "@/hooks/useManageCategories";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Loader from "@/components/Loader";
import { ConfirmDialog } from "primereact/confirmdialog";
import CategoriesForm from "@/components/ManagmentComponents/CategoriesManagement/CategoriesForm";
import CategoriesDatatable from "@/components/ManagmentComponents/CategoriesManagement/CategoriesDatatable";
import CategoriesGrid from '@/components/ManagmentComponents/CategoriesManagement/CategoriesGrid'
import ButtonsAddAndDelete from "@/components/ManagmentComponents/CategoriesManagement/ButtonsAddAndDelete";
import {useIsMobileMode} from '@/hooks/useIsMobileMode'
import "@/store_pages/pagesStyles/ManagmentCategories.css";

function ManageCategories() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const toast = useRef(null);
  //categories form properties state
  const [categoryFormProperties, setCategoryFormProperties] = useState({
    show: false,
    initialValues: null,
    disabled: false,
    creatingMode: true,
  });
  //categories management hook
  const {
    categories,
    loadingCategories,
    handleDeleteCategory,
    handleDeleteMultipleCategories,
    handleCreateCategory,
    handleUpdateCategory,
  } = useManageCategories({
    toastRef: toast,
    setSelectedCategories: setSelectedCategories,
    setCategoryFormProperties: setCategoryFormProperties,
  });
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
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
    <main style = {{minHeight:'90vh', paddingTop:"50px"}}>
      <Toast ref={toast} position="bottom-center" />
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
    </main>
  );
}

export default ManageCategories;
