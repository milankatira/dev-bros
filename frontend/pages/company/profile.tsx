import React, { useEffect } from "react";
import axios from "axios";
import Link from "next/link";
const myprofile = ({ userData, company }) => {
  return (
    <div>
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
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={`${company.cover_picture}`}
                        // className="shadow-xl rounded-full h-auto align-middle border-none absolute max-w-150-px w-40"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
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
                </div>
                <div className="text-center mt-12">
                  <div className="w-full px-4 lg:order-2 flex justify-center">
                    <img
                      alt="..."
                      src={`${company.cover_picture}`}
                      className="shadow-xl rounded-full h-auto align-middle border-none absolute max-w-150-px w-40"
                    />
                  </div>
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-sky-700 mb-2">
                    {userData?.user?.firstName} {userData?.user.lastName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-sky-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-sky-400"></i>{" "}
                    {userData?.profile?.location}
                  </div>
                  <div className="mb-2 text-sky-600 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-sky-400"></i>
                    Solution Manager - Creative Tim Officer
                  </div>
                  <div className="mb-2 text-sky-600">
                    <i className="fas fa-university mr-2 text-lg text-sky-400"></i>
                    University of Computer Science
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-sky-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-sky-700">
                        An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range.
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
    </div>
  );
};

export default myprofile;

export async function getServerSideProps({ req }) {
  const res = await axios.get("http://localhost:4000/api/me", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });
  const data = await res.data;
  const company = await axios.get("http://localhost:4000/api/company", {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });
  return { props: { userData: data, company: company.data.company } };
}
