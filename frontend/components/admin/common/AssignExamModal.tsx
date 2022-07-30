import React from "react";
// import { div, Typography } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";
// import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIos";
import moment from "moment";
import momentTz from "moment-timezone";
import { Form, Formik } from "formik";

import Textinput from "../../common/design/Textinput";
import ButtonField from "../../common/design/ButtonField";
import CustomModalField from "../../../components/common/design/CustomModal";
import { intialValue } from "../../../constant/initial_value";
import { assignExam } from "../../../validator/assignExam";

// import { initialValues } from "../../../../constant/initial_values";
// import { validationSchema } from "../../../../constant/validation_schema";
// import Textinput from "../../../common/Material_Ui/Textinput";

// import ModalField from "../../../common/Material_Ui/ModalField";
import { toast } from "react-hot-toast";
// import { AssignExamForms } from "../../../../interface/company";

interface Props {
  handleAssignCandidate: (arg: object) => void;
  toggleModal?: () => void;
  open?: boolean;
  examName?: string;
}

const AssignExamModal: React.FC<Props> = ({
  open,
  toggleModal,
  handleAssignCandidate,
}) => {
  //eslint-disable-line react-hooks/exhaustive-deps
  const minDate: string = moment(new Date()).format("YYYY-MM-DD").toString();
  const time = momentTz().tz("Asia/Kolkata").format("HH:mm");

  const onSubmit = (data: any) => {
    console.log("dataa", data);
    if (
      moment(data?.date).format("YYYY-MM-DD").toString() == minDate &&
      time > data?.start_time
    ) {
      toast.error("Start time should be current time or upcoming time");
    } else {
      if (data?.start_time >= data?.end_time) {
        toast.error("End time should be more than Start time");
      } else {
        toggleModal();
        handleAssignCandidate(data);
      }
    }
  };

  return (
    <CustomModalField
      open={open}
      // toggleModal={toggleModal}
      // style="resumeModal"
      // ModalDesign="exam_modal_body assigned_test_modal"
    >
      <Formik
        initialValues={intialValue.assignExam}
        onSubmit={onSubmit}
        validationSchema={assignExam}
      >
        {({ errors, touched }) => (
          <Form className="w-[700px] p-4">
            <div className="flex justify-between p-2">
           
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 512"
                onClick={toggleModal}
                className="h-4 w-4"
              >
                <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
              </svg>
              <h4>Assign Exam</h4>
              <svg
                onClick={toggleModal}
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
              </svg>
            </div>

            <div>
              <br />
              <div>
                <div className="exam_Inputs">
                  <div className="inputs-for-exam">
                    <section className="exam-section5">
                      <Textinput
                        text="Name of the Exam"
                        name="name"
                        type="text"
                        error={touched && touched.name && errors && errors.name}
                      />
                    </section>

                    <section className="exam-section5">
                      <label>
                        <b>Date:</b>
                      </label>
                      <Textinput
                        name="date"
                        type="date"
                        error={touched && touched.date && errors && errors.date}
                      />
                    </section>
                  </div>

                  <br />
                  <div></div>
                  <br />

                  <div className="inputs-for-exam">
                    <section className="exam-section5">
                      <label>
                        <b>Start Time:</b>
                      </label>

                      <Textinput
                        name="start_time"
                        type="time"
                        error={
                          touched &&
                          touched.start_time &&
                          errors &&
                          errors.start_time
                        }
                      />
                    </section>
                    <section className="exam-section5">
                      <label>
                        <b>End Time:</b>
                      </label>

                      <Textinput
                        name="end_time"
                        type="time"
                        error={
                          touched &&
                          touched.end_time &&
                          errors &&
                          errors.end_time
                        }
                      />
                    </section>
                  </div>
                </div>
              </div>
              <footer className="flex justify-end">
                <button type="submit" className="p-2 rounded-lg bg-red-500 text-white">
                  Submit
                </button>
              </footer>
            </div>
          </Form>
        )}
      </Formik>
    </CustomModalField>
  );
};

export default AssignExamModal;
