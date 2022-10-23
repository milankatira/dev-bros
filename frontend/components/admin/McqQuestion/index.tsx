import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { intialValue } from "../../../constant/initial_value";
import FormForQuestion from "./FormForQuestion";
import {
  addQuestion,
  getSingleQuestion,
  updateSingleQuestion,
} from "../../../api/client/question";

const Index = () => {
  const router = useRouter();
  const [questionData, setquestionData] = useState<any>([]);

  const handleSubmit = (data) => {
    const packet = {
      data,
      exam_id: router.query.exam_id,
    };
    if (router.query.question_id) {
      updateSingleQuestion(router.query.question_id, packet);
      Router.push(`/company/exam/${router.query.exam_id}`);
    } else {
      addQuestion(packet);
      Router.push(`/company/exam/${router.query.exam_id}`);
    }
  };

  useEffect(() => {
    router.query.question_id &&
      getSingleQuestion(router.query.question_id).then((res) =>
        setquestionData(res.data.Data)
      );
  }, [router.query.question_id]);

  const initial_value = {
    questions: [
      {
        question: questionData?.question,
        mcqs: questionData?.mcqs,
        answer: questionData?.answer,
        level: questionData?.level,
      },
    ],
  };

  console.log(
    initial_value.questions.length,
    intialValue.mcqQuestions,
    "initial_value"
  );
  return (
    <div>
      {router.query.question_id &&
      initial_value &&
      initial_value.questions &&
      initial_value.questions[0] &&
      initial_value.questions[0].question ? (
        <>
          <FormForQuestion
            isEdit={true}
            intialValue={initial_value}
            handleSubmit={handleSubmit}
          />
        </>
      ) : (
        !router.query.question_id && (
          <>
            <FormForQuestion
              isEdit={false}
              intialValue={intialValue.mcqQuestions}
              handleSubmit={handleSubmit}
            />
          </>
        )
      )}
    </div>
  );
};

export default Index;
