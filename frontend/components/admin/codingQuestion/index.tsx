import React, { useState, useEffect } from "react";
import FormForQuestion from "./FormForQuestion";
import { intialValue } from "../../../constant/initial_value";
import { useRouter } from "next/router";
import Router from "next/router";
import {
  addCodingQuestion,
  getsingleCodingQuestion,
  updatesingleCodingQuestion,
} from "../../../api/client/question";

const Index = () => {
  const router = useRouter();
  const [questionData, setquestionData] = useState("");
  const [questionState, setquestionState] = useState<any>();
  console.log(questionState, "questionData__1");
  useEffect(() => {
    router.query.coding_question_id &&
      getsingleCodingQuestion(router.query.coding_question_id).then((res) => {
        setquestionData(res.data.codingquestionData.question);
        setquestionState(res.data.codingquestionData);
      });
  }, [router.query.coding_question_id]);

  const handleSubmit = (data) => {
    const packet = {
      question: questionData,
      level: data.data.level,
    };

    if (router.query.coding_question_id) {
      updatesingleCodingQuestion(router.query.coding_question_id, packet);
      Router.push(`/company/exam/${router.query.exam_id}`);
    } else {
      addCodingQuestion(router.query.exam_id, packet);
      Router.push(`/company/exam/${router.query.exam_id}`);
    }
  };

  return (
    <div>
      {questionData &&
      questionData &&
      questionState &&
      questionState.level !== undefined
        ? (
            <FormForQuestion
              isEdit={true}
              handleSubmit={handleSubmit}
              intialValue={questionState}
              questionData={questionData}
              setquestionData={setquestionData}
            />
          )
        : (
            <FormForQuestion
              isEdit={false}
              handleSubmit={handleSubmit}
              intialValue={intialValue.codingQuestion}
              questionData={questionData}
              setquestionData={setquestionData}
            />
          )}
    </div>
  );
};

export default Index;
