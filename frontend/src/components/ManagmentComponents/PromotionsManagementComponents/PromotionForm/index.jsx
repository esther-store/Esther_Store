import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useImagePreview } from "@/hooks/managementHooks/useImagePreview";
import React from "react";
import "./index.css";

const PromotionForm = React.memo(function PromotionForm({
  promotionFormProperties,
  setPromotionFormProperties,
  handleCreatePromotion,
  handleUpdatePromotion,
  loading,
}) {
  const { imagesPreview, handleSetImagePreview } = useImagePreview({
    formProperties: promotionFormProperties,
    isProductForm: false,
  });

  function createCategory(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleCreatePromotion({ name: name, img: img[0] });
  }

  function updateCategory(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleUpdatePromotion({
      id: promotionFormProperties.initialValues.id,
      name: name,
      img: img[0],
    });
  }

  return (
    <Dialog
      visible={promotionFormProperties.show}
      onHide={() => {
        !loading
          ? setPromotionFormProperties((prev) => ({
              ...prev,
              show: false,
              disabled: false,
              initialValues: {},
            }))
          : null;
      }}
      position="top"
      draggable={false}
      resizable={false}
      header={
        promotionFormProperties.creatingMode
          ? "Crear Categoria"
          : "Editar Categoria"
      }
    >
      <form
        className="categories-form"
        onSubmit={(e) => {
          promotionFormProperties.creatingMode == true
            ? createCategory(e)
            : updateCategory(e);
        }}
        encType="multipart/form-data"
      >
        <div className="category-form-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            required
            aria-describedby="name-help"
            className=".p-inputtext-sm"
            disabled={promotionFormProperties.disabled}
            defaultValue={
              promotionFormProperties.creatingMode
                ? ""
                : promotionFormProperties.initialValues
                ? promotionFormProperties.initialValues.name
                : ""
            }
          />
        </div>
        <div className="category-form-field category-image-field">
          <div className="category-form-field">
            <label htmlFor="image">Imagen</label>
            <InputText
              id="image"
              required={promotionFormProperties.creatingMode ? true : false}
              aria-describedby="image-help"
              className=".p-inputtext-sm"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              disabled={promotionFormProperties.disabled}
              onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 0 })}
            />
          </div>
          {imagesPreview[0] ? <img src={imagesPreview[0]} /> : null}
        </div>
        {promotionFormProperties.disabled == false ? (
          <Button
            disabled={loading ? true : false}
            label={loading ? "Enviando ..." : "Enviar"}
            className="btn-general-styles"
          />
        ) : null}
      </form>
    </Dialog>
  );
});

export default PromotionForm;
