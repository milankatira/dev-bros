import * as yup from "yup";

const form_validation = {
  email_required: "Email is required.",
  password_required: "Password is required.",
  password_short: "Password is too short.",
  password_long: "Password is too long.",
};
export const Login = yup.object().shape({

  email: yup.string().email().required(form_validation.email_required),
  password: yup
    .string()
    .min(6, form_validation.password_short)
    .max(20, form_validation.password_long)
    .required(form_validation.password_required),
});
