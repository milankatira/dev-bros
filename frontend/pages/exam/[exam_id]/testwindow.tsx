/* eslint-disable react/react-in-jsx-scope */
import questions from "./questions.json";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Submitexam } from "../../../api/client/user";
import { GetExamQuestion } from "../../../api/client/exam";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
import Mcq from "../../../components/client/test/Mcq";
export default function Home({ Data }) {
  const router = useRouter();
  const { exam_id } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [initial_value, setinitial_value] = useState([]);
  const [questionType, setquestionType] = useState("all");
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const Attamptedarray = initial_value.filter(
    (data) => data.candidateAns !== ""
  );
  const UnAttamptedarray = initial_value.filter(
    (data) => data.candidateAns === ""
  );
  const Revisitedarray = initial_value.filter(
    (data) => data.revisited === true
  );

  const handleAnswerOption = (answer) => {
    console.log(
      initial_value[currentQuestion]?.candidateAns,
      "intial_value",
      currentQuestion,
      initial_value[currentQuestion]
    );
    // array[currentPage - 1].candidateAns = value;
    // setinitial_value([
    //   ...initial_value,
    //   (initial_value[currentQuestion].candidateAns = answer),
    // ]);
    // setSelectedOptions([...selectedOptions]);
    const array = [...initial_value];

    array[currentQuestion].candidateAns = answer;

    setinitial_value(array);
    console.log(initial_value, "...initial_value");
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

  useEffect(() => {
    const initialValue = Data?.map((qus: any) => {
      return {
        ...qus,
        candidateAns: "",
        revisited: false,
      };
    });
    setinitial_value(initialValue);
  }, []);

  return (
    <div className="flex w-full flex-col px-5 h-screen bg-[#1A1A1A] justify-center items-center">
      <Head>
        <title>Quiz App</title>
      </Head>
      <>
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 w-full">
          <div className="container flex flex-wrap justify-between items-center mx-auto">
            <a href="https://flowbite.com/" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                {questionType}
              </span>
            </a>
            <div className="flex md:order-2">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get started
              </button>
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1"
              id="navbar-cta"
            >
              <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li onClick={() => setquestionType("Rivisited")}>
                  <a
                    className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Rivisited
                  </a>
                </li>

                <li onClick={() => setquestionType("unattampted")}>
                  <a className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                    unattampted
                  </a>
                </li>
                <li onClick={() => setquestionType("attampted")}>
                  <a
                    className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    attampted
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="w-full">
          {questionType == "all" ? (
            <Mcq
              initial_value={initial_value}
              setinitial_value={setinitial_value}
            />
          ) : questionType == "unattampted" ? (
            <Mcq
              initial_value={initial_value.filter(
                (data) => data.candidateAns == ""
              )}
              setinitial_value={setinitial_value}
            />
          ) : questionType == "attampted" ? (
            <Mcq
              initial_value={initial_value.filter(
                (data) => data.candidateAns !== ""
              )}
              setinitial_value={setinitial_value}
            />
          ) : (
            <Mcq
              initial_value={initial_value.filter(
                (data) => data.revisited == true
              )}
              setinitial_value={setinitial_value}
            />
          )}
          {/* initial_value.filter(
   (data) => data.candidateAns !== ""
 ); */}
        </div>
        {/* <div className="flex flex-col items-start w-full">
          <h4 className="mt-10 text-xl text-white/60">{Data.length}</h4>
          <p>{currentQuestion}</p>
          <div className="mt-4 text-2xl text-white">
            {initial_value[currentQuestion]?.question}
          </div>
        </div> */}

        {/* <div className="flex flex-col w-full">
          {initial_value[currentQuestion]?.mcqs?.map((answer, index) => {
            console.log(answer.candidateAns, "answer");
            return (
              <div className="flex bg-green-600 rounded-lg items-center p-4 mb-2">
                <input
                  type="radio"
                  name={answer}
                  value={answer}
                  checked={answer === "mkk"}
                  // checked={answer == answer.candidateAns}
                  onChange={() => handleAnswerOption(answer)}
                />
                <span className="ml-4">{answer}</span>
              </div>
            );
          })}
        </div>
       */}
      </>
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const res = await axios.get(
    `http://localhost:4000/api/examquestion/${query.exam_id}`,
    {
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Credentials": true,
        Cookie: req?.headers?.cookie,
      },
    }
  );
  const data = await res.data;
  return { props: { Data: data.exam[0].questions } };
}
