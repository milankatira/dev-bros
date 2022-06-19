import React, { useState } from "react";
import CustomModalField from "../../../components/common/design/CustomModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
// import input from "../../common/design/input";
import { exam_type } from "../../constant/app_constant";
import { Formik, Form, Field, FieldArray } from "formik";
import { intialValue } from "../../../constant/initial_value";
import {
   addExam 
} from '../../../api/client/exam';
import toast from "react-hot-toast";
interface Props {
  exam_id?: string;
  toggleModal?: any;
  open?: boolean;
  setExamData: any;
  examData: any;
}

const AddExamModal: any = ({
  exam_id,
  toggleModal,
  open,
  setExamData,
  examData,
}) => {
  const [step, setStep] = useState<number>(1);
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
      addExam(packet).then((res) => {
        console.log(res.data)
      }); 
      // dispatch(addExam(packet));
    }
  };

  return (
    <div>
      <CustomModalField open={open}>
        <div className="flex justify-between w-full">
          {step !== 1 ? (
            <div className="flex justify-center ">
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
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        <div className="flex flex-col items-center">
          {step === 1 && (
            <>
              <br />
              <div className="examModalHead">Choose Test Type</div>
              <div className="examDate">
                <div className="select-option-sec">
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
                <div className="select-option-sec">
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
              <div className="examModalHead">
                {exam_id ? "Update" : "Create"} Test Details
              </div>
              <span className="examModalTitle">
                Provide your test a meaningful name and details, to help your{" "}
                <br /> colleagues understand the test purpose.
              </span>
              <div className="exam_modal_box">
                <div className="exam_Inputs">
                  <label>
                    <b>Name:</b>
                  </label>
                  <input
                    // className="margin-top"
                    value={examData?.exam_name}
                    onChange={(e) => {
                      setExamData({
                        ...examData,
                        exam_name: e.target.value,
                      });
                    }}
                    // id="outlined-basic"
                    // text="Test Name"
                    // name="exam_name"
                    // variant="outlined"
                    // fullWidth
                  />
                  <br />
                  <br />

                  <label>
                    <b>Description:</b>
                  </label>
                  <input
                    value={examData?.description}
                    onChange={(e) => {
                      setExamData({
                        ...examData,
                        description: e.target.value,
                      });
                    }}
                    // id="outlined-basic"
                    // text="Exam Description"
                    // name="exam description"
                    // variant="outlined"
                    // className="margin-top"
                    // multiline
                    // rows={2}
                    // fullWidth
                  />
                  <br />
                  <br />

                  <label>
                    <b>total questions:</b>
                  </label>
                  <input
                    // className="margin-top"
                    type="number"
                    value={examData?.totalQuestion}
                    onChange={(e: any) => {
                      setExamData({
                        ...examData,
                        totalQuestion: e.target.value,
                      });
                    }}
                    // id="outlined-basic"
                    // text="total Question"
                    // name="exam_name"
                    // variant="outlined"
                    // fullWidth
                  />

                  <br />
                  <br />

                  <div className="inputs-for-exam">
                    <div>
                      <section>
                        <label>
                          <b>Total Marks:</b>
                        </label>
                        <input
                          value={examData?.total_mark}
                          type="number"
                          onChange={(e) => {
                            setExamData({
                              ...examData,
                              total_mark: e.target.value,
                            });
                          }}
                          // id="outlined-basic"
                          // text="Total Marks"
                          // name="total marks"
                          // variant="outlined"
                          // className="margin-top margin-left22"
                          // fullWidth
                        />
                      </section>
                    </div>
                    <div>
                      <section>
                        <label>
                          <b>Passing Marks:</b>
                        </label>
                        <input
                          value={examData?.passing_mark}
                          onChange={(e) => {
                            setExamData({
                              ...examData,
                              passing_mark: e.target.value,
                            });
                          }}
                          type="number"
                          // id="outlined-basic"
                          // text="Passing Marks"
                          // name="passing marks"
                          // variant="outlined"
                          // className="margin-top"
                          // fullWidth
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
