import PerformMultipleButton from "@/components/ManagmentComponents/ProductsManagementComponents/ProductsManagementFiltersBar/PerformMultipleButton";
import { CloseIcon } from "@/icons/CloseIcon";
import { otherActiveActionError } from "@/utils/showToast";

export function RemoveProductsPromotion({showCheckboxes, setShowCheckboxes, setSelectedProducts, selectedProducts, handleQuitProductsPromotion, toast}){
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
              handleQuitProductsPromotion(selectedProducts)
            },
          })}
          {multipleProductsPromotionDeletionButton({
              buttonText: "Quitar Promoción",
              Icon: <CloseIcon/>,
              evoidHideSpanOnMobile: true,
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