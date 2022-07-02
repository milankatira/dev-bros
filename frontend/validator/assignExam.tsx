import * as yup from "yup";
import moment from "moment";

const form_validation = {
  minDate: "Date must be either present or future date.",
  mintime: "End time should be more than start time.",
  name: "Name is required.",
  date: "Date is required.",
  start_time: "Start time is required.",
  end_time: "End time is required.",
};

export const assignExam = yup.object().shape({
  name: yup.string().required(form_validation.name),
  date: yup
    .date()
    // .min(moment().date, form_validation.minDate)
    .required(form_validation.date),
  start_time: yup.string().required(form_validation.start_time),
  end_time: yup.string().required(form_validation.end_time),
});
