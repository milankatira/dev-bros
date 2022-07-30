import moment from "moment";
import React, { useState, useRef } from "react";
import { NotifyMember } from "../../../api/client/compnay";
import Switch from "./switch";
type AccordionProps = {
  title: string;
  content: any;
  isPast: boolean;
};

const Accordion = ({ isPast, content }: AccordionProps) => {
  console.log(isPast, "isPast");
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
    <div className="border border-gray-400">
      <div className={"bg-white p-4 flex justify-between text-black"}>
        <td className="px-6 py-4">{content?._id}</td>
        <td className="px-6 py-4">{content?.description}</td>
        <td className="px-6 py-4">{content?.total_mark}</td>
        <td className="px-6 py-4">{content?.passing_mark}</td>
        <td className="px-6 py-4">{content?.exam_type}</td>
        {isOpened ? (
          <svg
            className="w-4 h-4 m-4"
            onClick={HandleOpening}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z" />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 m-4"
            onClick={HandleOpening}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
          </svg>
        )}
      </div>
      <div
        ref={contentElement}
        style={{ height: height }}
        className="bg-gray-200 overflow-hidden transition-all duration-200"
      >
        <p className="p-4">{content?._id}</p>
        <p className="p-4">{content?.exam_type}</p>

        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Test name
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>

              <th scope="col" className="px-6 py-3">
                Time
              </th>

              <th scope="col" className="px-6 py-3">
                Notify
              </th>
            </tr>
          </thead>
          <tbody>
            {content?.candidates?.map((data) => {
              return (
                <tr
                  key={data._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <th scope="col" className="px-6 py-3">
                    {data?.name}
                  </th>
                  <td className="px-6 py-4" scope="col">
                    {moment(data?.date).format("dd-mm-yyyy")}
                  </td>
                  <td className="px-6 py-4" scope="col">
                    From {data?.start_time} to {data?.end_time}
                  </td>
                  {isPast && (
                    <td className="px-6 py-4" scope="col">
                      <Switch
                        checked={data?.notify}
                        onClick={() =>
                          NotifyMember(data?._id, {
                            notify: !data?.notify,
                          })
                        }
                      />
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Accordion;
