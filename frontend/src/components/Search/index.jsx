import "./index.css";
import React, { useState, useEffect, useContext } from "react";
import QueryFiltersContext from "@/context/filtersContext";
import { SearchIcon } from "@/icons/SearchIcon";
import { useNavigate, useLocation } from "react-router-dom";

const Search = React.memo(function Search() {
  const { searchParams, setFilter, getActiveFilter, removeFilter } =
    useContext(QueryFiltersContext);
  const [searchingValue, setSearchingValue] = useState("");
  const navigate = useNavigate();
  const {pathname} = useLocation();

  //search the product when the user ends writting on the search form
  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (searchingValue == "") return removeFilter("search");
      if (pathname === '/') {
        return navigate(`/store?search=${searchingValue.split(" ").join("+")}`);
      }
      return setFilter({ name: "search", value: searchingValue });
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchingValue]);

  useEffect(() => {
    setSearchingValue(getActiveFilter("search"));
  }, [searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="search-form">
      <SearchIcon width={15} height={15} color="rgba(0, 0, 0, 0.7)" />
      <input
        placeholder="Buscar"
        onChange={(e) => setSearchingValue(e.target.value)}
        value={searchingValue}
        style={{ color: "black" }}
      />
    </form>
  );
});

export default Search;
