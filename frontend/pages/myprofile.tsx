import React, { useEffect } from "react";
import { user } from "../api/client/user";
import axios from "axios";
import Link from "next/link";
import { useAuthcontext } from "../context/context/Auth";
import { server_url } from "../config/app_config";

const Myprofile = ({ userData, profiledata }) => {
  const { auth, Auth_api } = useAuthcontext();
  console.log(auth.loading, "loading ...");
  return (
    <div>
      {!auth.loading && (
        <main className="profile-page">
          <section className="relative block h-500-px">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
              style={{ transform: "translateZ(0)" }}
            >
              <svg
                className="absolute bottom-0 overflow-hidden"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                version="1.1"
                viewBox="0 0 2560 100"
                x="0"
                y="0"
              >
                <polygon
                  className="text-sky-200 fill-current"
                  points="2560 0 2560 100 0 100"
                ></polygon>
              </svg>
            </div>
          </section>
          <section className="relative py-16 bg-sky-200">
            <div className="container mx-auto px-4">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="px-6">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full px-8 lg:order-1 flex justify-center">
                      <div className="relative">
                        <img
                          alt="..."
                          src={`${server_url}/${userData.pic}`}
                          className="shadow-xl rounded-full hover:shadow-2xl align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px h-[150px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full px-4 text-center sm:text-right mt-0 sm:mt-0 flex sm:justify-end justify-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <Link href="/profile">
                        <button
                          className="bg-sky-700 active:bg-sky-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Connect
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="text-center sm:mt-8">
                    <h3 className="text-4xl font-semibold leading-normal text-sky-700 mb-4">
                      {userData?.user?.firstName} {userData?.user.lastName}
                    </h3>
                  </div>
                  <div className="mt-10 py-10 border-t border-sky-200 text-center">
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-sky-700">
                          An artist of considerable range, Jenna the name taken
                          by Melbourne-raised, Brooklyn-based Nick Murphy
                          writes, performs and records all of his own music,
                          giving it a warm, intimate feel with a solid groove
                          structure. An artist of considerable range.
                        </p>
                        <a
                          href="#pablo"
                          className="font-normal text-sky-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Show more
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default Myprofile;

export async function getServerSideProps({ req }) {
  const res = await axios.get("http://localhost:4000/api/me", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });

  const profile = await axios.get("http://localhost:4000/api/myprofile", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });
  const data = await res.data;
  const profiledata = await profile.data;
  return { props: { userData: data, profiledata: profiledata } };
}
