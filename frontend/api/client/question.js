import axios from "axios";

import {
  questions
} from '../../constant/api_url'
axios.defaults.withCredentials = true;

export const addQuestion = async (packet) => {
  return await axios
    .post(questions, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};