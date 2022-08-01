import React from "react";
import Accordion from "../../admin/assignExam/Accordian";

const Past = ({ exam, isPast }) => {
  console.log(isPast, "past_exam");
  return (
    <div>
      <table className="w-full text-sm text-left text-gray-500">
        <div className="w-full flex justify-between text-xs flex-row text-gray-700 uppercase bg-gray-50">
          <h1 className="px-2 py-4 border-2 w-full">Exam name</h1>
          <h1 className="px-2 py-4 border-2 w-full">Description</h1>
          <h1 className="px-2 py-4 border-2 w-full">Total mark</h1>
          <h1 className="px-2 py-4 border-2 w-full">Passing mark</h1>
          <h1 className="px-2 py-4 border-2 w-full">Type</h1>
          <h1 className="px-2 py-4 border-2 w-full">ffrf </h1>
        </div>
        <tbody>
          {exam.map((data) => (
            <>
              {/* <tr key={data._id} className="bg-white border-b hover:bg-gray-50"> */}
                <Accordion
                  title={data.exam_name}
                  content={data}
                  isPast={isPast ? true : false}
                />
              {/* </tr> */}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Past;
