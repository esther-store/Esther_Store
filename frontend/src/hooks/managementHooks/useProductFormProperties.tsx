import type { ProductType, CreateProductType, ProductFormPropertiesType } from "@/Types";
import {
  getInitialValues,
  createProductInitialValues,
} from "@/utils/productInitialValues";
import { useCallback, useState } from "react";

export function useProductFormProperties() {
  //product form properties state
  const [productFormProperties, setProductFormProperties] = useState<ProductFormPropertiesType>({
    show: false,
    disabled: false,
    creatingMode: true,
    initialValues: getInitialValues(),
  });

  //function to reset the product Form Properties
  const resetProductFormProperties = useCallback(
    function resetProductFormProperties() {
      setProductFormProperties((prev) => ({
        ...prev,
        show: false,
        creatingMode: true,
        disabled: false,
        initialValues: getInitialValues(),
      }));
    },
    []
  );

  const processUpdateProduct = useCallback(function processUpdateProduct(
    product: ProductType
  ) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: false,
      initialValues: createProductInitialValues({ product: product }),
    }));
  },
  []);

  const processDetailProduct = useCallback(function processDetailProduct(
    product: ProductType
  ) {
    setProductFormProperties((prev) => ({
      ...prev,
      show: true,
      creatingMode: false,
      disabled: true,
      initialValues: createProductInitialValues({ product: product }),
    }));
  },
  []);

  return {
    productFormProperties,
    setProductFormProperties,
    resetProductFormProperties,
    processDetailProduct,
    processUpdateProduct,
  };
}
