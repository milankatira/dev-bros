import React from "react";
import axios from "axios";
import Profile from "../components/client/profile";
import { getCity } from "../api/admin";
import { intialValue } from "../constant/initial_value";
import CardSettings from "../components/Cards/CardSettings";
import CardProfile from "../components/Cards/CardProfile.js";

export default function Settings({ userData,city }) {
  console.log(city)
  return (
    <>
      <div className="flex mt-10 items-center justify-center">
        <div className="w-full lg:w-10/12 px-4">
          <Profile userData={userData} city={city}/>
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
  const data = await res.data;
  return { props: { userData: data, city: city.data.city } };
}
