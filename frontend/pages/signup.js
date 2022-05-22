import React, { useState } from "react";
import ButtonField from "../components/common/design/ButtonField";
import Textinput from "../components/common/design/Textinput";
import ModalField from "../components/common/design/Modalfield";
import firebase from "../firebase/firebase";
import { Formik, Form, Field } from "formik";
import { intialValue } from "../constant/initial_value";
import { signup } from "../validator/signup";

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
        console.log(otp, confirmOtp);
        //  dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      //  router.reload();
      console.error("Invalid OTP please try again");
      //  dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Formik
        initialValues={intialValue.signup}
        validationSchema={signup}
        onSubmit={console.log("ok")}
      >
        {(props) => {
          console.log(props);
          return (
            <Form>
              <section className="text-gray-600 body-font p-10">
                <div className="container flex flex-wrap items-center">
                  <div className="lg:w-1/2 md:w-1/2">
                    <img
                      src="/assets/login.png"
                      alt=""
                      className="w-auto h-1/2"
                    />
                  </div>
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
                      // value={mobile}
                      // onChange={(e) => setmobile(e.target.value)}
                      placeholder="+9111221221212"
                      // value={value}
                      // onChange={onChange}
                    />

                    <Textinput
                      text="lastName"
                      name="lastName"
                      type="text"
                      // value={mobile}
                      // onChange={(e) => setmobile(e.target.value)}
                      placeholder="+9111221221212"
                      // value={value}
                      // onChange={onChange}
                    />

                    <Textinput
                      text="e-mail"
                      type="text"
                      name="email"
                      // value={mobile}
                      // onChange={(e) => setmobile(e.target.value)}
                      placeholder="+9111221221212"
                      // value={value}
                      // onChange={onChange}
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
                        <h1>submit</h1>
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
              </section>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Auth;
