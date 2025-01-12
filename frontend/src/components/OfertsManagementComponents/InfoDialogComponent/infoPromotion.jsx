import "./styles/infoPromotion.css";
import React, { useState, useEffect, useContext } from "react";
import { Dialog } from "primereact/dialog";
import { updatePromotion } from "../../../services/ManagePromotions/updatePromotion";
import { createPromotion } from "../../../services/ManagePromotions/createPromotion";
import { Checkbox } from "primereact/checkbox";
import { Image } from "primereact/image";
import DataTableProducts from "../DataTableProducts";
import AddProductsToOferts from "../AddProductsToOfertsComponent";
import ImagePlaceholder from "../../../assets/product_form_img_placeholder.png";
import { deleteProductsToPromotion } from "../../../services/ManagePromotions/deleteProductsToOfert";
import Loader from "../../Loader";
import { getProductsOfert } from "../../../services/ManagePromotions/getProductsOfert";
import AuthenticationContext from "../../../context/authenticationContext";

function InfoPromotion({
  visible,
  onHide,
  data,
  editable,
  heaerTitle,
  onSave,
  accion,
  setPageLoad,
  show,
  mobileSize,
}) {
  const [infoData, setInfoData] = useState({
    name: "",
    description: "",
    discount_in_percent: "1",
    active: false,
    is_special: false,
    img: "",
  });
  const {auth} = useContext(AuthenticationContext)
  const [imgPreview, setImgPreview] = useState(infoData.img);
  const [addProductModal, setAddProductModal] = useState(false);
  const [productsOFerts, setProductsOferts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document.body.style.overflow !== "hidden") {
      document.body.style.overflow = visible ? "hidden" : "auto";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [visible]);

  useEffect(() => {
    if (data !== null) {
      setInfoData(data);
      setImgPreview(data.img);
    }
  }, [data, visible ? visible : undefined]);

  const handleOnchange = (value, campo) => {
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = value;
    setInfoData(InfoDataCopy);
  };

  const handleOnChecked = (campo) => {
    var InfoDataCopy = { ...infoData };
    InfoDataCopy[campo] = !InfoDataCopy[campo];
    setInfoData(InfoDataCopy);
  };

  const handleOnChangeProductMOdal = () => {
    setAddProductModal(!addProductModal);
  };
  const searchChecked = (id) => {
    for (let i = 0; i < selectedProducts.length; i++) {
      if (selectedProducts[i] === id) {
        return true;
      }
    }
    return false;
  };

  const handleOnChangeChecked = (data) => {
    var aux = [];
    if (selectedProducts.length > 0) {
      for (let i = 0; i < selectedProducts.length; i++) {
        if (selectedProducts[i] !== data.id) {
          aux.push(selectedProducts[i]);
        }
      }
      if (aux.length == selectedProducts.length) {
        aux.push(data.id);
      }
      setSelectedProducts(aux);
    } else {
      aux.push(data.id);
      setSelectedProducts(aux);
    }
  };

  return (
    <section className={"info-promotion-container"}>
      <AddProductsToOferts
        visible={addProductModal}
        onHide={handleOnChangeProductMOdal}
        show={show}
        idPromotion={data.id}
        setProductOferts={setProductsOferts}
        setLoading = {setLoading}
      />
      <Dialog
        visible={visible}
        className={
          mobileSize
            ? accion=="create"?"info-dialog-promotion-create":"info-dialog-promotion info-dialog-promotion-mobileSize"
            : "info-dialog-promotion"
        }
        header={heaerTitle}
        onHide={() => {
          onHide();
          setProductsOferts([]);
          setSelectedProducts([]);
        }}

      >
        <form
          onSubmit={(event) => {
            event.preventDefault();
            let img = event.target["image"].files;
            setPageLoad(true);
            if (accion == "update") {
              updatePromotion({
                id: infoData.id,
                name: infoData.name,
                description: infoData.description,
                discount_in_percent: infoData.discount_in_percent<=0?infoData.discount_in_percent*(-1):infoData.discount_in_percent,
                active: infoData.active,
                is_special: infoData.is_special,
                img: img.length == 0 ? undefined : img[0],
                token:auth.token,
              }).then(() => {
                onSave();
                show("Accion completada", "success");
                setPageLoad(false);
                onHide();
                setProductsOferts([])
              })
              .catch((err) => {

              }) 
              ;
            } else {
              createPromotion({
                name: infoData.name,
                description: infoData.description,
                discount_in_percent: infoData.discount_in_percent,
                active: infoData.active,
                is_special: infoData.is_special,
                img: img.length == 0 ? undefined : img[0],
                token:auth.token,
              }).then(() => {
                onSave();
                show("Accion completada", "success");
                setPageLoad(false);
                onHide();
              });
            }
          }}
          className="info-dialog-form-promotion"
          encType="multipart/form-data"
        >
          {editable && (
            <div
              className={
                mobileSize
                  ? "inputs-dialog-from-container inputs-dialog-from-container-mobileSize"
                  : "inputs-dialog-from-container"
              }
            >
              <div className="input-info-dialog image-file-icon">
                <div className="image-file-icon-container">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      setImgPreview(URL.createObjectURL(e.target.files[0]));
                      handleOnchange(e.target.value, "img");
                    }}
                    hidden="true"
                  />
                </div>

                <div className="img-dialog-container">
                  {infoData.img ? (
                    <Image src={imgPreview} />
                  ) : (
                    <Image src={ImagePlaceholder} />
                  )}
                </div>
              </div>
              <div className=" input-info-dialogs-details">
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Nombre:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input
                      type="text"
                      defaultValue={infoData.name}
                      onChange={(e) => handleOnchange(e.target.value, "name")}
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Descuento:</p>
                  </div>
                  <div className="input-dialog-container discount-input">
                    <input
                      min={1}
                      type="number"
                      defaultValue={infoData.discount_in_percent}
                      onChange={(e) =>
                        handleOnchange(e.target.value, "discount_in_percent") 
                      }
                      required
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox
                    checked={infoData.active}
                    onChange={() => handleOnChecked("active")}
                  />
                </div>
              </div>
            </div>
          )}

          {!editable && (
            <div
              className={
                mobileSize
                  ? "inputs-dialog-from-container inputs-dialog-from-container-mobileSize"
                  : "inputs-dialog-from-container"
              }
            >
              <div className="input-info-dialog">
                <div className="img-dialog-container">
                  <Image zoomSrc={infoData.img} src={infoData.img} preview />
                </div>
              </div>
              <div className=" input-info-dialogs-details">
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Nombre:</p>
                  </div>
                  <div className="input-dialog-container">
                    <input value={infoData.name} type="text" readOnly />
                  </div>
                </div>

                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Descuento:</p>
                  </div>
                  <div className="input-dialog-container discount-input">
                    <input
                      value={infoData.discount_in_percent}
                      type="number"
                      readOnly
                      suppressContentEditableWarning
                    />
                  </div>
                </div>
                <div className="input-info-dialog">
                  <div className="p-dialog-container">
                    <p>Visible:</p>
                  </div>
                  <Checkbox checked={infoData.active} readOnly />
                </div>
              </div>
            </div>
          )}
          {  accion !== "create" && 
            <>
              <hr className="oferts-info-intrinsic" />
             
              <div
                  className={"add-products-to-oferts-buttons-and-details-container"
                  }
                >
                   <p className="p-products-text-oferts">Productos:</p> 
                  {editable && (
                    
                      <div className="add-products-to-oferts-buttons-container">
                      <button
                        className="add-products-to-oferts-buttons"
                        onClick={(e) => {
                          e.preventDefault();
                          setAddProductModal(true);
                        }}
                      >
                        <i
                          className="pi pi-plus"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                      <button
                        className="add-products-to-oferts-buttons"
                        onClick={(e) => {
                          e.preventDefault();
                          if(selectedProducts.length > 0) {
                          deleteProductsToPromotion({products:selectedProducts,id:data.id,token:auth.token}).then(() => {
                            getProductsOfert(data.id).then((products) =>{
                              setLoading(true);
                              setProductsOferts(products.results)
                              setLoading(false);
                            })
                            show("Acción completada","success");
                            setProductsOferts([]);
                          });}
                          else{
                            show("No hay ningún elemento seleccionado","warn")
                          }
                        }}
                      >
                        <i
                          className="pi pi-minus"
                          style={{ color: "white" }}
                        ></i>
                      </button>
                    </div>
                  )}
                </div>
              <div
                className={
                  mobileSize
                    ? "add-products-to-oferts-containers add-products-to-oferts-containers-mobileSize"
                    : "add-products-to-oferts-containers"
                }
              >
               
                { !loading ?
                  <DataTableProducts
                  OfertID={infoData.id}
                  editable={editable}
                  mobileSize={mobileSize}
                  productsOFerts={productsOFerts}
                  setProductsOferts={setProductsOferts}
                  handleOnChangeChecked={handleOnChangeChecked}
                  searchChecked={searchChecked}
                />:<Loader/>
                }
              </div>
            </>
          }
          <div className="button-promotion-container">
            {editable && (
              <button name="submit_button" className="buttons-user-info">
                {data ? "Guardar" : "Aceptar"}
              </button>
            )}
            <div
              name="exit_button"
              className="buttons-user-info"
              onClick={() => {
                onHide();
                setProductsOferts([]);
              }}
            >
              Cancelar
            </div>
          </div>
        </form>
      </Dialog>
    </section>
  );
}

export default InfoPromotion;
