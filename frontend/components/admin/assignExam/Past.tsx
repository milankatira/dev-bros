import React from "react";
import Accordion from "../../common/design/Accordian";

const Past = ({ exam, isPast }) => {
  console.log(isPast, "past_exam");
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500">
        <div className="text-xs flex flex-row text-gray-700 uppercase bg-gray-50">
          <h1 className="px-6 py-3">Exam name</h1>

          <h1 className="px-6 py-3">Description</h1>

          <h1 className="px-6 py-3">Total mark</h1>

          <h1 className="px-6 py-3">Passing mark</h1>

          <h1 className="px-6 py-3">Type</h1>
        </div>
        <tbody>
          {exam.map((data) => (
            <>
              <tr key={data._id} className="bg-white border-b hover:bg-gray-50">
                <Accordion
                  title={data.exam_name}
                  content={data}
                  isPast={isPast ? true : false}
                />
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Past;
