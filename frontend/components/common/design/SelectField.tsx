import React from "react";
import { Field } from "formik";
import { SelectFieldProps } from "component";
const SelectField: React.FC<SelectFieldProps> = ({
  error,
  options,
  name,
  inputLabel,
  styles,
  defaultValue,
}) => {
  return (
    <div className="relative mb-4">
      <label
        htmlFor="country"
        className="block uppercase text-gray-600 text-xs font-bold mb-2"
      >
        {inputLabel}
      </label>

      <Field
        as="select"
        name={name}
        value={defaultValue}
        className="select-none border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        <option value="none" selected disabled hidden>
          Select a {inputLabel}
        </option>
        {options &&
          options.map((singleValue: any) => (
            <option value={singleValue._id} key={singleValue._id}>
              {singleValue.department
                ? singleValue.department
                : singleValue.name}
            </option>
          ))}
      </Field>
      <span className="text-red-700 font-sans font-semibold">{error}</span>
    </div>
  );
};

export default SelectField;

// import React from "react";
// import {
//   FormControl,
//   Select,
//   InputLabel,
//   MenuItem,
//   FormHelperText,
// } from "@material-ui/core";
// import { Field } from "formik";
// import { SelectFieldProps } from "component";

// const index: React.FC<SelectFieldProps> = ({
//   errors,
//   touched,
//   options,
//   name,
//   inputLabel,
//   fullWidth,
//   styles,
//   defaultValue,
// }) => (
//   <FormControl
//     variant="outlined"
//     fullWidth={fullWidth || false}
//     className={styles || ""}
//   >
//     <InputLabel>{inputLabel}</InputLabel>
//     <Field label={inputLabel} as={Select} name={name} value={defaultValue}>
//       {options &&
//         options.map((singleValue: any) => (
//           <MenuItem value={singleValue._id} key={singleValue._id}>
//             {singleValue.department ? singleValue.department : singleValue.name}
//           </MenuItem>
//         ))}
//     </Field>
//     <FormHelperText>{errors && touched && errors}</FormHelperText>
//   </FormControl>
// );

// export default index;
