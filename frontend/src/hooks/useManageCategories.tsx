import React, { useContext } from "react";
import { deleteCategories } from "../services/ManageCategories/deleteCategories.js";
import { createCategory } from "../services/ManageCategories/createCategory.js";
import { updateCategory } from "../services/ManageCategories/updateCategory.js";
import { getCategoriesToManage } from "../services/ManageCategories/getCategoriesToManage.js";
import AuthenticationContext from "../context/authenticationContext.jsx";
import { showToast } from "@/utils/showToast.js";
import { useMutation } from "@tanstack/react-query";
import type { CategoryType, CategoryIdType } from "@/Types.js";
import { useQuery } from "@tanstack/react-query";

export function useManageCategories({
  toastRef,
  setSelectedCategories,
  setCategoryFormProperties,
}) {
  const { auth } = useContext<any>(AuthenticationContext);
  const {
    data,
    isLoading: loading,
    isError: errorGettingCategories,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories-to-manage", auth?.token],
    queryFn: () => getCategoriesToManage({ token: auth?.token }),
    staleTime: 1000 * 60 * 10,
    retry: (failuresCount) => {
      if(failuresCount >= 2) return false
      return true
    },
  });

  const categories: CategoryType[] = data || [];

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
      onError: () => {
        showToast({
          toastRef: toastRef,
          severity: "error",
          summary: "Error",
          detail: "Fallo en la Operación",
        });
      },
    });

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

  const loadingCategories =
    loading || deletingCategories || updatingCategory || creatingCategory;

  return {
    categories,
    loadingCategories,
    errorGettingCategories,
    refetchCategories,
    handleDeleteCategories,
    handleCreateCategory,
    handleUpdateCategory,
  };
}
