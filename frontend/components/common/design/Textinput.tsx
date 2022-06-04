import { InputFieldProps } from "component";
import { Field, ErrorMessage } from "formik";

const Textinput: React.FC<InputFieldProps> = ({
  type,
  value,
  onChange,
  text,
  name,
  error,
  placeholder,
}) => {
  return (
    <div className="relative mb-4">
      <label
        htmlFor={name}
        className="block uppercase text-gray-600 text-xs font-bold mb-2"
      >
        {text}
      </label>
      <Field
        name={name && name}
        type={type}
        error={error}
        placeholder={placeholder}
        className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
      />

      <span className="text-red-700 font-sans font-semibold">{error}</span>
    </div>
  );
};

export default Textinput;
