import React, { createContext, useReducer, useContext, useState } from "react";

import Exam from "../reducer/Exam";
import axios from "axios";
import {
  GetAllExam,
  addExam,
  updateExam,
  deleteExam,
} from "../../api/client/exam";
import { user } from "../../api/client/user";

import { login } from "../../api/auth";

import { setExamLoading, getExamDataSuccess } from "../actions/Exam";
export const Examcontext = createContext();

//!TODO INITIAL STATE

const initialState = {
  exam: { data: null, error: null },
  examdetails: { data: null, error: null },
  addexam: { data: null, error: null },
  updateexam: { data: null, error: null },
  deleteexam: { data: null, error: null },
  loading: false,
};

function ExamProvider(props) {
  const [exam, dispatch] = useReducer(Exam, initialState);
  const [hasMore, setHasMore] = useState(false);
  const [myexam, setmyexam] = useState([]);
  const GetExam = async (isUpdate, params, cancelToken) => {
    dispatch(setExamLoading(true));
    await axios({
      method: "GET",
      url: "http://localhost:4000/api/exam",
      params,
      cancelToken,
    })
      .then((res) => {
        dispatch(setExamLoading(false));
        if (isUpdate) {
          setmyexam([res.data.exam]);
        } else {
          setmyexam((prevBooks) => {
            return [...new Set([...prevBooks, ...res.data.exam.map((b) => b)])];
          });
        }
        setHasMore(res?.data?.exam?.length >= 10);
        dispatch(getExamDataSuccess(res?.data?.exam));
      })
      .catch((err) => {
        dispatch(getExamDataSuccess(false));
        throw err;
      });
  };

  const AddExam = (packet, toggleModal) => {
    dispatch(setExamLoading(true));
    addExam(packet)
      .then(() => {
        dispatch(setExamLoading(false));
        toggleModal();
        GetExam(true);
      })
      .catch(() => {
        dispatch(getExamDataSuccess(false));
      });
  };

  const UpdateExam = () => {
    dispatch(setExamLoading(true));
    updateExam()
      .then(() => {
        dispatch(setExamLoading(false));
        GetExam();
      })
      .catch(() => {
        dispatch(getExamDataSuccess(false));
      });
  };

  const DeleteExam = () => {
    dispatch(setExamLoading(true));
    deleteExam()
      .then(() => {
        dispatch(setExamLoading(false));
        GetExam();
      })
      .catch(() => {
        dispatch(getExamDataSuccess(false));
      });
  };

  const Exam_api = {
    GetExam,
    AddExam,
    UpdateExam,
    DeleteExam,
  };

  const examData = { exam, dispatch, myexam, hasMore, Exam_api };

  return <Examcontext.Provider value={examData} {...props} />;
}

function useExamcontext() {
  return useContext(Examcontext);
}

export { ExamProvider, useExamcontext };
