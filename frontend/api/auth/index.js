import axios from "axios";
import {
  login_url,
  signup_url,
  logout_url,
  forgot_password_url,
  verify_email_url,
  reset_password_url,
} from "../../constant/api_url";

const config = { headers: { "Content-Type": "application/json" } };

export const login = (packet) =>
  axios
    .post(login_url, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });

export const register = (packet) =>
  axios
    .post(signup_url, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });

export const logout = () => {
  axios
    .get(logout_url)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const forgotPassword = (packet) => {
  axios
    .post(forgot_password_url, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const resetPassword = (token, packet) => {
  axios
    .put(`${reset_password_url(token)}`, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const updatePassword = (packet) => {
  axios
    .put(updatePassword, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};

export const verifyemail = (token, packet) => {
  axios
    .post(`${verify_email_url(token)}`, packet)
    .then((response) => response)
    .catch((err) => {
      throw err;
    });
};
