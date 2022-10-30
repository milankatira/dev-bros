import * as yup from "yup";

const form_validation = {
  exam_name: "exam name is requred.",
  description: "exam name is requred.",
  date: "exam name is requred.",
  passing_mark: "exam name is requred.",
  total_mark: "exam name is requred.",
  totalQuestion: "exam name is requred.",
  passing_mark_less: "passing mark is less then passing marks.",
  exam_link: "exam link is requred.",
  exam_link_short: "exam link is too short.",
  exam_link_long: "exam link is too long.",
};
export const ExamValidation = yup.object().shape({
  exam_name: yup.string().required(form_validation.exam_name),
  description: yup.string().required(form_validation.description),
  date: yup.date().required(form_validation.date),
  total_mark: yup.number().required(form_validation.total_mark),
  passing_mark: yup.number().required(form_validation.passing_mark),
  totalQuestion: yup.number().required(form_validation.totalQuestion),
});

export const ExamLinkValidation = yup.object().shape({
  exam_link: yup
    .string()
    .required(form_validation.exam_link)
    .min(2, form_validation.exam_link_short)
    .max(10, form_validation.exam_link_long),
});
