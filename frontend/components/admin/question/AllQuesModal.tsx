import React, { useState } from "react";
import CustomModalField from "../../../components/common/design/CustomModal";
import HeaderTitleContainer from "../../../components/common/design/HeaderTitleContainer";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
// import BasicTextinput from "../../common/design/BasicTextinput";
import { exam_type } from "../../constant/app_constant";
import { Formik, Form, Field, FieldArray } from "formik";
import { intialValue } from "../../../constant/initial_value";
import BasicTextinput from "../../common/design/BasicTextInput";
import { addExam } from "../../../api/client/exam";
import toast from "react-hot-toast";
import QueAccordion from "./QueAccordian";
interface Props {
  open: boolean;
  handleClose: any;
  questionsDatas: any;
  exam_id: string[] | string;
}

const AddQuesModal: React.FC<Props> = ({
  questionsDatas,
  open,
  handleClose,
  exam_id,
}) => {
  return (
    <div>
      <CustomModalField open={open}>
        <div className="w-[700px]">
          <section className="flex w-[700px] justify-between items-center p-4">
            <h1 className="font-bold">List of Question</h1>

            <svg
              onClick={handleClose}
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z" />
            </svg>
          </section>
          <hr className="border-gray-600 " />

          <div>
            {questionsDatas &&
              questionsDatas.map((data) => (
                <div key={data._id}>
                  <QueAccordion content={data} exam_id={exam_id} />
                </div>
              ))}
          </div>
        </div>
      </CustomModalField>
    </div>
  );
};
export default AddQuesModal;
