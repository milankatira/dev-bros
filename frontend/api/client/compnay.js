import axios from "axios";
import { company } from "../../constant/api_url";

axios.defaults.withCredentials = true;

export const addCompany = async (packet) => {
  return await axios
    .post(company, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getCompany = async () => {
  return await axios
    .get(company)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
export const updateCompany = async (packet) => {
  return await axios
    .put(company, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
