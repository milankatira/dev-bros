import React from "react";
import { Field } from "formik";
import { SelectFieldProps } from "component";
const BasicSelectField: React.FC<SelectFieldProps> = ({
  error,
  options,
  onChange,
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

      <select
        onChange={onChange}
        value={defaultValue}
        className="select-none border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      >
        <option value="none" selected disabled hidden>
          Select a {inputLabel}
        </option>
        {options &&
          options?.map((singleValue: any) => (
            <option value={singleValue} key={singleValue}>
              {singleValue}
            </option>
          ))}
      </select>
      <span className="text-red-700 font-sans font-semibold">{error}</span>
    </div>
  );
};

export default BasicSelectField;
