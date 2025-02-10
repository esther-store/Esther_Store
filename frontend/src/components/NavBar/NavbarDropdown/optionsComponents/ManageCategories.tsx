import { Link } from "react-router-dom";
import { TagIcon } from "@/icons/TagIcon";

function ManageCategories() {
  return (
    <Link to="/management/categories">
      <div style={styles.flexContainer}>
        <TagIcon color="rgba(0, 0, 0, 0.7)" />
        <span>Administrar Categorías</span>
      </div>
    </Link>
  );
}

export default ManageCategories;

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
