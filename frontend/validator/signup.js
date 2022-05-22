import * as yup from "yup";

const form_validation = {
  firstName_required: "First Name is required.",
  secondName_required: "Second Name is required.",
  email_required: "Email is required.",
  password_required: "Password is required.",
  password_short: "Password is too short.",
  password_long: "Password is too long.",
};
export const Signup = yup.object().shape({
  firstName: yup
    .string()
    .required(form_validation.firstName_required)
    .min(2, form_validation.firstName_short)
    .max(10, form_validation.firstName_long),
  lastName: yup
    .string()
    .required(form_validation.secondName_required)
    .min(2, form_validation.secondName_short)
    .max(10, form_validation.secondName_long),
  email: yup.string().email().required(form_validation.email_required),
  password: yup
    .string()
    .min(6, form_validation.password_short)
    .max(20, form_validation.password_long)
    .required(form_validation.password_required),
});

