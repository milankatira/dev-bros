import axios from "axios";

import {
  exam,
  exam_id,
  ExamQuestion,
  generateExamReport,
  getExamStatus,
  updateExamReport,
} from "../../constant/api_url";

axios.defaults.withCredentials = true;

export const getExamById = async (id) => {
  return await axios
    .get(exam_id(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const GenerateExamReport = async (packet) => {
  return await axios
    .post(generateExamReport, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const GetExamStatus=async(assign_exam_id)=>{
  return await axios
    .get(getExamStatus(assign_exam_id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
}

export const UpdateExamReport=async(packet)=>{
  return await axios
    .post(updateExamReport, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
}


export const GetExamQuestion = async (exam_id) => {
  return await axios
    .get(ExamQuestion(exam_id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const GetAllExam = async (queryParams) => {
  return await axios
    .get(exam, { params: queryParams })
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const addExam = async (packet) => {
  return await axios
    .post(exam, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const updateExam = async (id, packet) => {
  return await axios
    .put(exam_id(id), packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const deleteExam = async (id) => {
  return await axios
    .delete(exam_id(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
