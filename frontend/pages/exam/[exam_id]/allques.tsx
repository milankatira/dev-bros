// import questions from "./questions.json";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Submitexam } from "../../../api/client/user";
export default function Home({ Data, examdata }) {
  console.log(Data, "data", examdata);
  const router = useRouter();
  const { exam_id } = router.query;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [answer, setanswer] = useState();
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

  // const handleNext = () => {
  //   const nextQues = currentQuestion + 1;
  //   nextQues < questions.length && setCurrentQuestion(nextQues);
  // };

  const handleSubmitButton = () => {
    // let newScore = 0;
    // for (let i = 0; i < questions.length; i++) {
    //   questions[i].answerOptions.map(
    //     (answer) =>
    //       answer.isCorrect &&
    //       answer.answer === selectedOptions[i]?.answerByUser &&
    //       (newScore += 1)
    //   );
    // }
    // setScore(newScore);
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
    <>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex justify-between mt-5 flex-col md:flex-row items-center">
          <nav>
            <a className="mr-5 hover:text-gray-900 font-semibold text-xl">
              {examdata.exam_name}
            </a>
          </nav>
          <a className="flex justify-center items-center"></a>
          <div>
            <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Submit
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col mx-4 sm:mx-10 md:mx-40 justify-center items-center">
        <Head>
          <title>Quiz App</title>
        </Head>

        <>
          <div className="flex flex-col items-start w-full">
            <div className="border px-4 mt-4 hover:bg-blue-400 transition-colors duration-300 hover:text-white p-2 rounded-3xl border-blue-400 font-bold text-orange-400 flex flex-row justify-center items-center">
              <h4>Question</h4>
              <h4 className="ml-2">
                {Data.length}/{currentQuestion + 1}
              </h4>
            </div>

            <div className="mt-4 text-2xl">
              {Data[currentQuestion].question}
            </div>
          </div>
          <div className="flex flex-col w-full">
            {Data[0].mcqs.map((answer, index) => (
              <div
                key={index}
                className={` flex transition-colors duration-100 items-center py-2 pl-5 m-2 ml-0 cursor-pointer rounded-2xl bg-white/5 ${
                  answer === Data[currentQuestion].answer
                    ? " border-4  border-green-100 hover:bg-green-100 bg-green-50"
                    : " border-2  border-blue-100 hover:bg-blue-100 bg-blue-50"
                }`}
              >
                <input
                  type="radio"
                  checked={answer === Data[currentQuestion].answer}
                  onClick={null}
                  className="h-6 w-6"
                />
                <p className="ml-6">{answer}</p>
              </div>
            ))}
          </div>
        </>
        <div>
          <button
            className="m-4 p-2 hover:bg-white hover:text-black hover:border hover:border-blue-900 transition-colors duration-300 border border-blue-400 bg-blue-400 text-white rounded-3xl px-4"
            disabled={currentQuestion == Data.length - 1}
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            next
          </button>

          <button
            className="m-4 p-2 hover:bg-white hover:text-black hover:border hover:border-blue-900 transition-colors duration-300 border border-blue-400 bg-blue-400 text-white rounded-3xl px-4"
            disabled={currentQuestion == 0}
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
          >
            previos
          </button>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req, query }) {
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
  const examRes = await axios.get(
    `http://localhost:4000/api/exam/${query.exam_id}`,
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        Cookie: req?.headers?.cookie,
      },
    }
  );
  const examdata = await examRes.data.exam;
  const data = await res.data;
  return { props: { Data: data.Data, examdata: examdata } };
}
