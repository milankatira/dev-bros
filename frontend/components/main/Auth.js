import React from "react";
import Swal from "sweetalert2";
import { login, signup } from "../api/Auth";
import { APP_CONSTANT } from "../constant/app_constant";
import Link from "next/link";
const Auth = ({ name, redirect }) => {
  const HandleSubmit = async () => {
    const packet = {
      email,
      password,
    };
    if (name == APP_CONSTANT.login) {
      await login(packet)
        .then((res) => {
          Swal.fire("Good job!", res.data.message, "success");
        })
        .catch((err) => {
          Swal.fire("Error!", err.response.data.error, "error");
        });
    } else if (name == APP_CONSTANT.signup) {
      await signup(packet)
        .then((res) => {
          Swal.fire("Good job!", res.data.message, "success");
        })
        .catch((err) => {
          Swal.fire("Error!", err.response.data.error, "error");
        });
    }
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 flex flex-wrap items-center">
          <div className="lg:w-3/5  md:pr-16 lg:pr-0 pr-0 p-20">
            <img src="/assets/login.png" alt="" className="w-auto h-1/2" />
          </div>
          <div className="lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-10 flex flex-col md:ml-auto w-full mt-30 md:mt-0 shadow-sm hover:shadow-2xl transition duration-300">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
              {name}
            </h2>

            <div className="relative mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <div className="relative mb-4">
              <label
                htmlFor="full-name"
                className="leading-7 text-sm text-gray-600"
              >
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              onClick={HandleSubmit}
              className="text-white uppercase bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded text-lg"
            >
              {name}
            </button>

            <p className="text-xs text-gray-500 mt-3">
              Already have an account?
              <Link href={redirect}>
                <a>{redirect}</a>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Auth;
