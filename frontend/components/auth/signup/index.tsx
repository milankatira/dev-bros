import React, { useState } from "react";
import ButtonField from "../../common/design/ButtonField";
import Textinput from "../../common/design/Textinput";
import ModalField from "../../common/design/ModalField";
import firebase from "../../../firebase/firebase";
import { Formik, Form, Field } from "formik";
import { intialValue } from "../../../constant/initial_value";
import { Signup } from "../../../validator/signup";
import { register } from "../../../api/auth";
import Link from "next/link";
import PhoneInput from "react-phone-number-input";
const Index = () => {
  const [mobile, setmobile] = useState("");
  const [otp, setotp] = useState("");
  const [open, setopen] = useState(false);
  const [confirmResult, setconfirmResult] = useState(null);
  const [IsPhoneValidate, setIsPhoneValidate] = useState(false);
  const [phoneNumber, setphoneNumber] = useState("");
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
        // setopen(true);
        setLoading(true);
        const appVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" }
        );
        const result = await firebase
          .auth()
          .signInWithPhoneNumber(mobile, appVerifier);
        if (result) {
          console.log(result);
          // SetShowJobModal(true);
          setconfirmResult(result);
          setLoading(false);
          setopen(true);
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
          setIsPhoneValidate(true);
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
        validationSchema={Signup}
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
                              placeholder="firstName"
                              error={
                                props.touched &&
                                props.touched.firstName &&
                                props.errors.firstName
                              }
                            />
                          </div>

                          <div className="relative w-full ml-3">
                            <Textinput
                              text="lastName"
                              name="lastName"
                              type="text"
                              placeholder="lastName"
                              error={
                                props.touched &&
                                props.touched.lastName &&
                                props.errors.lastName
                              }
                            />
                          </div>
                        </div>

                        <div className="relative w-full mb-3">
                          <Textinput
                            text="e-mail"
                            type="text"
                            name="email"
                            placeholder="text@gmail.com"
                            error={
                              props.touched &&
                              props.touched.email &&
                              props.errors.email
                            }
                          />
                        </div>

                        <div className="relative w-full mb-3">
                          <Textinput
                            text="password"
                            type="text"
                            name="password"
                            placeholder="********"
                            error={
                              props.touched &&
                              props.touched.password &&
                              props.errors.password
                            }
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
                            placeholder="******"
                            value={mobile}
                            onChange={(e) => setmobile(e.target.value)}
                            type="text"
                            className="w-full bg-white rounded-lg border-2 border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-lg font-sans font-medium outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
                          />
                        </div>

                        <div className="mb-5 flex justify-end">
                          <ButtonField
                            text="sendOtp"
                            type="button"
                            onClick={verifyPhoneNumber}
                          />
                        </div>

                        {/* <div className="mb-5 flex justify-end"> */}
                        <ButtonField
                          type="submit"
                          text="signup"
                          disabled={!IsPhoneValidate}
                        />
                        {/* </div> */}

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
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Index;
