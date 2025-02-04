import "./index.css";
import AddIcon from "@/assets/icons/oferts-management-add.svg";
import {TrashIcon} from "@/icons/TrashIcon";
import {SearchIcon} from "@/icons/SearchIcon";

function SearchOferts({
  setSearch,
  handleOnClickCreateButton,
  selectedOferts,
  confirmAll,
  show,
  responsive,
  search,
}) {
  return (
    <search
      title="Sección de búsqueda"
      className={
        responsive
          ? "search-oferts-container -wrap600px"
          : "search-oferts-container"
      }
    >
      <form
        onSubmit={(event) => event.preventDefault()}
        className="search-oferts-form"
      >
        <SearchIcon width={16} height={16} color = "#000"/>
        <input
          placeholder="Buscar"
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </form>

      <button
        className="search-oferts-button"
        onClick={handleOnClickCreateButton}
      >
        <img src={AddIcon.src} alt="add" width={"13px"} />
        <p>Agregar</p>
      </button>

      <button
        className="search-oferts-button"
        onClick={() => {
          if (selectedOferts.length > 0) confirmAll(selectedOferts);
          else show("Debe seleccionar almenos un elemento", "warn");
        }}
      >
        <TrashIcon width={20} height={20}/>
        <p>Eliminar</p>
      </button>
    </search>
  );
}

export default SearchOferts;
