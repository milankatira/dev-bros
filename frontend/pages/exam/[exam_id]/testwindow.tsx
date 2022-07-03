/* eslint-disable react/react-in-jsx-scope */
import questions from "./questions.json";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Submitexam } from "../../../api/client/user";
export default function Home({ Data }) {
  const router = useRouter();
  const { exam_id } = router.query;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };

  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  const handleSubmitExam = () => {
    console.log();
    const Array = [
      {
        question_id: exam_id,
        answer: "ww",
        level: "easy",
      },
    ];
    const packet = {
      assign_exam_id: exam_id,
      exam_id: exam_id,
      questions: Array,
    };
    Submitexam(packet);
  };

  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
      </Head>
      <>
        <div className="flex flex-col items-start w-full">
          <h4 className="mt-10 text-xl text-white/60">{Data.length}</h4>
          <p>{currentQuestion}</p>
          <div className="mt-4 text-2xl text-white">
            {Data[currentQuestion].question}
          </div>
        </div>
        <div className="flex flex-col w-full">
          {Data[0].mcqs.map((answer, index) => (
            <div
              key={index}
              className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
              onClick={(e) => handleAnswerOption(answer.answer)}
            >
              <input type="radio" className="w-6 h-6 bg-black" />
              <p className="ml-6 text-white">{answer}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between w-full mt-4 text-white">
          <button
            onClick={handlePrevious}
            className="w-[49%] py-3 bg-indigo-600 rounded-lg"
          >
            Previous
          </button>
          <button
            onClick={
              currentQuestion + 1 === questions.length
                ? handleSubmitButton
                : handleNext
            }
            className="w-[49%] py-3 bg-indigo-600 rounded-lg"
          >
            {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
          </button>
        </div>
      </>

      <button onClick={handleSubmitExam}>Submit</button>
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  console.log(query.exam_id);
  const res = await axios.get(
    `http://localhost:4000/api/questions/${query.exam_id}`,
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        Cookie: req?.headers?.cookie,
      },
    }
  );
  const data = await res.data;
  return { props: { Data: data.Data } };
}
