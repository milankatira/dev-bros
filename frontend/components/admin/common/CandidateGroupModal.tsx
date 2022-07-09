import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AddAssignExam, getGroup } from "../../../api/client/compnay";
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
import Accordion from "../exam/Accordian";
import AssignExamModal from "./AssignExamModal";
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
  const [candidates, setcandidates] = useState("");
  const toggleAssignModal = () => setOpenAssignModal(!openAssignModal);

  const handleChange = (panel: string) => (event: any, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const itemsPerPage = 5;

  useEffect(() => {
    getGroup()
      .then((res) => {
        setcandidates(res?.data?.group);
      })
      .catch((err) => {
        console.log(err, "Err");
      });
  }, []);

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
    AddAssignExam(packet);
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
      <div className="w-[700px] border-2 border-red-500">
        <div className="flex justify-center">
          <h4
            // variant="h6"
            // component="span"
            className="text-base font-semibold"
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
          <div className="flex justify-end mr-4">
            <button
              className="p-2 bg-red-400 text-white rounded-2xl"
              onClick={handleAddGroupModal}
            >
              Create New Group
            </button>
          </div>

          {candidates &&
            candidates.map((data: any) => (
              // onClick={() => {
              //       setGroupId(group?._id);
              //       setOpenAssignModal(true);
              //     }}
              // <h1 key={data._id}>{data.title}</h1>
              <Accordion
                key={data._id}
                content={data}
                setOpenAssignModal={setOpenAssignModal}
                setGroupId={setGroupId}
              />
            ))}

          <div></div>
          <br />
        </div>
      </div>

     <AssignExamModal
        open={openAssignModal}
        toggleModal={toggleAssignModal}
        handleAssignCandidate={handleAssignCandidate}
        examName={examName}
      /> 
    </CustomModalField>
  );
};

export default CandidateGroupModal;
