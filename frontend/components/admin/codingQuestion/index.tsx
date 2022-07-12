import React from "react";
import FormForQuestion from "./FormForQuestion";
import { intialValue } from "../../../constant/initial_value";
import { useRouter } from "next/router";
import Router from "next/router";
import { addCodingQuestion } from "../../../api/client/question";

const Index = () => {
  const router = useRouter();

  const handleSubmit = (data) => {
    const packet = {
      question: data.data.question,
      level: data.level,
    };
    if (router.query.question_id) {
      Router.push(`/company/exam/${router.query.exam_id}`);
    } else {
      addCodingQuestion(router.query.exam_id, packet);
      Router.push(`/company/exam/${router.query.exam_id}`);
    }
  };

  return (
    <div>
      <FormForQuestion handleSubmit={handleSubmit} intialValue={intialValue.codingQuestion} />
    </div>
  );
};

export default Index;
