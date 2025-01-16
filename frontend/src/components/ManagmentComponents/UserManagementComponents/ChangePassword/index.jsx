import "./index.css";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import { changePassword } from "@/services/ManageUser/changePassword";

const heaerTitle = () => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <i className="pi pi-user "></i>
      <p style={{ marginBlock: "0px", fontSize: "1rem" }}>Cambiar Contraseña</p>
    </div>
  );
};

export function ChangePassword({ onHide, visible, token, user_id, show }) {
  const [passowrdDetails, setPasswordDetails] = useState({
    password: "",
    confirmPassword: "",
  });

  const handelOnChange = (value, campo) => {
    var InfoDataCopy = { ...passowrdDetails };
    InfoDataCopy[campo] = value;
    setPasswordDetails(InfoDataCopy);
  };

  return (
    <Dialog
      onHide={() => {
        onHide();
        setPasswordDetails({
          password: "",
          confirmPassword: "",
        })
      }}
      visible={visible}
      position="top"
      className="dialog-change-password"
      header={heaerTitle}
    >
      <form
        onSubmit={(e) => {
          //prevent default faltaba
          e.preventDefault()
          if (passowrdDetails.password !== passowrdDetails.confirmPassword) {
            show("Las contraseñas no coinciden","warn");
          } else {
            changePassword({
              user_id: user_id,
              //se esta llamando al parametro password de la funcion changePassword, esta se llama newPassword
              newPassword: passowrdDetails.password, 
              token: token,
            }).then((respponse) => {     
              if(respponse == "Password Error"){   
                show("Error al cambiar la contraseña. Inténtelo más tarde","warn")
              }
              //este else no estaba, no se mostraba si se habia cambiado bien
              else{
                show("Contraseña cambiada correctamente","success")
              }
            })

          
          }
        }}
      >
        <div className="input-info-dialog">
          <div className="p-dialog-container">
            <p>Nueva Contraseña:</p>
          </div>
          <div className="input-dialog-container">
            <input
              type="password"
              defaultValue={passowrdDetails.password}
              onChange={(e) => handelOnChange(e.target.value, "password")}
              required
            />
          </div>
        </div>
        <div className="input-info-dialog">
          <div className="p-dialog-container">
            <p>Confirmar Contraseña:</p>
          </div>
          <div className="input-dialog-container">
            <input
              type="password"
              defaultValue={passowrdDetails.confirmPassword}
              onChange={(e) =>
                handelOnChange(e.target.value, "confirmPassword")
              }
              required
            />
          </div>
        </div>
        <div className="button-user-container">
          <button name="submit_button" className="buttons-user-info">
            Aceptar
          </button>
          <button
            name="exit_button"
            className="buttons-user-info"
            onClick={(e) => {
              e.preventDefault();
              onHide();
              setPasswordDetails({
                password: "",
                confirmPassword: "",
              })
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </Dialog>
  );
}
