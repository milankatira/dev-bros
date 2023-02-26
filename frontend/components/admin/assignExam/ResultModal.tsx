import React, { useState } from "react";
import { UpdateExamReport } from "../../../api/client/exam";
import CustomModalField from "../../common/design/CustomModal";
import ButtonField from "../../common/design/ButtonField";

export default function ResultModal({ open, setopen, resultData }) {
  const result = resultData[0];
  const [user_marks, setuser_marks]: any = useState(0);

  const payload = {
    id: result?._id,
    user_marks,
    assign_exam_id: result?.assign_exam_id,
  };

  const handleSubmit = () => {
    UpdateExamReport(payload);
    setopen(false);
  };

  return (
    <CustomModalField open={open}>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                <h3 className="text-3xl font-semibold">Result Modal </h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setopen(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              {result &&
                (result.user_marks == null
                  ? (
                      <div>
                        <div className="flex flex-row justify-between p-4 text-lg">
                          <p> easy_count</p>
                          <p> {result.easy_count}</p>
                        </div>

                        <div className="flex flex-row justify-between p-4 text-lg">
                          <p> easy_correct</p>
                          <p> {result.easy_correct}</p>
                        </div>

                        <div className="flex flex-row justify-between p-4 text-lg">
                          <p> medium_count</p>
                          <p> {result.medium_count}</p>
                        </div>

                        <div className="flex flex-row justify-between p-4 text-lg">
                          <p> medium_correct</p>
                          <p> {result.medium_correct}</p>
                        </div>

                        <div className="flex flex-row justify-between p-4 text-lg">
                          <p> hard_count</p>
                          <p> {result.hard_count}</p>
                        </div>

                        <div className="flex flex-row justify-between p-4 text-lg">
                          <p> hard_correct</p>
                          <p> {result.hard_correct}</p>
                        </div>

                        <input
                          type="number"
                          value={user_marks}
                          onChange={(e) => setuser_marks(e.target.value)}
                        />
                        <ButtonField text="submit" onClick={() => handleSubmit()} />
                      </div>
                    )
                  : (
                      <>
                        <h1>{result.user_marks}</h1>
                        <h2>{result.is_passed ? "passed" : "fails"}</h2>
                      </>
                    ))}
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setopen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </CustomModalField>
  );
}
