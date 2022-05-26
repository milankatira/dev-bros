import React from "react";
import axios from "axios";
// components

import CardSettings from "../components/Cards/CardSettings";
import CardProfile from "../components/Cards/CardProfile.js";

export default function Settings({userData}) {
  console.log(userData,"userData")
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings userData={userData} />
        </div>
        <div className="w-full lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const res = await axios.get(
    'http://localhost:4000/api/me',
    {
      withCredentials: true,
      headers: {
        Cookie: req.headers.cookie,
      },
    }
  );
  const data = await res.data;
  return { props: { userData: data } };
}
