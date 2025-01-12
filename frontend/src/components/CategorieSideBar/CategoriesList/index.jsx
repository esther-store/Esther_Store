import Loader from "../../Loader";
import "./index.css";

function CategoriesList({
  categories,
  loading,
  setActiveCategory,
  setFilter,
  removeFilter,
  activeCategory,
  showPromotionsModal,
}) {
  return (
    <section className="categories-side-bar">
      <h2>Categorías</h2>
      {loading ? (
        <div className="categories-loader-container">
          <Loader />
        </div>
      ) : (
        <ul>
          <li
            className={activeCategory === "" ? "category-selected" : null}
            onClick={() => {
              setActiveCategory("");
              removeFilter("categoria");
            }}
          >
            <span>Todas</span>
          </li>
          {categories.map((category) => (
            <li
              className={
                parseInt(category.id) === parseInt(activeCategory)
                  ? "category-selected"
                  : null
              }
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setFilter({ name: "categoria", value: category.id });
              }}
            >
              <span>{category.nombre}</span>
            </li>
          ))}
          <li className="ofers-category">
            <span onClick = {() => showPromotionsModal(true)}>Ofertas</span>
          </li>
        </ul>
      )}
    </section>
  );
}

export default CategoriesList;
