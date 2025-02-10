import "./pagesStyles/Login.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { CompanyLogo } from "@/components/NavBar/CompanyLogo";
import { Toast } from "primereact/toast";
import { Password } from "primereact/password";
import React, { useContext, useRef } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import { RemovePageLoader } from "@/components/RemovePageLoader";

function ChangePassword() {
  const { handleChangePassword, loading, auth } = useContext(
    AuthenticationContext
  );
  const toast = useRef(null);

  function changePassword(e) {
    e.preventDefault();
    handleChangePassword({
      newPassword1: e.target["password1"].value,
      newPassword2: e.target["password2"].value,
      token: auth.token,
      callback: (success) => {
        if (success == "ok") {
          showToast({
            severity: "success",
            summary: "Éxito",
            detail: "Contraseña cambiada correctamente.",
          });
        } else {
          showToast({
            severity: "error",
            summary: "Error",
            detail: `${success}`,
          });
        }
      },
    });
  }

  const showToast = ({
    severity = "success",
    summary = "Éxito",
    detail = "Operación Exitosa",
    life = 3000,
  }) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: life,
    });
  };

  return (
    <section className="login-container">
      <meta name="robots" content="noindex"></meta>
      <RemovePageLoader/>
      <Toast ref={toast} position="bottom-center" />
      <section className="login-section">
        <div className="logo-container-login">
          <CompanyLogo/>
        </div>
        <form
          action=""
          className="form-login"
          onSubmit={(e) => changePassword(e)}
        >
          <span className="p-float-label">
            <Password inputId="password1" toggleMask feedback={false} required = {true} />
            <label htmlFor="password1">Contraseña</label>
          </span>
          <span className="p-float-label">
            <Password inputId="password2" toggleMask feedback={false} required = {true} />
            <label htmlFor="password2">Repetir Contraseña</label>
          </span>
          <button type="submit">{loading ? "Enviando ..." : "Enviar"}</button>
        </form>
      </section>
    </section>
  );
}

export default ChangePassword;
