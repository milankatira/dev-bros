import React, { useState } from "react";
import ButtonField from "../components/common/design/ButtonField";

import { GetAssignExam } from "../api/client/compnay";
import { UseEffectOnce } from "../hook/useEffectOnce";
import moment from "moment";
import Router from "next/router";
import { MyResult } from "../api/client/exam";
import ResultModal from "../components/admin/myExam/ResultModal";

const Myexam = () => {
  const [exam, setexam] = useState([]);
  const [result, setresult] = useState([]);

  const [resultModal, setresultModal] = useState(false);

  UseEffectOnce(() => {
    MyResult().then((data) => setresult(data?.data?.results?.Result));
    GetAssignExam()
      .then((res) => {
        setexam(res.data.assignExam);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="mx-auto mt-20 px-4 h-full flex flex-col justify-center">
      <div className="flex content-center items-center justify-start h-full border-4 border-red-200 ">
        <div className="w-full lg:w-8/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="btn-wrapper text-center font-bold text-xl">
                Verify link
              </div>
              <hr className="mt-6 border-b-1 border-gray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div>
                <div className="relative w-full mb-3 flex justify-between items-center">
                  <input
                    type="text"
                    name="exam_link"
                    placeholder="enter your exam secrets"
                  />

                  <div className="text-center">
                    <ButtonField text="Verify" />
                  </div>
                </div>

                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      id="customCheckLogin"
                      type="checkbox"
                      defaultChecked
                      className="form-checkbox border-0 rounded text-gray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-gray-600">
                      Agree with term and condition
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="text-gray-600 body-font">
        <div className="overflow-x-auto relative">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  name
                </th>
                <th scope="col" className="py-3 px-6">
                  date
                </th>
                <th scope="col" className="py-3 px-6">
                  time
                </th>
                <th scope="col" className="py-3 px-6">
                  link
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {exam &&
                exam.map((data) => {
                  return (
                    <tr
                      key={data._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.name}
                      </th>
                      <td className="py-4 px-6">
                        {moment(data.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="py-4 px-6">
                        From {data.start_time} to {data.end_time}
                      </td>
                      <td className="py-4 px-6">{data.exam_link}</td>
                      <td>
                        {result.filter(
                          (result) => result.assign_exam_id === data._id
                        ).length > 0
                          ? (
                              <svg
                                onClick={() => setresultModal(true)}
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                              </svg>
                            )
                          : (
                              <svg
                                onClick={() =>
                                  Router.push({
                                    pathname: `/exam/${data.exam_id}/testwindow`,
                                    query: {
                                      _id: data?._id,
                                    },
                                  })
                                }
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512"
                              >
                                <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                              </svg>
                            )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <ResultModal
          open={resultModal}
          setopen={setresultModal}
          resultData={result}
        />
      </section>
    </div>
  );
};

export default Myexam;
