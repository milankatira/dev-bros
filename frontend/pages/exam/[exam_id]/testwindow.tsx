import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Submitexam } from "../../../api/client/user";
import Mcq from "../../../components/client/test/Mcq";
import QuestionList from "../../../components/exam/QuestionList";
import ButtonField from "../../../components/common/design/ButtonField";

export default function Home({ Data }) {
  const router = useRouter();
  const { exam_id } = router.query;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [initial_value, setinitial_value] = useState([]);
  const [questionType, setquestionType] = useState("all");

  const handleSubmitExam = () => {
    const questions = initial_value.map((d) => {
      return {
        question_id: d._id,
        answer: d.candidateAns || "",
        level: d.level,
      };
    });

    const packet = {
      assign_exam_id: router.query._id,
      exam_id,
      questions,
    };
    Submitexam(packet);
  };

  const updateLocalstorage = () => {
    localStorage.setItem("quest", JSON.stringify(initial_value));
  };
  useEffect(() => {
    const initialValue = Data?.map((qus: any) => {
      return {
        ...qus,
        candidateAns: "",
        revisited: false,
      };
    });
    if (localStorage && localStorage.getItem("quest")) {
      setinitial_value(JSON.parse(localStorage.getItem("quest")));
    } else {
      setinitial_value(initialValue);
      localStorage.setItem("quest", JSON.stringify(initialValue));
    }
  }, []);

  return (
    <div className="flex w-full flex-col px-5 h-screen justify-center items-center">
      <>
        <h1>dashboard</h1>

        <div className="flex flex-row">
          {initial_value?.map((d, i) => {
            return (
              <QuestionList
                i={i}
                setCurrentQuestion={setCurrentQuestion}
                setquestionType={setquestionType}
                d={d}
              />
            );
          })}
        </div>
        <div className="w-full">
          {questionType == "all"
            ? (
                <Mcq
                  setCurrentQuestion={setCurrentQuestion}
                  currentQuestion={currentQuestion}
                  initial_value={initial_value}
                  setinitial_value={setinitial_value}
                  updateLocalstorage={updateLocalstorage}
                />
              )
            : questionType == "unattampted"
              ? (
                  <Mcq
                    setCurrentQuestion={setCurrentQuestion}
                    currentQuestion={currentQuestion}
                    initial_value={initial_value.filter(
                      (data) => data.candidateAns == ""
                    )}
                    setinitial_value={setinitial_value}
                    updateLocalstorage={updateLocalstorage}
                  />
                )
              : questionType == "attampted"
                ? (
                    <Mcq
                      setCurrentQuestion={setCurrentQuestion}
                      currentQuestion={currentQuestion}
                      initial_value={initial_value.filter(
                        (data) => data.candidateAns !== ""
                      )}
                      setinitial_value={setinitial_value}
                      updateLocalstorage={updateLocalstorage}
                    />
                  )
                : (
                    <Mcq
                      setCurrentQuestion={setCurrentQuestion}
                      currentQuestion={currentQuestion}
                      initial_value={initial_value.filter(
                        (data) => data.revisited == true
                      )}
                      setinitial_value={setinitial_value}
                      updateLocalstorage={updateLocalstorage}
                    />
                  )}
        </div>
        <br />
        <ButtonField text="Sumbit" onClick={() => handleSubmitExam()} />
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
