import React, { useEffect, useState } from "react";
// import CloseIcon from "@material-ui/icons/Close";
// import { useDispatch, useSelector } from "react-redux";
// import { AppState } from "../../../../store/reducers";
import { getCandidates, AddAssignExam, AddGroup } from "../../../api/client/compnay";
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
  // isGroup: boolean;
  examName?: string;
}

const SingleCandidateModal: React.FC<Props> = ({
  toggleModal,
  open,
  exam_id,
  setModal,
  // isGroup,
  examName,
}) => {
  // const dispatch = useDispatch();
  // const candidateGroupState = useSelector(
  //   (state: AppState) => state.candidateGroup
  // );
  // const candidateState = useSelector((state: AppState) => state.candidates);
  const [candidates, setCandidates] = useState([]);
  const [candidate, setCandidate] = useState("");
  const [candidatesIds, setcandidatesIds] = useState<any>([]);
  const [step, setStep] = useState<number>(1);
  const [image, setImage] = useState<any>("");
  const [openAssignModal, setOpenAssignModal] = React.useState<boolean>(false);

  const toggleAssignModal = () => setOpenAssignModal(!openAssignModal);

  // useEffect(() => {
  //   if (open) dispatch(fetchCandidatesList());
  // }, [open]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setStep(1);
    setcandidatesIds([]);
  }, [!open]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (candidateState?.candidates?.data?.results?.candidates) {
  //     setCandidates(candidateState?.candidates?.data?.results?.candidates);
  //   }
  // }, [candidateState?.candidates]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (candidateState?.assign?.data?.results?.assign) {
  //     setCandidate("");
  //     setModal(false);
  //     setOpenAssignModal(false);
  //   }
  // }, [candidateState?.assign]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (candidateGroupState?.addcandidateGroup?.data?.results) {
  //     setCandidate("");
  //     setcandidatesIds([]);
  //     setImage("");
  //     setModal(false);
  //   }
  // }, [candidateGroupState?.addcandidateGroup]); //eslint-disable-line react-hooks/exhaustive-deps

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
    toggleModal;
    console.log(packet,"packet")
    AddAssignExam(packet);
    // dispatch(assignExamToCandidate(packet));
  };

  const onSubmit = (data: any) => {
    const keys: any = Object.keys(candidatesIds);
    const filtered: any = keys.filter(function (key: number) {
      return candidatesIds[key];
    });
    if (image) {
      const formdata = new FormData();
      formdata.append("profile", image);
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      for (let i = 0; i < filtered.length; i++) {
        formdata.append(`userId[${i}]`, filtered[i]);
      }
      toggleModal();
      AddGroup(formdata);
    } else {
      const formdata = new FormData();
      formdata.append("title", data.title);
      formdata.append("description", data.description);
      for (let i = 0; i < filtered.length; i++) {
        formdata.append(`userId[${i}]`, filtered[i]);
      }
      toggleModal();
      AddGroup(formdata);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "application/pdf,.doc,.docx",
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 1) {
        toast.warn("Please upload single file at a time");
      } else if (acceptedFiles[0].size > 2000000) {
        toast.warn("Please image of less than size 2 mb");
      } else {
        setImage(acceptedFiles[0]);
      }
    },
  });

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
      <div className="exam_modal_heading">
        <button
          type="button"
          className="backNextBtn1 backBtn1"
          onClick={() => {
            if (step <= 1) {
              setModal(false);
              setcandidatesIds([]);
            } else {
              setStep(step - 1);
            }
          }}
        >
          <button className="back_icons_modal" />
        </button>
        <h6
          // variant="h6"
          // component="span"
          className="test_group_creation"
        >
          {true ? "Create New Group" : "Assign Exam To Candidate"}
        </h6>
        <button onClick={toggleModal} className="modal_cross" />
      </div>
      <br />
      <div
        // container
        // direction="column"
        // alignItems="center"
        className="scheduleJobMeeting"
      >
        {step == 1 && (
          <div>
            <table aria-label="simple table">
              <th>
                {/* <TableRow> */}
                  <tr></tr>
                  <tr>Sr</tr>
                  <tr>Name</tr>
                  <tr>Email</tr>
                  <tr>Phone</tr>
                {/* </TableRow> */}
              </th>
              <tbody>
                {true ? (
                  candidates && candidates.length > 0 ? (
                    candidates.map((candidate: any, index: number) => (
                      <tr key={candidate?._id}>
                        <tr>
                          {false ? (
                            <input
                              type="checkbox"
                              checked={candidatesIds[candidate?._id]}
                              onChange={handleCheckboxChange}
                              name={candidate?._id}
                              value={candidate?._id ? candidate?._id : ""}
                            />
                          ) : (
                            <input
                              type="radio"
                              id="myCheck"
                              name="candidate"
                              onClick={() => setCandidate(candidate._id)}
                            />
                          )}
                        </tr>

                        <tr>{index + 1}</tr>
                        <tr>
                          {candidate?.firstName + " " + candidate?.lastName}
                        </tr>
                        <tr>
                          <Link href={`mailto:${candidate?.email}`}>
                            <a>{candidate?.email}</a>
                          </Link>
                        </tr>
                        <tr>
                          <Link href={`tel:91${candidate?.phone}`}>
                            <a>{candidate?.phoneNo}</a>
                          </Link>
                        </tr>
                      </tr>
                    ))
                  ) : (
                    <tr>No User found</tr>
                  )
                ) : (
                  // <div className="loaderContainer loaderContainerCandidate">
                  //   <CircularProgress
                  //     color="primary"
                  //     className="loaders-singleCandidate"
                  //   />
                  // </div>
                  null
                )}
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
              <div>
                <Form>
                  <h2>Add details for your group</h2>
                  <Textinput
                    name="title"
                    text="Name"
                    error={touched && touched.title && errors && errors.title}
                  />
                  <Textinput
                    name="description"
                    // label="Description"
                    // multiline
                    // rows={2}
                    // styles="margin-top"
                    error={
                      touched &&
                      touched.description &&
                      errors &&
                      errors.description
                    }
                  />
                  <h6 className="margin-top">Company Brochure</h6>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <div className="file_btn_submit">
                      Choose File
                      <input {...getInputProps()} />
                    </div>
                    <div>{image.path}</div>
                  </div>
                  <ButtonField type="submit" text="Submit" />
                </Form>
              </div>
            )}
          </Formik>
        )}
      </div>
      {false && (
        <button
          className="editExamQues assignBtn3 assignBtn3-candidates"
          disabled={candidate === ""}
          onClick={() => {
            setOpenAssignModal(true);
          }}
        >
          + Assign Test
        </button>
      )}

      {true && (
        <footer className="examFooter">
          {step !== 2 && (
            <button
              type="button"
              className="backNextBtn nextBtn"
              onClick={() => setStep(step + 1)}
              // disabled={
              //   candidatesIds.length < 2 ||
              //   Object.keys(candidatesIds).filter(
              //     (key: any) => candidatesIds[key]
              //   ).length < 2
              // }
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
    </CustomModalField>
  );
};

export default SingleCandidateModal;
