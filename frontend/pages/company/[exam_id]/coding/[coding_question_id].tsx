import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import McqQuestions from "../../../components/admin/McqQuestion";

import dynamic from "next/dynamic";
const McqQuestions = dynamic(
  () => import("../../../../components/admin/codingQuestion"),
  {
    ssr: false,
  }
);

const Question = () => {
  const router = useRouter();
  const { coding_question_id } = router.query;

  const handleSubmit = (data) => {
    const packet = {
      data,
      exam_id: router.query.exam_id,
    };
    // addQuestion(packet);
  };

  return (
    <div>
      <McqQuestions />
    </div>
  );
};

export default Question;
