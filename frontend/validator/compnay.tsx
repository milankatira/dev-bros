import * as yup from "yup";
import moment from "moment";

const form_validation = {
  company_name: "Company name is required",
  number_of_eployees: "Number of eployees is required",
  company_url: "Company url is required",
  foundation_year: "Foundation year is required",
  foundation_valid_year: "Invalid Date",
  headquter: "headquter location is required",
  address: "Address is required",
  street: "Street is required",
  city: "City is required",
};

export const company_profile = yup.object().shape({
  name: yup.string().required(form_validation.company_name),
  company_url: yup.string().required(form_validation.company_url),
  number_of_eployees: yup.number().required(form_validation.number_of_eployees),
  foundation_year: yup
    .date()
    .required(form_validation.foundation_year)
    .max(moment().toDate(), form_validation.foundation_valid_year),

  headquter: yup.string().required(form_validation.headquter),
  address: yup
    .array()
    .of(
      yup.object().shape({
        street: yup.string().required(form_validation.street),
        city: yup.string().required(form_validation.city),
      })
    )
    .required(form_validation.address),
});
