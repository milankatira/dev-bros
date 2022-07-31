import React, { useState } from "react";

const Mcq = ({ initial_value, setinitial_value }) => {
  // const Attamptedarray = initial_value.filter(
  //   (data) => data.candidateAns !== ""
  // );
  // const UnAttamptedarray = initial_value.filter(
  //   (data) => data.candidateAns === ""
  // );
  // const Revisitedarray = initial_value.filter(
  //   (data) => data.revisited === true
  // );
  // console.log(
  //   Attamptedarray,
  //   UnAttamptedarray,
  //   Revisitedarray,
  //   "Attamptedarray"
  // );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const handleAnswerOption = (answer) => {
    const array = [...initial_value];
    array[currentQuestion].candidateAns = answer;
    setinitial_value(array);
  };

  const handleRevisitedChange = () => {
    const array = [...initial_value];
    array[currentQuestion].revisited = !array[currentQuestion].revisited;
    setinitial_value(array);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-start w-full">
        <h4 className="mt-10 text-xl text-white/60">{initial_value.length}</h4>
        <p>{currentQuestion}</p>
        <div className="mt-4 text-2xl text-white">
          {initial_value[currentQuestion]?.question}
        </div>
      </div>

      <div className="flex flex-col">
        <button onClick={() => handleRevisitedChange()}>
          {initial_value[currentQuestion]?.revisited
            ? "rivisited"
            : "not revisited"}
        </button>
        {initial_value[currentQuestion]?.mcqs?.map((answer, index) => {
          console.log(
            answer.candidateAns,
            "answer",
            initial_value[currentQuestion].candidateAns,
            "mk"
          );
          return (
            <div className="flex bg-green-600 rounded-lg items-center p-4 mb-2">
              <input
                type="radio"
                name={answer}
                value={answer}
                // checked={answer === "mkk"}
                checked={answer == initial_value[currentQuestion].candidateAns}
                onChange={() => handleAnswerOption(answer)}
              />
              <span className="ml-4">{answer}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Mcq;
