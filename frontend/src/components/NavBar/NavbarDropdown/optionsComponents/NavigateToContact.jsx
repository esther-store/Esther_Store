import { Link } from "react-router-dom";
import { PhoneIcon } from "@/icons/PhoneIcon";

export default function NavigateToContact() {
  return (
    <Link to="/contact">
      <div style={styles.flexContainer}>
        <PhoneIcon color="rgba(0, 0, 0, 0.7)" />
        <span>Contacto</span>
      </div>
    </Link>
  );
}

const styles = {
  flexContainer: {
    windth: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    padding: "5px",
    color:"rgba(0, 0, 0, 0.8)",
    fontFamily: "Poppins-Regular",
    fontSize: "16px",
  },
};
