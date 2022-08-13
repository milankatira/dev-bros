import React, { useState } from "react";
import Past from "../../components/admin/assignExam/Past";
import { UseEffectOnce } from "../../hook/useEffectOnce";
import { GetAssignCandidate } from "../../api/client/compnay";
const AssignExam = () => {
  const [exams, setexams] = useState([]);
  UseEffectOnce(() => {
    GetAssignCandidate().then((res) => {
      setexams(res.data.assignExam);
    });
  });

  return (
    <div className="mx-20">
      {exams && exams.length > 0 && (
        <Past isPast={true} exam={exams} />
      )}
    </div>
  );
};

export default AssignExam;
