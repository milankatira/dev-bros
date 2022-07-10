import axios from "axios";

import {
  questions,
  get_question,
  removequestions,
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

export const getQuestion = async (id) => {
  return await axios
    .get(get_question(id))
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
