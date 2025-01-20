import { useState } from "react";

export function useCategoryFormProperties() {
  
  const [categoryFormProperties, setCategoryFormProperties] = useState({
    show: false,
    initialValues: null,
    disabled: false,
    creatingMode: true,
  });
  
  function processUpdateCategory({ id, nombre, img }) {
    setCategoryFormProperties((prev) => ({
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

  function processDetailCategory({ id, nombre, img }) {
    setCategoryFormProperties((prev) => ({
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

  return {categoryFormProperties, setCategoryFormProperties, processUpdateCategory, processDetailCategory}
}
