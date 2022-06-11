import React from "react";
import CardSettings from "../../Cards/CardSettings";
import { intialValue } from "../../../constant/initial_value";

const index = ({
  city,
  degree,
  institution,
  designation,
  fresher,
  setfresher,
  skill,
  employementType,
}) => {
  return (
    <CardSettings
      skill={skill}
      fresher={fresher}
      setfresher={setfresher}
      city={city}
      degree={degree}
      institution={institution}
      designation={designation}
      employementType={employementType}
      initialValue={intialValue.profile}
    />
  );
};

export default index;
