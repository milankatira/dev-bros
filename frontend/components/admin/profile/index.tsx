import React, { useState } from "react";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";
import { getCity } from "../../../api/admin";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
import { Formik, Form, Field, FieldArray } from "formik";
import { company_profile } from "../../../validator/compnay";
import UpdateProfile from "./profile";
import { intialValue } from "../../../constant/initial_value";

export default function Index() {
  const [image, setImage] = useState<any>("");
  const [logo, setlogo] = useState<any>("");
  const [city, setcity] = useState<any>("");

  UseEffectOnce(() => {
    getCity().then((res) => {
      setcity(res.data.city);
    });
  });

  const handleImage = (acceptedFiles, setter) => {
    if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 1) {
      console.warn("Please upload single file at a time");
    } else if (acceptedFiles[0].size > 2000000) {
      console.warn("Please image of less than size 2 mb");
    } else {
      setter(acceptedFiles[0]);
    }
  };

  const handleSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <UpdateProfile
      city={city}
      logo={logo}
      setlogo={setlogo}
      image={image}
      setImage={setImage}
      handleSubmit={handleSubmit}
      handleImage={handleImage}
      initialValues={intialValue.company_profile}
    />
  );
}
