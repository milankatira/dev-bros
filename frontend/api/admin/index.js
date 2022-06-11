import axios from "axios";

import {
  get_city,
  get_country,
  get_degree,
  get_designation,
  get_institution,
  get_plan,
  get_state,
  get_subcription_plan,
  get_skill,
  get_employement_type,
} from "../../constant/api_url";

export const getCity = () => {
  return axios
    .get(get_city)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getCountry = () => {
  return axios
    .get(get_country)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getDegree = () => {
  return axios
    .get(get_degree)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getDesignation = () => {
  return axios
    .get(get_designation)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getInstitution = () => {
  return axios
    .get(get_institution)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getPlan = () => {
  return axios
    .get(get_plan)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getState = () => {
  return axios
    .get(get_state)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getSubcriptionPlan = () => {
  return axios
    .get(get_subcription_plan)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getSkill = () => {
  return axios
    .get(get_skill)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const getEmployementType = () => {
  return axios
    .get(get_employement_type)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
