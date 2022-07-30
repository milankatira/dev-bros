import React, { useState } from "react";
import ButtonField from "../components/common/design/ButtonField";
import Textinput from "../components/common/design/Textinput";
import ModalField from "../components/common/design/ModalField";
import firebase from "../firebase/firebase";
import { Formik, Form, Field } from "formik";
import { intialValue } from "../constant/initial_value";
import { signup } from "../validator/signup";
import { register } from "../api/auth/index";
import Link from "next/link";
const Auth = () => {
  const [mobile, setmobile] = useState("");
  const [otp, setotp] = useState("");
  const [open, setopen] = useState(false);
  const [confirmResult, setconfirmResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const verifyPhoneNumber = async () => {
    try {
      if (mobile.toString().length != 13 || mobile === "") {
        mobile.toString().length;
        console.error(
          "please add 10 digit phone number",
          mobile.toString().length
        );
      } else {
        setopen(true);
        // dispatch(setLoading(true));
        const appVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" }
        );
        const result = await firebase
          .auth()
          .signInWithPhoneNumber(mobile, appVerifier);
        if (result) {
          console.log(result);
          alert("ok");
          // SetShowJobModal(true);
          setconfirmResult(result);
          // dispatch(setLoading(false));
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      //  dispatch(setLoading(true));
      //  SetShowJobModal(false);
      setopen(false);
      e.preventDefault();
      if (otp) {
        console.log(otp);
        const confirmOtp = await confirmResult.confirm(otp);
        console.log(confirmOtp);
        if (confirmOtp) {
          console.log("Phone number verified successfully!");
          //  setIsPhoneValidate(true);
          //  dispatch(setLoading(false));
        }
      } else {
        console.error("Invalid OTP");
        // console.log(otp, confirmOtp);
        //  dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      //  router.reload();
      console.error("Invalid OTP please try again");
      //  dispatch(setLoading(false));
    }
  };

  const handleRegister = (data) => {
    const packet = {
      ...data,
      phoneNo: mobile,
    };
    register(packet);
  };
  return (
    <div>
      <Formik
        initialValues={intialValue.signup}
        validationSchema={signup}
        onSubmit={(data) => handleRegister(data)}
      >
        {(props) => {
          
          return (
            <Form>
              <div className="mx-auto mt-20 px-4 h-full flex flex-col justify-center align-middle">
                <div className="flex content-center items-center justify-center h-full">
                  <div className="w-full lg:w-4/12 px-4">
                    <div className="py-6 relative flex flex-col min-w-0 break-words w-full shadow-lg rounded-lg bg-gray-200 border-0">
                      <div className="flex-auto px-4 lg:px-10 pt-0">
                        <div className="rounded-t mb-0 px-6">
                          <div className="btn-wrapper text-center font-bold text-xl">
                            Signup
                          </div>
                          <hr className="mt-6 border-b-1 border-gray-300" />
                        </div>

                        <div className="flex flex-row mt-3">
                          <div className="relative w-full mr-3">
                            <Textinput
                              text="firstName"
                              type="text"
                              name="firstName"
                              placeholder="+9111221221212"
                            />
                          </div>

                          <div className="relative w-full ml-3">
                            <Textinput
                              text="lastName"
                              name="lastName"
                              type="text"
                              placeholder="+9111221221212"
                            />
                          </div>
                        </div>

                        <div className="relative w-full mb-3">
                          <Textinput
                            text="e-mail"
                            type="text"
                            name="email"
                            placeholder="+9111221221212"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <Textinput
                            text="password"
                            type="text"
                            name="password"
                            placeholder="+9111221221212"
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <label
                            htmlFor="email"
                            className="leading-7 font-bold text-sm text-gray-600"
                          >
                            PhoneNumber
                          </label>
                          <input
                            placeholder="+9111221221212"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                            type="text"
                            className="w-full bg-white rounded-lg border-2 border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-lg font-sans font-medium outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
                          />
                        </div>

                        <div>
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              id="customCheckLogin"
                              type="checkbox"
                              defaultChecked
                              className="form-checkbox border-0 rounded text-gray-600 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                            />
                            <span className="ml-2 text-sm font-semibold text-gray-600">
                              Remember me
                            </span>
                          </label>
                        </div>

                        <div className="text-center mt-6">
                          <ButtonField
                            text="Create new account"
                            onClick={verifyPhoneNumber}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap relative">
                      <div className="w-1/2">
                        <a
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          className="text-gray-600 text-sm font-semibold"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <div className="w-1/2 text-right">
                        <Link href="/auth/register">
                          <a
                            href="#pablo"
                            className="text-gray-600 text-sm font-semibold"
                          >
                            Create new account
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <section className="text-gray-600 body-font p-10">
                <div className="container flex flex-wrap items-center">
                  <div className="lg:w-1/2 md:w-1/2  rounded-lg lg:pl-40 p-0 flex flex-col md:ml-auto w-full mt-30 md:mt-0">
                    <h2 className="text-gray-900 text-[30px] font-medium title-font mb-5">
                      Signup to my Web
                    </h2>
                    <div className="flex flex-row align-middle mb-4">
                      <span className="text-gray-400 text-sm font-bold">
                        Already have a account?
                      </span>
                      <span className="text-blue-500 text-sm ml-2 font-bold">
                        {" "}
                        Log in
                      </span>
                    </div>
                    <Textinput
                      text="firstName"
                      type="text"
                      name="firstName"
                      placeholder="+9111221221212"
                    />
                    <Textinput
                      text="lastName"
                      name="lastName"
                      type="text"
                      placeholder="+9111221221212"
                    />
                    <Textinput
                      text="e-mail"
                      type="text"
                      name="email"
                      placeholder="+9111221221212"
                    />
                    <Textinput
                      text="password"
                      type="text"
                      name="password"
                      placeholder="+9111221221212"
                    />
                    <div className="relative mb-4">
                      <label
                        htmlFor="email"
                        className="leading-7 font-bold text-sm text-gray-600"
                      >
                        PhoneNumber
                      </label>
                      <input
                        placeholder="+9111221221212"
                        value={mobile}
                        onChange={(e) => setmobile(e.target.value)}
                        type="text"
                        className="w-full bg-white rounded-lg border-2 border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-lg font-sans font-medium outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                    <div className="mb-5 flex justify-end">
                      <ButtonField text="sendOtp" onClick={verifyPhoneNumber} />
                    </div>
                    <ButtonField text="Signup" />
                    <div id="recaptcha-container"></div>
                    <ModalField
                      open={open}
                      setopen={setopen}
                      handleSubmit={handleSubmit}
                      title="Verify Otp"
                    >
                      <div className="max-h-48 mt-2 px-2">
                        <div className="relative mb-4">
                          <label
                            htmlFor="email"
                            className="leading-7 font-bold text-sm text-gray-600"
                          >
                            PhoneNumber
                          </label>
                          <input
                            placeholder="enter otp"
                            value={otp}
                            onChange={(e) => setotp(e.target.value)}
                            type="text"
                            className="w-full bg-white rounded-lg border-2 border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-lg font-sans font-medium outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
                          />
                        </div>
                      </div>
                    </ModalField>
                  </div>
                </div>
              </section> */}
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Auth;
