import * as types from "../constants/exam";

const examReducer = (state, action) => {
  switch (action.type) {
    case types.ADD_EXAM_SUCCESS:
      return {
        ...state,
        addexam: {
          data: action.payload,
          error: null,
        },
      };
    case types.ADD_EXAM_FAILURE:
      return {
        ...state,
        addexam: {
          data: null,
          error: action.payload,
        },
      };

    case types.GET_BY_ID_EXAM_SUCCESS:
      return {
        ...state,
        examdetails: {
          data: action.payload,
          error: null,
        },
      };
    case types.GET_BY_ID_EXAM_FAILURE:
      return {
        ...state,
        examdetails: {
          data: null,
          error: action.payload,
        },
      };
    case types.GET_EXAM_SUCCESS:
      return {
        ...state,
        exam: {
          data: action.payload,
          error: null,
        },
      };
    case types.GET_EXAM_FAILURE:
      return {
        ...state,
        exam: {
          data: null,
          error: action.payload,
        },
      };
    case types.UPDATE_EXAM_SUCCESS:
      return {
        ...state,
        updateexam: {
          data: action.payload,
          error: null,
        },
      };
    case types.UPDATE_EXAM_FAILURE:
      return {
        ...state,
        updateexam: {
          data: null,
          error: action.payload,
        },
      };

    case types.DELETE_EXAM_SUCCESS:
      return {
        ...state,
        deleteexam: {
          data: action.payload,
          error: null,
        },
      };
    case types.DELETE_EXAM_FAILURE:
      return {
        ...state,
        deleteexam: {
          data: null,
          error: action.payload,
        },
      };

    case types.EXAM_LOADING:
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

export default examReducer;
