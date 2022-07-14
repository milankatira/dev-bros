import Link from "next/link";
import React, { useState, useRef } from "react";
type AccordionProps = {
  title: string;
  content: any;
  isPast: boolean;
};

const Accordion = ({ content }: AccordionProps) => {
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
        <td className="px-6 py-4 font-bold">{content?.title}</td>
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
        <div className="flex flex-row px-6 mb-4">
          <h1 className="font-semibold">Desctiption:</h1>
          <h1 className="ml-4">{content.description}</h1>
        </div>
          <table className="text-sm w-full text-left text-gray-500">
            <thead className="text-xs uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
              </tr>
            </thead>
            <tbody>
              {content.candidates.map((candidate: any, index: number) => (
                <tr
                  key={index}
                  className=" border-b"
                >
                  <td className="px-6 py-4">
                    {candidate?.firstName + " " + candidate?.lastName}
                  </td>
                  <td className="px-6 py-4">
                    <Link href={`mailto:${candidate?.email}`}>
                      {candidate?.email}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <Link href={`tel:91${candidate?.phoneNo}`}>
                      {candidate?.phoneNo}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
};

export default Accordion;
