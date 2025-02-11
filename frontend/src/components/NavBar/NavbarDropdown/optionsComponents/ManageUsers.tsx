import { Link } from "react-router-dom";
import { UserIcon } from "@/icons/UserIcon";

function ManageUsers() {
  return (
    <Link to="/management/users">
      <div style={styles.flexContainer}>
        <UserIcon color="rgba(0, 0, 0, 0.7)" />
        <span>Administrar Usuarios</span>
      </div>
    </Link>
  );
}

export default ManageUsers;

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
