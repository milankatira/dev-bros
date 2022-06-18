import React, { useState } from "react";
import toast from "react-hot-toast";
import { getCity } from "../../../api/admin";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
import UpdateProfile from "./profile";
import { intialValue } from "../../../constant/initial_value";
import { addCompany, getCompany } from "../../../api/client/compnay";
export default function Index({ userData }) {
  const [companyProfile, setcompanyProfile] = useState();
  const [image, setImage] = useState<any>("");
  const [logo, setlogo] = useState<any>("");
  const [mylogo, setmylogo] = useState<any>("");
  const [myimage, setmyimage] = useState<any>("");
  const [city, setcity] = useState<any>("");
  const [description, setDescription] = useState<string>(null);
  const [company_initial_value, setcompany_initial_value] = useState<any>(null);

  UseEffectOnce(() => {
    getCity().then((res) => {
      setcity(res.data.city);
    });
    if (userData) {
      getCompany().then(async (res) => {
        await setcompanyProfile(res?.data?.company);
        const initial_value = {
          name: res?.data?.company?.name,
          company_url: res?.data?.company?.company_url,
          number_of_eployees: res?.data?.company?.number_of_eployees,
          headquter: res?.data?.company?.headquter?._id,
          foundation_year: res?.data?.company?.foundation_year,
          address: res?.data?.company?.address?.map((singleData) => {
            const array = {
              street: singleData?.street,
              city: singleData?.city?._id,
            };
            return array;
          }),
        };
        setcompany_initial_value(initial_value);
        setDescription(res?.data?.company?.description);
      });
    }
  });

  const handleImage = (acceptedFiles, setter, binarysetter) => {
    if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 1) {
      console.warn("Please upload single file at a time");
    } else if (acceptedFiles[0].size > 2000000) {
      console.warn("Please image of less than size 2 mb");
    } else {
      setter(acceptedFiles[0]);
      const reader = new FileReader();

      reader.readAsDataURL(acceptedFiles[0]);

      reader.onloadend = function () {
        binarysetter(reader.result);
      };
    }
  };

  const handleSubmit = async (data: any) => {
    const packet = {
      name: data.name,
      company_url: data.company_url,
      number_of_eployees: data.number_of_eployees,
      foundation_year: data.foundation_year,
      headquter: data.headquter,
      logo: mylogo,
      cover_picture: myimage,
      description: description,
      address: data.address,
    };
    await addCompany(packet)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(initialValue,"initialValue");
  return (
    city &&
    (userData ? (
      <UpdateProfile
        userData={companyProfile}
        city={city}
        logo={logo}
        setmylogo={setmylogo}
        setmyimage={setmyimage}
        setlogo={setlogo}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        initialValues={company_initial_value}
        description={description}
        setDescription={setDescription}
      />
    ) : (
      <UpdateProfile
        userData={null}
        city={city}
        logo={logo}
        setmylogo={setmylogo}
        setmyimage={setmyimage}
        setlogo={setlogo}
        image={image}
        setImage={setImage}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        initialValues={intialValue.company_profile}
        description={description}
        setDescription={setDescription}
      />
    ))
  );
}
