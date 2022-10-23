import React, { useEffect, useState } from "react";
// import CloseIcon from "@material-ui/icons/Close";
// import { useDispatch, useSelector } from "react-redux";
// import { AppState } from "../../../../store/reducers";
import {
  getCandidates,
  AddAssignExam,
  AddGroup,
} from "../../../api/client/compnay";
// import {
//   Grid,
//   h6,
//   Table,
//   TableBody,
//   tr,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
// import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIos";
import { Form, Formik } from "formik";
import Textinput from "../../common/design/Textinput";
import ButtonField from "../../common/design/ButtonField";
import CustomModalField from "../../../components/common/design/CustomModal";

// import ModalField from "../../../common/Material_Ui/ModalField";
// import AssignExamModal from "../AssignExamModal/AssignExamModal";
// import Textinput from "../../../common/Material_Ui/Textinput";
// import ButtonField from "../../../common/Material_Ui/ButtonField";

// import {
//   assignExamToCandidate,
//   fetchCandidatesList,
// } from "../../../../store/actions/candidates";
import { intialValue } from "../../../constant/initial_value";
// import { validationSchema } from "../../../../constant/validation_schema";
// import { addCandidateGroup } from "../../../../store/actions/candidate_group";
// import { CircularProgress } from "@material-ui/core";
import Link from "next/link";
// import { user_id } from "../../../../interface/admin/apiData";
import { candidateGroup } from "../../../validator/candidateGroup";
import AssignExamModal from "./AssignExamModal";
interface Props {
  open?: boolean;
  toggleModal: () => void;
  exam_id: any;
  setModal: (arg: boolean) => void;
  isGroup: boolean;
  examName?: string;
}

const SingleCandidateModal: React.FC<Props> = ({
  toggleModal,
  open,
  exam_id,
  setModal,
  isGroup,
  examName,
}) => {
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState("");
  const [candidatesIds, setcandidatesIds] = useState<any>([]);
  const [step, setStep] = useState<number>(1);
  const [openAssignModal, setOpenAssignModal] = React.useState<boolean>(false);

  const toggleAssignModal = () => setOpenAssignModal(!openAssignModal);

  const close = !open;
  useEffect(() => {
    setStep(1);
    setcandidatesIds([]);
  }, [close]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setcandidatesIds({
      ...candidatesIds,
      [event.target.name]: event.target.checked,
    });
  };

  const handleAssignCandidate = (examDetails: {
    name: string;
    date: string;
    start_time: string;
    end_time: string;
  }) => {
    const packet = {
      exam_id: exam_id,
      isGroup: false,
      id: candidate,
      name: examDetails?.name,
      date: examDetails?.date,
      start_time: examDetails?.start_time,
      end_time: examDetails?.end_time,
    };

    toggleModal();
    AddAssignExam(packet);
  };

  const onSubmit = (data: any) => {
    const keys: any = Object.keys(candidatesIds);
    const filtered: any = keys.filter(function (key: number) {
      return candidatesIds[key];
    });

    const formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("description", data.description);
    formdata.append(`userId`, JSON.stringify(filtered));
    AddGroup(formdata);
    toggleModal();
  };

  useEffect(() => {
    {
      open &&
        getCandidates().then((res) => {
          setCandidates(res.data.candidates);
        });
    }
  }, [open]);
  return (
    <CustomModalField
      open={open}
      // toggleModal={toggleModal}
      // style="resumeModal"
      // ModalDesign="exam_modal_body assigned_test_modal"
    >
      <div className="w-[700px]">
        <div className="flex justify-between items-center">
          {step > 1 ? (
            <button className="backNextBtn1 backBtn1">
              <svg
                onClick={() => {
                  if (step <= 1) {
                    setModal(false);
                    setcandidatesIds([]);
                  } else {
                    setStep(step - 1);
                  }
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="h-4 w-4 ml-4"
              >
                <path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z" />
              </svg>
              {/* <button className="back_icons_modal" /> */}
            </button>
          ) : (
            <span />
          )}

          <h6 className="test_group_creation">
            {isGroup ? "Create New Group" : "Assign Exam To Candidate"}
          </h6>
          <div className="p-4 flex justify-end">
            <svg
              onClick={toggleModal}
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </div>
        </div>
        <br />
        <div className="flex flex-row justify-center">
          {step == 1 && (
            <div className="flex flex-row">
              <table className="text-sm text-left text-gray-500">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3"></th>
                    <th scope="col" className="px-6 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Phone
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate: any, index: number) => (
                    <tr key={candidate._id} className="bg-white border-b ">
                      <td>
                        {isGroup
                          ? (
                              <input
                                type="checkbox"
                                checked={candidatesIds[candidate?._id]}
                                onChange={handleCheckboxChange}
                                name={candidate?._id}
                                value={candidate?._id ? candidate?._id : ""}
                              />
                            )
                          : (
                              <input
                                type="radio"
                                id="myCheck"
                                name="candidate"
                                onClick={() => setCandidate(candidate._id)}
                              />
                            )}
                      </td>

                      <td className="px-6 py-4">
                        {candidate?.firstName + " " + candidate?.lastName}
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`mailto:${candidate?.email}`}>
                          {candidate?.email}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        {" "}
                        <Link href={`tel:91${candidate?.phoneNo}`}>
                          {candidate?.phoneNo}
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {step == 2 && (
            <Formik
              initialValues={intialValue.candidateGroup}
              onSubmit={onSubmit}
              validationSchema={candidateGroup}
            >
              {({ errors, touched }) => (
                <Form className="w-[700px] mx-8 mb-4">
                  <h2 className="text-center font-bold mb-2">
                    Add details for your group
                  </h2>
                  <Textinput
                    name="title"
                    text="Name"
                    error={touched && touched.title && errors && errors.title}
                  />
                  <Textinput
                    name="description"
                    text="Description"
                    error={
                      touched &&
                      touched.description &&
                      errors &&
                      errors.description
                    }
                  />

                  <ButtonField type="submit" text="Submit" />
                </Form>
              )}
            </Formik>
          )}
        </div>
        {!isGroup && (
          <button
            className="editExamQues assignBtn3 assignBtn3-candidates"
            disabled={candidate === ""}
            onClick={() => {
              // setOpenAssignModal();
              toggleAssignModal();
            }}
          >
            + Assign Test
          </button>
        )}

        {isGroup && (
          <footer className="flex justify-end">
            {step !== 2 && (
              <button
                type="button"
                className="backNextBtn nextBtn p-2 bg-rose-700 rounded-br-lg text-white"
                onClick={() => setStep(step + 1)}
                disabled={
                  candidatesIds.length < 2 ||
                  Object.keys(candidatesIds).filter(
                    (key: any) => candidatesIds[key]
                  ).length < 2
                }
              >
                Next
              </button>
            )}
          </footer>
        )}
        <AssignExamModal
          open={openAssignModal}
          toggleModal={toggleAssignModal}
          handleAssignCandidate={handleAssignCandidate}
          examName={examName}
        />
      </div>
    </CustomModalField>
  );
};

export default SingleCandidateModal;
