import React, { useState } from "react";
import ButtonField from "../components/common/design/ButtonField";
import Textinput from "../components/common/design/inputField";
import firebase from '../firebase/firebase'
const Auth = () => {
  const [mobile, setmobile] = useState("");
  const [otp, setotp] = useState("");
  const [confirmResult, setconfirmResult] = useState(null);

  const verifyPhoneNumber = async () => {
    try {
      if (mobile.toString().length != 13 || mobile === "") {
        mobile.toString().length;
        console.error(
          "please add 10 digit phone number",
          mobile.toString().length
        );
      } else {
        // dispatch(setLoading(true));
        const appVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          { size: "invisible" }
        );
        const result = await firebase
          .auth()
          .signInWithPhoneNumber(mobile, appVerifier);
        if (result) {
          console.log(result)
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
      e.preventDefault();
      if (otp) {
        console.log(otp)
        const confirmOtp = await confirmResult.confirm(otp);
        console.log(confirmOtp)
        if (confirmOtp) {
          console.log("Phone number verified successfully!");
          //  setIsPhoneValidate(true);
          //  dispatch(setLoading(false));
        }
      } else {
        console.error("Invalid OTP");
        console.log(otp,confirmOtp)
        //  dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error)
      //  router.reload();
      console.error("Invalid OTP please try again");
      //  dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 flex flex-wrap items-center">
          <div className="lg:w-1/2  md:pr-16 lg:pr-0 pr-0">
            <img src="/assets/login.png" alt="" className="w-auto h-1/2" />
          </div>
          <div className="lg:w-1/2 md:w-1/2 rounded-lg p-40 flex flex-col md:ml-auto w-full mt-30 md:mt-0">
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
            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 font-bold text-sm text-gray-600"
              >
                E-mail
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // placeholder="name @gmail.com   #"
                className="w-full bg-white rounded-lg border-2 border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-lg font-sans font-medium outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
              />
            </div>

            <Textinput
              text="MobNumber"
              type="text"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
              placeholder="+9111221221212"
              // value={value}
              // onChange={onChange}
              // placeholder={placeholder}
            />

            <ButtonField text="sendOtp" onClick={verifyPhoneNumber} />

            <Textinput
              text="otp"
              type="text"
              value={otp}
              onChange={(e) => setotp(e.target.value)}
              placeholder="123456"
              // value={value}
              // onChange={onChange}
              // placeholder={placeholder}
            />

            <ButtonField text="Verify" onClick={(e) => handleSubmit(e)} />

            <Textinput
              text="E-mail"
              type="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              placeholder="name @gmail.com   #"
              // value={value}
              // onChange={onChange}
              // placeholder={placeholder}
            />

            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 font-bold text-sm text-gray-600"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                placeholder="6+ Charactors,1 Capital letter"
                className="w-full bg-white rounded border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <ButtonField text="Signup" />
            <div id="recaptcha-container"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
