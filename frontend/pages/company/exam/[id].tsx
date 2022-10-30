import React, { useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import SelectOptionModal from "../../../components/admin/common/SelectOptionModal";
import CandidateGroupModal from "../../../components/admin/common/CandidateGroupModal";
import SingleCandidateModal from "../../../components/admin/common/SingleCandidateModal";
import moment from "moment";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
import {
  getallQuestion,
  getCodingQuestion,
  getQuestion,
  RemoveQuestion,
} from "../../../api/client/question";
import Accordion from "../../../components/admin/question/Accordian";
import Swal from "sweetalert2";
import AddQuesModal from "../../../components/admin/question/AllQuesModal";
import PdfModal from "../../../components/admin/question/PdfModal";
import AddExamModal from "../../../components/admin/common/AddExamModal";
import { deleteExam } from "../../../api/client/exam";
import ReactHtmlParser from "react-html-parser";

const Index = ({ Data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [examData, setexamData] = useState(Data);
  const [optionOptionModal, setOptionOptionModal] = useState<boolean>(false);
  const [openGroupModal, setOpenGroupModal] = React.useState(false);
  const [showModal, setshowModal] = useState(false);
  const [isGroup, setIsGroup] = React.useState(false);
  const [questions, setquestions] = useState([]);
  const [codingQuestionData, setcodingQuestionData] = useState([]);
  const [questionsDatas, setquestionsDatas] = useState([]);
  const [openEditExamModal, setOpenEditExamModal] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [openPrintModal, setOpenPrintModal] = useState<boolean>(false);
  const toggleOptionModal = () => setOptionOptionModal(!optionOptionModal);
  const toggleGroupModal = () => setOpenGroupModal(!openGroupModal);
  const displayModal = () => setshowModal(!showModal);
  const handleClosePrintModal = () => setOpenPrintModal(!openPrintModal);
  const toggleModal = () => setOpenEditExamModal(!openEditExamModal);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddGroupModal = () => {
    setIsGroup(true);
    setshowModal(true);
    setOptionOptionModal(false);
  };

  const handleIsGroupSelection = (isGroup: boolean) => {
    if (isGroup) {
      setOpenGroupModal(true);
    } else {
      setshowModal(true);
    }
  };

  UseEffectOnce(() => {
    console.log(Data.exam_type == "CODING", "vg");

    if (Data.exam_type == "CODING") {
      getCodingQuestion(id).then((res) =>
        setcodingQuestionData(res.data.codingquestionData)
      );
    } else {
      getQuestion(id).then((res) => setquestions(res.data.Data));
      getallQuestion(id).then((res) => setquestionsDatas(res.data.Data));
    }
  });

  const DeleteHandler = (question_id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        const packet = {
          exam_id: id,
          question_id,
        };
        RemoveQuestion(packet)
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Poof! Your imaginary file has been deleted!",
              "success"
            );
          })
          .catch((err) => {
            console.log(err?.data, err?.response.data.message, "err");
            Swal.fire("Error!", err?.response?.data?.message, "error");
          });
      } else {
        Swal.fire("Cancelled", "Your job is not deleted!");
      }
    });
  };

  const handleDeleteHandler = (exam_id: string | string[]) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this job!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok",
    }).then((willDelete) => {
      if (willDelete.isConfirmed) {
        deleteExam(exam_id)
          .then((res) => {
            Swal.fire(
              "Deleted!",
              "Poof! Your imaginary file has been deleted!",
              "success"
            );
            Router.push("/company/exam");
          })
          .catch((err) => {
            Swal.fire("Error!", err?.response?.data?.message, "error");
          });
      } else {
        Swal.fire("Cancelled", "Your job is not deleted!");
      }
    });
  };

  return (
    <div className="flex lg:flex-row flex-col">
      <section className="lg:w-2/3 w-full flex justify-center mt-4">
        <section className="w-full bg-red-200 mx-4 rounded overflow-hidden shadow-lg">
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

            <div className="my-4">
              <div className="font-bold text-sm flex flex-row justify-between">
                Questions
                {Data.exam_type == "CODING" ? (
                  codingQuestionData ? (
                    <button
                      onClick={() => {
                        Router.push(
                          `/company/${Data._id}/coding/${codingQuestionData[0]._id}`
                        );
                      }}
                      className="bg-purple-700 text-white font-bold p-2 rounded-lg text-center"
                    >
                      Edit Question
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        Router.push(`/company/${Data._id}/codingquestion`);
                      }}
                      className="bg-purple-700 text-white font-bold p-2 rounded-lg text-center"
                    >
                      + Add Question
                    </button>
                  )
                ) : (
                  <button
                    onClick={() => {
                      Router.push(`/company/${Data._id}/questions`);
                    }}
                    className="bg-purple-700 text-white font-bold p-2 rounded-lg text-center"
                  >
                    + Add Question
                  </button>
                )}
              </div>
            </div>
            {questions &&
              questions.map((data) => (
                <Accordion
                  content={data}
                  key={data._id}
                  DeleteHandler={DeleteHandler}
                  exam_id={id}
                />
              ))}

            {Data.exam_type == "CODING" &&
              codingQuestionData &&
              codingQuestionData.map((data) => (
                <h1 key={data._id}>{ReactHtmlParser(data?.question)}</h1>
              ))}
          </div>
        </section>
      </section>
      <section className="lg:w-1/3 w-full flex justify-center mt-4">
        <div className="w-full mx-4 bg-red-200 rounded overflow-hidden shadow-lg">
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
            {Data.exam_type == "MCQ" && (
              <div className="flex flex-row items-center" onClick={handleOpen}>
                <span className="text-center font-black text-xl text-blue-600 mr-2">
                  +
                </span>
                <h1 className="font-bold text-black text-base">
                  View question
                </h1>
              </div>
            )}
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

          <div className="mt-8 px-6">
            <span className="px-3 py-1 bg-gray-100 rounded-full text-lg font-bold text-gray-900">
              Actions
            </span>

            <div className="flex flex-row mb-4 flex-wrap -mx-1">
              <button
                onClick={() => setOpenEditExamModal(true)}
                className="bg-slate-100 mx-2 mt-4 p-2 rounded-md text-base font-bold flex flex-row items-center"
              >
                <svg
                  className="h-4 w-auto mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z" />
                </svg>
                Edit
              </button>

              <button
                disabled={Data.exam_type == "CODING"}
                onClick={() => setOpenPrintModal(true)}
                className="mx-2 mt-4 bg-slate-100 p-2 rounded-md text-base font-bold flex flex-row items-center"
              >
                <svg
                  className="h-4 w-auto mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M448 192H64C28.65 192 0 220.7 0 256v96c0 17.67 14.33 32 32 32h32v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h32c17.67 0 32-14.33 32-32V256C512 220.7 483.3 192 448 192zM384 448H128v-96h256V448zM432 296c-13.25 0-24-10.75-24-24c0-13.27 10.75-24 24-24s24 10.73 24 24C456 285.3 445.3 296 432 296zM128 64h229.5L384 90.51V160h64V77.25c0-8.484-3.375-16.62-9.375-22.62l-45.25-45.25C387.4 3.375 379.2 0 370.8 0H96C78.34 0 64 14.33 64 32v128h64V64z" />
                </svg>
                Print
              </button>

              <button
                onClick={() => handleDeleteHandler(id)}
                className="mx-2 mt-4 bg-slate-100 p-2 rounded-md text-base font-bold  flex flex-row items-center"
              >
                <svg
                  className="h-4 w-auto mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
                </svg>
                Delete
              </button>

              <button
                onClick={() => setOptionOptionModal(true)}
                className="mx-2 mt-4 bg-slate-100 p-2 rounded-md text-base font-bold  flex flex-row items-center"
              >
                Assign test
              </button>
              <Link href="preview">
                <button className="mx-2 mt-4 bg-slate-100 p-2 rounded-md text-base font-bold  flex flex-row items-center">
                  Preview
                </button>
              </Link>
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
        handleAddGroupModal={handleAddGroupModal}
      />

      <SingleCandidateModal
        exam_id={id}
        open={showModal}
        toggleModal={displayModal}
        setModal={setshowModal}
        isGroup={isGroup}
      />

      <AddQuesModal
        open={open}
        handleClose={handleClose}
        questionsDatas={questionsDatas}
        exam_id={id}
      />

      <PdfModal
        open={openPrintModal}
        handleClose={handleClosePrintModal}
        questionsData={questions}
        examdDetails={Data}
        setOpen={setOpen}
      />

      <AddExamModal
        open={openEditExamModal}
        toggleModal={toggleModal}
        exam_id={id}
        examData={examData}
        setExamData={setexamData}
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
