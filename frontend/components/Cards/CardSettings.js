import React, { useState } from "react";
import { Profile } from "../../validator/profile";
import { Formik, Form, Field, FieldArray } from "formik";
import Textinput from "../common/design/Textinput";
import ButtonField from "../common/design/ButtonField";
import SelectField from "../common/design/SelectField";
import { getCity } from "../../api/admin";

export default function CardSettings({
  userData,
  initialValue,
  city,
  degree,
  designation,
  institution,
}) {
  const [image, setImage] = useState("");
  console.log(initialValue, "initialValue");
  function captureImage(e) {
    const file = e.target.files[0];

    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i))
      alert("not an image");
    else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImage(reader.result);
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

                    <FieldArray
                      name="education_details"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.education_details &&
                          props.values.education_details.length > 0 ? (
                            props.values.education_details.map(
                              (education, index) => (
                                <React.Fragment key={index}>
                                  <div className="form-container">
                                    <SelectField
                                      // errors={
                                      //   errors.education_details &&
                                      //   errors?.education_details[index]
                                      //     ?.degree
                                      // }

                                      options={degree}
                                      inputLabel="Select Degree"
                                      name={`education_details[${index}].degree`}
                                      fullWidth={true}
                                      styles="inputMargin marginbottom"
                                      defaultValue={education.degree}
                                      onClick={() => setAddDegree(true)}
                                    />

                                    <SelectField
                                      // errors={
                                      //   props.errors.education_details &&
                                      //   errors?.education_details[index]
                                      //     ?.institute
                                      // }

                                      // touched={
                                      //   touched.education_details &&
                                      //   touched?.education_details[index]
                                      //     ?.institute
                                      // }
                                      options={institution}
                                      inputLabel="Select Institute"
                                      name={`education_details[${index}].institute`}
                                      fullWidth={true}
                                      defaultValue={education.institute}
                                      styles="inputMargin_1 marginbottom"
                                      onClick={() => setAddNewinstitute(true)}
                                    />
                                  </div>
                                  <div className="form-container">
                                    <Textinput
                                      fullWidth={true}
                                      label="Description"
                                      name={`education_details[${index}].educationDescription`}
                                      styles="inputMargin marginbottom"
                                      defaultValue={
                                        education.educationDescription
                                      }
                                    />
                                    <Textinput
                                      fullWidth={true}
                                      label="Grades/ Percentage"
                                      name={`education_details[${index}].marks`}
                                      defaultValue={education.marks}
                                      styles="inputMargin_1 marginbottom"
                                    />
                                  </div>
                                  <div className="form-container">
                                    <Textinput
                                      fullWidth={true}
                                      type="date"
                                      label="Started Year"
                                      name={`education_details[${index}].startedYear`}
                                      styles="inputMargin marginbottom"
                                      InputLabelProps={{ shrink: true }}
                                      // defaultValue={moment(
                                      //   education.startedYear
                                      // )
                                      //   .format("YYYY-MM-DD")
                                      //   .toString()}
                                    />
                                    <Textinput
                                      fullWidth={true}
                                      type="date"
                                      label="Passing Year"
                                      name={`education_details[${index}].passingYear`}
                                      InputLabelProps={{ shrink: true }}
                                      styles="inputMargin_1 marginbottom"
                                      defaultValue={
                                        education.passingYear
                                          ? moment(education.passingYear)
                                              .format("YYYY-MM-DD")
                                              .toString()
                                          : "dd-mm-yyyy"
                                      }
                                    />
                                  </div>
                                  <div className="form-container_button">
                                    {props.values.education_details.length !==
                                    1 ? (
                                      <ButtonField
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        buttonText="Remove"
                                        styles="addButton"
                                      />
                                    ) : null}
                                    {props.values.education_details.length ===
                                    index + 1 ? (
                                      <ButtonField
                                        onClick={() =>
                                          arrayHelpers.push({
                                            degree: "",
                                            institute: "",
                                            educationDescription: "",
                                            marks: "",
                                            startedYear: "",
                                            passingYear: "",
                                          })
                                        }
                                        buttonText="Add"
                                        styles="addButton"
                                      />
                                    ) : null}
                                  </div>
                                </React.Fragment>
                              )
                            )
                          ) : (
                            <ButtonField
                              onClick={() => arrayHelpers.push("")}
                              buttonText="Add a Education"
                            />
                          )}
                        </div>
                      )}
                    />

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
                          <SelectField
                            name="preferedLocation"
                            inputLabel="preferedLocation"
                            options={city}
                            error={
                              props.touched &&
                              props.touched.preferedLocation &&
                              props.errors.preferedLocation
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <Textinput
                            text="SalaryPreference"
                            type="SalaryPreference"
                            name="SalaryPreference"
                            error={
                              props.touched &&
                              props.touched.SalaryPreference &&
                              props.errors.SalaryPreference
                            }
                            placeholder="+9111221221212"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <SelectField
                          name="degree"
                          inputLabel="degree"
                          options={degree}
                          error={
                            props.touched &&
                            props.touched.degree &&
                            props.errors.degree
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <SelectField
                          name="designation"
                          inputLabel="designation"
                          options={designation}
                          error={
                            props.touched &&
                            props.touched.designation &&
                            props.errors.designation
                          }
                        />
                      </div>
                    </div>

                    <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                        <SelectField
                          name="institution"
                          inputLabel="institution"
                          options={institution}
                          error={
                            props.touched &&
                            props.touched.institution &&
                            props.errors.institution
                          }
                        />
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
