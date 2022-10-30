import * as yup from "yup";

const form_validation = {
  title_required: "title is required",
  description_required: "description is required",
};

export const candidateGroup = yup.object().shape({
  title: yup.string().required(form_validation.title_required),
  description: yup.string().required(form_validation.description_required),
});
