import * as types from "../constants/auth";
const authReducer = (state, action) => {
  switch (action.type) {
    case types.AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload,
      };
    case types.REGISTER_SUCCESS:
      return { ...state, signUp: { data: action.payload, error: null } };
    case types.REGISTER_FAILURE:
      return { ...state, signUp: { data: null, error: action.payload } };

    case types.LOGIN_SUCCESS:
      return { ...state, SignIn: { data: action.payload, error: null } };
    case types.LOGIN_FAILURE:
      return { ...state, SignIn: { data: null, error: action.payload } };

    case types.EMAIL_VERIFICATION_SUCCESS:
      return { ...state, verifyEmail: { data: action.payload, error: null } };
    case types.EMAIL_VERIFICATION_FAILURE:
      return { ...state, verifyEmail: { data: null, error: action.payload } };

    case types.AUTH_RESET_PASSOWRD_SUCCESS:
      return {
        ...state,
        forgotPassword: { data: action.payload, error: null },
      };
    case types.AUTH_RESET_PASSOWRD_FAILURE:
      return {
        ...state,
        forgotPassword: { error: action.payload, data: null },
      };
    case types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case types.AUTH_SET_NEW_PASSOWRD_SUCCESS:
      return { ...state, newPassword: { data: action.payload, error: null } };
    case types.AUTH_SET_NEW_PASSOWRD_FAILURE:
      return { ...state, newPassword: { error: action.payload, data: null } };

    case types.LOGOUT:
      return {
        ...state,
        SignIn: { data: null, error: null },
        authStatus: null,
      };

    case types.CLEAR_GLOBAL_STATE:
      return { state };

    case types.CLEAR_AUTH_STATE:
      return {
        ...state,
        SignIn: { data: null, error: null },
        authStatus: null,
      };

    default:
      return state;
  }
};
export default authReducer;
