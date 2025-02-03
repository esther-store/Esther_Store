import { useNavigate } from "react-router-dom";
import LockOpen from "@/assets/icons/lock-open.svg";

function ChangePassword() {
  const navigate = useNavigate();
  return (
    <button
      className="change-password-button"
      onClick={() => navigate("/change-password")}
    >
      <img alt="change-password" src={LockOpen.src} />
      <span>Cambiar Contraseña</span>
    </button>
  );
}

export default ChangePassword;
