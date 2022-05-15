import React from "react";
import Auth from "../components/main/Auth";
import { APP_CONSTANT } from "../components/constant/app_constant";
const Signup = () => {
  return <Auth name={APP_CONSTANT.login} redirect={APP_CONSTANT.signup} />;
};

export default Signup;
