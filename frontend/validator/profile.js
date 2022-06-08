import * as yup from "yup";
import moment from "moment";

const dateObj = new Date();
var numberOfDaysToAdd = 100 * 365;
var result = dateObj.setDate(dateObj.getDate() + numberOfDaysToAdd);

const form_validation = {
  firstName_required: "First Name is required.",
  secondName_required: "Second Name is required.",
  email_required: "Email is required.",
  location_required: "Please select location.",
  employment_type: "Please select employment type.",
  salary: "Expected salary is required.",
  salary_preferences: "Please select salary preference.",
  salary_preferance_number: "salary preference must be number.",
  prefered_location: "Please select prefered location.",
  degree: "Please select degree.",
  institute: "Please select institute.",
  description: "Description is required.",
  marks: "Marks are required.",
  marks_number: "Education marks should be number",
  started_year: "Started Year is required.",
  passingYear_long: "Passing Year has exceed the limit",
  passing_year: "Passing year is required.",
  education_details: "Please enter at least one Education detail.",
  company: "Company is Required",
  designation: "Please select designation.",
  start_date: "Start Date is required.",
  end_date: "End Date is required.",
  experience_details: "Please enter at least one experience details.",
  skill: "Please select skill.",
  year_experience: "Year of experience is required.",
  last_used: "Last used year is required.",
  last_used_date: "Date must be Present or Past",
  skills: "Please enter at least one skill.",
  firstName_short: "firstName must be at least 2 characters",
  firstName_long: "firstName must be at most 6 characters",
  lastName_short: "lastName must be at least 2 characters",
  lastName_long: "lastName must be at most 6 characters",
};
export const Profile = yup.object().shape({
  firstName: yup
    .string()
    .required(form_validation.firstName_required)
    .min(2, form_validation.firstName_short)
    .max(6, form_validation.firstName_long),
  lastName: yup
    .string()
    .required(form_validation.secondName_required)
    .min(2, form_validation.lastName_short)
    .max(6, form_validation.lastName_long),

  location: yup.string().required(form_validation.location_required),
  employmentType: yup.string().required(form_validation.employment_type),
  expectedSalary: yup.number().required(form_validation.salary),
  SalaryPreference: yup
    .number()
    .typeError(form_validation.salary_preferance_number)
    .required(form_validation.salary_preferences),
  preferedLocation: yup.string().required(form_validation.prefered_location),

  education_details: yup
    .array()
    .of(
      yup.object().shape({
        degree: yup.string().required(form_validation.degree),
        institute: yup.string().required(form_validation.institute),
        educationDescription: yup
          .string()
          .required(form_validation.description),
        marks: yup
          .number()
          .typeError(form_validation.marks_number)
          .required(form_validation.marks)
          .max(100, form_validation.maxMarks),
        startedYear: yup
          .date()
          .required(form_validation.started_year)
          .max(moment().toDate(), form_validation.currentYear),

        passingYear: yup
          .date()
          .min(yup.ref("startedYear"), form_validation.passingYear)
          .max(moment(result).toDate(), form_validation.passingYear_long)
          .required(form_validation.passing_year),
      })
    )
    .required(form_validation.education_details),

  experience_details: yup
    .array()
    .of(
      yup.object().shape({
        company: yup.string().required(form_validation.company),
        designation: yup.string().required(form_validation.designation),
        experienceDescription: yup
          .string()
          .required(form_validation.description),

        startDate: yup
          .date()
          .required(form_validation.start_date)
          .max(moment().toDate(), form_validation.currentDate),
        endDate: yup
          .date()
          .min(yup.ref("startDate"), form_validation.enddate)
          .max(moment().toDate(), form_validation.end_dates),
        fresher: yup.boolean(),
      })
    )
    .required(form_validation.experience_details),

  skills: yup
    .array()
    .of(
      yup.object().shape({
        skill: yup.string().required(form_validation.skill),
        yearExp: yup
          .number()
          .typeError("year should be in number")
          .required(form_validation.year_experience),
        lastUsed: yup
          .date()
          .required(form_validation.last_used)
          .max(moment().toDate(), form_validation.last_used_date),
      })
    )
    .required(form_validation.skills),
});
