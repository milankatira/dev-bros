import axios from "axios";
import {
  company,
  candidates,
  assignExam,
  compileCode,
  assignCandidate,
  notifyStatus,
} from "../../constant/api_url";

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

export const getCandidates = async () => {
  return await axios
    .get(candidates)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const AddAssignExam = async (packet) => {
  return await axios
    .post(assignExam, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const GetAssignExam = async () => {
  return await axios
    .get(assignExam)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const CompileCode = async (packet) => {
  return await axios
    .post(compileCode, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const GetAssignCandidate = async () => {
  return await axios
    .get(assignCandidate)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const NotifyMember = async (id) => {
  return await axios
    .post(notifyStatus(id))
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
