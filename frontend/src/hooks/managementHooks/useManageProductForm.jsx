import React, { useState, useEffect } from "react";
import { normalizeProductFormInfo } from "@/utils/productInitialValues";

export function useManageProductForm({
  productFormProperties,
  handleUpdateProduct,
  handleCreateProduct,
  promotions,
  categories,
}) {
  const [activeStatusChecked, setChecked] = useState(true);
  const [recommendedCheck, setRecommendedCheck] = useState(false);
  const [discount, setDiscount] = useState(productFormProperties.initialValues.descuento)
  const [price, setPrice] = useState(productFormProperties.initialValues.precio)

  const categoriesOptions = [{ name: "Ninguna", code: '' }].concat(
    categories.map((category) => ({
      name: category.nombre,
      code: category.id,
    }))
  );
  const promotionsOptions = [{ name: "Ninguna", code: '' }].concat(
    promotions.map((promotion) => ({
      name: promotion.name,
      code: promotion.id,
    }))
  );
  const [categorySelected, setCategorySelected] = useState({
    name: "Ninguna",
    code: '',
  });
  const [promotionSelected, setPromotionSelected] = useState({
    name: "Ninguna",
    code: '',
  });

  //effect to update the activeStatus, the categorySelected and the promotion
  useEffect(() => {
    //update if the product is active or not and if is recommended
    if(productFormProperties.creatingMode == false){
      setChecked(productFormProperties.initialValues.is_active)
      setRecommendedCheck(productFormProperties.initialValues.recommended)
    }else{
      setChecked(true)
      setRecommendedCheck(false)
    }
    //update the category and promotion of the product
    if(productFormProperties.creatingMode == false) {
      if(productFormProperties.initialValues.categoria !== null){
        setCategorySelected(
          categoriesOptions.find(
            (category) =>
              category.code == productFormProperties.initialValues.categoria
          )
        );
      }
      if(productFormProperties.initialValues.promotion !== null){
        setPromotionSelected(
          promotionsOptions.find(
            (promotion) =>
              promotion.code == productFormProperties.initialValues.promotion
          )
        );
      }
    }
  }, [productFormProperties.initialValues]);

  function createProduct(e) {
    e.preventDefault();
    const values = normalizeProductFormInfo({
      e: e,
      discount:discount,
      precio:price,
      categorySelected: categorySelected,
      promotionSelected: promotionSelected,
      activeStatusChecked: activeStatusChecked,
      recommendedCheck: recommendedCheck,
    });
    handleCreateProduct({ values: values });
  }

  function updateProduct(e) {
    e.preventDefault();
    const values = normalizeProductFormInfo({
      e: e,
      discount:discount,
      precio:price,
      categorySelected: categorySelected,
      promotionSelected: promotionSelected,
      activeStatusChecked: activeStatusChecked,
      recommendedCheck: recommendedCheck,
    });
    handleUpdateProduct({
      id: productFormProperties.initialValues.id,
      values: values,
    });
  }

  return {
    createProduct,
    updateProduct,
    setCategorySelected,
    categorySelected,
    categoriesOptions,
    promotionSelected,
    setPromotionSelected,
    promotionsOptions,
    activeStatusChecked,
    setChecked,
    recommendedCheck, 
    setRecommendedCheck,
    discount,
    setDiscount,
    price,
    setPrice
  };
}
