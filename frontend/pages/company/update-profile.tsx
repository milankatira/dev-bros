import React from "react";
import axios from "axios";
import Update_profile from "../../components/admin/profile";
const UpdateProfile = ({ userData }) => {
  console.log(userData);
  {
    return userData && <Update_profile userData={userData.user} />;
  }
};

export default UpdateProfile;

export async function getServerSideProps({ req }) {
  const res = await axios.get("http://localhost:4000/api/me", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });

  const data = await res.data;
  return { props: { userData: data } };
}
