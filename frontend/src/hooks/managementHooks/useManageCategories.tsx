import { deleteCategories } from "@/services/ManageCategories/deleteCategories.js";
import { createCategory } from "@/services/ManageCategories/createCategory.js";
import { updateCategory } from "@/services/ManageCategories/updateCategory.js";
import { showToast } from "@/utils/showToast.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CategoryType, CategoryIdType, ProductType } from "@/Types.js";
import { useGetCategoriesToManage } from "./useGetCategoriesToManage.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import React, { useContext } from "react";
import { addProductsToCategory } from "@/services/ManageCategories/addProductsToCategory.js";

export function useManageCategories({
  toastRef,
  setSelectedCategories,
  setCategoryFormProperties,
}) {
  const { auth } = useContext<any>(AuthenticationContext);
  const queryClient = useQueryClient();
  const { categories, loading, errorGettingCategories, refetchCategories } =
    useGetCategoriesToManage();

  //create category
  const { mutate: handleCreateCategory, isPending: creatingCategory } =
    useMutation({
      mutationFn: ({ name, img }: { name: string; img: string }) => {
        if (name == null || name === "") {
          throw new Error("Debes ingresar un nombre");
        }
        return createCategory({ name: name, img: img, token: auth.token });
      },
      onSuccess: () => {
        setSelectedCategories([]);
        setCategoryFormProperties((prev) => ({ ...prev, show: false }));
        refetchCategories();
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

  //delete category
  const { mutate: handleDeleteCategories, isPending: deletingCategories } =
    useMutation({
      mutationFn: (categories: CategoryType[]) => {
        if (categories == null || categories.length === 0) {
          throw new Error("Debes seleccionar alguna categoría");
        }
        const categoryIds = categories.map((category) => category.id);
        return deleteCategories({ categories: categoryIds, token: auth.token });
      },
      onSuccess: () => {
        setSelectedCategories([]);
        refetchCategories();
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

  //update category
  const { mutate: handleUpdateCategory, isPending: updatingCategory } =
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
        refetchCategories();
        setSelectedCategories([]);
        setCategoryFormProperties((prev) => ({ ...prev, show: false }));
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

  //add products to category
  const { mutate: handleAddProductsToCategory, isPending: addingProductsToCategory } =
    useMutation({
      mutationFn: ({
        categoryId,
        products,
      }: {
        categoryId: CategoryIdType;
        products: ProductType[];
      }) => {
        if(categoryId == null){
          throw new Error("La categoría no es válida");
        }
        if (products == null || products.length === 0) {
          throw new Error("Debes seleccionar algún producto");
        }
        const productIds = products.map((product: ProductType) => product.id)
        return addProductsToCategory({
          id: categoryId,
          products:productIds,
          token: auth.token,
        });
      },
      onSuccess: () => {
        setSelectedCategories([]);
        queryClient.invalidateQueries({queryKey: ['products-to-manage']})
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

  const loadingCategories =
    loading || deletingCategories || updatingCategory || creatingCategory || addingProductsToCategory;

  return {
    categories,
    loadingCategories,
    errorGettingCategories,
    refetchCategories,
    handleDeleteCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleAddProductsToCategory
  };
}
