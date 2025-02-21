import "@/store_pages/pagesStyles/ManagementContact.css";
import "primeicons/primeicons.css";
import { useRef, Suspense, lazy } from "react";
import { useManageContactInfo } from "@/hooks/managementHooks/useManageContactInfo";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { RemovePageLoader } from "@/components/RemovePageLoader";
import { createContactInfoToEdit } from "@/utils/contactInfoValues";
import { ManagementProductsPageHeader } from "@/components/ManagmentComponents/ProductsManagementComponents/ManagmentProductsPageHeader";
const RetryQueryComponent = lazy(() => import("@/components/RetryQueryComponent"))

function ManagementContact() {
  const toast = useRef(null);
  const {
    contactInfo: contact,
    loadingContactInfo: loading,
    handleEditContactInfo,
    edittingContactInfo,
    errorContactInfo,
    refetch
  } = useManageContactInfo({ toast: toast });

  return (
    <main className="manage-contact-page">
      <meta name="robots" content="noindex"></meta>
      <RemovePageLoader />
      <Toast ref={toast} position="top-left" />
      <ManagementProductsPageHeader
        title="Gestión de Contacto"
        justifyContent="center"
      />
      {loading ? (
        <section style={styles.loaderContaier}>
          <i className="pi pi-spinner pi-spin loading-spinner"></i>
        </section>
      ) : errorContactInfo?
          <section style={styles.loaderContaier}>
        <Suspense fallback = {<i className="pi pi-spinner pi-spin loading-spinner"></i>}>
            <RetryQueryComponent refetch = {refetch}  message = "Error obteniendo la info de contacto"/>
        </Suspense>
          </section>
      :(
        <form
          action="submit"
          onSubmit={(e) => {
            e.preventDefault();
            handleEditContactInfo({
              id: contact?.id,
              info: createContactInfoToEdit(e),
            });
          }}
        >
          <h2>Redes Sociales</h2>
          <ul className="contact-info-container">
            {/*Facebook*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-facebook"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="facebook"
                style={{ minWidth: "160px", maxWidth: "15rem" }}
                defaultValue={contact.facebook}
              />
            </li>

            {/*Instagram*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-instagram"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="instagram"
                defaultValue={contact.instagram}
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </li>

            {/*Telegram*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-telegram"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="telegram"
                defaultValue={contact.telegram}
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </li>
          </ul>

          <h2>Información de Contacto</h2>
          <ul className="contact-info-container">
            {/*Phone*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-phone"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="phone"
                defaultValue={contact.phone}
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </li>

            {/*Email*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-envelope"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="email"
                defaultValue={contact.email}
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </li>

            {/*Whatsapp*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-whatsapp"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="whatsapp"
                required
                defaultValue={contact.whatsapp}
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </li>

            {/*Location*/}
            <li className="element-contact p-inputgroup">
              <span className="p-inputgroup-addon">
                <i className="pi pi-map-marker"></i>
              </span>
              <InputText
                disabled={edittingContactInfo === true}
                name="location"
                defaultValue={contact.location}
                style={{ minWidth: "160px", maxWidth: "15rem" }}
              />
            </li>
          </ul>

          <div className="buttons-container">
            <Button
              type="reset"
              icon={"pi pi-replay"}
              label="Reiniciar"
              className="btn-pane"
              size="small"
              disabled={edittingContactInfo === true}
            ></Button>
            <Toast ref={toast} />
            <Button
              type="submit"
              icon={
                edittingContactInfo ? "pi pi-spinner pi-spin" : "pi pi-save"
              }
              label={edittingContactInfo ? "Guardando" : "Guardar"}
              className="btn-pane"
              disabled={edittingContactInfo === true}
              size="small"
            ></Button>
          </div>
        </form>
      )}
    </main>
  );
}

export default ManagementContact;

const styles = {
  loaderContaier: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  },
};
