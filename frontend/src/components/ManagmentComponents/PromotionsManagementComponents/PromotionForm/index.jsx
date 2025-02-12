import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useImagePreview } from "@/hooks/managementHooks/useImagePreview";
import { InputTextarea } from "primereact/inputtextarea";
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

  function createpromotion(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleCreatePromotion({ name: name, img: img[0] });
  }

  function updatepromotion(e) {
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
            ? createpromotion(e)
            : updatepromotion(e);
        }}
        encType="multipart/form-data"
      >
        <div className="promotion-form-field">
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
        
        {/*Discount*/}
        <div className="promotion-form-field">
          <label htmlFor="discount">Descuento (%) </label>
          <InputText
            id="discount"
            aria-describedby="discount-help"
            className=".p-inputtext-sm"
            min={0}
            max={100}
            disabled={promotionFormProperties.disabled}
            type="number"
            defaultValue={
              promotionFormProperties.creatingMode
                ? ""
                : promotionFormProperties.initialValues.discount_in_percent
            }
          />
        </div>

        {/*description*/}
        <div className="promotion-description-field">
          <label htmlFor="description">Descripción</label>
          <InputTextarea
            id="description"
            aria-describedby="description-help"
            disabled={promotionFormProperties.disabled}
            defaultValue={
              promotionFormProperties.creatingMode
                ? ""
                : promotionFormProperties.initialValues.description
            }
          />
        </div>

        {/*Image*/}
        <div className="promotion-form-field promotion-image-field">
          <div className="promotion-form-field">
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
