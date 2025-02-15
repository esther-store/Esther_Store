import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";
import { TagXIcon } from "@/icons/TagXIcon";
import { otherActiveActionError } from "@/utils/showToast";

export function RemoveProductsCategory({showCheckboxes, setShowCheckboxes, setSelectedProducts, toast}){
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
              alert("Delete category");
            },
          })}
          {multipleProductsCategoryDeletionButton({
              buttonText: "Eliminar Categoría",
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