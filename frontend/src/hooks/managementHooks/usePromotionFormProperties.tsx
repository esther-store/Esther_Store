import type { PromotionType } from "@/Types";
import {
  createPromotionValues,
  getPromotionFormInitialValues,
} from "@/utils/promotionInitialValues";
import { useState } from "react";

export function usePromotionFormProperties() {
  const [promotionFormProperties, setPromotionFormProperties] = useState({
    show: false,
    initialValues: getPromotionFormInitialValues(),
    disabled: false,
    creatingMode: true,
  });

  function processUpdatePromotion(promotion: PromotionType) {
    setPromotionFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      initialValues: createPromotionValues({ promotion: promotion }),
      disabled: false,
    }));
  }

  function processDetailPromotion(promotion: PromotionType) {
    setPromotionFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      initialValues: createPromotionValues({ promotion: promotion }),
      disabled: true,
    }));
  }

  return {
    promotionFormProperties,
    setPromotionFormProperties,
    processUpdatePromotion,
    processDetailPromotion,
  };
}
