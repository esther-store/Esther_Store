import { useGetPromotionsToManage } from "@/hooks/managementHooks/useGetPromotionsToManage";
import { useManageProductForm } from "@/hooks/managementHooks/useManageProductForm";
import { useImagePreview } from "@/hooks/managementHooks/useImagePreview";
import ImagePlaceholder from "@/assets/icons/product_form_img_placeholder.png";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import Loader from "@/components/Loaders/Loader";
import { useGetCategoriesToManage } from "@/hooks/managementHooks/useGetCategoriesToManage";
import { validateDiscount } from "@/utils/validateDiscount";

const ProductFormContent = React.memo(function ProductFormContent({
  productFormProperties,
  resetProductFormProperties,
  handleCreateProduct,
  handleUpdateProduct,
  loading,
}) {
  const { categories, loading: loadingCategories } = useGetCategoriesToManage();
  const { promotions, loadingPromotions } = useGetPromotionsToManage();
  const {
    categorySelected,
    categoriesOptions,
    setCategorySelected,
    promotionSelected,
    setPromotionSelected,
    promotionsOptions,
    activeStatusChecked,
    setChecked,
    updateProduct,
    createProduct,
    recommendedCheck,
    setRecommendedCheck,
  } = useManageProductForm({
    productFormProperties: productFormProperties,
    handleCreateProduct: handleCreateProduct,
    handleUpdateProduct: handleUpdateProduct,
    categories: categories,
    promotions: promotions,
  });
  const { imagesPreview, handleSetImagePreview } = useImagePreview({
    formProperties: productFormProperties,
    isProductForm: true,
  });
  return (
    <form
      className="product-form"
      encType="multipart/form-data"
      onSubmit={(e) => {
        validateDiscount({
          productDiscount: e.target["discount"]?.value,
          promotionDiscount: promotions.find(
            (promo) => promo.id == promotionSelected.code
          )?.discount_in_percent,
          onOk: () =>
            productFormProperties.creatingMode == true
              ? createProduct(e)
              : updateProduct(e),
        });
      }}
    >
      {/*name*/}
      <div className="product-form-field">
        <label htmlFor="name">Nombre * </label>
        <InputText
          id="name"
          aria-describedby="name-help"
          className=".p-inputtext-sm"
          disabled={productFormProperties.disabled}
          required={true}
          style={{ minWidth: "70%" }}
          defaultValue={
            productFormProperties.creatingMode
              ? ""
              : productFormProperties.initialValues.product_name
          }
        />
      </div>
      {/*price*/}
      <div className="product-form-field">
        <label htmlFor="price">Precio * </label>
        <InputText
          id="price"
          aria-describedby="price-help"
          className=".p-inputtext-sm"
          required={true}
          min={0}
          disabled={productFormProperties.disabled}
          type="number"
          defaultValue={
            productFormProperties.creatingMode
              ? ""
              : productFormProperties.initialValues.precio
          }
        />
      </div>
      {/*category*/}
      <div className="product-form-field">
        <label htmlFor="category">Categoría</label>
        {loadingCategories ? (
          <div style={{ width: "50px" }}>
            <Loader />
          </div>
        ) : (
          <Dropdown
            id="category"
            aria-describedby="category-help"
            disabled={productFormProperties.disabled}
            value={categorySelected}
            onChange={(e) => setCategorySelected(e.value)}
            options={categoriesOptions}
            optionLabel="name"
            placeholder="Ninguna"
            className="w-full md:w-14rem product-form-dropdown"
          />
        )}
      </div>
      {/*promotion*/}
      <div className="product-form-field">
        <label htmlFor="promotion">Promoción</label>
        {loadingPromotions ? (
          <div style={{ width: "50px" }}>
            <Loader />
          </div>
        ) : (
          <Dropdown
            id="promotion"
            aria-describedby="promotion-help"
            disabled={productFormProperties.disabled}
            value={promotionSelected}
            onChange={(e) => setPromotionSelected(e.value)}
            options={promotionsOptions}
            optionLabel="name"
            placeholder="Ninguna"
            className="w-full md:w-14rem product-form-dropdown"
            style={{ minWidth: "150px" }}
          />
        )}
      </div>
      {/*active*/}
      <div className="product-form-active-checkbox">
        <label htmlFor="active">Visible:</label>
        <Checkbox
          id="active"
          aria-describedby="active-help"
          disabled={productFormProperties.disabled}
          checked={activeStatusChecked}
          onChange={(e) => setChecked(e.checked)}
        />
      </div>
      {/*recommended*/}
      <div className="product-form-recommended-checkbox">
        <label htmlFor="recommended">Recomendado:</label>
        <Checkbox
          id="recommended"
          aria-describedby="recommended-help"
          disabled={productFormProperties.disabled}
          checked={recommendedCheck}
          onChange={(e) => setRecommendedCheck(e.checked)}
        />
      </div>
      {/*stock*/}
      <div className="product-form-field">
        <label htmlFor="stock">Cantidad</label>
        <InputText
          id="stock"
          aria-describedby="stock-help"
          className=".p-inputtext-sm"
          disabled={productFormProperties.disabled}
          type="number"
          defaultValue={
            productFormProperties.creatingMode
              ? ""
              : productFormProperties.initialValues.in_stock
          }
        />
      </div>
      {/*Discount*/}
      <div className="product-form-field">
        <label htmlFor="discount">Descuento (%) </label>
        <InputText
          id="discount"
          aria-describedby="discount-help"
          className=".p-inputtext-sm"
          min={0}
          max={100}
          disabled={productFormProperties.disabled}
          type="number"
          defaultValue={
            productFormProperties.creatingMode
              ? ""
              : productFormProperties.initialValues.descuento
          }
        />
      </div>
      <hr />
      <section className="product-form-images-container">
        {/*Img 1*/}
        <div className="product-image-field">
          <InputText
            id="img1"
            aria-describedby="img1-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
            onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 0 })}
            hidden={true}
          />
          <label htmlFor="img1">
            {imagesPreview[0] ? (
              <img src={imagesPreview[0]} />
            ) : (
              <div className="image-selector">
                <img src={ImagePlaceholder.src} />
              </div>
            )}
          </label>
        </div>
        {/*Img 2*/}
        <div className="product-image-field">
          <InputText
            id="img2"
            aria-describedby="img2-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
            onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 1 })}
            hidden={true}
          />
          <label htmlFor="img2">
            {imagesPreview[1] ? (
              <img src={imagesPreview[1]} />
            ) : (
              <div className="image-selector">
                <img src={ImagePlaceholder.src} />
              </div>
            )}
          </label>
        </div>
        {/*Img 3*/}
        <div className="product-image-field">
          <InputText
            id="img3"
            aria-describedby="img3-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
            type="file"
            accept="image/jpg, image/jpeg, image/png, image/svg, image/webp"
            onChange={(e) => handleSetImagePreview({ e: e, imgIndex: 2 })}
            hidden={true}
          />
          <label htmlFor="img3">
            {imagesPreview[2] ? (
              <img src={imagesPreview[2]} />
            ) : (
              <div className="image-selector">
                <img src={ImagePlaceholder.src} />
              </div>
            )}
          </label>
        </div>
      </section>
      <hr />
      {/*description*/}
      <div className="product-description-field">
        <label htmlFor="description">Descripción</label>
        <InputTextarea
          id="description"
          aria-describedby="description-help"
          disabled={productFormProperties.disabled}
          defaultValue={
            productFormProperties.creatingMode
              ? ""
              : productFormProperties.initialValues.product_description
          }
        />
      </div>
      <section className="product-form-action-buttons-container">
        {/*Submit*/}
        {productFormProperties.disabled == false ? (
          <Button
            disabled={loading ? true : false}
            label={loading ? "Enviando..." : "Enviar"}
            className="btn-general-styles"
          />
        ) : null}
        {/*Cancel*/}
        <Button
          label={
            productFormProperties.creatingMode == true ? "Cancelar" : "Cerrar"
          }
          disabled={loading ? true : false}
          className="btn-general-styles"
          type="button"
          onClick={() => resetProductFormProperties()}
        />
      </section>
    </form>
  );
});

export default ProductFormContent;
