import "./index.css";
import React, { useState, useEffect, useContext, useCallback } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { SearchIcon } from "@/icons/SearchIcon";
import { useNavigate, useLocation } from "react-router-dom";
import { debounce } from "@/utils/debounce";

const Search = React.memo(function Search() {
  const { setFilter, getActiveFilter, removeFilter } =
    useContext<any>(QueryFiltersContext);
  const [searchingValue, setSearchingValue] = useState<string>("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = useCallback(
    (searchValue: string) => {
      if (
        (searchValue === "" || searchValue == null) &&
        getActiveFilter("search") !== ""
      ) {
        return removeFilter("search");
      }
      if (pathname === "/") {
        return navigate(`/store?search=${searchValue.split(" ").join("+")}`);
      }
      return setFilter({ name: "search", value: searchValue });
    },
    [pathname, getActiveFilter, removeFilter, setFilter]
  );

  const searchWithDebounce = useCallback(
    debounce((value:string) => handleSearch(value), 500),
    [handleSearch]
  );

  useEffect(() => {
    const currentSearchValue = getActiveFilter("search");
    currentSearchValue !== "" ? setSearchingValue(currentSearchValue) : null;
  }, []);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <SearchIcon width={15} height={15} color="rgba(0, 0, 0, 0.7)" />
      <input
        placeholder="Buscar"
        onChange={(e) => {
          searchWithDebounce(e?.target?.value);
          setSearchingValue(e?.target?.value);
        }}
        value={searchingValue}
        style={{ color: "black" }}
      />
    </form>
  );
});

export default Search;
