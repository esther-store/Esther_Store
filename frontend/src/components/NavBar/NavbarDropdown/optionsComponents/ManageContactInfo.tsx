import { Link } from "react-router-dom";
import { ContactBook } from "@/icons/ContactBook";

function ManageContactInfo() {
  return (
    <Link to="/management/contact">
      <div style={styles.flexContainer}>
        <ContactBook color="rgba(0, 0, 0, 1)" />
        <span>Administrar Contacto</span>
      </div>
    </Link>
  );
}

export default ManageContactInfo;

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
