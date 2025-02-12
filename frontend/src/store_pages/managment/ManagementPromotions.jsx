import { RemovePageLoader } from "@/components/RemovePageLoader";
import "../pagesStyles/ManagementPromotions.css";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import PromotionsGrid from "@/components/ManagmentComponents/PromotionsManagementComponents/PromotionsGrid";
import ButtonsAddAndDelete from "@/components/ManagmentComponents/CategoriesManagement/ButtonsAddAndDelete";
import { useState, useRef } from "react";
import DeleteMultipleElementsButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/DeleteMultipleElementsButton";
import { useManagePromotions } from "@/hooks/managementHooks/useManagePromotions";
import { Toast } from "primereact/toast";

export default function ManagementPromotions() {
  const toast = useRef(null);
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  const { promotions, handleDeletePromotions } = useManagePromotions({
    toastRef: toast,
    setPromotionFormProperties: () => {},
    setSelectedPromotions: setSelectedPromotions,
  });
  return (
    <article>
      <meta name="robots" content="noindex"></meta>
      <Toast ref={toast} position="bottom-center" />
      <RemovePageLoader />
      <ManagementProductsPageHeader title="Administrar Promociones" />
      <ButtonsAddAndDelete setCategoryFormProperties={(props) => {}}>
        <DeleteMultipleElementsButton
          selectedItems={selectedPromotions}
          setSelectedItems={setSelectedPromotions}
          handleDeleteMultiple={handleDeletePromotions}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
        />
      </ButtonsAddAndDelete>
      <PromotionsGrid
        setSelectedPromotions={setSelectedPromotions}
        showCheckboxes={showCheckboxes}
        selectedPromotions={selectedPromotions}
      />
    </article>
  );
}
