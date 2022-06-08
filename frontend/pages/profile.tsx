import React from "react";
import axios from "axios";
import Profile from "../components/client/profile";
import {
  getCity,
  getDegree,
  getDesignation,
  getInstitution,
} from "../api/admin";
import { intialValue } from "../constant/initial_value";
import CardSettings from "../components/Cards/CardSettings";
import CardProfile from "../components/Cards/CardProfile.js";

export default function Profile({
  userData,
  city,
  degree,
  designation,
  institution,
}) {
  console.log(city, degree, designation, institution, "mData");
  return (
    <>
      <div className="flex mt-10 items-center justify-center">
        <div className="w-full lg:w-10/12 px-4">
          <Profile
            userData={userData}
            city={city}
            degree={degree}
            designation={designation}
            institution={institution}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const res = await axios.get("http://localhost:4000/api/me", {
    withCredentials: true,
    headers: {
      Cookie: req.headers.cookie,
    },
  });

  const city = await getCity();
  const degree = await getDegree();
  const designation = await getDesignation();
  const institution = await getInstitution();
  const data = await res.data;
  return {
    props: {
      userData: data,
      city: city.data.city,
      degree: degree.data.degree,
      designation: designation.data.designation,
      institution: institution.data.institution,
    },
  };
}
