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
    <div className="border border-indigo-400">
      <div className={"bg-black p-4 flex justify-between text-white"}>
        <td className="px-6 py-4">{content?._id}</td>
        <td className="px-6 py-4">{content?.description}</td>
        <td className="px-6 py-4">{content?.total_mark}</td>
        <td className="px-6 py-4">{content?.passing_mark}</td>
        <td className="px-6 py-4">{content?.exam_type}</td>
        {isOpened ? (
          <button onClick={HandleOpening}>close</button>
        ) : (
          <button onClick={HandleOpening}>open</button>
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
                  {!isPast && (
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
