import { useManageCategories } from "@/hooks/useManageCategories";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Loader from "@/components/Loader";
import CategoriesForm from "@/components/ManagmentComponents/CategoriesManagement/CategoriesForm";
import CategoriesGrid from "@/components/ManagmentComponents/CategoriesManagement/CategoriesGrid";
import ButtonsAddAndDelete from "@/components/ManagmentComponents/CategoriesManagement/ButtonsAddAndDelete";
import "@/store_pages/pagesStyles/ManagmentCategories.css";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";

function ManagementCategories() {
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
  function processUpdateCategory({ id, nombre, img }) {
    setCategoryFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      initialValues: {
        id: id,
        name: nombre,
        img: img,
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
        img: img,
      },
      disabled: true,
    }));
  }
  return (
    <main style={{ width: "100%", minHeight: "90vh" }}>
      <Toast ref={toast} position="bottom-center" />
      <ManagementProductsPageHeader title = "Categories Management"/>
      {loadingCategories ? (
        <section style = {{position:'absolute', top:"50%", left:"50%", transform:"translate(-50%, -50%)"}}>
          <Loader />
        </section>
      ) : (
        <section>
          <CategoriesForm
            categoryFormProperties={categoryFormProperties}
            setCategoryFormProperties={setCategoryFormProperties}
            handleCreateCategory={handleCreateCategory}
            handleUpdateCategory={handleUpdateCategory}
            loading={loadingCategories}
          />
          <ButtonsAddAndDelete
            setCategoryFormProperties={setCategoryFormProperties}
            handleDeleteMultipleCategories={handleDeleteMultipleCategories}
            selectedCategories={selectedCategories}
          />
          <CategoriesGrid
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleDeleteCategory={handleDeleteCategory}
            processUpdateCategory={processUpdateCategory}
            processDetailCategory={processDetailCategory}
          />
        </section>
      )}
    </main>
  );
}

export default ManagementCategories;
