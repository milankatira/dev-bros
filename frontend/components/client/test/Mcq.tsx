import React from "react";
import ButtonField from "../../common/design/ButtonField";

const Mcq = ({
  initial_value,
  setinitial_value,
  currentQuestion,
  setCurrentQuestion,
  updateLocalstorage,
}) => {
  const handleAnswerOption = (answer) => {
    const array = [...initial_value];
    array[currentQuestion].candidateAns = answer;
    setinitial_value(array);
    updateLocalstorage();
  };

  const handleNext = () => {
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };
  const handleRevisitedChange = () => {
    const array = [...initial_value];
    array[currentQuestion].revisited = !array[currentQuestion].revisited;
    setinitial_value(array);
    updateLocalstorage();
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
          return (
            <div
              key={initial_value[currentQuestion]}
              className="flex bg-green-200 rounded-lg items-center p-4 mb-2"
            >
              <input
                type="radio"
                name={answer}
                value={answer}
                checked={answer == initial_value[currentQuestion].candidateAns}
                onChange={() => handleAnswerOption(answer)}
              />
              <span className="ml-4">{answer}</span>
            </div>
          );
        })}

        <div className="flex justify-between">
          <ButtonField
            text="back"
            onClick={() => handlePrevious()}
            disabled={currentQuestion === 0}
          />
          <br />
          <ButtonField
            text="next"
            onClick={() => handleNext()}
            disabled={currentQuestion === initial_value.length - 1}
          />
        </div>
      </div>
    </div>
  );
};

export default Mcq;
