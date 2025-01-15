import React, { useState, useEffect } from "react";
export function useImagePreview({ formProperties, isProductForm }) {
  const [imagesPreview, setImagePreview] = useState([null, null, null]);

  //set the corresponding image preview
  useEffect(() => {
    if (formProperties.show == true) {
      formProperties.creatingMode == true
        ? setImagePreview([null, null, null])
        : isProductForm
        ? setImagePreview([
            formProperties.initialValues.product_img1,
            formProperties.initialValues.product_img2,
            formProperties.initialValues.product_img3,
          ])
        : setImagePreview([formProperties.initialValues.img, null, null]);
    }
  }, [formProperties.show]);

  function handleSetImagePreview({ e, imgIndex }) {
    let files = e.target.files;
    let imagesPreviewCopy = [...imagesPreview];
    if (files.length > 0) {
      const img = URL.createObjectURL(files[0]);
      imagesPreviewCopy.splice(imgIndex, 1, img);
      setImagePreview(imagesPreviewCopy);
    } else {
      imagesPreviewCopy.splice(imgIndex, 1, null);
      setImagePreview(imagesPreviewCopy);
    }
  }
  return({imagesPreview, handleSetImagePreview})
}
