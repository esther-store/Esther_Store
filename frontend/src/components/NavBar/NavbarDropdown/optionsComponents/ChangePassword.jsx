import { useNavigate } from "react-router-dom";
import {LockOpenIcon} from "@/icons/LockOpenIcon";

function ChangePassword() {
  const navigate = useNavigate();
  return (
    <button
      style={styles.changePasswordButton}
      onClick={() => navigate("/change-password")}
    >
      <LockOpenIcon color = "rgba(0, 0, 0, 0.7)"/>
      <span>Cambiar Contraseña</span>
    </button>
  );
}

export default ChangePassword;

const styles = {
  changePasswordButton: {
    height: 'auto',
    width: '100%',
    backgroundColor: 'transparent',
    padding: '5px',
    border: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    color:"rgba(0, 0, 0, 0.8)",
    fontFamily: 'Poppins-Regular',
    fontSize:'16px'
  },
};

