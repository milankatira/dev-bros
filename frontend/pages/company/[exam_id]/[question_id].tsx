import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { UseEffectOnce } from "../../../hook/useEffectOnce";
import { getSingleQuestion } from "../../../api/client/question";
import FormForQuestion from "../../../components/admin/McqQuestion/FormForQuestion";
import { intialValue } from "../../../constant/initial_value";
// import McqQuestions from "../../../components/admin/McqQuestion";

import dynamic from "next/dynamic";
const McqQuestions = dynamic(
  () => import("../../../components/admin/McqQuestion"),
  {
    ssr: false,
  }
);

const Question = () => {
  const router = useRouter();
  const [questionData, setquestionData] = useState([]);
  const { question_id } = router.query;

  console.log(questionData, "question_id ");
  // useEffect(() => {
  //   question_id &&
  //     getSingleQuestion(question_id).then((res) =>
  //       setquestionData(res.data.Data)
  //     );
  // }, [question_id]);

  const handleSubmit = (data) => {
    const packet = {
      data,
      exam_id: router.query.exam_id,
    };
    // addQuestion(packet);
  };

  return (
    <div>
      
      <McqQuestions/>

        {/* // <FormForQuestion */}
        {/* //   intialValue={intialValue.mcqQuestions} */}
        {/* //   handleSubmit={handleSubmit} */}
        {/* // /> */}
    </div>
  );
  // return <div>[question_id],{question_id}</div>;
};

export default Question;
