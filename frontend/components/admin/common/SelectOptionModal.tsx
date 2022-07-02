import React from "react";
// import CloseIcon from "@material-ui/icons/Close";
// import ModalField from "../../../common/Material_Ui/ModalField";
import CustomModalField from "../../../components/common/design/CustomModal";
import Image from "next/image";

interface Props {
  open?: boolean;
  toggleModal?: () => void;
  handleIsGroupSelection: (params: boolean) => void;
}

const SelectOptionModal: React.FC<Props> = ({
  toggleModal,
  open,
  handleIsGroupSelection,
}) => {
  return (
    <CustomModalField
      open={open}
      // toggleModal={toggleModal}
      // style="resumeModal"
      // ModalDesign="exam_modal_body option_modal_body"
    >
      <button onClick={toggleModal} className="modal_cross321  " />
      <div className="select-option-header">
        <div
          className="select-option-section"
          onClick={() => handleIsGroupSelection(true)}
        >
          <Image
            src="/images/group.png"
            className="group21"
            width="60"
            height="60"
          />
          <div className="header34">Send to a Group</div>
          <div></div>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          className="select-option-section"
          onClick={() => handleIsGroupSelection(false)}
        >
          <Image
            src="/images/person.png"
            className="group21"
            width="60"
            height="60"
          />
          <div className="header34">Send to a One Person Only</div>
        </div>
      </div>
    </CustomModalField>
  );
};

export default SelectOptionModal;
