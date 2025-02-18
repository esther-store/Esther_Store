import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useImagePreview } from "@/hooks/managementHooks/useImagePreview";
import React from "react";
import './index.css'

const CategoriesForm = React.memo(function CategoriesForm({
  categoryFormProperties,
  setCategoryFormProperties,
  handleCreateCategory,
  handleUpdateCategory,
  loading
}) {
  const {imagesPreview, handleSetImagePreview} = useImagePreview({formProperties:categoryFormProperties, isProductForm:false})

  function createCategory(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleCreateCategory({ name: name, img: img[0] });
  }

  function updateCategory(e) {
    e.preventDefault();
    let name = e.target["name"].value;
    let img = e.target["image"].files;
    handleUpdateCategory({
      id: categoryFormProperties.initialValues.id,
      name: name,
      img: img[0],
    });
  }

  return (
    <Dialog
      visible={categoryFormProperties.show}
      onHide={() =>{
        !loading?setCategoryFormProperties((prev) => ({ ...prev, show: false, disabled:false, initialValues:{} })):null
      }
      }
      position="center"
      draggable={false}
      resizable={false}
      header={
        categoryFormProperties.creatingMode
          ? "Crear Categoria"
          : "Editar Categoria"
      }
    >
      <form
        className="categories-form"
        onSubmit={(e) => {
          categoryFormProperties.creatingMode == true
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
            disabled={categoryFormProperties.disabled}
            defaultValue={
              categoryFormProperties.creatingMode
                ? ""
                : categoryFormProperties.initialValues
                ? categoryFormProperties.initialValues.name
                : ""
            }
          />
        </div>
        <div className="category-form-field category-image-field">
          <div className = "category-form-field">
            <label htmlFor="image">Imagen</label>
            <InputText
              id="image"
              required = {categoryFormProperties.creatingMode?true:false}
              aria-describedby="image-help"
              className=".p-inputtext-sm"
              type="file"
              accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
              disabled={categoryFormProperties.disabled}
              onChange={(e) => handleSetImagePreview({e:e, imgIndex:0})}
            />
          </div>
          {imagesPreview[0]?
          <img src ={imagesPreview[0]}/>
          :null}
        </div>
        {categoryFormProperties.disabled == false ? (
          <Button disabled = {loading?true:false} label={loading?"Enviando ...":"Enviar"} className="btn-general-styles" />
        ) : null}
      </form>
    </Dialog>
  );
})

export default CategoriesForm;
