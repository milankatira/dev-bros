import React, { useState } from "react";
import CustomModalField from "../../../components/common/design/CustomModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
// import BasicTextinput from "../../common/design/BasicTextinput";
import { exam_type } from "../../constant/app_constant";
import { Formik, Form, Field, FieldArray } from "formik";
import { intialValue } from "../../../constant/initial_value";
import BasicTextinput from "../../common/design/BasicTextInput";
import { addExam } from "../../../api/client/exam";
import toast from "react-hot-toast";
import QueAccordion from "./QueAccordian";
import { PDFExport } from "@progress/kendo-react-pdf";

interface Props {
  open: boolean;
  handleClose: any;
  questionsData: any;
  examdDetails: any;
  setOpen: any;
}

const AddQuesModal: React.FC<Props> = ({
  open,
  handleClose,
  questionsData,
  examdDetails,
  setOpen,
}) => {
  const pdfExportComponent: any = React.useRef(null);

  console.log(questionsData, "examdDetails");
  const toChars = (n) =>
    `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ""}${
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[n % 26]
    }`;

  return (
    <div>
      <CustomModalField open={open}>
        <div className="w-[700px]">
          <section className="flex w-[700px] p-4">
            <div className="flex justify-end w-full">
              <svg
                onClick={handleClose}
                className="w-4 h-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </div>
          </section>
          <hr className=" border border-gray-600 w-full" />

            <div className="overflow-y-scroll h-[400px]">
          <PDFExport paperSize="A4" margin="1cm" ref={pdfExportComponent}>
              <section className="text-gray-600 body-font">
                <div className="container px-5 py-2 mx-auto flex justify-center font-bold">
                  <h1>Our offline exam paper</h1>
                </div>
              </section>
              <hr className="border-gray-600" />

              <section className="text-gray-600 body-font">
                <div className="container px-5 py-2 mx-auto">
                  <div className="flex flex-wrap -mx-4 -my-8">
                    <div className="py-8">
                      <div className="h-full flex items-start">
                        <div className="w-12 pl-4 flex-shrink-0 flex flex-col text-center leading-none">
                          <span className="text-gray-500 pt-2 pb-2 mb-2 border-b-2 border-gray-200">
                            Jul
                          </span>
                          <span className="font-medium text-lg text-gray-800 title-font leading-none">
                            18
                          </span>
                        </div>
                        <div className="flex-grow pl-6">
                          <div className="flex justify-between">
                            <p className="text-black font-bold">Exam Name</p>
                            <p>{examdDetails.exam_name}</p>
                          </div>

                          <div className="flex justify-between">
                            <p className="text-black font-bold">Description</p>
                            <p>{examdDetails.description}</p>
                          </div>

                          <div className="flex justify-between">
                            <p className="text-black font-bold">Passing Mark</p>
                            <p>{examdDetails.passing_mark}</p>
                          </div>

                          <div className="flex justify-between">
                            <p className="text-black font-bold">Total Mark</p>
                            <p>{examdDetails.total_mark}</p>
                          </div>

                          {/* examdDetails.passing_mark */}
                          <a className="inline-flex items-center">
                            <div className="title-font font-medium text-gray-900">
                              Created By{" "}
                              {examdDetails.user_id.firstName +
                                " " +
                                examdDetails.user_id.lastName}
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="text-gray-600 body-font">
                <div className="container px-5 py-2 mx-auto items-center">
                  *
                  <label className="mcq-select-answers">
                    Select multiple choice answers with a cross or tick:
                  </label>
                </div>

                <h4 className="px-5 py-2 mx-auto">
                  All Questions are Compulsory:
                </h4>
              </section>

              <section className="text-gray-600 body-font">
                {questionsData &&
                  questionsData.map((data: any, i: number) => (
                    <div key={data._id} className="container px-5 py-2 mx-auto">
                      <h1>{i + 1 + " " + data.question}</h1>
                      <ol type="A">
                        {data?.mcqs?.map((d: any, index: number) => (
                          <li className="ml-4" key={index}>
                            <input
                              type="radio"
                              id="html"
                              name="fav_language"
                              value="HTML"
                              className="mr-2"
                            />
                            <label className="mr-4">
                              {" "}
                              {toChars(index) + "."} {d}
                            </label>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}
              </section>
          </PDFExport>
            </div>
          <div className="flex justify-center my-2">
            <div className="mr-2">
              <button
                type="button"
                className="p-2 bg-slate-500 text-white rounded-sm"
                onClick={() => {
                  if (pdfExportComponent.current) {
                    pdfExportComponent.current.save();
                    setOpen(!open);
                  }
                }}
              >
                Save
              </button>
            </div>
            <div className="ml-2">
              <button
                className="p-2 bg-slate-500 text-white rounded-sm"
                onClick={handleClose}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </CustomModalField>
    </div>
  );
};
export default AddQuesModal;
