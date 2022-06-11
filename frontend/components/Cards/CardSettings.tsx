import React, { useState } from "react";
import { Profile } from "../../validator/profile";
import { Formik, Form, Field, FieldArray } from "formik";
import Textinput from "../common/design/Textinput";
import ButtonField from "../common/design/ButtonField";
import SelectField from "../common/design/SelectField";
import toast from "react-hot-toast";
import { addProfile } from "../../api/client/user";
export default function CardSettings({
  initialValue,
  city,
  skill,
  degree,
  designation,
  institution,
  fresher,
  setfresher,
  employementType,
}) {
  const [image, setImage] = useState<any>("");
  function captureImage(e) {
    const file = e.target.files[0];
    console.log(file)

    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i))
      alert("not an image");
    else {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function () {
        setImage(reader.result);

        console.log(reader.result)
      };
    }
  }

  const handleChange = (event: any) => {
    setfresher(event.target.checked);
  };

  const handleSubmit = (data: any) => {
    console.log(data);

    const formdata = new FormData();
    if (!image) {
      
      toast.error("Candidate image required ");
      return
    } else if (image) {
      console.log(image);
      formdata.append("profile_img", image);
    }
    formdata.append("employment_type", data.employmentType);
    formdata.append("expected_salary", data.expectedSalary);
    formdata.append("salary_preference", data.SalaryPreference);
    formdata.append("prefered_location[0]", data.preferedLocation);
    formdata.append("location", data.location);

    console.log(data.skills);
    formdata.append("skills", JSON.stringify(data.skills));
    formdata.append(
      "education_details",
      JSON.stringify(data.education_details)
    );
  
    if (fresher) {
      formdata.append("fresher", fresher);
    }
    formdata.append(
      "experience_details",
      JSON.stringify(data?.experience_details)
    );

    addProfile(formdata);
  };
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={Profile}
        onSubmit={handleSubmit}
      >
        {(props) => {
          console.log(props.values, "values");

          console.log(props.errors, "props");
          return (
            <Form>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                  <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold border-b-2 border-black">
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
                  <div>
                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase ">
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
                    </div>
                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Employement Preference
                    </h6>
                    <div className="flex flex-wrap">
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
                            text="expectedSalary"
                            type="expectedSalary"
                            name="expectedSalary"
                            error={
                              props.touched &&
                              props.touched.expectedSalary &&
                              props.errors.expectedSalary
                            }
                            placeholder="+9111221221212"
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <SelectField
                            name="SalaryPreference"
                            inputLabel="SalaryPreference"
                            options={city}
                            error={
                              props.touched &&
                              props.touched.SalaryPreference &&
                              props.errors.SalaryPreference
                            }
                          />
                        </div>
                      </div>

                      <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                          <SelectField
                            name="employmentType"
                            inputLabel="employmentType"
                            options={employementType}
                            error={
                              props.touched &&
                              props.touched.employmentType &&
                              props.errors.employmentType
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Education Details
                    </h6>

                    <FieldArray
                      name="education_details"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.education_details &&
                            props.values.education_details.map(
                              (education, index) => (
                                <div className="flex flex-wrap" key={index}>
                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <SelectField
                                        options={degree}
                                        inputLabel="Select Degree"
                                        name={`education_details[${index}].degree`}
                                        defaultValue={education.degree}
                                      />
                                    </div>
                                  </div>

                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
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
                                        defaultValue={education.institute}
                                        styles="inputMargin_1 marginbottom"
                                      />
                                    </div>
                                  </div>

                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <Textinput
                                        text="Description"
                                        type="text"
                                        name={`education_details[${index}].educationDescription`}
                                        error={
                                          props.touched &&
                                          props.touched.education_details &&
                                          props.touched.education_details[index]
                                            ?.educationDescription &&
                                          props.errors.education_details &&
                                          props.errors.education_details[index]
                                            .educationDescription
                                        }
                                        placeholder="+9111221221212"
                                      />
                                    </div>
                                  </div>

                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <Textinput
                                        text="Grades/ Percentage"
                                        type="text"
                                        name={`education_details[${index}].marks`}
                                        error={
                                          props.touched &&
                                          props.touched.education_details &&
                                          props.touched.education_details[index]
                                            .marks &&
                                          props.errors.education_details &&
                                          props.errors.education_details[index]
                                            .marks
                                        }
                                        placeholder="+9111221221212"
                                      />
                                    </div>
                                  </div>

                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <Textinput
                                        type="date"
                                        text="Started Year"
                                        name={`education_details[${index}].startedYear`}
                                        error={
                                          props.touched &&
                                          props.touched.education_details &&
                                          props.touched.education_details[index]
                                            .startedYear &&
                                          props.errors.education_details &&
                                          props.errors.education_details[index]
                                            .startedYear
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <Textinput
                                        type="date"
                                        text="Passing Year"
                                        name={`education_details[${index}].passingYear`}
                                        error={
                                          props.touched &&
                                          props.touched.education_details &&
                                          props.touched.education_details[index]
                                            .passingYear &&
                                          props.errors.education_details &&
                                          props.errors.education_details[index]
                                            .passingYear
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="flex ml-auto mr-0">
                                    {props.values.education_details.length !==
                                    1 ? (
                                      <div className=" w-6/12 px-4">
                                        <div className="relative w-full mb-3 flex items-end">
                                          <ButtonField
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                            text="Remove"
                                          />
                                        </div>
                                      </div>
                                    ) : null}
                                    {props.values.education_details.length ===
                                    index + 1 ? (
                                      <div className="w-6/12 px-4">
                                        <div className="relative w-full mb-3">
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
                                            text="Add"
                                          />
                                        </div>
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              )
                            )}
                        </div>
                      )}
                    />

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Work experiance
                    </h6>

                    <div>
                      <input
                        type="checkbox"
                        color="secondary"
                        checked={fresher}
                        onChange={handleChange}
                      />{" "}
                      Fresher
                    </div>
                    {!fresher && (
                      <FieldArray
                        name="education_details"
                        render={(arrayHelpers) => (
                          <div>
                            {props.values.education_details &&
                              props.values.education_details.map(
                                (education, index) => (
                                  <div className="flex flex-wrap" key={index}>
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <Textinput
                                          text="Company"
                                          type="text"
                                          name={`experience_details[${index}].company`}
                                          error={
                                            props.touched &&
                                            props.touched.experience_details &&
                                            props.touched.experience_details[
                                              index
                                            ]?.company &&
                                            props.errors.experience_details &&
                                            props.errors.experience_details[
                                              index
                                            ].company
                                          }
                                          placeholder="+9111221221212"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <SelectField
                                          options={designation}
                                          inputLabel="Select Degree"
                                          name={`experience_details[${index}].designation`}
                                          error={
                                            props.touched.experience_details &&
                                            props.touched?.experience_details[
                                              index
                                            ]?.designation &&
                                            props.errors.experience_details &&
                                            props.errors?.experience_details[
                                              index
                                            ]?.designation
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <Textinput
                                          text="experienceDescription"
                                          type="text"
                                          name={`experience_details[${index}].experienceDescription`}
                                          error={
                                            props.touched.experience_details &&
                                            props.touched?.experience_details[
                                              index
                                            ]?.experienceDescription &&
                                            props.errors.experience_details &&
                                            props.errors?.experience_details[
                                              index
                                            ]?.experienceDescription
                                          }
                                          placeholder="+9111221221212"
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <Textinput
                                          type="date"
                                          text="Started Year"
                                          name={`experience_details[${index}].startDate`}
                                          error={
                                            props.touched &&
                                            props.touched.experience_details &&
                                            props.touched.experience_details[
                                              index
                                            ] &&
                                            props.touched.experience_details[
                                              index
                                            ].startDate &&
                                            props.errors &&
                                            props.errors.experience_details &&
                                            props.errors.experience_details[
                                              index
                                            ] &&
                                            props.errors.experience_details[
                                              index
                                            ].startDate
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="w-full lg:w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <Textinput
                                          type="date"
                                          text="Passing Year"
                                          name={`experience_details[${index}].endDate`}
                                          error={
                                            props.touched &&
                                            props.touched.experience_details &&
                                            props.touched.experience_details[
                                              index
                                            ] &&
                                            props.touched.experience_details[
                                              index
                                            ].endDate &&
                                            props.errors.experience_details &&
                                            props.errors.experience_details[
                                              index
                                            ].endDate
                                          }
                                        />
                                      </div>
                                    </div>
                                    <Field
                                      type="checkbox"
                                      name={`experience_details[${index}].currentlyWorking`}
                                      fullWidth={true}
                                      values={education.currentlyWorking}
                                    />{" "}
                                    Currently Working
                                    <div className="flex ml-auto mr-0">
                                      {props.values.education_details.length !==
                                      1 ? (
                                        <div className=" w-6/12 px-4">
                                          <div className="relative w-full mb-3 flex items-end">
                                            <ButtonField
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                              text="Remove"
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                      {props.values.education_details.length ===
                                      index + 1 ? (
                                        <div className="w-6/12 px-4">
                                          <div className="relative w-full mb-3">
                                            <ButtonField
                                              onClick={() =>
                                                arrayHelpers.push({
                                                  company: "",
                                                  designation: "",
                                                  experienceDescription: "",
                                                  startDate: "",
                                                  endDate: "",
                                                  currentlyWorking: "",
                                                })
                                              }
                                              text="Add"
                                            />
                                          </div>
                                        </div>
                                      ) : null}
                                    </div>
                                  </div>
                                )
                              )}
                          </div>
                        )}
                      />
                    )}

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                      Skill
                    </h6>

                    <FieldArray
                      name="skills"
                      render={(arrayHelpers) => (
                        <div>
                          {props.values.skills &&
                            props.values.skills.map((skillData, index) => (
                              <div className="flex flex-wrap" key={index}>
                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <Textinput
                                      text="Year of experiance"
                                      type="number"
                                      name={`skills[${index}].yearExp`}
                                      error={
                                        props.touched &&
                                        props.touched.skills &&
                                        props.touched.skills[index]?.yearExp &&
                                        props.errors.skills &&
                                        props.errors.skills[index]?.yearExp
                                      }
                                      placeholder="+9111221221212"
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <SelectField
                                      options={skill}
                                      inputLabel="Select Degree"
                                      name={`skills[${index}].skill`}
                                      error={
                                        props.touched.skills &&
                                        props.touched?.skills[index]?.skill &&
                                        props.errors.skills &&
                                        props.errors?.skills[index]?.skill
                                      }
                                    />
                                  </div>
                                </div>

                                <div className="w-full lg:w-6/12 px-4">
                                  <div className="relative w-full mb-3">
                                    <Textinput
                                      text="last used"
                                      type="date"
                                      name={`skills[${index}].lastUsed`}
                                      error={
                                        props.touched.skills &&
                                        props.touched?.skills[index]
                                          ?.lastUsed &&
                                        props.errors.skills &&
                                        props.errors?.skills[index]?.lastUsed
                                      }
                                      placeholder="+9111221221212"
                                    />
                                  </div>
                                </div>

                                <div className="flex ml-auto mr-0">
                                  {props.values.skills.length !== 1 ? (
                                    <div className=" w-6/12 px-4">
                                      <div className="relative w-full mb-3 flex items-end">
                                        <ButtonField
                                          onClick={() =>
                                            arrayHelpers.remove(index)
                                          }
                                          text="Remove"
                                        />
                                      </div>
                                    </div>
                                  ) : null}
                                  {props.values.skills.length === index + 1 ? (
                                    <div className="w-6/12 px-4">
                                      <div className="relative w-full mb-3">
                                        <ButtonField
                                          onClick={() =>
                                            arrayHelpers.push({
                                              lastUsed: "",
                                              skill: "",
                                              yearExp: "",
                                            })
                                          }
                                          text="Add"
                                        />
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    />

                    <hr className="mt-6 border-b-1 border-gray-300" />

                    <ButtonField
                      type="submit"
                      // onClick={() => arrayHelpers.remove(index)}
                      text="Submit"
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
