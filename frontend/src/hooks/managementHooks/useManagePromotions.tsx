import { deletePromotions } from "@/services/ManagePromotions/deletePromotions.js";
import { createCategory } from "@/services/ManageCategories/createCategory.js";
import { updateCategory } from "@/services/ManageCategories/updateCategory.js";
import { showToast } from "@/utils/showToast.js";
import { useMutation } from "@tanstack/react-query";
import type { CategoryType, CategoryIdType, PromotionType } from "@/Types.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import React, { useContext } from "react";
import { useGetPromotionsToManage } from "./useGetPromotionsToManage.js";

export function useManagePromotions({
  toastRef,
  setSelectedPromotions,
  setPromotionFormProperties,
}) {
  
  const { auth } = useContext<any>(AuthenticationContext);
  const {promotions, loading, errorGettingPromotions, refetchPromotions} = useGetPromotionsToManage()

  const { mutate: handleCreateCategory, isPending: creatingPromotion } =
    useMutation({
      mutationFn: ({ name, img }: { name: string; img: string }) => {
        if (name == null || name === "") {
          throw new Error("Debes ingresar un nombre");
        }
        return createCategory({ name: name, img: img, token: auth.token });
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
        return deletePromotions({ promotions: promotionIds, token: auth.token });
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
    handleCreateCategory,
    handleUpdateCategory,
  };
}
