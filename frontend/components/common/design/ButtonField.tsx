import React from "react";

import { ButtonFieldProps } from "component";

const ButtonField: React.FC<ButtonFieldProps> = ({
  text,
  type,
  onClick,
  disabled,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className="bg-gray-700 active:bg-blue-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
    >
      {text}
    </button>
  );
};

export default ButtonField;
