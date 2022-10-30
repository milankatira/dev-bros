import React, { createContext, useReducer, useContext } from "react";

import LoadingState from "../reducer/Loading";

//!TODO INITIAL STATE

const initialState = {
  loading: true,
};

export const Authcontext = createContext(initialState);

function LoadingProvider(props) {
  const [loadingState, dispatch] = useReducer(LoadingState, initialState);

  const setLoading = (status: boolean) => {
    dispatch(setLoading(status));
  };

  const Auth_api = {
    setLoading,
  };

  const authData = { loadingState, dispatch, Auth_api };

  return <Authcontext.Provider value={authData} {...props} />;
}

function useLoadingcontext() {
  return useContext(Authcontext);
}

export { LoadingProvider, useLoadingcontext };
