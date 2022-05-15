import React from 'react'

import { ButtonFieldProps } from "component";

const ButtonField: React.FC<ButtonFieldProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-white font-medium rounded-lg bg-blue-500 border py-2 px-8 focus:focus:border-blue-500 focus:ring-2 focus:ring-blue-300 text-base outline-none transition-colors duration-200 ease-in-out hover:bg-blue-600 "
    >
      {text}
    </button>
  );
};

export default ButtonField