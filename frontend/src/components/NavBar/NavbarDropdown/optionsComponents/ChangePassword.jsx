import { Link } from "react-router-dom";
import { LockOpenIcon } from "@/icons/LockOpenIcon";

function ChangePassword() {
  return (
    <Link to="/change-password">
      <div style={styles.flexContainer}>
        <LockOpenIcon color="rgba(0, 0, 0, 0.7)" />
        <span>Cambiar Contraseña</span>
      </div>
    </Link>
  );
}

export default ChangePassword;

const styles = {
  flexContainer: {
    height: "auto",
    width: "100%",
    backgroundColor: "transparent",
    padding: "5px",
    border: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    color: "rgba(0, 0, 0, 0.8)",
    fontFamily: "Poppins-Regular",
    fontSize: "16px",
  },
};
