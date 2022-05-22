import React from 'react'

import { ButtonFieldProps } from "component";

const ButtonField: React.FC<ButtonFieldProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-gray-800 text-white active:bg-gray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
    >
      {text}
    </button>
  );
};

export default ButtonField