import React, { useContext, useState } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import { useNavigate } from "react-router-dom";
import CloseSessionIcon from "@/assets/icons/close-session-icon.svg";
import { ConfirmDialog } from "primereact/confirmdialog";
import "./index.css";

function CloseSession() {
  const { auth, handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  function closeSession() {
    handleLogout(() => {
      navigate("/bye");
    });
  }

  return auth.token ? (
    <>
      <ConfirmDialog
        visible={showConfirmDialog}
        onHide={() => setShowConfirmDialog(false)}
        acceptClassName="p-button-danger"
        acceptLabel="Aceptar"
        rejectLabel="Cancelar"
        message="Deseas cerrar Sesión?"
        header="Confirmación"
        icon="pi pi-exclamation-triangle"
        accept={closeSession}
        draggable={false}
        resizable={false}
        style={{ maxWidth: "90%" }}
      />
        <button
            className="close-session-button"
            onClick={() => setShowConfirmDialog(true)}
        >
            <img alt="Close Session" src={CloseSessionIcon.src} />
            <span>Cerrar Sesión</span>
        </button>
    </>
  ) : null;
}

export default CloseSession;
