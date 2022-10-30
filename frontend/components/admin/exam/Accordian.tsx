import React, { useState, useRef } from "react";
type AccordionProps = {
  // title: string;
  content: any;
  setGroupId: any;
  setOpenAssignModal: any;
};

const Accordion = ({
  content,
  setOpenAssignModal,
  setGroupId,
}: AccordionProps) => {
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  return (
    <div className="border-b border-red-600">
      <div className="flex justify-between">
        <td className="px-6 py-4">{content?.title}</td>
        <div className="px-6 py-4">
          {isOpened ? (
            <svg
              className="w-4 h-4"
              onClick={HandleOpening}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4"
              onClick={HandleOpening}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
            </svg>
          )}
        </div>
      </div>

      <div
        ref={contentElement}
        style={{ height: height }}
        className="overflow-hidden transition-all duration-200"
      >
        <h1>{content.title}</h1>
        <h1>{content.description}</h1>
        <div className="flex justify-end m-2">
          <button
            onClick={() => {
              setGroupId(content?._id);
              setOpenAssignModal(true);
            }}
            className="p-2 rounded-md text-white bg-red-400"
          >
            + Assign
          </button>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
