import React from "react";
import Link from "next/link";
import cookie from "cookie";
import { setCookies } from "cookies-next";
import { Formik, Form } from "formik";
import ButtonField from "../../common/design/ButtonField";
import Textinput from "../../common/design/Textinput";
import { intialValue } from "../../../constant/initial_value";
import { Login } from "../../../validator/login";
import { login } from "../../../api/auth/index";
import toast from "react-hot-toast";
import Router from "next/router";
const newlogin = () => {
  interface Data {
    email: string;
    password: string;
  }
  const onFormSubmit = async (data: Data) => {
    const packet = {
      email: data.email,
      password: data.password,
    };
    await login(packet)
      .then((res) => {
        toast.success(res?.data?.message);
        const serialized = cookie.serialize("token", res?.data?.token, {
          httpOnly: false,
          secure: process.env.MODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 1, // 1 day
          path: "/",
        });
      //  ("Set-Cookie", serialized);
       setCookies("token",res.data.token);
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
          return (
            <Form>
              <div className="mx-auto mt-20 px-4 h-full flex flex-col justify-center align-middle">
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
                                defaultChecked
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
