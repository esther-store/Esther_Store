import { deletePromotions } from "@/services/ManagePromotions/deletePromotions.js";
import { showToast } from "@/utils/showToast.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ProductType, PromotionIdType, PromotionType } from "@/Types.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import React, { useContext } from "react";
import { useGetPromotionsToManage } from "./useGetPromotionsToManage.js";
import { validatePromotionValues } from "@/utils/promotionInitialValues.js";
import { createPromotion } from "@/services/ManagePromotions/createPromotion.js";
import { updatePromotion } from "@/services/ManagePromotions/updatePromotion.js";
import { addProductsToPromotion } from "@/services/ManagePromotions/addProductsToPromotion.js";
import { deleteProductsFromPromotion } from "@/services/ManagePromotions/deleteProductsFromPromotion.js";

export function useManagePromotions({
  toastRef,
  setSelectedPromotions,
  setPromotionFormProperties,
}) {
  const { auth } = useContext<any>(AuthenticationContext);
  const queryClient = useQueryClient();
  const { promotions, loading, errorGettingPromotions, refetchPromotions } =
    useGetPromotionsToManage();

  //create promotion
  const { mutate: handleCreatePromotion, isPending: creatingPromotion } =
    useMutation({
      mutationFn: (promotion: PromotionType) => {
        if (validatePromotionValues({ promotion: promotion })) {
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

  //delete promotions
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
      onError: (err) => {
        showToast({
          toastRef: toastRef,
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      },
    });

  //update promotion
  const { mutate: handleUpdatePromotion, isPending: updatingPromotion } =
    useMutation({
      mutationFn: ({
        id,
        promotion,
      }: {
        id: PromotionIdType;
        promotion: PromotionType;
      }) => {
        if (validatePromotionValues({ promotion: promotion })) {
          return updatePromotion({
            id: id,
            name: promotion.name,
            img: promotion.img,
            description: promotion.description,
            discount_in_percent: promotion.discount_in_percent,
            active: promotion.active,
            is_special: promotion.is_special,
            token: auth.token,
          });
        }
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

  //add products to promotion
  const {
    mutate: handleAddProductsToPromotion,
    isPending: addingProductsToPromotion,
  } = useMutation({
    mutationFn: ({
      promotionId,
      products,
    }: {
      promotionId: PromotionIdType;
      products: ProductType[];
    }) => {
      if (promotionId == null) {
        throw new Error("La promoción no es válida");
      }
      if (products == null || products.length === 0) {
        throw new Error("Debes seleccionar algún producto");
      }
      const productIds = products.map((product: ProductType) => product.id);
      return addProductsToPromotion({
        id: promotionId,
        products: productIds,
        token: auth.token,
      });
    },
    onSuccess: () => {
      setSelectedPromotions([]);
      queryClient.invalidateQueries({ queryKey: ["products-to-manage"] });
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

  //remove products from promotion
  const {
    mutate: handleRemoveProductsFromPromotion,
    isPending: removingProductsFromPromotion,
  } = useMutation({
    mutationFn: ({
      promotionId,
      products,
    }: {
      promotionId: PromotionIdType;
      products: ProductType[];
    }) => {
      if (promotionId == null) {
        throw new Error("La promoción no es válida");
      }
      if (products == null || products.length === 0) {
        throw new Error("Debes seleccionar algún producto");
      }
      const productIds = products.map((product: ProductType) => product.id);
      return deleteProductsFromPromotion({
        id: promotionId,
        products: productIds,
        token: auth.token,
      });
    },
    onSuccess: () => {
      setSelectedPromotions([]);
      queryClient.invalidateQueries({ queryKey: ["products-to-manage"] });
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
    loading ||
    deletingPromotions ||
    updatingPromotion ||
    creatingPromotion ||
    addingProductsToPromotion ||
    removingProductsFromPromotion;

  return {
    promotions,
    loadingPromotions,
    errorGettingPromotions,
    refetchPromotions,
    handleDeletePromotions,
    handleCreatePromotion,
    handleUpdatePromotion,
    handleAddProductsToPromotion,
    handleRemoveProductsFromPromotion
  };
}
