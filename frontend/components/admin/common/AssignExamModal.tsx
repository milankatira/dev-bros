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
import { toast } from "react-toastify";
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

  const onSubmit = (data:any) => {
    console.log(data,"data")
    if (
      moment(data.date).format("YYYY-MM-DD").toString() == minDate &&
      time > data.start_time
    ) {
      toast.error("Start time should be current time or upcoming time");
    } else {
      if (data.start_time >= data.end_time) {
        toast.error("End time should be more than Start time");
      } else {
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
          <Form>
            <div className="exam_modal_heading">
              <button className="backNextBtn1 backBtn1" onClick={toggleModal}>
                <button className="back_icons_modal" />
              </button>

              <h6>
                Assign Exam
              </h6>

              <button onClick={toggleModal} className="modal_cross" />
            </div>

            <div>
              <br />
              <div className="examModalHead">Add additional details</div>
              <div>
                <div
                  className="exam_Inputs"
                >
                  <div className="inputs-for-exam">
                    <section className="exam-section5">
                      <label>
                        <b>Name of the Exam:</b>
                      </label>

                      <Textinput
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
              <footer className="examFooter">
                <button type="submit" className="backNextBtn nextBtn">
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
