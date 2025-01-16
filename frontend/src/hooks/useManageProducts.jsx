import React, { useContext } from "react";
import { getProductsToManage } from "../services/ManageProducts/getProductsToManage";
import { deleteProducts } from "../services/ManageProducts/deleteProducts";
import { createProduct } from "../services/ManageProducts/createProduct";
import { updateProduct } from "../services/ManageProducts/updateProduct";
import AuthenticationContext from "../context/authenticationContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/utils/showToast.ts";
import { isProductInfoValid } from "@/utils/isProductInfoValid.ts";

export function useManageProducts({
  searchParams,
  toastRef,
  setSelectedProducts,
  resetProductFormProperties,
}) {
  const { auth } = useContext(AuthenticationContext);
  const queryClient = useQueryClient();

  //get products to manage
  const {
    data,
    isLoading,
    isError: errorGettingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products-to-manage", searchParams.toString(), auth.token],
    queryFn: () =>
      getProductsToManage({
        filters: searchParams.toString(),
        token: auth.token,
      }),
    staleTime: 1000 * 60 * 30,
  });

  //create product
  const { mutate: handleCreateProduct, isPending: loadingCreateProduct } =
    useMutation({
      mutationFn: ({ values }) => {
        if (isProductInfoValid({ values: values })) {
          return createProduct({ values: values, token: auth.token });
        }
      },
      onSuccess: (newProduct) => {
        resetProductFormProperties();
        setSelectedProducts([]);
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

  //edit product
  const { mutate: handleUpdateProduct, isPending: loadingEditProduct } =
    useMutation({
      mutationFn: ({ id, values }) => {
        if (isProductInfoValid({ values: values, creating: false })) {
          return updateProduct({ id: id, values: values, token: auth.token });
        }
      },
      onSuccess: (productInfo) => {
        resetProductFormProperties();
        setSelectedProducts([]);
        queryClient.invalidateQueries({ queryKey: ["products-to-manage"] });
        showToast({
          toastRef: toastRef,
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      },
      onError: (err) => {
        console.log;
        showToast({
          toastRef: toastRef,
          severity: "error",
          summary: "Error",
          detail: err.message,
        });
      },
    });

  //delete products
  const { mutate: handleDeleteProduct, isPending: loadingDeleteProduct } =
    useMutation({
      mutationFn: (products = []) => {
        if (products.length > 0) {
          const productsId = products.map((product) => product.id);
          return deleteProducts({ products: productsId, token: auth.token });
        } else {
          throw new Error("Debes seleccionar algun producto");
        }
      },
      onSuccess: () => {
        setSelectedProducts([]);
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

  const products = data?.results || [];
  const numOfProducts = data?.count || 0;
  const loadingProducts =
    isLoading ||
    loadingCreateProduct ||
    loadingEditProduct ||
    loadingDeleteProduct;

  return {
    products,
    loadingProducts,
    numOfProducts,
    errorGettingProducts,
    refetchProducts,
    showToast,
    handleDeleteProduct,
    handleUpdateProduct,
    handleCreateProduct,
  };
}
