import { useManageCategories } from "@/hooks/managementHooks/useManageCategories";
import { useState, useRef } from "react";
import { Toast } from "primereact/toast";
import Loader from "@/components/Loaders/Loader";
import CategoriesForm from "@/components/ManagmentComponents/CategoriesManagement/CategoriesForm";
import CategoriesGrid from "@/components/ManagmentComponents/CategoriesManagement/CategoriesGrid";
import ButtonsAddAndDelete from "@/components/ManagmentComponents/CategoriesManagement/ButtonsAddAndDelete";
import "@/store_pages/pagesStyles/ManagmentCategories.css";
import RetryQueryComponent from "@/components/RetryQueryComponent";
import { useCategoryFormProperties } from "@/hooks/managementHooks/useCategoryFormProperties";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import { RemovePageLoader } from "@/components/RemovePageLoader";
import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";

function ManagementCategories() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const { confirmMultiple, performMultipleButton } = PerformMultipleButton();
  const toast = useRef(null);

  //category form properties
  const {
    categoryFormProperties,
    setCategoryFormProperties,
    processUpdateCategory,
    processDetailCategory,
  } = useCategoryFormProperties();

  //categories management hook
  const {
    categories,
    loadingCategories,
    errorGettingCategories,
    handleDeleteCategories,
    handleCreateCategory,
    handleUpdateCategory,
    refetchCategories,
  } = useManageCategories({
    toastRef: toast,
    setSelectedCategories: setSelectedCategories,
    setCategoryFormProperties: setCategoryFormProperties,
  });

  return (
    <main style={{ width: "100%", minHeight: "90vh" }}>
      <meta name="robots" content="noindex"></meta>
      <RemovePageLoader />
      <Toast ref={toast} position="bottom-center" />
      <ManagementProductsPageHeader title="Categories Management" justifyContent="center"/>
      {loadingCategories ? (
        <section style={styles.loaderContainer}>
          <Loader />
        </section>
      ) : null}
      {errorGettingCategories ? (
        <section
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <RetryQueryComponent
            message={"Error obteniendo las categorías"}
            refetch={refetchCategories}
          />
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
            handleDeleteMultipleCategories={handleDeleteCategories}
            selectedCategories={selectedCategories}
          >
            {performMultipleButton({ onPress: () => setShowCheckboxes(true), evoidHideSpanOnMobile: true })}
            {confirmMultiple({
              onCancel: () => {
                setShowCheckboxes(false);
                setSelectedCategories([]);
              },
              onConfirm:() => {
                handleDeleteCategories(selectedCategories)
                setShowCheckboxes(false)
              }
            })}
          </ButtonsAddAndDelete>
          {categories.length === 0?
          <div style = {{textAlign:"center", marginTop:"100px", fontFamily:"Poppins-Regular"}}>No hay Categorías</div>
          :
          <CategoriesGrid
            showCheckboxes={showCheckboxes}
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            handleDeleteCategories={handleDeleteCategories}
            processUpdateCategory={processUpdateCategory}
            processDetailCategory={processDetailCategory}
          />
          }
        </section>
      )}
    </main>
  );
}

export default ManagementCategories;

const styles = {
  loaderContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
  },
};
