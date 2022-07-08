import moment from "moment";
import React, { useState, useRef } from "react";
import { NotifyMember } from "../../../api/client/compnay";
type AccordionProps = {
  title: string;
  content: any;
  isPast: boolean;
};

const Accordion = ({ content }: AccordionProps) => {
  // console.log(isPast, "isPast");
  const [isOpened, setOpened] = useState<boolean>(false);
  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  const HandleNotify = (id) => {
    NotifyMember(id);
  };
  return (
    <div className="border border-indigo-400">
      {isOpened ? (
        <button onClick={HandleOpening}>close</button>
      ) : (
        <button onClick={HandleOpening}>open</button>
      )}

      <div
        ref={contentElement}
        style={{ height: height }}
        className="bg-gray-200 overflow-hidden transition-all duration-200"
      >
        <h1>{content._id}</h1>
        <h1>{content.name}</h1>
        <h1>{content.description}</h1>
      </div>
    </div>
  );
};

export default Accordion;
