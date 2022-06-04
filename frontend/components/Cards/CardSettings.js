import React, { useState } from "react";
import { Profile } from "../../validator/profile";
import { Formik, Form, Field } from "formik";
import Textinput from "../common/design/Textinput";
import SelectField from "../common/design/SelectField";
import { getCity } from "../../api/admin";

export default function CardSettings({ userData, initialValue, city }) {
  const [image, setImage] = useState("");
  console.log(city, "city");
  function captureImage(e) {
    const file = e.target.files[0];

    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i))
      alert("not an image");
    else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImage(reader.result);
        // dispatch(setAvatar(reader.result));
      };
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={Profile}
        onSubmit={(values) => {
          console.log(values, "values");
        }}
      >
        {(props) => {
          console.log(props.values, "props");
          return (
            <Form>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">
                      My account
                    </h6>
                    <button
                      className="bg-gray-700 active:bg-blue-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      Settings
                    </button>
                  </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      User Information
                    </h6>

                    <div className="flex flex-col flex-wrap justify-center items-center">
                      <div className="w-6/12 h-6/12 sm:w-4/12 sm:h-4/12 px-4 flex flex-col items-center">
                        <img
                          src={image}
                          alt="..."
                          className="shadow rounded-full h-28 w-28 align-middle border-none"
                        />
                      </div>

                      <div className="w-6/12 h-6/12 sm:w-4/12 sm:h-4/12 px-4 text-center py-2">
                        <input
                          onChange={captureImage}
                          id="avatarInput"
                          type="file"
                          style={{ display: "none" }}
                        />

                        <label htmlFor="avatarInput">
                          Choose a different photo
                        </label>
                      </div>
                    </div>

                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <Textinput
                            text="firstName"
                            type="firstName"
                            name="firstName"
                            error={
                              props.touched &&
                              props.touched.firstName &&
                              props.errors.firstName
                            }
                            placeholder="+9111221221212"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <Textinput
                            text="lastName"
                            type="lastName"
                            name="lastName"
                            error={
                              props.touched &&
                              props.touched.lastName &&
                              props.errors.lastName
                            }
                            placeholder="+9111221221212"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <SelectField
                            name="location"
                            inputLabel="location"
                            options={city}
                            error={
                              props.touched &&
                              props.touched.location &&
                              props.errors.location
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <Textinput
                            text="preferedLocation"
                            type="preferedLocation"
                            name="preferedLocation"
                            error={
                              props.touched &&
                              props.touched.preferedLocation &&
                              props.errors.preferedLocation
                            }
                            placeholder="+9111221221212"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Contact Information
                    </h6>
                    <div className="flex flex-wrap">
                      <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Address
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            City
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="New York"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Country
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="United States"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                          <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Postal Code
                          </label>
                          <input
                            type="text"
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            defaultValue="Postal Code"
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-gray-300" />
                  </form>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
