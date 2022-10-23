import React from "react";
import Exam from "../../../components/admin/exam";
import { ExamProvider } from "../../../context/context/Exam";

const Index = () => {
  return (
    <div>
      <ExamProvider>
        <Exam />
      </ExamProvider>
    </div>
  );
};

export default Index;
