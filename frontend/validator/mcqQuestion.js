import * as yup from "yup";

const form_validation = {
  question: "Question is required",
  mcqs: "Option is required",
  answer: "Please select correct answer",
  questions_details: "Please fill up questions properly",
  education_details: "Please fill all detail",
};

export const mcqQuestions = yup.object().shape({
  questions: yup
    .array()
    .of(
      yup.object().shape({
        question: yup.string().required(form_validation.question),
        mcqs: yup
          .array()
          .of(yup.string().required(form_validation.mcqs))
          .required(form_validation.mcqs),
        answer: yup.string().required(form_validation.answer),
        level: yup.string(),
      })
    )
    .required(form_validation.education_details),
});
