import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";
import { otherActiveActionError } from "@/utils/showToast";

export function RemoveProductsPromotion({showCheckboxes, setShowCheckboxes, setSelectedProducts, toast}){
    const {
        confirmMultiple: confirmMultipleProductsPromotionDeletion,
        performMultipleButton: multipleProductsPromotionDeletionButton,
      } = PerformMultipleButton();
    return(
        <>
        {confirmMultipleProductsPromotionDeletion({
            onCancel: () => {
              setShowCheckboxes(false);
              setSelectedProducts([]);
            },
            onConfirm: () => {
              setShowCheckboxes(false);
              alert("delete promotion");
            },
          })}
          {multipleProductsPromotionDeletionButton({
              buttonText: "Eliminar Promoción",
              onPress: () => {
                if (showCheckboxes) {
                  return otherActiveActionError(toast);
                }
                setShowCheckboxes(true);
              },
            })}
        </>
    )
}