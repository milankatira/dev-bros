import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import SelectOptionModal from "../../../components/admin/common/SelectOptionModal";
import CandidateGroupModal from "../../../components/admin/common/CandidateGroupModal";
import SingleCandidateModal from "../../../components/admin/common/SingleCandidateModal";
import moment from "moment";
import ButtonField from "../../../components/common/design/ButtonField";
const Index = ({ Data }) => {
  console.log(Data, "data");
  const router = useRouter();
  const { id } = router.query;
  const [optionOptionModal, setOptionOptionModal] = useState<boolean>(false);
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [showModal, setshowModal] = useState(false);

  const toggleOptionModal = () => setOptionOptionModal(!optionOptionModal);
  const toggleGroupModal = () => setOpenGroupModal(!openGroupModal);
  const displayModal = () => setshowModal(!showModal);

  const handleIsGroupSelection = (isGroup: boolean) => {
    console.log(isGroup, "oooz");
    // setIsGroup(isGroup);
    // setOptionOptionModal(false);
    if (isGroup) {
      setOpenGroupModal(true);
    } else {
      setshowModal(true);
    }
  };

  return (
    <div className="flex flex-row">
      <section className="w-2/3 mt-4 ml-4">
        {/* <section className="text-gray-600 body-font flex flex-row px-10">
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
        </section> */}

        <section className="text-gray-600 body-font overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2 font-sans">
              Test Information
            </div>

            <div className="mt-4">
              <h1 className="font-bold text-sm">test name</h1>
              <div className="bg-gray-100 p-2 pl-4 mt-2 font-semibold rounded-lg text-gray-400">
                {Data.exam_name}
              </div>
            </div>

            <div className="mt-4">
              <div className="font-bold text-sm flex flex-row justify-between">Questions
              <button className="bg-purple-700 text-white font-bold p-2 rounded-lg text-center">+ Add Question</button>
              </div>
              <div className="bg-gray-100 p-2 pl-4 mt-2 font-semibold rounded-lg text-gray-400">
                {Data.exam_name}
              </div>
            </div>
          </div>
{/* 
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -mx-4 -my-8">
              <div className="py-8 px-4">
                <div className="h-full flex items-start">
                  <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                    <span className="font-medium text-lg text-gray-800 title-font leading-none">
                      {Data.totalQuestion}
                    </span>
                  </div>
                  <img src="/images/exam.png" className="w-8 h-8" />

                  <div className="flex-grow pl-6">
                    <h2 className="tracking-widest text-xs title-font font-medium text-pink-500 mb-1">
                      {Data.exam_name}
                    </h2>
                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {Data.description}
                    </h1>

                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {Data.total_mark} total marks
                    </h1>

                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {Data.passing_mark} passing marks
                    </h1>

                    <div className="flex flex-row items-center mb-3 ">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM256 336c-18 0-32 14-32 32s13.1 32 32 32c17.1 0 32-14 32-32S273.1 336 256 336zM289.1 128h-51.1C199 128 168 159 168 198c0 13 11 24 24 24s24-11 24-24C216 186 225.1 176 237.1 176h51.1C301.1 176 312 186 312 198c0 8-4 14.1-11 18.1L244 251C236 256 232 264 232 272V288c0 13 11 24 24 24S280 301 280 288V286l45.1-28c21-13 34-36 34-60C360 159 329 128 289.1 128z" />
                      </svg>
                      <h1 className="title-font text-xl font-medium text-gray-900 ml-4">
                        {Data.totalQuestion} question
                      </h1>
                    </div>

                    <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                      {Data.exam_type}
                    </h1>

                    <div className="flex flex-row items-center mb-3">
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                      >
                        <path d="M160 32V64H288V32C288 14.33 302.3 0 320 0C337.7 0 352 14.33 352 32V64H400C426.5 64 448 85.49 448 112V160H0V112C0 85.49 21.49 64 48 64H96V32C96 14.33 110.3 0 128 0C145.7 0 160 14.33 160 32zM0 192H448V464C448 490.5 426.5 512 400 512H48C21.49 512 0 490.5 0 464V192zM64 304C64 312.8 71.16 320 80 320H112C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304zM192 304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304zM336 256C327.2 256 320 263.2 320 272V304C320 312.8 327.2 320 336 320H368C376.8 320 384 312.8 384 304V272C384 263.2 376.8 256 368 256H336zM64 432C64 440.8 71.16 448 80 448H112C120.8 448 128 440.8 128 432V400C128 391.2 120.8 384 112 384H80C71.16 384 64 391.2 64 400V432zM208 384C199.2 384 192 391.2 192 400V432C192 440.8 199.2 448 208 448H240C248.8 448 256 440.8 256 432V400C256 391.2 248.8 384 240 384H208zM320 432C320 440.8 327.2 448 336 448H368C376.8 448 384 440.8 384 432V400C384 391.2 376.8 384 368 384H336C327.2 384 320 391.2 320 400V432z" />
                      </svg>
                      <h1 className="ml-4 title-font text-xl font-medium text-gray-900">
                        {moment(Data.createdAt).format("Do MMMM YYYY")}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </section>
      </section>
      <section className="w-1/3 flex justify-center mt-4">
        <div className="w-full mx-4 rounded overflow-hidden shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Exam summery</div>
          </div>
          <div className="mt-4 pl-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-lg font-bold text-gray-900">
              Questions
            </span>
            <div className="flex flex-row items-center mt-4 mb-2">
              <span className="text-center font-semibold text-white mr-2 px-3 rounded-full bg-red-500">
                {Data.totalQuestion}
              </span>
              <h1 className="font-bold">total question</h1>
            </div>

            <div className="flex flex-row items-center">
              <span className="text-center font-black text-xl text-blue-600 mr-2">
                +
              </span>
              <h1 className="font-bold text-black text-base">add question</h1>
            </div>
          </div>

          <div className="mt-8 pl-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-lg font-bold text-gray-900">
              Last edit
            </span>
            <div className="flex flex-row items-center mt-4 mb-2">
              <span className="text-center font-semibold text-gray-600 mr-2 px-3 rounded-md bg-gray-100">
                {moment(Data.updatedAt).format("Do MMMM YYYY")}
              </span>
            </div>
          </div>

          <div className="mt-8 pl-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-lg font-bold text-gray-900">
              Actions
            </span>
            <div className="flex flex-row items-center mt-4 mb-2">
              <button className="bg-purple-100 p-2 rounded-md text-base font-bold flex flex-row items-center">
                <svg
                  className="h-4 w-auto mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                </svg>
                Edit
              </button>

              <button className="ml-4 bg-purple-100 p-2 rounded-md text-base font-bold flex flex-row items-center">
                <svg
                  className="h-4 w-auto mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z" />
                </svg>
                Print
              </button>

              <button className="ml-4 bg-purple-100 p-2 rounded-md text-base font-bold  flex flex-row items-center">
                <svg
                  className="h-4 w-auto mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>
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

      <SingleCandidateModal
        exam_id={router.query.id}
        open={showModal}
        toggleModal={displayModal}
        setModal={setshowModal}
        // isGroup={isGroup}
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
