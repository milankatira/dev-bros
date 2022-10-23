import moment from "moment";
import React, { useState, useRef } from "react";
import { NotifyMember } from "../../../api/client/compnay";
import ButtonField from "../../common/design/ButtonField";
import Switch from "../../common/design/Switch";
import ReportModal from "../assignExam/ResultModal";
import Router from "next/router";
import StatusModal from "./StatusModal";
import { GenerateExamReport } from "../../../api/client/exam";
type AccordionProps = {
  title: string;
  content: any;
  isPast: boolean;
};

const Accordion = ({ isPast, content }: AccordionProps) => {
  console.log(isPast, "isPast");
  const [isOpened, setOpened] = useState<boolean>(false);
  const [showResultModal, setshowResultModal] = useState(false);
  const [showStatusModal, setshowStatusModal] = useState(false);

  const toggleResultModal = () => setshowResultModal(!showResultModal);

  const toggleStatusModal = () => setshowStatusModal(!showStatusModal);

  const [height, setHeight] = useState<string>("0px");
  const contentElement = useRef(null);

  const HandleOpening = () => {
    setOpened(!isOpened);
    setHeight(!isOpened ? `${contentElement.current.scrollHeight}px` : "0px");
  };

  const handlerResult = (data: any) => {
    setshowResultModal(true);
    const packet = {
      assign_exam_id: data?._id,
    };
    GenerateExamReport(packet);
  };

  const HandleNotify = (id) => {
    NotifyMember(id);
  };
  return (
    <div className="border border-gray-400">
      <div className={"flex justify-between text-black"}>
        <h1 className="px-2 py-4 border-2 w-full">{content?.exam_name}</h1>
        <h1 className="px-2 py-4 border-2 w-full">{content?.description}</h1>
        <h1 className="px-2 py-4 border-2 w-full">{content?.total_mark}</h1>
        <h1 className="px-2 py-4 border-2 w-full">{content?.passing_mark}</h1>
        <h1 className="px-2 py-4 border-2 w-full">{content?.exam_type}</h1>

        <div className="px-2 border-2 w-full">
          {isOpened
            ? (
                <svg
                  className="w-4 h-4 my-4"
                  onClick={HandleOpening}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z" />
                </svg>
              )
            : (
                <svg
                  className="w-4 h-4 my-4"
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
        className="overflow-hidden transition-all duration-900"
      >
        <div className="container px-5 py-5 mx-auto">
          <div className="flex flex-wrap justify-between">
            <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
              <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
                Assign exam
              </h1>
              <div className="h-1 w-[170px] bg-indigo-500 rounded"></div>
            </div>
            <ButtonField
              text="Assign Exam"
              onClick={() => Router.push(`exam/${content?._id}`)}
            />
          </div>
        </div>
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
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
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

                  <td scope="col">
                    <ButtonField
                      text="check exam"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlerResult(data);
                      }}
                    />
                  </td>

                  <td scope="col">
                    <ButtonField
                      text="View Status"
                      onClick={(e) => {
                        e.stopPropagation();
                        setshowStatusModal(true);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <ReportModal
        open={showResultModal}
        // handleClose={toggleResultModal}
        // examdDetails={result}
        setopen={setshowResultModal}
        // exam={row}
      />
      <StatusModal open={showStatusModal} setopen={setshowStatusModal} />
    </div>
  );
};

export default Accordion;
