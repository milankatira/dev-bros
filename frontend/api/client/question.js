import axios from "axios";

import {
  questions,
  get_question,
  removequestions,
  get_single_question,
  get_all_question,
  add_single_question,
  coding_question,
  singlecodingquestion,
} from "../../constant/api_url";
axios.defaults.withCredentials = true;

export const addQuestion = async (packet) => {
  return await axios
    .post(questions, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getCodingQuestion = async (id) => {
  return await axios
    .get(coding_question(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getsingleCodingQuestion = async (id) => {
  return await axios
    .get(singlecodingquestion(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const updatesingleCodingQuestion = async (id, packet) => {
  return await axios
    .put(singlecodingquestion(id), packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getQuestion = async (id) => {
  return await axios
    .get(get_question(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getallQuestion = async (id) => {
  return await axios
    .get(get_all_question(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const addSingleQuestion = async (id, packet) => {
  return await axios
    .post(add_single_question(id), packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const addCodingQuestion = async (id, packet) => {
  return await axios
    .post(coding_question(id), packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getSingleQuestion = async (id) => {
  return await axios
    .get(get_single_question(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const updateSingleQuestion = async (id, packet) => {
  return await axios
    .post(get_single_question(id), packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const RemoveQuestion = async (packet) => {
  return await axios
    .post(removequestions, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
