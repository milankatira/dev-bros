import React, { useState } from "react";
import AddExamModal from "../../../components/admin/common/AddExamModal";
import CustomModalField from "../../../components/common/design/CustomModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
// import ModalField from "../../../components/common/design/ModalField";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
// import ArrowBackIosNewIcon from "@material-ui/icons/ArrowBackIos";

const Index = () => {
  const initialValues = {
    exam_name: "",
    start_time: "",
    end_time: "",
    description: "",
    exam_type: "",
    date: "",
    passing_mark: "",
    total_mark: " ",
    totalQuestion: " ",
  };

  const [openAddExamModal, setOpenAddExamModal] = useState(false);
  const [examDataForModal, setExamDataForModal] = useState<any>(initialValues);
  const toggleModal = () => setOpenAddExamModal(!openAddExamModal);

  return (
    <div>
      <HeaderTitleContainer title="My exam" button={true}>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={toggleModal}
        >
          create exam
        </button>
      </HeaderTitleContainer>
      <AddExamModal
        open={openAddExamModal}
        toggleModal={toggleModal}
        setExamData={setExamDataForModal}
        examData={examDataForModal}
      />
    </div>
  );
};

export default Index;
