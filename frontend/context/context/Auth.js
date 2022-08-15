import React, { createContext, useReducer, useContext } from "react";

import Auth from "../reducer/Auth";

import { user} from "../../api/client/user";

import { login } from "../../api/auth";

import { authStatusSuccess, setLoading } from "../actions/Auth";

export const Authcontext = createContext();

//!TODO INITIAL STATE

const initialState = {
  signUp: { data: null, error: null },
  SignIn: { data: null, error: null },
  authUser: null,
  authError: null,
  authStatus: null,
  forgotPassword: { data: null, error: null },
  newPassword: { data: null, error: null },
  verifyEmail: { data: null, error: null },
  loading: true,
};

function AuthProvider(props) {
  const [auth, dispatch] = useReducer(Auth, initialState);

  const AuthStatus = () => {
    dispatch(setLoading(true));
    user()
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(authStatusSuccess(res.data));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const LoginUser = (packet) => {
    dispatch(setLoading(true));

    login(packet)
      .then((res) => {
        dispatch(setLoading(false));
        dispatch(authStatusSuccess(res.data));
      })
      .catch((err) => {
        dispatch(setLoading(false));
      });
  };

  const Auth_api = {
    AuthStatus,
    LoginUser,
  };

  const authData = { auth, dispatch, Auth_api };

  return <Authcontext.Provider value={authData} {...props} />;
}

function useAuthcontext() {
  return useContext(Authcontext);
}

export { AuthProvider, useAuthcontext };
