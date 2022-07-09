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
    <CustomModalField open={open}>
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
      <div className="select-option-header flex flex-row h-auto justify-center w-[700px]">
        <div
          className="border-2 border-red-300 rounded-3xl p-4 mb-4"
          onClick={() => handleIsGroupSelection(true)}
        >
          <div className="flex justify-center">
            <Image
              src="/images/group.png"
              className="group21"
              width="60"
              height="60"
            />
          </div>
          <div className="header34">Send to a Group</div>
          <div>user registration required</div>
        </div>
        &nbsp;&nbsp;&nbsp;
        <div
          className="border-2 border-red-300 rounded-3xl p-4 mb-4"
          onClick={() => handleIsGroupSelection(false)}
        >
          <div className="flex justify-center">
            <Image src="/images/person.png" width="60" height="60" />
          </div>
          <div className="header34">Send to a One Person Only</div>
          <div>user registration required</div>
        </div>
      </div>
    </CustomModalField>
  );
};

export default SelectOptionModal;
