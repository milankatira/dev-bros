import {
  user_profile_url,
  update_profile_url,
  add_profile_url,
  
} from "../../constant/api_url";
import axios from "axios";
axios.defaults.withCredentials = true;

export const user = () =>
  axios
    .get(user_profile_url)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });

export const updateProfile = (packet) =>
  axios
    .put(update_profile_url, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });

export const addProfile = (packet) =>
  axios
    .post(add_profile_url, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
