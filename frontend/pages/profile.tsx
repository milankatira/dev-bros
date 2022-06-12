import React, { useState } from "react";
import axios from "axios";
import {
  getCity,
  getDegree,
  getInstitution,
  getDesignation,
  getSkill,
  getEmployementType,
} from "../api/admin";
import { intialValue } from "../constant/initial_value";
import CardSettings from "../components/Cards/CardSettings";
import CardProfile from "../components/Cards/CardProfile.js";
import { UseEffectOnce } from "../hook/useEffectOnce";
import Myprofile from "../components/client/profile";
// import axios from "axios";

export default function MyProfile() {
  const [city, setcity] = useState<any>("");
  const [degree, setdegree] = useState<any>();
  const [designation, setdesignation] = useState<any>();
  const [institution, setinstitution] = useState<any>();
  const [userData, setuserData] = useState<any>();
  const [skill, setskill] = useState<any>();
  const [fresher, setfresher] = useState<boolean>();
  const [employementType, setemployementType] = useState<any>();

  UseEffectOnce(() => {
    const promise1 = Promise.resolve(getCity());
    const promise2 = Promise.resolve(getDegree());
    const promise3 = Promise.resolve(getInstitution());
    const promise4 = Promise.resolve(getDesignation());
    const promise5 = axios.get("http://localhost:4000/api/me", {
      withCredentials: true,
    });
    const promise6 = Promise.resolve(getSkill());
    const promise7 = Promise.resolve(getEmployementType());

    Promise.all([promise1, promise2, promise3, promise4, promise5,promise6,promise7]).then(
      (values) => {
        setcity(values[0].data.city);
        setdegree(values[1].data.degree);
        setinstitution(values[2].data.institution);
        setdesignation(values[3].data.designation);
        setuserData(values[4].data.userData);
        setskill(values[5].data.skill);
        setemployementType(values[6].data.Employement_type);
      }
    );
  });
  return (
    <>
      <div className="flex mt-10 items-center justify-center">
        <div className="w-full lg:w-10/12 px-4">
          {city && degree && institution && designation && (
            <Myprofile
              fresher={fresher}
              setfresher={setfresher}
              city={city}
              degree={degree}
              institution={institution}
              designation={designation}
              skill={skill}
              employementType={employementType}
            />
          )}
        </div>
      </div>
    </>
  );
}
