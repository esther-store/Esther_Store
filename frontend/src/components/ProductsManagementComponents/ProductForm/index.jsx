import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Checkbox } from "primereact/checkbox";
import { Dropdown } from "primereact/dropdown";
import { useManageProductForm } from "@/hooks/useManageProductForm";
import { useImagePreview } from "@/hooks/useImagePreview";
import AddIcon from "@/assets/icons/oferts-management-add.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import DetailIcon from "@/assets/icons/eye-icon.svg";
import ImagePlaceholder from "@/assets/icons/product_form_img_placeholder.png";
import "./index.css";

function ProductForm({
  productFormProperties,
  resetProductFormProperties,
  handleCreateProduct,
  handleUpdateProduct,
  categories,
  promotions,
  loading,
}) {
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
    setRecommendedCheck
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
  console.log(imagesPreview)
  return (
    <Dialog
      position="right"
      header={
        productFormProperties.creatingMode == true ? (
          <div className="product-form-dialog-title">
            <img src={AddIcon.src} />
            <span>Agregar Producto</span>
          </div>
        ) : productFormProperties.disabled ? (
          <div className="product-form-dialog-title">
            <img src={DetailIcon.src} />
            <span>Detalle de Producto</span>
          </div>
        ) : (
          <div className="product-form-dialog-title">
            <img src={EditIcon.src} />
            <span>Editar Producto</span>
          </div>
        )
      }
      visible={productFormProperties.show}
      onHide={() => !loading?resetProductFormProperties():null}
      draggable={false}
      resizable={false}
      style={{ minHeight: "95vh", minWidth: "50vw", maxWidth: "98vw" }}
      headerClassName="product-form-dialog-header"
      className="product-form-dialog"
    >
      <form
        className="product-form"
        encType="multipart/form-data"
        onSubmit={(e) => {
          productFormProperties.creatingMode == true
            ? createProduct(e)
            : updateProduct(e);
        }}
      >
        {/*name*/}
        <div className="product-form-field">
          <label htmlFor="name">Nombre</label>
          <InputText
            id="name"
            aria-describedby="name-help"
            className=".p-inputtext-sm"
            disabled={productFormProperties.disabled}
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
          <label htmlFor="price">Precio</label>
          <InputText
            id="price"
            aria-describedby="price-help"
            className=".p-inputtext-sm"
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
        </div>
        {/*promotion*/}
        <div className="product-form-field">
          <label htmlFor="promotion">Oferta</label>
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
          <label htmlFor="discount">Descuento (%)</label>
          <InputText
            id="discount"
            aria-describedby="discount-help"
            className=".p-inputtext-sm"
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
              disabled = {loading? 'true': false}
              label={loading? "Enviando..." : "Enviar"}
              className="btn-general-styles"
            />
          ) : null}
          {/*Cancel*/}
          <Button
            label={
              productFormProperties.creatingMode == true ? "Cancelar" : "Cerrar"
            }
            disabled = {loading? 'true': false}
            className="btn-general-styles"
            type="button"
            onClick={() => resetProductFormProperties()}
          />
        </section>
      </form>
    </Dialog>
  );
}

export default ProductForm;
