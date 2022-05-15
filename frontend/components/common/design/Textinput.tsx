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
        htmlFor="email"
        className="leading-7 font-bold text-sm text-gray-600"
      >
        {text}
      </label>
      <Field
        name={name && name}
        type={type}
        error={error}
        // value={value}
        // onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white rounded-lg border-2 border-gray-300 focus:border-blue-200 focus:ring-1 focus:ring-blue-200 text-lg font-sans font-medium outline-none text-gray-700 py-1 px-3 leading-7 transition-colors duration-200 ease-in-out"
      />

      <span className="text-red-600">{error}</span>
    </div>
  );
};

export default Textinput;
