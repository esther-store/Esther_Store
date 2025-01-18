import { Dialog } from "primereact/dialog";
import AddIcon from "@/assets/icons/oferts-management-add.svg";
import EditIcon from "@/assets/icons/edit-icon.svg";
import DetailIcon from "@/assets/icons/eye-icon.svg";
import React, {Suspense} from "react";
import Loader from "@/components/Loader";
import "./index.css";
const ProductFormContent = React.lazy(() => import("./ProductFormContent")) 


const ProductForm = React.memo(function ProductForm({
  productFormProperties,
  resetProductFormProperties,
  handleCreateProduct,
  handleUpdateProduct,
  loading,
}) {
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
      onHide={() => (!loading ? resetProductFormProperties() : null)}
      draggable={false}
      resizable={false}
      style={{ minHeight: "95vh", minWidth: "50vw", maxWidth: "98vw" }}
      headerClassName="product-form-dialog-header"
      className="product-form-dialog"
    >
      <Suspense
              fallback={
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Loader />
                </div>
              }
            >
              <ProductFormContent
                productFormProperties={productFormProperties}
                resetProductFormProperties={resetProductFormProperties}
                handleCreateProduct={handleCreateProduct}
                handleUpdateProduct={handleUpdateProduct}
                loading={loading}
              />
            </Suspense>
    </Dialog>
  );
});

export default ProductForm;
