import Link from "next/link";
import React, { useState, useEffect } from "react";
import { getCandidates } from "../../../api/client/compnay";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   // Accordion,
//   // AccordionDetails,
//   // AccordionSummary,
//   div,
//   Table,
//   TableContainer,
//   TableRow,
//   h4,
//   TableCell,
//   TableHead,
// } from "@material-ui/core";
// import CloseIcon from "@material-ui/icons/Close";

// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import { image_url } from "../../../../constant/api_urls";
// import ModalField from "../../../common/Material_Ui/ModalField";
import CustomModalField from "../../../components/common/design/CustomModal";
// import { AppState } from "../../../../store/reducers";
// import { getCandidateGroup } from "../../../../store/actions/candidate_group";
// import { assignExamToCandidate } from "../../../../store/actions/candidates";
// import { CircularProgress } from "@material-ui/core";

// import AssignExamModal from "../AssignExamModal/AssignExamModal";
// import Pagination from "@material-ui/lab/Pagination";

interface Props {
  open?: boolean;
  toggleModal: () => void;
  exam_id: any;
  handleAddGroupModal: () => void;
  examName?: string;
}

const CandidateGroupModal: React.FC<Props> = ({
  exam_id,
  open,
  toggleModal,
  handleAddGroupModal,
  examName,
}) => {
  // const dispatch = useDispatch();
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number[] | any>([]);

  // const candidateGroupState = useSelector(
  //   (state: AppState) => state.candidateGroup
  // );
  // const candidateState = useSelector((state: AppState) => state.candidates);
  const [groups, setGroups] = useState([]);
  const [offset, setoffset] = useState<number>(0);

  const [expanded, setExpanded] = React.useState<boolean | any>(false);
  const [openAssignModal, setOpenAssignModal] = React.useState<boolean>(false);
  const [groupId, setGroupId] = React.useState<string>("");
  const [candidates, setcandidates] = useState('');
  const toggleAssignModal = () => setOpenAssignModal(!openAssignModal);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const itemsPerPage = 5;

  useEffect(() => {
    getCandidates()
      .then((res) => {
        setcandidates(res?.data?.candidates);
        console.log(res?.data, "Res");
      })
      .catch((err) => {
        console.log(err, "Err");
      });
  }, []);
  // useEffect(() => {
  //   dispatch(getCandidateGroup(itemsPerPage, offset));
  // }, [dispatch, candidateGroupState.addcandidateGroup, itemsPerPage, offset]);

  const handleAssignCandidate = (examDetails: {
    name: string;
    date: string;
    start_time: string;
    end_time: string;
  }) => {
    const packet = {
      exam_id: exam_id,
      isGroup: true,
      id: groupId,
      name: examDetails?.name,
      date: examDetails?.date,
      start_time: examDetails?.start_time,
      end_time: examDetails?.end_time,
    };
    // dispatch(assignExamToCandidate(packet));
    toggleModal();
  };

  // useEffect(() => {
  //   if (candidateGroupState?.candidateGroup?.data?.results?.group) {
  //     setCount(candidateGroupState?.candidateGroup?.data?.results.group.count);
  //     setGroups(
  //       candidateGroupState?.candidateGroup?.data?.results?.group?.groupData
  //     );
  //   }
  // }, [candidateGroupState?.candidateGroup?.data?.results?.group]); //eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (candidateState?.assign?.data?.results?.assign) {
  //     setGroupId("");
  //     setOpenAssignModal(false);
  //   }
  // }, [candidateState?.assign]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setExpanded(false);
  }, [!open]); //eslint-disable-line react-hooks/exhaustive-deps

  const HandleChange = (event: any, value: any) => {
    setPage(value);
    setoffset((value - 1) * 5);
  };
  let PaginationCount: number;
  if (count % 5 == 0) {
    PaginationCount = Math.floor(count / 5);
  } else {
    PaginationCount = Math.floor(count / 5) + 1;
  }

  return (
    <CustomModalField
      open={open}
      // toggleModal={toggleModal}
      // style="resumeModal"
      // ModalDesign="exam_modal_body group_modal"
    >
      <div className="exam_modal_heading">
        <h4
          // variant="h6"
          // component="span"
          className="test_candidates-grp"
        >
          Assign test to groups of candidates
        </h4>
        <button onClick={toggleModal} className="modal_cross" />
      </div>
      <div
        // direction="row"
        // alignItems="center"
        className="group-container"
      >
        <div className="createGrpBtn">
          <button className="editExamQues">Create New Group</button>
        </div>
        {/* <div item lg={12}>
          {groups && groups.length > 0 ? (
            groups.map((group: any, index: any) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                className="group-accordion"
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <h4 className="group-name">
                    <b>{group?.title}</b>
                  </h4>
                </AccordionSummary>
                <AccordionDetails className="group-description">
                  <div className="groups-section">
                    <section>
                      <b>Description</b>
                      <div>{group?.description}</div>
                    </section>
                    <button
                      className="editExamQues"
                      onClick={() => {
                        setGroupId(group?._id);
                        setOpenAssignModal(true);
                      }}
                    >
                      + Assign
                    </button>
                  </div>
                  <br />

                  <div className="title">
                    <b>Corporate Profile</b>
                  </div>
                  <a
                    // href={`${image_url}${group.profile_url}`}
                    className="about_info"
                    rel="noreferrer"
                  >
                    {group.name}
                  </a>
                  <TableContainer className="groupTableCon">
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>name</TableCell>
                          <TableCell>email</TableCell>
                          <TableCell>phone number</TableCell>
                        </TableRow>
                      </TableHead>
                      {false ? (
                        group &&
                        group.candidates.map((data: any, index: any) => {
                          return (
                            <TableRow key={index}>
                              <TableCell>{data.name}</TableCell>
                              <TableCell>{data.email}</TableCell>
                              <TableCell>{data.phone}</TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <div className="loaderContainer">
                          <CircularProgress
                            color="primary"
                            className="loaderContainer2"
                          />
                        </div>
                      )}
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))
          ) : (
            <span className="noQusFound">
              No groups has been found. Please add new groups
            </span>
          )}
          {/* {groups && groups.length > 0 ? (
            <div className="PaginationContainer1 mob_width">
              <Pagination
                count={PaginationCount}
                page={page}
                onChange={HandleChange}
                color="primary"
              />
            </div>
          ) : null} */}
        {/* </div> */}

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
                            // onClick={() => setCandidate(candidate._id)}
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
              ) : // <div className="loaderContainer loaderContainerCandidate">
              //   <CircularProgress
              //     color="primary"
              //     className="loaders-singleCandidate"
              //   />
              // </div>
              null}
            </tbody>
          </table>
        </div>
        <br />
      </div>
      {/* <AssignExamModal
        open={openAssignModal}
        toggleModal={toggleAssignModal}
        handleAssignCandidate={handleAssignCandidate}
        examName={examName}
      /> */}
    </CustomModalField>
  );
};

export default CandidateGroupModal;
