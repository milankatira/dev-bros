import * as types from "../constants/Loading";
const authReducer = (state, action) => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
export default authReducer;
