import React from "react";
import CardSettings from "../../Cards/CardSettings";
import { intialValue } from "../../../constant/initial_value";

const index = ({userData,city}) => {
  console.log(city)
  return <CardSettings userData={userData} city={city} initialValue={intialValue.profile} />;
};

export default index;
