import * as yup from "yup";

const form_validation = {
  question: "Question is required",
  level: "please select level",
};

export const mcqQuestions = yup.object().shape({
  question: yup.string().required(form_validation.question),
  level: yup.string().required(form_validation.level),
});
