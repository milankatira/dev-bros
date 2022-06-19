import * as yup from "yup";

const form_validation = {
  exam_name: "exam name is requred.",
  description: "exam name is requred.",
  date: "exam name is requred.",
  passing_mark: "exam name is requred.",
  total_mark: "exam name is requred.",
  totalQuestion: "exam name is requred.",
  passing_mark_less: "passing mark is less then passing marks.",
};
export const ExamValidation = yup.object().shape({
  exam_name: yup.string().required(form_validation.exam_name),
  description: yup.string().required(form_validation.description),
  date: yup.date().required(form_validation.date),
  total_mark: yup.number().required(form_validation.total_mark),
  passing_mark: yup.number().required(form_validation.passing_mark),
  totalQuestion: yup.number().required(form_validation.totalQuestion),
});
