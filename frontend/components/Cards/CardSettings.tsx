import React from "react";
import { Profile } from "../../validator/profile";
import { Formik, Form } from "formik";
import Textinput from "../common/design/Textinput";
import ButtonField from "../common/design/ButtonField";

export default function CardSettings({ initialValue, handleSubmit }) {
  return (
    <>
      <Formik
        initialValues={initialValue}
        validationSchema={Profile}
        onSubmit={handleSubmit}
      >
        {(props) => {
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
                    </div>
                    <hr className="my-6 border-b-1 border-blueGray-300" />

                    <ButtonField type="submit" text="Submit" />
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
