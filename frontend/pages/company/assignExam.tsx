import Link from "next/link";
import React, { useState } from "react";
import Past from "../../components/admin/assignExam/Past";
import { UseEffectOnce } from "../../hook/useEffectOnce";
import { GetAssignCandidate } from "../../api/client/compnay";
import moment from "moment";
const assignExam = () => {
  const [step, setstep] = useState("dashboard");
  const [exams, setexams] = useState();
  console.log(exams, "exams");
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

  console.log(pastExams, "pastExams");
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

  console.log(incomingExams, "incomingExams");
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <section className="text-gray-600 body-font">
            <div className="container pb-24 mx-auto">
              <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
                <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">
                  Slow-carb next level shoindxgoitch ethical authentic,
                  scenester sriracha forage.
                </h1>
                <button className="flex-shrink-0 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-10 sm:mt-0">
                  AddEXAM
                </button>
              </div>
            </div>
          </section>
        </div>
        <hr className="bg-gray-600" />

        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            <li className="mr-2" onClick={() => setstep("previous")}>
              <a
                className={
                  step === "previous"
                    ? `inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
                    : `inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300`
                }
              >
                Previous
              </a>
            </li>
            <li className="mr-2" onClick={() => setstep("past")}>
              <a
                className={
                  step === "past"
                    ? `inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500`
                    : `inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300`
                }
                // href="#"
                // className="inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                // className="inline-block p-4 text-blue-600 rounded-t-lg border-b-2 border-blue-600 active dark:text-blue-500 dark:border-blue-500"
                aria-current="page"
              >
                Past
              </a>
            </li>
          </ul>
        </div>
      </section>

      {step == "past"
        ? pastExams && <Past isPast={true} exam={pastExams} />
        : incomingExams && <Past isPast={false} exam={incomingExams} />}
    </div>
  );
};

export default assignExam;
