import { Link } from "react-router-dom";
import { OfferIcon } from "@/icons/OfferIcon";

function ManagePromotions() {
  return (
    <Link to="/management/promotions">
      <div style={styles.flexContainer}>
        <OfferIcon color="rgba(0, 0, 0, 0.65)" />
        <span>Administrar Promociones</span>
      </div>
    </Link>
  );
}

export default ManagePromotions;

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
