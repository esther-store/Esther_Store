import React, { useContext, useState } from "react";
import AuthenticationContext from "@/context/authenticationContext";
import { useNavigate } from "react-router-dom";
import { LeaveIcon } from "@/icons/LeaveIcon";
import { ConfirmDialog } from "primereact/confirmdialog";

function CloseSession() {
  const { handleLogout } = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  function closeSession() {
    handleLogout(() => {
      navigate("/bye");
    });
  }

  const ShowConfirmDialog = () => (
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
  );

  const CloseSessionButton = () => (
    <button
      style={styles.closeSessionButton}
      onClick={() => setShowConfirmDialog(true)}
    >
      <LeaveIcon color="rgba(0, 0, 0, 0.7)" />
      <span>Cerrar Sesión</span>
    </button>
  );

  return { CloseSessionButton, ShowConfirmDialog };
}

export default CloseSession;

const styles = {
  closeSessionButton: {
    width: "100%",
    height: "auto",
    backgroundColor: "transparent",
    padding: "5px",
    border: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "10px",
    color: "rgba(0, 0, 0, 0.8)",
    fontFamily: "Poppins-Regular",
    fontSize: "16px",
  },
  closeSessionButtonImage: {
    filter: "brightness(100%) saturate(100%) invert(1)",
  },
};
