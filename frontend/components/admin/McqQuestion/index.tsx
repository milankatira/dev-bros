import React from "react";
import { useRouter } from "next/router";
import { intialValue } from "../../../constant/initial_value";
import FormForQuestion from "./FormForQuestion";
import { addQuestion } from "../../../api/client/question";

const Index = () => {
  const router = useRouter();
  console.log(router.query.exam_id, "mmm");

  const handleSubmit = (data) => {
    const packet = {
      data,
      exam_id: router.query.exam_id,
    };
    addQuestion(packet);
  };

  return (
    <div>
      <FormForQuestion
        intialValue={intialValue.mcqQuestions}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Index;
