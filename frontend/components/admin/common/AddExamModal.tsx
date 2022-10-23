import React, { useState } from "react";
import CustomModalField from "../../../components/common/design/CustomModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
// import BasicTextinput from "../../common/design/BasicTextinput";
import { exam_type } from "../../constant/app_constant";
import { Formik, Form, Field, FieldArray } from "formik";
import { intialValue } from "../../../constant/initial_value";
import BasicTextinput from "../../common/design/BasicTextInput";
import { addExam, updateExam } from "../../../api/client/exam";
import toast from "react-hot-toast";
interface Props {
  exam_id: string | string[];
  toggleModal?: any;
  open?: boolean;
  setExamData: any;
  examData: any;
}
import { useExamcontext } from "../../../context/context/Exam";


const AddExamModal: any = ({
  exam_id,
  toggleModal,
  open,
  setExamData,
  examData,
}) => {
  const [step, setStep] = useState<number>(1);
  const { Exam_api } = useExamcontext();

  UseEffectOnce(() => {
    setStep(1);
  });

  const handleSubmit = () => {
    let packet;
    if (examData.exam_type == exam_type.CODING) {
      packet = {
        exam_name: examData.exam_name,
        description: examData.description,
        exam_type: examData.exam_type,
        passing_mark: parseInt(examData.passing_mark),
        total_mark: parseInt(examData.total_mark),
        totalQuestion: 1,
      };
    } else {
      packet = {
        exam_name: examData.exam_name,
        description: examData.description,
        exam_type: examData.exam_type,
        passing_mark: parseInt(examData.passing_mark),
        total_mark: parseInt(examData.total_mark),
        totalQuestion: examData.totalQuestion,
      };
    }
    if (parseInt(examData.passing_mark) > parseInt(examData.total_mark)) {
      toast.error("Invalid passing marks");
    } else {
      if (exam_id) {
        updateExam(exam_id, packet).then((res) => {
          toggleModal();
        });
      } else {
        Exam_api.AddExam(packet,toggleModal);
        addExam(packet).then((res) => {
          // toggleModal();
        });
      }
    }
  };

  return (
    <div>
      <CustomModalField open={open}>
        <div className="flex justify-between p-2">
          {step !== 1 ? (
            <div className="flex justify-center">
              <button
                className="backNextBtn1 backBtn1"
                onClick={() => setStep(step - 1)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <div></div>
          )}

          <h6>create New Test</h6>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            onClick={toggleModal}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <hr className="border-b-1 border-gray-300" />

        <div className="flex flex-col items-center w-[700px]">
          {step === 1 && (
            <>
              <div className="my-4">Choose Test Type</div>
              <div className="flex flex-row justify-between w-[300px]">
                <div className="">
                  <div
                    className={`web-img-section ${
                      examData?.exam_type === exam_type.MCQ &&
                      "web-img-section-selected"
                    }`}
                    onClick={() =>
                      setExamData({ ...examData, exam_type: exam_type.MCQ })
                    }
                  >
                    <img
                      src={
                        examData?.exam_type === exam_type.MCQ
                          ? "/images/web-selected.svg"
                          : "/images/web.svg"
                      }
                      width={60}
                      height={60}
                    />
                  </div>
                  <b>MCQS</b>
                </div>
                <div className="">
                  <div
                    className={`web-img-section ${
                      examData?.exam_type === exam_type.CODING &&
                      "web-img-section-selected"
                    }`}
                    onClick={() =>
                      setExamData({ ...examData, exam_type: exam_type.CODING })
                    }
                  >
                    <img
                      src={
                        examData?.exam_type === exam_type.CODING
                          ? "/images/code-select.svg"
                          : "/images/code.svg"
                      }
                      width={60}
                      height={60}
                    />
                  </div>
                  <b>CODE</b>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="font-bold text-lg">
                {exam_id ? "Update" : "Create"} Test Details
              </div>
              <span className="examModalTitle">
                Provide your test a meaningful name and details, to help your{" "}
                <br /> colleagues understand the test purpose.
              </span>
              <div className="exam_modal_box">
                <div className="exam_Inputs w-[500px]">
                  <BasicTextinput
                    text="name"
                    name={examData?.exam_name}
                    onChange={(e) => {
                      setExamData({
                        ...examData,
                        exam_name: e.target.value,
                      });
                    }}
                  />

                  <BasicTextinput
                    text="description"
                    name={examData?.description}
                    onChange={(e) => {
                      setExamData({
                        ...examData,
                        description: e.target.value,
                      });
                    }}
                  />

                  <BasicTextinput
                    text="total questions"
                    type="number"
                    name={examData?.totalQuestion}
                    onChange={(e: any) => {
                      setExamData({
                        ...examData,
                        totalQuestion: e.target.value,
                      });
                    }}
                  />

                  <div className="inputs-for-exam">
                    <div>
                      <section>
                        <BasicTextinput
                          text="Total Marks"
                          name={examData?.total_mark}
                          type="number"
                          onChange={(e) => {
                            setExamData({
                              ...examData,
                              total_mark: e.target.value,
                            });
                          }}
                        />
                      </section>
                    </div>
                    <div>
                      <section>
                        <BasicTextinput
                          text="Passing Marks"
                          name={examData?.passing_mark}
                          onChange={(e) => {
                            setExamData({
                              ...examData,
                              passing_mark: e.target.value,
                            });
                          }}
                          type="number"
                        />
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <footer className="w-full flex justify-end mr-5">
            {step !== 2 ? (
              <button
                className="backNextBtn nextBtn"
                onClick={() => setStep(step + 1)}
                disabled={step === 1 && examData?.exam_type == ""}
              >
                Next
              </button>
            ) : (
              <button
                className="backNextBtn nextBtn"
                onClick={handleSubmit}
                disabled={
                  examData?.exam_name === "" ||
                  examData?.description === "" ||
                  examData?.total_mark === "" ||
                  examData?.passing_mark === ""
                }
              >
                {exam_id ? "Update" : "Create"} Test
              </button>
            )}
          </footer>
        </div>
      </CustomModalField>
    </div>
  );
};
export default AddExamModal;
