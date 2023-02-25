import * as types from "../constants/Auth";

export const setLoginSuccess = (data) => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const setLoading = (data) => ({
  type: types.LOADING,
  payload: data,
});

export const setLoginFailure = (error) => ({
  type: types.LOGIN_FAILURE,
  payload: error,
});

export const setRegisterSuccess = (data) => ({
  type: types.REGISTER_SUCCESS,
  payload: data,
});
export const setRegisterFailure = (error) => ({
  type: types.REGISTER_FAILURE,
  payload: error,
});

export const setEmailVerifySuccess = (data) => ({
  type: types.EMAIL_VERIFICATION_SUCCESS,
  payload: data,
});
export const setEmailVerifyFailure = (error) => ({
  type: types.EMAIL_VERIFICATION_FAILURE,
  payload: error,
});

export const setLogout = () => ({ type: types.LOGOUT });

export const authStatusSuccess = (data) => ({
  type: types.AUTH_STATUS,
  payload: data,
});

export const forgotPasswordSuccess = (data) => ({
  type: types.AUTH_RESET_PASSOWRD_SUCCESS,
  payload: data,
});
export const forgotPasswordFailure = (error) => ({
  type: types.AUTH_RESET_PASSOWRD_FAILURE,
  payload: error,
});

export const setPasswordSuccess = (data) => ({
  type: types.AUTH_SET_NEW_PASSOWRD_SUCCESS,
  payload: data,
});
export const setPasswordFailure = (error) => ({
  type: types.AUTH_SET_NEW_PASSOWRD_FAILURE,
  payload: error,
});

export const clearGlobalState = () => ({ type: types.CLEAR_GLOBAL_STATE });
export const clearAuthState = () => ({ type: types.CLEAR_AUTH_STATE });
