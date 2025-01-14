import React, { useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

const QueryFiltersContext = React.createContext("");

export function QueryFiltersContextProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const setFilter = useCallback(function setFilter({ name, value }) {
    /*Recive a filter name and its value, and includes it in the query params of the url*/
    let params = new URLSearchParams(searchParams);
    //if the given filter don't exist, it's added
    if (params.get(name) === null) {
      params.append(name, value);
    }
    //if the given filter already exists, the value is changed
    else {
      params.set(name, value);
    }
    //if the given filter is not pagination and there is a current page active, remove the page filter
    if (name !== "page" && params.get("page") !== null) {
      params.delete("page")
    }
    setSearchParams(params);
  })

  function removeAllFilters() {
    /*Remove all query params from the url*/
    setSearchParams({});
  }

  const removeFilter = useCallback(function removeFilter(name) {
    let params = new URLSearchParams(searchParams);
    params.delete(name);
    setSearchParams(params);
  })

  const getActiveFilter = useCallback(function getActiveFilter(name) {
    /*get the active value in the url query params of the filter given*/
    let params = new URLSearchParams(searchParams);
    let filterValue = params.get(name);
    if (filterValue === null) {
      return "";
    }
    return filterValue;
  })

  const allActiveFilters = useMemo(function getAllFilters() {
    return searchParams
      .toString()
      .split("&")
      .map((param) => {
        return { name: param.split("=")[0], value: param.split("=")[1] };
      });
  },[searchParams])

  return (
    <QueryFiltersContext.Provider
      value={{
        searchParams,
        setSearchParams,
        setFilter,
        removeFilter,
        removeAllFilters,
        getActiveFilter,
        allActiveFilters,
      }}
    >
      {children}
    </QueryFiltersContext.Provider>
  );
}

export default QueryFiltersContext;
