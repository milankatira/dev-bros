import moment from "moment";
import Router from "next/router";
import React, { useState, useRef } from "react";
import { NotifyMember } from "../../../api/client/compnay";
import { addSingleQuestion } from "../../../api/client/question";
import ButtonField from "../../common/design/ButtonField";
type AccordionProps = {
  // title: string;
  content: any;
  // isPast: boolean;
  // DeleteHandler;
  exam_id: string | string[];
};

const QueAccordion = ({ content, exam_id }: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef(null);
  const toChars = (n) =>
    `${n >= 26 ? toChars(Math.floor(n / 26) - 1) : ""}${
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[n % 26]
    }`;

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  const HandleNotify = (id) => {
    NotifyMember(id);
  };

  const handleAddSingleQus = (question_id: string) => {
    addSingleQuestion(exam_id, { question_id });
  };

  return (
    <div className="border">
      <div className="flex justify-between px-4 py-3">
        <td className="text-base font-semibold" onClick={HandleOpening}>
          {content?.question}
          {content?._id}
        </td>
        {isOpened ? (
          <div className="flex flex-row items-center">
            <button
              className="bg-red-400 text-white px-2 py-1 rounded-lg mr-4"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleAddSingleQus(content?._id);
              // }}
              onClick={(e) => {
                e.stopPropagation();
                handleAddSingleQus(content?._id);
              }}
            >
              + add
            </button>
            <svg
              className="w-4 h-4"
              onClick={HandleOpening}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z" />
            </svg>
          </div>
        ) : (
          <div className="flex flex-row items-center">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddSingleQus(content?._id);
              }}
              className="bg-red-400 text-white px-2 py-1 rounded-md mr-4"
            >
              + add
            </button>

            <svg
              className="w-4 h-4"
              onClick={HandleOpening}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
            </svg>
          </div>
        )}
      </div>

      <div
        ref={contentElement}
        style={{ height: height }}
        className="overflow-hidden transition-all duration-200"
      >
        <div className="flex justify-end -mt-4">
          <h1 className="p-2">{`(Difficulty Level:${content.level})`}</h1>
        </div>

        {content.mcqs &&
          content.mcqs.map((data, i) => (
            <div className="ml-4" key={i}>
              <h1 className="pl-4 mb-1">
                {toChars(i) + "."} {data}
              </h1>
            </div>
          ))}

        <div className="ml-4 my-4 border-l-4 border-green-600">
          <h1 className="pl-4 pt-4 text-green-700 font-bold">Correct Answer</h1>
          <h1 className="pl-4">{content.answer}</h1>
        </div>
      </div>
    </div>
  );
};

export default QueAccordion;
