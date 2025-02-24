import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";
import { TagXIcon } from "@/icons/TagXIcon";
import { otherActiveActionError } from "@/utils/showToast";

export function RemoveProductsCategory({showCheckboxes, setShowCheckboxes, selectedProducts, setSelectedProducts, toast, handleQuitProductsCategory}){
    const {
        confirmMultiple: confirmMultipleProductsCategoryDeletion,
        performMultipleButton: multipleProductsCategoryDeletionButton,
      } = PerformMultipleButton();
    return(
        <>
        {confirmMultipleProductsCategoryDeletion({
            onCancel: () => {
              setShowCheckboxes(false);
              setSelectedProducts([]);
            },
            onConfirm: () => {
              setShowCheckboxes(false);
              handleQuitProductsCategory(selectedProducts)
            },
          })}
          {multipleProductsCategoryDeletionButton({
              buttonText: "Quitar Categoría",
              onPress: () => {
                if (showCheckboxes) {
                  return otherActiveActionError(toast);
                }
                setShowCheckboxes(true);
              },
              Icon:<TagXIcon/>
            })}
        </>
    )
}