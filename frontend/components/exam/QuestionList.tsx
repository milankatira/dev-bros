import React from "react";

const QuestionList = ({ i, setCurrentQuestion, setquestionType, d }) => {
  return (
    <div>
      <h1
        onClick={() => {
          setquestionType("all"), setCurrentQuestion(i);
        }}
        key={i}
        className={`  ${
          d.revisited
            ? `bg-red-700`
            : d.candidateAns == ""
              ? `bg-red-300`
              : `bg-blue-300`
        } p-4 m-2 rounded-full`}
      >
        {i}
      </h1>
    </div>
  );
};

export default QuestionList;
