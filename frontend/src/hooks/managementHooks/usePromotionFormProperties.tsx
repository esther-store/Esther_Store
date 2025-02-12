import { useState } from "react";

export function usePromotionFormProperties() {
  
  const [promotionFormProperties, setPromotionFormProperties] = useState({
    show: false,
    initialValues: null,
    disabled: false,
    creatingMode: true,
  });
  
  function processUpdatePromotion({ id, nombre, img }) {
    setPromotionFormProperties((prev) => ({
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

  function processDetailPromotion({ id, nombre, img }) {
    setPromotionFormProperties((prev) => ({
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

  return {promotionFormProperties, setPromotionFormProperties, processUpdatePromotion, processDetailPromotion}
}
