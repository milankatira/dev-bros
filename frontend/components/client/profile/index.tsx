import React from "react";
import CardSettings from "../../Cards/CardSettings";
import { intialValue } from "../../../constant/initial_value";
import { addProfile } from "../../../api/client/user";

const index = () => {
  const handleSubmit = (data: any) => {
    const formdata = new FormData();

    formdata.append("firstName", data.firstName);
    formdata.append("lastName", data.lastName);

    addProfile(formdata);
  };

  return (
    <CardSettings
      initialValue={intialValue.profile}
      handleSubmit={handleSubmit}
    />
  );
};

export default index;
