import { RemovePageLoader } from "@/components/RemovePageLoader";
import "../pagesStyles/ManagementPromotions.css";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
import PromotionsGrid from "@/components/ManagmentComponents/PromotionsManagementComponents/PromotionsGrid";
import ButtonsAddAndDelete from "@/components/ManagmentComponents/CategoriesManagement/ButtonsAddAndDelete";
import { useState } from "react";
import DeleteMultipleElementsButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/DeleteMultipleElementsButton";

export default function ManagementPromotions() {
  const [selectedPromotions, setSelectedPromotions] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);
  return (
    <article>
      <RemovePageLoader />
      <ManagementProductsPageHeader title="Administrar Promociones" />
      <ButtonsAddAndDelete setCategoryFormProperties={(propr) => {}}>
        <DeleteMultipleElementsButton
          selectedItems={selectedPromotions}
          setSelectedItems={setSelectedPromotions}
          handleDeleteMultiple={() => {}}
          showCheckboxes={showCheckboxes}
          setShowCheckboxes={setShowCheckboxes}
        />
      </ButtonsAddAndDelete>
      <PromotionsGrid
        showCheckboxes={showCheckboxes}
        selectedPromotions={selectedPromotions}
      />
    </article>
  );
}
