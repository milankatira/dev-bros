import React from "react";
import Link from "next/link";
import { Formik, Form, Field } from "formik";
import ButtonField from "../components/common/design/ButtonField";
import Textinput from "../components/common/design/Textinput";
import { intialValue } from "../constant/initial_value";
import { Login } from "../validator/login";
import { login } from "../api/auth/index";
import toast from "react-hot-toast";
import Router from "next/router";
import axios from "axios";
const newlogin = () => {

  const onFormSubmit = async (data) => {
    const packet = {
      email: data.email,
      password: data.password,
    };
     await login(packet)
      .then((res) => {
        toast.success(res?.data?.message);
        Router.push("/myprofile");
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <Formik
        initialValues={intialValue.signin}
        validationSchema={Login}
        onSubmit={onFormSubmit}
      >
        {(props) => {
          console.log(props);
          return (
            <Form>
              <div className="mx-auto mt-36 px-4 h-full flex flex-col justify-center align-middle">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
                      <div className="rounded-t mb-0 px-6 py-6">
                        <div className="btn-wrapper text-center font-bold text-xl">
                          Welcome
                        </div>
                        <hr className="mt-6 border-b-1 border-gray-300" />
                      </div>
                      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <div className="text-gray-400 text-center mb-3 font-bold">
                          <small>Or sign in with credentials</small>
                        </div>
                        <div>
                          <div className="relative w-full mb-3">
                            {/* <label
                            className="block uppercase text-gray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="Email"
                          /> */}

                            <Textinput
                              text="email"
                              type="email"
                              name="email"
                              error={
                                props.touched &&
                                props.touched.email &&
                                props.errors.email
                              }
                              placeholder="+9111221221212"
                            />
                          </div>

                          <div className="relative w-full mb-3">
                            <Textinput
                              text="password"
                              name="password"
                              type="password"
                              placeholder="+9111221221212"
                              error={
                                props.touched &&
                                props.touched.password &&
                                props.errors.password
                              }
                            />
                          </div>
                          <div>
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                id="customCheckLogin"
                                type="checkbox"
                                checked
                                className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                              />
                              <span className="ml-2 text-sm font-semibold text-gray-600">
                                Remember me
                              </span>
                            </label>
                          </div>

                          <div className="text-center mt-6">
                            <ButtonField text="Signup" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap mt-6 relative">
                      <div className="w-1/2">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          className="text-gray-200"
                        >
                          <small>Forgot password?</small>
                        </a>
                      </div>
                      <div className="w-1/2 text-right">
                        <Link href="/auth/register">
                          <a href="#pablo" className="text-gray-200">
                            <small>Create new account</small>
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default newlogin;
