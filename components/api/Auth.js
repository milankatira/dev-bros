import axios from "axios";
import { Url } from "../constant/url_constant";
export const login = (packet) =>
  axios
    .post(Url.login, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });

export const signup = (packet) =>
  axios
    .post(Url.signup, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
