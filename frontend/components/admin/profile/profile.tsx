import React, { useState } from "react";
import toast from "react-hot-toast";
import Dropzone from "react-dropzone";
import { server_url } from "../../../config/app_config";
import { intialValue } from "../../../constant/initial_value";
import { getCity } from "../../../api/admin";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
import { Formik, Form, Field, FieldArray } from "formik";
import { company_profile } from "../../../validator/compnay";
import Textinput from "../../common/design/Textinput";
import SelectField from "../../common/design/SelectField";
import ButtonField from "../../common/design/ButtonField";
import { Editor } from "@tinymce/tinymce-react";

export default function UpdateProfile({
  city,
  logo,
  setlogo,
  image,
  setImage,
  handleSubmit,
  handleImage,
  initialValues,
  description,
  setDescription,
  setmylogo,
  setmyimage,
  userData,
}) {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={company_profile}
      onSubmit={handleSubmit}
    >
      {({ isValid, values, errors, touched }) => {
        return (
          <Form>
            <div>
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Profile
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      This information will be displayed publicly so be careful
                      what you share.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>

                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            handleImage(acceptedFiles, setlogo, setmylogo)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <>
                              <div
                                className="mt-1 flex items-center"
                                {...getRootProps()}
                              >
                                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                  {logo ? (
                                    <img
                                      src={URL.createObjectURL(logo)}
                                      alt="..."
                                      className="h-full w-full"
                                    />
                                  ) : userData ? (
                                    <>
                                      <img
                                        src={`${server_url}/${userData?.logo}`}
                                        alt="..."
                                        className="h-full w-full"
                                      />
                                    </>
                                  ) : (
                                    <svg
                                      className="h-full w-full text-gray-300"
                                      fill="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                  )}
                                </span>
                                <button
                                  type="button"
                                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                  Change
                                </button>
                              </div>
                              <p>{image && image.path}</p>
                            </>
                          )}
                        </Dropzone>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Cover photo
                        </label>

                        <Dropzone
                          onDrop={(acceptedFiles) =>
                            handleImage(acceptedFiles, setImage, setmyimage)
                          }
                        >
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>
                                  Drag drop some files here, or click to select
                                  files
                                </p>
                              </div>

                              {!image ? (
                                userData ? (
                                  <div
                                    className="mt-1 flex justify-center border-gray-300 border-dashed rounded-md"
                                    {...getRootProps()}
                                  >
                                    <img
                                      src={`${server_url}/${userData?.cover_picture}`}
                                      alt="..."
                                      className="mt-1 w-full h-auto  flex justify-center rounded-lg"
                                    />
                                  </div>
                                ) : (
                                  <div
                                    className="mt-1 flex justify-center border-2 border-gray-300 border-dashed rounded-md"
                                    {...getRootProps()}
                                  >
                                    <div className="space-y-1 text-center">
                                      <svg
                                        className="mx-auto h-12 w-12 text-gray-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                      >
                                        <path
                                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                          strokeWidth={2}
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                      <div className="flex text-sm text-gray-600">
                                        <label
                                          htmlFor="file-upload"
                                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        >
                                          <span>Upload a file</span>

                                          <button
                                            id="file-upload"
                                            name="file-upload"
                                            className="sr-only"
                                          />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                      </div>
                                      <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF up to 10MB
                                      </p>
                                    </div>
                                  </div>
                                )
                              ) : (
                                <>
                                  <div
                                    className="mt-1 flex justify-center border-gray-300 border-dashed rounded-md"
                                    {...getRootProps()}
                                  >
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt="..."
                                      className="mt-1  flex justify-center rounded-lg"
                                    />
                                  </div>
                                  <p>{image && image.path}</p>
                                </>
                              )}
                            </section>
                          )}
                        </Dropzone>
                      </div>

                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <div className="relative w-full">
                            <Textinput
                              text="name"
                              type="name"
                              name="name"
                              error={touched.name && touched && errors.name}
                              placeholder="+9111221221212"
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <div className="relative w-full">
                            <Textinput
                              text="company_url"
                              type="company_url"
                              name="company_url"
                              error={
                                touched.company_url &&
                                touched &&
                                errors.company_url
                              }
                              placeholder="+9111221221212"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <div className="relative w-full">
                            <Textinput
                              text="number_of_eployees"
                              type="number"
                              name="number_of_eployees"
                              error={
                                touched.number_of_eployees &&
                                touched &&
                                errors.number_of_eployees
                              }
                              placeholder="+9111221221212"
                            />
                          </div>
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <div className="relative w-full">
                            <Textinput
                              text="foundation_year"
                              type="date"
                              name="foundation_year"
                              error={
                                touched.foundation_year &&
                                touched &&
                                errors.foundation_year
                              }
                              placeholder="+9111221221212"
                            />
                          </div>
                        </div>
                      </div>

                      <FieldArray
                        name="address"
                        render={(arrayHelpers) => (
                          <div>
                            {values.address &&
                              values.address.map((education, index) => (
                                <div className="flex flex-wrap" key={index}>
                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <Textinput
                                        text="Street"
                                        error={
                                          touched?.address &&
                                          touched.address[index]?.street &&
                                          errors.address &&
                                          errors?.address[index]?.street
                                        }
                                        name={`address[${index}].street`}
                                      />
                                    </div>
                                  </div>

                                  <div className="w-full lg:w-6/12 px-4">
                                    <div className="relative w-full mb-3">
                                      <SelectField
                                        inputLabel="Select City"
                                        name={`address[${index}].city`}
                                        options={city}
                                        error={
                                          touched.address &&
                                          touched?.address[index]?.city &&
                                          errors.address &&
                                          errors?.address[index]?.city
                                        }
                                      />
                                    </div>
                                  </div>

                                  <div className="flex ml-auto mr-0">
                                    {values.address.length !== 1 ? (
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
                                    {values.address.length === index + 1 ? (
                                      <div className="w-6/12 px-4">
                                        <div className="relative w-full mb-3">
                                          <ButtonField
                                            onClick={() =>
                                              arrayHelpers.push({
                                                city: "",
                                                street: "",
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

                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <div className="relative w-full mb-3">
                            <SelectField
                              name="headquter"
                              inputLabel="headquter"
                              options={city}
                              error={
                                touched && touched.headquter && errors.headquter
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Describe your company here
                      </label>
                      <div className="mt-1 rounded-3xl">
                        <Editor
                          onEditorChange={(e) => setDescription(e)}
                          value={description}
                          apiKey="02bmdr65eds9vmo76ewfyfqeibdtgp3ysm9e4s8z4btzizv4"
                          init={{
                            height: 300,
                            menubar: false,
                            plugins: [
                              "advlist autolink lists link image charmap print preview anchor",
                              "searchreplace visualblocks code fullscreen",
                              "insertdatetime media table paste code help wordcount",
                            ],
                            toolbar:
                              "undo redo | formatselect | " +
                              "bold italic backcolor | alignleft aligncenter " +
                              "alignright alignjustify | bullist numlist outdent indent | " +
                              "removeformat | help",
                          }}
                        />
                      </div>
                    </div>

                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <ButtonField
                        type="submit"
                        // onClick={() => arrayHelpers.remove(index)}
                        text="Submit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
