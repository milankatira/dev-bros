import Link from "next/link";
import React, { useState } from "react";
import Past from "../../components/admin/assignExam/Past";
import { UseEffectOnce } from "../../hook/useEffectOnce";
import { GetAssignCandidate } from "../../api/client/compnay";
import moment from "moment";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";


const AssignExam = () => {
  const [step, setstep] = useState("past");
  const [exams, setexams] = useState();
  UseEffectOnce(() => {
    GetAssignCandidate().then((res) => {
      setexams(res.data.assignExam);
    });
  });

  const pastExams =
    exams &&
    exams.length > 0 &&
    exams.map((element: any) => {
      return {
        ...element,
        candidates: element.candidates.filter(
          (subElement: any) =>
            `${`${moment(subElement.date).format("MM DD, YYYY")}`}` <=
              moment(new Date()).format("MM DD, YYYY") &&
            `${subElement.start_time <= new Date().getTime()}`
        ),
      };
    });

  const incomingExams =
    exams &&
    exams.length > 0 &&
    exams.map((element: any) => {
      return {
        ...element,
        candidates: element.candidates.filter(
          (subElement: any) =>
            `${`${moment(subElement.date).format("MM DD, YYYY")}`}` >
              moment(new Date()).format("MM DD, YYYY") &&
            `${subElement.start_time > new Date().getTime()}`
        ),
      };
    });

  return (
    <div className="mx-20">
      <section className="w-full text-gray-600 body-font">
        <div className="w-full text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-row -mb-px w-full">
            <li className="w-1/2 mr-2" onClick={() => setstep("previous")}>
              <a
                className={
                  step === "previous"
                    ? `w-full inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
                    : `w-full inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300`
                }
              >
                Previous
              </a>
            </li>
            <li className="w-1/2 mr-2" onClick={() => setstep("past")}>
              <a
                className={
                  step === "past"
                    ? `w-full inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
                    : `w-full inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300`
                }
              >
                Past
              </a>
            </li>
          </ul>
        </div>
      </section>
     
      {step == "past" && pastExams && (
        <Fade left>
          <Past isPast={true} exam={pastExams} />
        </Fade>
      )}

      {step === "previous" && incomingExams && (
        <Fade right>
          <Past isPast={false} exam={incomingExams} />
        </Fade>
      )}
      
    </div>
  );
};

export default AssignExam;

export const Name = () => {
  return <h1>okk</h1>;
};
