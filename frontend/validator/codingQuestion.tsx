import * as yup from "yup";

const form_validation = {
  level: "please select level",
};

export const codingQuestions = yup.object().shape({
  level: yup.string().required(form_validation.level),
});
