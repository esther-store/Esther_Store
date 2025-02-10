import { Link } from "react-router-dom";
import { BoxIcon } from "@/icons/BoxIcon";

function Manageproducts() {
  return (
    <Link to="/management/products">
      <div style={styles.flexContainer}>
        <BoxIcon color="rgba(0, 0, 0, 0.7)" />
        <span>Administrar Productos</span>
      </div>
    </Link>
  );
}

export default Manageproducts;

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
