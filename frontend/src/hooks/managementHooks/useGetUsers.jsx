import React, { useEffect, useContext } from "react";
import { getUsers } from "@/services/ManageUser/getUsers.js";
import AuthenticationContext from "@/context/authenticationContext.jsx";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers({ searchParams, setUsers }) {
  const { auth } = useContext(AuthenticationContext);

  const {
    data,
    isLoading: loading,
    isError,
  } = useQuery({
    queryKey: ["users", searchParams.toString, auth.token],
    queryFn: () => getUsers(searchParams.toString, auth.token),
    staleTime: 1000 * 60 * 30
  });

  const users = data?.results || []

  //get promotions of store
  useEffect(() => {
    if(data){
        setUsers(data.results);
    }
  }, [data]);

  return { users, loading, setLoading: () => {} };
}
