import { deletePromotions } from "@/services/ManagePromotions/deletePromotions.js";
import { updateCategory } from "@/services/ManageCategories/updateCategory.js";
import { showToast } from "@/utils/showToast.js";
import { useMutation } from "@tanstack/react-query";
import type { CategoryIdType, PromotionType } from "@/Types.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import React, { useContext } from "react";
import { useGetPromotionsToManage } from "./useGetPromotionsToManage.js";
import { validatePromotionValues } from "@/utils/promotionInitialValues.js";
import { createPromotion } from "@/services/ManagePromotions/createPromotion.js";

export function useManagePromotions({
  toastRef,
  setSelectedPromotions,
  setPromotionFormProperties,
}) {
  const { auth } = useContext<any>(AuthenticationContext);
  const { promotions, loading, errorGettingPromotions, refetchPromotions } =
    useGetPromotionsToManage();

  const { mutate: handleCreatePromotion, isPending: creatingPromotion } =
    useMutation({
      mutationFn: (promotion: PromotionType) => {
        if(validatePromotionValues({ promotion: promotion })){
          return createPromotion({
            name: promotion.name,
            description: promotion.description,
            active: promotion.active,
            img: promotion.img,
            discount_in_percent: promotion.discount_in_percent,
            is_special: promotion.is_special,
            token: auth.token,
          });
        }
      },
      onSuccess: () => {
        setSelectedPromotions([]);
        setPromotionFormProperties((prev) => ({ ...prev, show: false }));
        refetchPromotions();
        showToast({
          toastRef: toastRef,
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      },
      onError: (err) => {
        showToast({
          toastRef: toastRef,
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      },
    });

  const { mutate: handleDeletePromotions, isPending: deletingPromotions } =
    useMutation({
      mutationFn: (promotions: PromotionType[]) => {
        if (promotions == null || promotions.length === 0) {
          throw new Error("Debes seleccionar alguna promoción");
        }
        const promotionIds = promotions.map((promotion) => promotion.id);
        return deletePromotions({
          promotions: promotionIds,
          token: auth.token,
        });
      },
      onSuccess: () => {
        setSelectedPromotions([]);
        refetchPromotions();
        showToast({
          toastRef: toastRef,
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      },
      onError: () => {
        showToast({
          toastRef: toastRef,
          severity: "error",
          summary: "Error",
          detail: "Fallo en la Operación",
        });
      },
    });

  const { mutate: handleUpdateCategory, isPending: updatingPromotion } =
    useMutation({
      mutationFn: ({
        id,
        name,
        img,
      }: {
        id: CategoryIdType;
        name: string;
        img: string;
      }) => {
        if (name == null || name === "") {
          throw new Error("Debes ingresar un nombre");
        }
        return updateCategory({
          id: id,
          name: name,
          img: img,
          token: auth.token,
        });
      },
      onSuccess: () => {
        refetchPromotions();
        setSelectedPromotions([]);
        setPromotionFormProperties((prev) => ({ ...prev, show: false }));
        showToast({
          toastRef: toastRef,
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      },
      onError: (err) => {
        showToast({
          toastRef: toastRef,
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      },
    });

  const loadingPromotions =
    loading || deletingPromotions || updatingPromotion || creatingPromotion;

  return {
    promotions,
    loadingPromotions,
    errorGettingPromotions,
    refetchPromotions,
    handleDeletePromotions,
    handleCreatePromotion,
    handleUpdateCategory,
  };
}
