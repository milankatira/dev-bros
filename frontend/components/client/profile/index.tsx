import React from "react";
import CardSettings from "../../Cards/CardSettings";
import { intialValue } from "../../../constant/initial_value";

const index = ({ userData, city, degree, institution ,designation
}) => {
  console.log(city);
  return (
    <CardSettings
      userData={userData}
      city={city}
      degree={degree}
      institution={institution}
      designation={designation}
      initialValue={intialValue.profile}
    />
  );
};

export default index;
