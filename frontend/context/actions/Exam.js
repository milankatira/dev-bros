import * as types from "../constants/Exam";

export const addExamDataSuccess = (data) => ({
  type: types.ADD_EXAM_SUCCESS,
  payload: data,
});
export const addExamDataFailure = (error) => ({
  type: types.ADD_EXAM_FAILURE,
  payload: error,
});

export const updateExamDataSuccess = (data) => ({
  type: types.UPDATE_EXAM_SUCCESS,
  payload: data,
});
export const updateExamDataFailure = (error) => ({
  type: types.UPDATE_EXAM_FAILURE,
  payload: error,
});

export const deleteExamDataSuccess = (data) => ({
  type: types.DELETE_EXAM_SUCCESS,
  payload: data,
});
export const deleteExamDataFailure = (error) => ({
  type: types.DELETE_EXAM_FAILURE,
  payload: error,
});

export const getExamDataSuccess = (data) => ({
  type: types.GET_EXAM_SUCCESS,
  payload: data,
});
export const getExamDataFailure = (error) => ({
  type: types.GET_EXAM_FAILURE,
  payload: error,
});

export const getExamDataByIdSuccess = (data) => ({
  type: types.GET_BY_ID_EXAM_SUCCESS,
  payload: data,
});
export const getExamDataByIdFailure = (data) => ({
  type: types.GET_BY_ID_EXAM_FAILURE,
  payload: data,
});

export const setExamLoading = (status) => ({
  type: types.EXAM_LOADING,
  payload: status,
});
