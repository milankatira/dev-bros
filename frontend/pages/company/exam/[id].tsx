import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import SelectOptionModal from "../../../components/admin/common/SelectOptionModal";
const Index = ({ Data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [optionOptionModal, setOptionOptionModal] = useState<boolean>(false);
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  
  const toggleOptionModal = () => setOptionOptionModal(!optionOptionModal);
  const toggleGroupModal = () => setOpenGroupModal(!openGroupModal);

const handleIsGroupSelection = (isGroup: boolean) => {
  console.log(isGroup,"oooz");
  // setIsGroup(isGroup);
  // setOptionOptionModal(false);
  if (isGroup) {
    // setOpenGroupModal(true);
  } else {
    // setshowModal(true);
  }
};

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="flex flex-wrap w-full">
            <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    STEP 1
                  </h2>
                  <p className="leading-relaxed">
                    VHS cornhole pop-up, try-hard 8-bit iceland helvetica.
                    Kinfolk bespoke try-hard cliche palo santo offal.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    STEP 2
                  </h2>
                  <p className="leading-relaxed">
                    Vice migas literally kitsch +1 pok pok. Truffaut hot chicken
                    slow-carb health goth, vape typewriter.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="5" r="3"></circle>
                    <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    STEP 3
                  </h2>
                  <p className="leading-relaxed">
                    Coloring book nar whal glossier master cleanse umami. Salvia
                    +1 master cleanse blog taiyaki.
                  </p>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                  <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    STEP 4
                  </h2>
                  <p className="leading-relaxed">
                    VHS cornhole pop-up, try-hard 8-bit iceland helvetica.
                    Kinfolk bespoke try-hard cliche palo santo offal.
                  </p>
                </div>
              </div>
              <div className="flex relative">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-500 inline-flex items-center justify-center text-white relative z-10">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                    <path d="M22 4L12 14.01l-3-3"></path>
                  </svg>
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                    FINISH
                  </h2>
                  <p className="leading-relaxed">
                    Pitchfork ugh tattooed scenester echo park gastropub
                    whatever cold-pressed retro.
                  </p>
                </div>
              </div>
            </div>
            <img
              className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
              src="https://dummyimage.com/1200x500"
              alt="step"
            />
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font border-2 border-red-500">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -mx-4 -my-8">
            <div className="py-8 px-4">
              <div className="h-full flex items-start">
                <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                  <span className="font-medium text-lg text-gray-800 title-font leading-none">
                    {Data.totalQuestion}
                  </span>
                </div>
                <div className="flex-grow pl-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-pink-500 mb-1">
                    {Data.exam_name}
                  </h2>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    {Data.description}
                  </h1>

                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    {Data.total_mark}
                  </h1>

                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    {Data.passing_mark}
                  </h1>

                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    {Data.exam_type}
                  </h1>
                  <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                    {Data.createdAt}
                  </h1>

                  <p className="leading-relaxed mb-5">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <a className="inline-flex items-center">
                    <img
                      alt="blog"
                      src="https://dummyimage.com/103x103"
                      className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
                    />
                    <span className="flex-grow flex flex-col pl-3">
                      <span className="title-font font-medium text-gray-900">
                        Alper Kamu
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font flex flex-row">
        <section className="text-gray-600 body-font w-1/2">
          <div className="container py-4 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center items-end justify-start mx-auto">
              <button
                className="flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded ml-4 text-lg mt-10 sm:mt-0"
                onClick={() => {
                  Router.push(`/company/${Data._id}/questions`);
                }}
              >
                addExam
              </button>

              <button
                className="mx-4 flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                onClick={() => {
                  Router.push(`/company/${Data._id}/allquestions`);
                }}
              >
                View Question
              </button>
            </div>
          </div>
        </section>

        <section className="text-gray-600 body-font w-1/2">
          <div className="container py-4 mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center items-end justify-end mx-auto">
              <Link href="preview">
                <button className="flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
                  Preview
                </button>
              </Link>

              <button
                className="mx-4 flex-shrink-0 text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0"
                onClick={() => setOptionOptionModal(true)}
              >
                Assign test
              </button>
            </div>
          </div>
        </section>
      </section>

      <SelectOptionModal
        open={optionOptionModal}
        toggleModal={toggleOptionModal}
        handleIsGroupSelection={handleIsGroupSelection}
      />

      <CandidateGroupModal
        exam_id={router.query.id}
        open={openGroupModal}
        toggleModal={toggleGroupModal}
        // handleAddGroupModal={handleAddGroupModal}
      />
    </div>
  );
};

export default Index;

export async function getServerSideProps({ req, query }) {
  const res = await axios.get(`http://localhost:4000/api/exam/${query.id}`, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Credentials": true,
      Cookie: req?.headers?.cookie,
    },
  });
  const data = await res.data;

  return { props: { Data: data.exam } };
}
