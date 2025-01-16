import React, { useContext } from "react";
import { getProductsToManage } from "../services/ManageProducts/getProductsToManage";
import { deleteProducts } from "../services/ManageProducts/deleteProducts";
import { createProduct } from "../services/ManageProducts/createProduct";
import { updateProduct } from "../services/ManageProducts/updateProduct";
import AuthenticationContext from "../context/authenticationContext.jsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { showToast } from "@/utils/showToast.ts";

export function useManageProducts({
  searchParams,
  toastRef,
  setSelectedProducts,
  resetProductFormProperties,
}) {
  const { auth } = useContext(AuthenticationContext);
  const queryClient = useQueryClient()
  
  //get products to manage
  const {
    data,
    isLoading,
    isError: errorGettingProducts,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: [
      "products-to-manage",
      searchParams.toString(),
      auth.token,
    ],
    queryFn: () =>
      getProductsToManage({
        filters: searchParams.toString(),
        token: auth.token,
      }),
      staleTime: 1000 * 60 * 30
  });

  //create product
  const {mutate: handleCreateProduct, isPending: loadingCreateProduct } = useMutation({mutationFn:({values}) => {
    if (productInfoValid({ values: values })) {
      return createProduct({ values: values, token: auth.token })        
    }else{
      throw new Error('Error al crear el producto. Revisa los datos')
    }
  },
  onSuccess:(newProduct) => {
    resetProductFormProperties();
    setSelectedProducts([]);
    queryClient.invalidateQueries({queryKey: ['products-to-manage']})
    showToast({
      toastRef: toastRef,
      severity: "success",
      summary: "Éxito",
      detail: "Operación Exitosa",
    });
  },
  onError:(err) => {
    showToast({
      toastRef: toastRef,
      severity: "error",
      summary: "Error",
      detail: err.message,
    });
  }
})

  //edit product
  const {mutate: handleUpdateProduct, isPending: loadingEditProduct } = useMutation({mutationFn:({id, values}) => {
    if (productInfoValid({ values: values, creating: false })) {
      return updateProduct({ id: id, values: values, token: auth.token })        
    }else{
      throw new Error('Error al crear el producto. Revisa los datos')
    }
  },
  onSuccess:(productInfo) => {
    resetProductFormProperties();
    setSelectedProducts([]);
    queryClient.invalidateQueries({queryKey: ['products-to-manage']})
    showToast({
      toastRef: toastRef,
      severity: "success",
      summary: "Éxito",
      detail: "Operación Exitosa",
    });
  },
  onError:(err) => {
    console.log
    showToast({
      toastRef: toastRef,
      severity: "error",
      summary: "Error",
      detail: err.message,
    });
  }
})

  const products = data?.results || [];
  const numOfProducts = data?.count || 0;
  const loadingProducts = isLoading || loadingCreateProduct || loadingEditProduct

  //delete one product by its id
  function handleDeleteProduct(productId) {
    setLoading(true);
    deleteProducts({ products: [productId], token: auth.token })
      .then((res) => {
        setUpdateProducts((prev) => !prev);
        setSelectedProducts([]);
        showToast({
          severity: "success",
          summary: "Éxito",
          detail: "Operación Exitosa",
        });
      })
      .catch((err) => {
        setLoading(false);
        showToast({
          severity: "error",
          summary: "Error",
          detail: "Fallo en la Operación",
        });
      });
  }

  //delete multiple products by a list of ids
  function handleDeleteMultipleProducts(products) {
    if (products.length > 0) {
      //create a list only with the ids
      const productsId = products.map((product) => product.id);
      setLoading(true);
      deleteProducts({ products: productsId, token: auth.token })
        .then((res) => {
          setUpdateProducts((prev) => !prev);
          setSelectedProducts([]);
          showToast({
            severity: "success",
            summary: "Éxito",
            detail: "Operación Exitosa",
          });
        })
        .catch((err) => {
          setLoading(false);
          showToast({
            severity: "error",
            summary: "Error",
            detail: "Fallo en la Operación",
          });
        });
    } else {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Debes seleccionar algun producto",
      });
    }
  }

  function productInfoValid({ values, creating = true }) {
    if (
      values.product_name == "" ||
      values.product_name == null ||
      values.product_name == undefined
    ) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Debes ingresar un nombre válido",
      });
      return false;
    }
    if (
      values.precio == "" ||
      values.precio == null ||
      values.precio == undefined
    ) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Debes ingresar un precio válido",
      });
      return false;
    }
    if (
      creating == true &&
      (values.product_img1 == "" ||
        values.product_img1 == null ||
        values.product_img1 == undefined)
    ) {
      showToast({
        severity: "error",
        summary: "Error",
        detail: "Debes ingresar al menos la primera imagen",
      });
      return false;
    }
    return true;
  }

  return {
    products,
    loadingProducts,
    numOfProducts,
    errorGettingProducts,
    refetchProducts,
    showToast,
    handleDeleteProduct,
    handleDeleteMultipleProducts,
    handleUpdateProduct,
    handleCreateProduct,
  };
}
